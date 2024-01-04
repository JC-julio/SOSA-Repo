import mongoose from 'mongoose';
import { config } from 'dotenv';
import Student from '../../src/entity/Students';
import Organization from '../../src/entity/Organization';
config();

test('deve testar a classe exits', async () => {
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
      name: 'Julião',
      classStudent: '2022 A TI',
      type: 'Não autorizado',
      organizationId: idOrganization,
    }
    const student = new Student(input);
    expect(input.name).toBe(student.name);
    expect(input.classStudent).toBe(student.classStudent);
    expect(input.type).toBe(student.type);
    expect(input.organizationId).toBe(student.organizationId);
}, 15000);

test('Deve testar o post e o GetOne da classe Students', async () => {
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
        name: 'Julião',
        classStudent: '2022 A TI',
        type: 'Não autorizado',
        organizationId: idOrganization,
};
    const ForStudent = new Student(input);
    const StudentID = (await ForStudent.Post())._id;
    const GetStudent = await Student.GetOne(StudentID);
    expect(GetStudent.name).toBe(input.name);
    expect(GetStudent.classStudent).toBe(input.classStudent);
    expect(GetStudent.type).toBe(input.type);
    expect(GetStudent.organizationId).toBe(input.organizationId);
    await mongoose.connection.close();
}, 15000)

test('Deve testar a função que pega todas as turmas que tiverem o mesmo nome do parametro da função', async() => {
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
      const organization = new Organization(inputOrganization);
      const idOrganization = (await organization.Post()).id;
    const input = {
        name: 'Julio César Aguiar',
        classStudent: '2022 B TI',
        type: 'Não autorizado',
        organizationId: idOrganization,
    };

    const input1 = {
        name: 'Thiciane Frata Borges',
        classStudent: '2022 B TI',
        type: 'Autorizado',
        organizationId: idOrganization,
    };
    const studentinput = new Student(input);
    const studentResult = (await studentinput.Post()).classStudent;
    const studentinput1 = new Student(input1);
    await studentinput1.Post();
    const Students = await Student.GetByClassName(studentResult);
    console.log(Students)
    const ReturnStudents = Students.find((Element) => Element.classStudent == input.classStudent);
    expect(ReturnStudents.name).toBe(input.name);
    const ReturnStudents1 = Students.find((Element) => Element.classStudent == input1.classStudent);
    expect(ReturnStudents1.classStudent).toBe(input1.classStudent);
    await mongoose.connection.close();
}, 15000)