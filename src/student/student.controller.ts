import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,HttpStatus } from '@nestjs/common';
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
      message: 'ดึงข้อมูลนักศึกษาทั้งหมดสำเร็จ!',
      data: students,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.findOne(id);
    return {
      success: true,
      message: 'ดึงข้อมูลนักศึกษาสำเร็จ!',
      data: student,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    const updatedStudent = await this.studentService.update(id, updateStudentDto);
    return {
      success: true,
      message: 'อัปเดตข้อมูลนักศึกษาสำเร็จ!',
      data: updatedStudent,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedStudent = await this.studentService.remove(id);
    return {
      success: true,
      message: 'ลบข้อมูลนักศึกษาสำเร็จ!',
      data: removedStudent,
    };
  }
}
