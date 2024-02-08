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
      className: '2022 A TI',
      type: true,
      organizationId: idOrganization,
      registration: '2022108060016'
    }
    const student = new Student(input);
    expect(input.name).toBe(student.name);
    expect(input.className).toBe(student.className);
    expect(input.type).toBe(student.type);
    expect(input.organizationId).toBe(student.organizationId);
}, 15000);

test('Deve testar o post e o GetOne da classe Students', async () => {
    const randomRegister = Math.random().toString(36).slice(-15);
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
        name: 'Julião',
        className: '2022 A TI',
        type: true,
        organizationId: idOrganization,
        registration: randomRegister
};
    const ForStudent = new Student(input);
    const StudentID = (await ForStudent.Post(idOrganization));
    const GetStudent = await Student.GetOne(StudentID);
    expect(GetStudent.name).toBe(input.name);
    expect(GetStudent.className).toBe(input.className);
    expect(GetStudent.type).toBe(input.type);
    expect(GetStudent.organizationId).toBe(input.organizationId);
    await mongoose.connection.close();
}, 15000)

test('Deve testar a função que pega todas as turmas que tiverem o mesmo nome do parametro da função', async() => {
  const randomRegister = Math.random().toString(36).slice(-15);
  const randomRegister1 = Math.random().toString(36).slice(-15);
    await mongoose.connect(process.env.connectionString as string);
    const inputOrganization = {
        name: 'CAED ji-paraná'
    }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
      name: 'Julio César Aguiar',
      className: '2022 B TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister,
    };
    const input1 = {
      name: 'Thiciane Frata Borges',
      className: '2022 B TI',
      type:true,
      organizationId: idOrganization,
      registration: randomRegister1,
    };
    const studentInput = new Student(input);
    const studentResult = (await studentInput.Post(idOrganization));
    const studentInput1 = new Student(input1);
    await studentInput1.Post(idOrganization);
    const Students = await Student.GetByClassName(studentInput.className, idOrganization);
    console.log(Students)
    const ReturnStudents = Students.find((Element) => Element.className == input.className);
    expect(ReturnStudents!.name).toBe(input.name);
    const ReturnStudents1 = Students.find((Element) => Element.className == input1.className);
    expect(ReturnStudents1!.className).toBe(input1.className);
    await mongoose.connection.close();
}, 15000)

test('Deve testar a função que seleciona um aluno pela matricula do mesmo', async() => {
  await mongoose.connect(process.env.connectionString as string);
  const randomRegister = Math.random().toString(36).slice(-15);
  const inputOrganization = {
      name: 'CAED ji-paraná'
    }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
      name: 'Julião',
      className: '2022 A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister
};
  const ForStudent = new Student(input);
  const studentRegister = ((await ForStudent.Post(idOrganization)).registration);
  const getStudentByRegister = await Student.GetByRegistration(studentRegister, input.organizationId)
  expect(getStudentByRegister.name).toBe(input.name);
  expect(getStudentByRegister.className).toBe(input.className);
  expect(getStudentByRegister.type).toBe(input.type);
  expect(getStudentByRegister.organizationId).toBe(input.organizationId);
  expect(getStudentByRegister.registration).toBe(input.registration);
}, 15000)

test.only("deve testar a função que apaga todos os alunos com base no nome da turma", async() => {
  await mongoose.connect(process.env.connectionString as string);
    const randomRegister = Math.random().toString(36).slice(-15);
    const randomRegister1 = Math.random().toString(36).slice(-17);
    const inputOrganization = {
        name: 'CAED ji-paraná'
      }
    const organization = new Organization(inputOrganization);
    const idOrganization = (await organization.Post()).id;
    const input = {
        name: 'Julio César',
        className: '2022 A TI',
        type: true,
        organizationId: idOrganization,
        registration: randomRegister
  };
  const ForStudent = new Student(input);
  await ForStudent.Post(idOrganization);
  const input1 = {
      name: 'Julião',
      className: '2022 A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister1
  };
  const ForStudent1 = new Student(input1);
  await ForStudent1.Post(idOrganization);
  await Student.DeteleByClassName(input.className, idOrganization)
  const getStudent = await Student.GetAll(idOrganization)
  const returnStudent = getStudent.find((element) => element.organizationId == input.organizationId)
  const returnStudent1 = getStudent.find((element) => element.className == input1.className)
  expect(returnStudent).toBeUndefined()
  expect(returnStudent1).toBeUndefined()
}, 15000)