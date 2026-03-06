import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';


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
}