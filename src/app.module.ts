import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'student_management.sqlite',
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,


  }), StudentModule,CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
