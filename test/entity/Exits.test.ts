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