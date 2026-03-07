import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll(); 
  }

  @Get(':courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.courseService.findOne(courseId)
  }

  @Patch(':courseId')
  update(@Param('courseId') courseId: string, @Body() updateData: any) {
    return this.courseService.update(courseId, updateData);
  }

  @Delete(':courseId')
  remove(@Param('courseId') courseId: string) {
    return this.courseService.remove(courseId);
  }
}