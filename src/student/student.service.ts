import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>, 
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(newStudent); 
  }

 async findAll() {
    return await this.studentRepository.find({relations:['courses']});
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne({ where: {studentId: id} });
    if (!student) throw new NotFoundException(`NOT FOUND STUDENT ID ${id}`);
    return student;
  }

  async update(id: string, update: UpdateStudentDto) {
    const student = await this.findOne(id);
    const updatedStudent = Object.assign(student, update);
    return await this.studentRepository.save(updatedStudent);
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    return await this.studentRepository.remove(student);
  }
  async login(loginDto:import('./dto/login-student.dto').LoginStudentDto) {
    const student = await this.studentRepository.findOne({ where: { email: loginDto.email } });
    if (!student|| student.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    return {
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ!',
      data: {
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName

    }
   };
  }
}
