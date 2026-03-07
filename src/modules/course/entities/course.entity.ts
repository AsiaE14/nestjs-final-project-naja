




export enum CourseStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}

export class Course {
  courseId!: string;
  title!: string;
  description!: string;
  credits!: number;
  capacity!: number;
  enrolledCount!: number; 
  status!: CourseStatus;
  instructorName!: string;
  isElective!: boolean;
  createdAt?: string | Date; 
  updateAt?: string | Date;
}