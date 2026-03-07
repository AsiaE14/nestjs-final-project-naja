import { Controller, Get, Post,Put, Body, Patch, Param, Delete,HttpCode,HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  @Post('login') 
  @HttpCode(HttpStatus.OK) // ส่งกลับสถานะ 200 OK แทน 201 Created
  
  login(@Body() loginStudentDto: LoginStudentDto) {
    return this.studentService.login(loginStudentDto);
  }


  @Post('register')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    const students = await this.studentService.findAll();
    return {
      success: true,
      message: 'all students retrieved successfully!',
      data: students,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.findOne(id);
    return {
      success: true,
      message: 'Student data retrieved successfully!',
      data: student,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    const updatedStudent = await this.studentService.update(id, updateStudentDto);
    return {
      success: true,
      message: 'Student data updated successfully!',
      data: updatedStudent,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedStudent = await this.studentService.remove(id);
    return {
      success: true,
      message: 'Student data removed successfully!',
      data: removedStudent,
    };
  }


  @Put(':id')
  async updateAll(
    @Param('id') id: string,
    @Body() updateStudentDto: CreateStudentDto 
  ) {
    const data = await this.studentService.update(id, updateStudentDto);
    return {
      success: true,
      message: `Update student with id ${id} successfully!`,
      data: data
    };
  }

// ลงทะเบียนเรียน
  @Post(':studentId/register/:courseId')
  async registerCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string
  ) {
    const data = await this.studentService.registerCourse(studentId, courseId);
    return {
      success: true,
      message: `Course registered successfully!`,
      data: data
    };
  }
}
