import Exits from '../../src/entity/Exits';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

test('Testar a classe de novas saidas do SOSA', () => {
  const input = {
    idStudent: 'Julio',
    idWorker: 'Ana',
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date(),
    confirmExit: false,
  };
  const Exit = new Exits(input);
  expect(input.idStudent).toBe(Exit.idStudent);
  expect(input.idWorker).toBe(Exit.idWorker);
  expect(input.time).toBe(Exit.time);
  expect(input.observes).toBe(Exit.observes);
  expect(input.dateExit).toBe(Exit.dateExit)
}, 15000);

test('Deve testar o post e o GetOne da classe Exits', async () => {
  const input = {
    idStudent: 'Julio',
    idWorker: 'Ana',
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date(),
    confirmExit: false,
  };
  const Exit = new Exits(input);
  await mongoose.connect(process.env.connectionString);
  const ExitId = (await Exit.Post())._id;
  const GetExit = await Exits.GetOne(ExitId);
  expect(GetExit.idStudent).toBe(input.idStudent);
  expect(GetExit.idWorker).toBe(input.idWorker);
  expect(GetExit.time).toBe(input.time);
  expect(GetExit.observes).toBe(input.observes);
  expect(GetExit.dateExit).toStrictEqual(input.dateExit);
  await mongoose.connection.close();
}, 15000);

test('Deve testar o GetAll da classe Exits', async() => {
  await mongoose.connect(process.env.connectionString);
  const input = {
    idStudent: 'Julinho',
    idWorker: 'Ana Paula',
    time: 30,
    observes: 'tudo certo',
    dateExit: new Date(),
    confirmExit: false,
  };

  const input1 = {
    idStudent: 'Julio',
    idWorker: 'Bruna',
    time: 45,
    observes: 'tudo certo por aqui',
    dateExit: new Date(),
    confirmExit: false,
  };
  const exitJulio = new Exits(input);
  const id = (await exitJulio.Post())._id;
  const idString = id.toString();
  console.log(id)
  const exitJulinho = new Exits(input1);
  const id1 = (await exitJulinho.Post())._id;
  const id1String = id1.toString();
  const exits = await Exits.GetAll();
  const returnExits = exits.find((Element) => Element.id == id); //percorrer a lista retornada pelo GetALL
  console.log(returnExits)
  console.log(returnExits?.id)
  expect(returnExits?.id).toBe(idString);
  const returnExits1 = exits.find((Element) => Element.id == id1);
  expect(returnExits1?.id).toEqual(id1String);
  console.log(returnExits1)
  await mongoose.connection.close();
}, 15000)

test('Deve testar o DeleteALL',async () => {
  await mongoose.connect(process.env.connectionString);
  await Exits.DeleteAll();
  await mongoose.connection.close();
}, 15000)

test('Deve testar o método que pega todas as saídas especificadas pelos dois parâmetros da função estática "GetExits" da classe Exits.ts',async () => {
  await mongoose.connect(process.env.connectionString);

  // Exemplo 1
  const input1 = {
    idStudent: 'Júlio',
    idWorker: 'Bruna',
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date('04-02-2007'),
    confirmExit: false,
  }
  const Exit1 = new Exits(input1);
  Exit1.Post();

  // Exemplo 2
  const input2 = {
    idStudent: 'Lucas',
    idWorker: 'Ana',
    time: 20,
    observes: 'Aluno Passando mal',
    dateExit: new Date('12-12-2013'),
    confirmExit: false,
  }
  const Exit2 = new Exits(input2);
  Exit2.Post();

  //Exemplo 3
  const input3 = {
    idStudent: 'João',
    idWorker: 'Ana',
    time: 20,
    observes: 'Tudo dboas',
    dateExit: new Date('12-12-2012'),
    confirmExit: false,
  }
  const Exit3 = new Exits(input3);
  Exit3.Post();

  // Exemplo 4
  const input4 = {
    idStudent: 'José',
    idWorker: 'Ana',
    time: 20,
    observes: 'Aluno de Luto',
    dateExit: new Date('12-12-2014'),
    confirmExit: false,
  }
  const Exit4 = new Exits(input4);
  Exit4.Post();

  //Exemplo 5
  const input5 = {
    idStudent: 'Pedro',
    idWorker: 'Maria',
    time: 10,
    observes: 'regular',
    confirmExit: false,
    dateExit: new Date('01-01-2022'),
  }
  const Exit5 = new Exits(input5);
  Exit5.Post();

  const input6 = {
    idStudent: 'Marcos',
    idWorker: 'Maria Clara',
    time: 10,
    observes: 'regular',
    dateExit: new Date('01-01-2001'),
    confirmExit: false,
  }
  const Exit6 = new Exits(input6);
  Exit6.Post();

  const Saidas = await Exits.GetExits(input6.dateExit, input5.dateExit)
}, 15000)

test('Deve testar o Update da classe Exits.ts', async () => {
  const input = {
    idStudent: 'Júlio',
    idWorker: 'Ruan',
    time: 45,
    observes: 'Aluno passando mal',
    dateExit: new Date('11-25-2023'),
    confirmExit: true,
  }
  const returnExit = new Exits(input);
  const ExitId = (await returnExit.Post())._id;
  const Exit = await Exits.GetOne(ExitId);
  if(Exit.confirmExit == false)
    Exit.confirmExit = true
  else 
    Exit.confirmExit = false
  await Exit.Update();
  expect(input.confirmExit).not.toBe(Exit.confirmExit);
  await mongoose.connection.close();
}, 15000)