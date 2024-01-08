import Exits from '../../src/entity/Exits';
import Organization from '../../src/entity/Organization';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

test('Testar a classe de novas saidas do SOSA', async () => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    idStudent: 'Julio',
    idWorker: 'Ana',
    organizationId: idOrganization,
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date(),
    confirmExit: false,
  };
  const Exit = new Exits(input);
  expect(input.idStudent).toBe(Exit.idStudent);
  expect(input.idWorker).toBe(Exit.idWorker);
  expect(input.organizationId).toBe(Exit.organizationId);
  expect(input.time).toBe(Exit.time);
  expect(input.observes).toBe(Exit.observes);
  expect(input.dateExit).toBe(Exit.dateExit)
}, 15000);

test('Deve testar o post e o GetOne da classe Exits', async () => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    idStudent: 'Julio',
    idWorker: 'Ana',
    organizationId: idOrganization,
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date(),
    confirmExit: false,
  };
  const Exit = new Exits(input);
  const ExitId = (await Exit.Post());
  const GetExit = await Exits.GetOne(ExitId);
  expect(GetExit.idStudent).toBe(input.idStudent);
  expect(GetExit.idWorker).toBe(input.idWorker);
  expect(GetExit.organizationId).toBe(input.organizationId)
  expect(GetExit.time).toBe(input.time);
  expect(GetExit.observes).toBe(input.observes);
  expect(GetExit.dateExit).toStrictEqual(input.dateExit);
  await mongoose.connection.close();
}, 15000);

test('Deve testar o GetAll da classe Exits', async() => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    idStudent: 'Julinho',
    idWorker: 'Ana Paula',
    organizationId: idOrganization,
    time: 30,
    observes: 'tudo certo',
    dateExit: new Date(),
    confirmExit: false,
  };
  const exitJulio = new Exits(input);
  (await exitJulio.Post());

  const input1 = {
    idStudent: 'Julio',
    idWorker: 'Bruna',
    organizationId: idOrganization,
    time: 45,
    observes: 'tudo certo por aqui',
    dateExit: new Date(),
    confirmExit: false,
  };
  const exitJulinho = new Exits(input1);
  (await exitJulinho.Post());
  const exits = await Exits.GetAll(idOrganization);
  const returnExits = exits.find((Element) => Element.time == input.time); //percorrer a lista retornada pelo GetALL
  expect(returnExits!.time).toBe(input.time);
  const returnExits1 = exits.find((Element) => Element.observes == input1.observes);
  expect(returnExits1!.observes).toEqual(input1.observes);
  // console.log(returnExits1)
  await mongoose.connection.close();
}, 15000)

test('Deve testar o DeleteALL',async () => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    idStudent: 'Julinho',
    idWorker: 'Ana Paula',
    organizationId: idOrganization,
    time: 30,
    observes: 'tudo certo',
    dateExit: new Date(),
    confirmExit: false,
  };
  const exitJulio = new Exits(input);
  const returnPostJulio = (await exitJulio.Post());

  const input1 = {
    idStudent: 'Julio',
    idWorker: 'Bruna',
    organizationId: idOrganization,
    time: 45,
    observes: 'tudo certo por aqui',
    dateExit: new Date(),
    confirmExit: false,
  };
  const exitJulinho = new Exits(input1);
  (await exitJulinho.Post());
  await Exits.DeleteAll(idOrganization);
  const GetExits = Exits.GetAll(idOrganization)
  // console.log(idOrganization)
  expect((await GetExits).length).toBe(0)
  await mongoose.connection.close();
}, 15000)

test('Deve testar o método que pega todas as saídas especificadas pelos dois parâmetros da função estática "GetExits" da classe Exits.ts',async () => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const firtInput = {
    idStudent: 'Marcos',
    idWorker: 'Maria Clara',
    organizationId: idOrganization,
    time: 10,
    observes: 'regular',
    dateExit: new Date('01-01-2001'),
    confirmExit: false,
  }
  const Exit6 = new Exits(firtInput);
  const exit = await Exit6.Post();
  console.log(exit)
  // Exemplo 1

  const input1 = {
    idStudent: 'Júlio',
    idWorker: 'Bruna',
    organizationId: idOrganization,
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date('04-02-2007'),
    confirmExit: false,
  }
  const Exit1 = new Exits(input1);
  await Exit1.Post();
  // Exemplo 2

  const lastInput = {
    idStudent: 'Pedro',
    idWorker: 'Maria',
    organizationId: idOrganization,
    time: 10,
    observes: 'regular',
    confirmExit: false,
    dateExit: new Date('01-01-2022'),
  }
  const Exit5 = new Exits(lastInput);
  await Exit5.Post();

  const saidas = await Exits.GetExits(firtInput.dateExit, lastInput.dateExit, idOrganization)
  console.log(saidas)
}, 15000)

test('Deve testar o Update da classe Exits.ts', async () => {
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    idStudent: 'Júlio',
    idWorker: 'Ruan',
    organizationId: idOrganization,
    time: 45,
    observes: 'Aluno passando mal',
    dateExit: new Date('11-25-2023'),
    confirmExit: true,
  }
  const returnExit = new Exits(input);
  const ExitId = (await returnExit.Post());
  const Exit = await Exits.GetOne(ExitId);
  if(Exit.confirmExit == false)
    Exit.confirmExit = true
  else 
    Exit.confirmExit = false
  await Exit.Update();
  expect(input.confirmExit).not.toBe(Exit.confirmExit);
  await mongoose.connection.close();
}, 15000)