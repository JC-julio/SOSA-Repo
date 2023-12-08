import mongoose from 'mongoose';
import { config } from 'dotenv';
import Student from '../../src/entity/Students';
config();

test('deve testar a classe exits', () => {
const input = {
        name: 'Julião',
        classStudent: '2022 A TI',
        type: 'Não autorizado',
}
const student = new Student(input);
expect(input.name).toBe(student.name);
expect(input.classStudent).toBe(student.classStudent);
expect(input.type).toBe(student.type);
}, 1500);

test('Deve testar o post e o GetOne da classe Students', async () => {
    const input = {
        name: 'Julião',
        classStudent: '2022 A TI',
        type: 'Não autorizado',
};
    const ForStudent = new Student(input);
    await mongoose.connect(process.env.connectionString);
    const StudentID = (await ForStudent.Post())._id;
    const GetStudent = await Student.GetOne(StudentID);
    expect(GetStudent.name).toBe(input.name);
    expect(GetStudent.classStudent).toBe(input.classStudent);
    expect(GetStudent.type).toBe(input.type);
    await mongoose.connection.close();
}, 15000)

test('Deve testar a função que pega todas as turmas, e seta as informações que o front-end filtra', async() => {
    await mongoose.connect(process.env.connectionString);
    const input = {
        name: 'JuliO César Aguiar',
        classStudent: '2022 B TI',
        type: 'Não autorizado',
    };

    const input1 = {
        name: 'Thiciane Frata Borges',
        classStudent: '2022 B TI',
        type: 'Autorizado',
    };
    const studentinput = new Student(input);
    const studentResult = (await studentinput.Post()).classStudent;
    const studentinput1 = new Student(input1);
    const studentResult1 = (await studentinput1.Post()).classStudent;
    const Students = await Student.GetByClass(studentResult);
    const ReturnStudents = Students.find((Element) => Element.name == input.name);
    expect(ReturnStudents.name).toBe(input.name);
    const ReturnStudents1 = Students.find((Element) => Element.classStudent == input1.classStudent);
    expect(ReturnStudents1.classStudent).toBe(input1.classStudent);
    await mongoose.connection.close();
})