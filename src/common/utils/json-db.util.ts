import * as fs from 'fs';
import * as path from 'path';
import { Student } from '../../modules/student/entities/student.entity';
import { Course } from '../../modules/course/entities/course.entity';

export interface DatabaseSchema {
  students: Student[];
  courses: Course[];
}

const dbPath = path.resolve(process.cwd(), 'database.json');

export const readDb = (): DatabaseSchema => {

  if (!fs.existsSync(dbPath)) {
    return { students: [], courses: [] };
  }
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data) as DatabaseSchema; 
};

export const writeDb = (data: DatabaseSchema): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};