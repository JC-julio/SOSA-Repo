import Exits from '../../src/entity/Exits';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

test('Testar a classe de novas saidas do SOSA', () => {
  const input = {
    nameStudent: 'Julio',
    nameWorker: 'Ana',
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date(),
  };
  const Exit = new Exits(input);
  expect(input.nameStudent).toBe(Exit.nameStudent);
  expect(input.nameWorker).toBe(Exit.nameWorker);
  expect(input.time).toBe(Exit.time);
  expect(input.observes).toBe(Exit.observes);
  expect(input.dateExit).toBe(Exit.dateExit)
}, 15000);

test('Deve testar o post e o GetOne da classe Exits', async () => {
  const input = {
    nameStudent: 'Julio',
    nameWorker: 'Ana',
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date(),
  };
  const Exit = new Exits(input);
  await mongoose.connect(process.env.connectionString);
  const ExitId = (await Exit.Post())._id;
  const GetExit = await Exits.GetOne(ExitId);
  expect(GetExit.nameStudent).toBe(input.nameStudent);
  expect(GetExit.nameWorker).toBe(input.nameWorker);
  expect(GetExit.time).toBe(input.time);
  expect(GetExit.observes).toBe(input.observes);
  expect(GetExit.dateExit).toStrictEqual(input.dateExit);
  await mongoose.connection.close();
}, 15000);

test('Deve testar o GetAll da classe Exits', async() => {
  await mongoose.connect(process.env.connectionString);
  const input = {
    nameStudent: 'Julinho',
    nameWorker: 'Ana Paula',
    time: 30,
    observes: 'tudo certo',
    dateExit: new Date(),
  };

  const input1 = {
    nameStudent: 'Julio',
    nameWorker: 'Bruna',
    time: 45,
    observes: 'tudo certo por aqui',
    dateExit: new Date(),
  };
  const exitJulio = new Exits(input);
  await exitJulio.Post();
  const exitJulinho = new Exits(input1);
  await exitJulinho.Post();
  const exits = await Exits.GetAll();
  const returnExits = exits.find((Element) => Element.time == input.time); //percorrer a lista retornada pelo GetALL em busca de um tempo igual
  expect(returnExits.time).toBe(input.time);
  const returnExits1 = exits.find((Element) => Element.NameStudent == input1.nameStudent);
  expect(returnExits1.NameStudent).toBe(input1.nameStudent);
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
    nameStudent: 'Júlio',
    nameWorker: 'Bruna',
    time: 15,
    observes: 'tudo certo',
    dateExit: new Date('04-02-2007'),
  }
  const Exit1 = new Exits(input1);
  Exit1.Post();

  // Exemplo 2
  const input2 = {
    nameStudent: 'Lucas',
    nameWorker: 'Ana',
    time: 20,
    observes: 'Aluno Passando mal',
    dateExit: new Date('12-12-2013'),
  }
  const Exit2 = new Exits(input2);
  Exit2.Post();

  // Exemplo 3
  const input3 = {
    nameStudent: 'João',
    nameWorker: 'Ana',
    time: 20,
    observes: 'Tudo dboas',
    dateExit: new Date('12-12-2012'),
  }
  const Exit3 = new Exits(input3);
  Exit3.Post();

  // Exemplo 4
  const input4 = {
    nameStudent: 'José',
    nameWorker: 'Ana',
    time: 20,
    observes: 'Aluno de Luto',
    dateExit: new Date('12-12-2014'),
  }
  const Exit4 = new Exits(input4);
  Exit4.Post();

  // Exemplo 5
  const input5 = {
    nameStudent: 'Pedro',
    nameWorker: 'Maria',
    time: 10,
    observes: 'regular',
    dateExit: new Date('01-01-2022'),
  }
  const Exit5 = new Exits(input5);
  Exit5.Post();

  const input6 = {
    nameStudent: 'Marcos',
    nameWorker: 'Maria Clara',
    time: 10,
    observes: 'regular',
    dateExit: new Date('01-01-2001'),
  }
  const Exit6 = new Exits(input6);
  Exit6.Post();

  const Saidas = await Exits.GetExits(input6.dateExit, input5.dateExit)
  console.log(Saidas)
}, 15000)