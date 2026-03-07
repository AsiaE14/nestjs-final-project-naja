import { Controller, Get, Post,Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const data = await this.courseService.create(createCourseDto);
    return {
      success: true,
      message: 'Create course data successfully!',
      data: data
    };
  }

  @Get()
  async findAll() {
    const data = await this.courseService.findAll();
    return {
      success: true,
      message: 'Bring data of all courses successfully!',
      data: data
    };
  }

  @Get(':courseId')
  async findOne(@Param('courseId') courseId: string) {
    const data = await this.courseService.findOne(courseId);
    return {
      success: true,
      message: `Bring data of course with id ${courseId} successfully!`,
      data: data
    };
  }

  @Put(':id')
  async updateAll(
    @Param('id') id: string,
    @Body() updateCourseDto: CreateCourseDto 
  ) {
    const data = await this.courseService.update(id, updateCourseDto);
    return {
      success: true,
      message: `Update course with id ${id} successfully!`,
      data: data
    };
  }

  @Patch(':courseId')
  async update(@Param('courseId') courseId: string, @Body() updateData: UpdateCourseDto) {
    const data = await this.courseService.update(courseId, updateData);
    return {
      success: true,
      message: `Update course with id ${courseId} successfully!`,
      data: data
    };
  }

  @Delete(':courseId')
  async remove(@Param('courseId') courseId: string) {
    const data = await this.courseService.remove(courseId);
    return {
      success: true,
      message: `Delete course with id ${courseId} successfully!`,
      data: data
    };
  }
}