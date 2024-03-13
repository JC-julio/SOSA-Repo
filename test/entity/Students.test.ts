import mongoose from 'mongoose';
import { config } from 'dotenv';
import Student from '../../src/entity/Students';
import Organization from '../../src/entity/Organization';
config();
const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};
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
      registration: '2022108060016',
      additionalInfo: 'nada',
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
        registration: randomRegister,
        additionalInfo: 'nada',
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
      additionalInfo: 'nada',
    };
    const input1 = {
      name: 'Thiciane Frata Borges',
      className: '2022 B TI',
      type:true,
      organizationId: idOrganization,
      registration: randomRegister1,
      additionalInfo: 'nada',
    };
    const studentInput = new Student(input);
    const studentResult = (await studentInput.Post(idOrganization));
    const studentInput1 = new Student(input1);
    await studentInput1.Post(idOrganization);
    const Students = await Student.GetByClassName(studentInput.className, idOrganization);
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
      registration: randomRegister,
      additionalInfo: 'nada',
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

test("deve testar a função que apaga todos os alunos com base no nome da turma", async() => {
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
        registration: randomRegister,
        additionalInfo: 'nada',
  };
  const ForStudent = new Student(input);
  await ForStudent.Post(idOrganization);
  const input1 = {
      name: 'Julião',
      className: '2022 A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister1,
      additionalInfo: 'nada',
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

test("deve testar a função updateClass da entidade de estudantes", async() => {
  const randomRegister = Math.random().toString(36).slice(-15);
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
      name: 'CAED ji-paraná'
    }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
      name: 'Julião',
      className: '2° A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister,
      additionalInfo: 'nada',
};
  const ForStudent = new Student(input);
  const student = (await ForStudent.Post(idOrganization));
  const inpuntForUpdate = {
    name: 'Julião',
    className: '2° A TI',
    type: true,
    organizationId: idOrganization,
    registration: randomRegister,
    id: student.id,
    additionalInfo: 'nada',
  }
  await Student.updateClass(inpuntForUpdate)
  delay(1000)
  const getStudent = await Student.GetOne(student.id)
  expect(getStudent.className).toBe('3° A TI')
}, 15000)

test("deve testar a função updateClass da entidade de estudantes quando o aluno é do 1° ano", async() => {
  const randomRegister = Math.random().toString(36).slice(-15);
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
      name: 'CAED ji-paraná'
    }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
      name: 'Julião',
      className: '1° A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister,
      additionalInfo: 'nada',
};
  const ForStudent = new Student(input);
  const student = (await ForStudent.Post(idOrganization));
  const inpuntForUpdate = {
    name: 'Julião',
    className: '1° A TI',
    type: true,
    organizationId: idOrganization,
    registration: randomRegister,
    id: student.id
  }
  await Student.updateClass(inpuntForUpdate)
  delay(1000)
  const getStudent = await Student.GetOne(student.id)
  expect(getStudent.className).toEqual('2° A TI')
}, 15000)

test("Deve testar a função doUpdate entidade de estudantes", async() => {
  const randomRegister = Math.random().toString(36).slice(-15);
  const randomRegister2 = Math.random().toString(36).slice(-15);
  const randomRegister3 = Math.random().toString(36).slice(-15);
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
      name: 'CAED ji-paraná'
    }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
      name: 'Julião',
      className: '1°A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister,
      additionalInfo: 'nada',
};
  const ForStudent1 = new Student(input);
  const studentId = (await ForStudent1.Post(idOrganization)).id;
  const input2 = {
      name: 'Julião',
      className: '2°A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister2,
      additionalInfo: 'nada',
};
  const ForStudent2 = new Student(input2);
  const studentId2 = (await ForStudent2.Post(idOrganization)).id;
  const input3 = {
      name: 'Eu não devo ser apagado',
      className: '3°A TI',
      type: true,
      organizationId: idOrganization,
      registration: randomRegister3,
      additionalInfo: 'nada',
};
  const ForStudent3 = new Student(input3);
  const studentId3 = (await ForStudent3.Post(idOrganization)).id;
  const listIds = [studentId3]
  await Student.doUpdate(idOrganization, listIds)
  const getStudent1 = await Student.GetOne(studentId)
  expect(getStudent1.className).toBe('2°A TI')
  const getStudent2 = await Student.GetOne(studentId2)
  expect(getStudent2.className).toBe('3°A TI')
  const getOne3 = await Student.GetOne(studentId3)
  await expect(getOne3).toBeDefined()
}, 15000)