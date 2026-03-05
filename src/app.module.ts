import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentsService } from '../src/modules/students/students.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [StudentsService],
})
export class AppModule {}
