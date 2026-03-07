import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';



@Module({
  imports: [StudentModule, CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}