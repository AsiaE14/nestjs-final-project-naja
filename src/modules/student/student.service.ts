import { Injectable,NotFoundException,ConflictException } from '@nestjs/common';
import { Course,CourseStatus } from '../course/entities/course.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { readDb, writeDb,DatabaseSchema } from '../../common/utils/json-db.util';
import { UpdateStudentDto } from './dto/update-student.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Student } from './entities/student.entity';
import { UnauthorizedException } from '@nestjs/common';
import { LoginStudentDto } from './dto/login-student.dto';
@Injectable()
export class StudentService {
  async create(createStudentDto: CreateStudentDto) {
    const db: DatabaseSchema = readDb();
    const isExist = db.students.some(s => s.studentId === createStudentDto.studentId);
    if (isExist) {
      throw new ConflictException(`Student ID ${createStudentDto.studentId} already exists`);
    }
    const newStudent: Student = {
      ...createStudentDto,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      courses: [] 
    } as unknown as Student;

    db.students.push(newStudent);
    writeDb(db);
    
    return newStudent;
  }

 async findAll():Promise<Student[]> {
  const db = readDb();
    return db.students;
  }

  async findOne(id: string): Promise<Student> {
    const db = readDb();
    const student = db.students.find(s => s.studentId === id);
    if (!student) throw new NotFoundException(`NOT FOUND STUDENT ID ${id}`);
    return student;
  }

  async update(id: string, update: UpdateStudentDto): Promise<Student> {
    const db = readDb();
    const studentIndex = db.students.findIndex(s => s.studentId === id);
    if (studentIndex === -1) throw new NotFoundException(`NOT FOUND STUDENT ID ${id}`);

    const updatedStudent: Student = { ...db.students[studentIndex], ...update } as Student;
    db.students[studentIndex] = updatedStudent;
    
    writeDb(db);
    return updatedStudent;
  }

  async remove(id: string): Promise<Student> {
    const db = readDb();
    const studentIndex = db.students.findIndex(s => s.studentId === id);
    if (studentIndex === -1) throw new NotFoundException(`NOT FOUND STUDENT ID ${id}`);

    const removedStudent = db.students[studentIndex];
    db.students.splice(studentIndex, 1); // ลบข้อมูล
    writeDb(db);
    return removedStudent;
  }

  async login(loginDto: LoginStudentDto) {
   const db = readDb();
    const student = db.students.find(s => s.email === loginDto.email);
    
    if (!student || student.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    return {
      success: true,
      message: 'Login successful!',
      data: {
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName
      }
    };
  }

  //ลงทะเบียนเรียน
  async registerCourse(studentId: string, courseId: string): Promise<Student> {
    const db = readDb();
    
    // หานักศึกษา
    const studentIndex = db.students.findIndex(s => s.studentId === studentId);
    if (studentIndex === -1) throw new NotFoundException(`NOT FOUND STUDENT ID ${studentId}`);
    
    // หาวิชาเรียน
    const course = db.courses.find((c: Course) => c.courseId === courseId);
    if (!course) throw new NotFoundException(`Not found course id: ${courseId}`);

    // เช็กสถานะวิชา
    if (course.status !== 'OPEN') {
      throw new BadRequestException(
        `can't register course ${courseId} (status ${course.status})`
      );
    }
    const student = db.students[studentIndex];

    // ป้องกันกรณีไม่มี array 
    if (!student.courses) {
      student.courses = [];
    }

    //เช็กว่าเคยลงไปแล้วหรือยัง
    const isAlreadyRegistered = student.courses.some(c => c.courseId === courseId);
    if (isAlreadyRegistered) {
      throw new ConflictException(`Student with ID ${studentId} has already registered for course ${courseId}`);
    }

    //เช็กหน่วยกิต
    const currentCredits = student.courses.reduce((sum, c) => sum + c.credits, 0);
    if (currentCredits + course.credits > student.maxCredit) {
      throw new BadRequestException(
        `can't register course (max: ${student.maxCredit} credits)`
      );
    }
    
    //เช็กว่ายังมีที่นั่งไหม
    const enrolledStudentsCount = db.students.filter(s => 
      s.courses?.some(c => c.courseId === courseId)
    ).length;

    if (enrolledStudentsCount >= course.capacity) {
      throw new BadRequestException(
        `can't register course (max: ${course.capacity} students)`
      );
    }

    // ลงทะเบียนเรียน 
    student.courses.push(course);
    db.students[studentIndex] = student;
    
    // อัพเดตยอดผู้เรียน (enrollcount)
    const courseIndexToUpdate = db.courses.findIndex(c => c.courseId === courseId);
    if (courseIndexToUpdate !== -1) {
      db.courses[courseIndexToUpdate].enrolledCount += 1;
    }

    writeDb(db);
    return student;
  }
}