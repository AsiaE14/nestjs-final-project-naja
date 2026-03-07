import { 
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Course } from '../../course/entities/course.entity'

@Entity()
export class Student {
  @PrimaryColumn()
  studentId!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true }) 
  email!: string;

  @Column()
  password!: string; 

  @Column()
  phone!: string;

  @Column()
  major!: string;

  @Column()
  status!: string;

  @Column()
  isScholarship!: boolean;

  @Column()
  maxCredit!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  courses!: Course[];
}