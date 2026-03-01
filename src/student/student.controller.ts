import { StudentDTO } from '@/dto/student.dto';
import { Controller,Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    AllStudent():StudentDTO[] {
        return this.studentService.findAll();
    }
    @Get(':id')
    getStudentById(@Param('id') id: string) {
        return this.studentService.findById(id);
 }

}
