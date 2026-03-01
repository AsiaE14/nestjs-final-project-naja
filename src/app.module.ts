import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'student_management.sqlite',
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,


  }), StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
