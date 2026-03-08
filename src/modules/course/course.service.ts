import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

import { readDb, writeDb, DatabaseSchema } from '../../common/utils/json-db.util';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
 export class CourseService {
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const db: DatabaseSchema = readDb();

    const isExist = db.courses.some(c => c.courseId === createCourseDto.courseId);
    if (isExist) {
      throw new ConflictException(`Course ID ${createCourseDto.courseId} already exists`);
    }

    const newCourse: Course = {
      ...createCourseDto,
      enrolledCount: 0,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    } as unknown as Course;

    db.courses.push(newCourse);
    writeDb(db);
    
    return newCourse;
  }
  
  async findAll(): Promise<Course[]> {
    const db = readDb();
    return db.courses;
  }

  async findOne(id: string): Promise<Course> {
    const db = readDb();
    const course = db.courses.find(c => c.courseId === id);
    if (!course) throw new NotFoundException(`NOT FOUND COURSE ID ${id}`);
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const db = readDb();
    const courseIndex = db.courses.findIndex(c => c.courseId === id);
    if (courseIndex === -1) throw new NotFoundException(`NOT FOUND COURSE ID ${id}`);
    
    const updatedCourse: Course = {
      ...db.courses[courseIndex],
      ...updateCourseDto,
      updateAt: new Date().toISOString()
    } as Course;
    db.courses[courseIndex] = updatedCourse;

    writeDb(db);
    return updatedCourse;
  }

  async remove(id: string): Promise<Course> {
    const db = readDb();
    const courseIndex = db.courses.findIndex(c => c.courseId === id);
    if (courseIndex === -1) throw new NotFoundException(`NOT FOUND COURSE ID ${id}`);

    const removedCourse = db.courses[courseIndex];
    db.courses.splice(courseIndex, 1); 

    writeDb(db);
    return removedCourse;
  }

}