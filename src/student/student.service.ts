import { Injectable } from '@nestjs/common';
import { StudentDTO } from '@/dto/student.dto';

@Injectable()
export class StudentService {

    private students: StudentDTO[] =[
            { id: '1', major: 'Computer Science', studentId: '12345678', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', registeredCourseIds: ['CSE101', 'CSE202'], address: { houseNumber: '123', street: 'Main St', province: 'Ontario', postalCode: 'M5V 3L9' }, status: 'active', isScholarship: true, createdAt: new Date(), maxCredit: 18 },
            { id: '2', major: 'Electrical Engineering', studentId: '87654321', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '098-765-4321', registeredCourseIds: ['ECE301', 'ECE402'], address: { houseNumber: '456', street: 'Oak Ave', province: 'Quebec', postalCode: 'H3Z 1Y2' }, status: 'inactive', isScholarship: false, createdAt: new Date(), maxCredit: 15 },
            { id: '3', major: 'Mechanical Engineering', studentId: '11223344', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phone: '555-123-4567', registeredCourseIds: ['MEC201', 'MEC302'], address: { houseNumber: '789', street:'Pine Rd' , province:'British Columbia' , postalCode:'V6T 1Z4'}, status:'active' , isScholarship:false, createdAt:new Date(), maxCredit : 22},
        ];

    findAll(): StudentDTO[] {
        return this.students;
    }
        findById(id: string) {
    
            return this.students.find(student => student.id === id);
        }


    }
