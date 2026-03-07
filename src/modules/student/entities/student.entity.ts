
import { Course } from '../../course/entities/course.entity';
export class Student {
  studentId!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string; 
  phone!: string;
  major!: string;
  status!: string; 
  isScholarship!: boolean;
  maxCredit!: number;
  createdAt?: string | Date; 
  updateAt?: string | Date;
  courses!: Course[];
}