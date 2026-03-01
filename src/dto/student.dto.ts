interface Address {
    houseNumber: string;
    street: string;
    province: string;
    postalCode: string;
}

export interface StudentDTO {
    id: string;
    major: string;
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    registeredCourseIds: string[];
    address?:Address;
    status: 'active' | 'inactive';
    isScholarship: boolean;
    createdAt: Date;
    maxCredit: number;

}