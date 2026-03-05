import { Injectable } from '@nestjs/common';
import { StudentStatus } from './enums/student-status.enum';
import { CreateStudentDto } from './dto/create-student.dto';
import { AddressDto } from './dto/address.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registeredCourseIds: string[];
  address: AddressDto;
  status: StudentStatus;
  isScholarship: boolean;
  maxCredit: number;
  createdAt: Date;
}

@Injectable()
export class StudentsService {
  private readonly filepath = path.resolve(process.cwd(), 'data/students.json');
  
  //Checking data directory and students.json.
  async onModuleInit() {
    const dir = path.dirname(this.filepath);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }

    try {
      await fs.access(this.filepath);
    } catch {
      await fs.writeFile(this.filepath, JSON.stringify([]), 'utf-8')
    }
  }
}