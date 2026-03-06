import { 
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany
} from "typeorm";

import { Student } from '../../student/entities/student.entity';

export enum CourseStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}

@Entity()
export class Course {
    @PrimaryColumn()
    courseId!: string

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    credits!: number;

    @Column()
    capacity!: number;

    @Column({ default: 0 })
    enrolledCount!: number;

    @Column({ type: 'simple-enum', enum: CourseStatus, default: CourseStatus.OPEN })
    status!: CourseStatus;

    @Column()
    instructorName!: string;

    @Column()
    isElective!: boolean;

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updateAt!: Date;

    @ManyToMany(() => Student, (student) => student.courses)
    students!: Student[];
}