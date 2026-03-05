import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
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
export class StudentsService implements OnModuleInit {
  private readonly filepath = path.resolve(process.cwd(), 'data/students.json');
  
  // Checking data directory and students.json. ------------------------------------
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

  // read data from .json file. ------------------------------------
  private async readData(): Promise<Student[]> {
    const data = await fs.readFile(this.filepath, 'utf-8');
    return JSON.parse(data)
  }

  // write data on .json file. ------------------------------------
  private async writeData(data: Student[]): Promise<void> {
    await fs.writeFile(this.filepath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // CRUD system. ------------------------------------
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const students = await this.readData();

    const newStudent: Student = {
      id: Math.random().toString(36).substring(2, 9),
      ...createStudentDto,
      createdAt: new Date(),
    };

    students.push(newStudent);
    await this.writeData(students);

    return newStudent;
  }
}