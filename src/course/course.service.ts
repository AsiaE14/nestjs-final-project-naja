import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const existingCourse = await this.courseRepository.findOne({ 
      where: { courseId: createCourseDto.courseId } 
    });
    
    if (existingCourse) {
      throw new ConflictException(`Already have subject: ${createCourseDto.courseId}`);
    }

    const newCourse = this.courseRepository.create(createCourseDto);

    return await this.courseRepository.save(newCourse);
  }
  
  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(courseId: string) {
    const course = await this.courseRepository.findOne({ where: { courseId } });
    if (!course) {
      throw new NotFoundException(`Can't find subject: ${courseId}`);
    }
    return course;
  }

  async update(courseId: string, updateData: any) {
    const course = await this.findOne(courseId);
    
    const updatedCourse = this.courseRepository.merge(course, updateData);
    
    return await this.courseRepository.save(updatedCourse);
  }

  async remove(courseId: string) {
    const course = await this.findOne(courseId);
    return await this.courseRepository.remove(course);
  }
}