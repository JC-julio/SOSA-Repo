import Exits from '../../src/entity/Exits';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

test('Testar a classe de novas saidas do SOSA', () => {
  const input = {
    NameStudent: 'Julio',
    NameWorker: 'Ana',
    time: 15,
    observes: 'tudo certo',
  };
  const Exit = new Exits(input);
  expect(input.NameStudent).toBe(Exit.NameStudent);
  expect(input.NameWorker).toBe(Exit.NameWorker);
  expect(input.time).toBe(Exit.time);
  expect(input.observes).toBe(Exit.observes);
}, 15000);

test('Deve testar o post e o GetOne da classe Exits', async () => {
  const input = {
    NameStudent: 'Julio',
    NameWorker: 'Ana',
    time: 15,
    observes: 'tudo certo',
  };
  const Exit = new Exits(input);
  await mongoose.connect(process.env.connectionString);
  const ExitId = (await Exit.Post())._id;
  const GetExit = await Exits.GetOne(ExitId);
  expect(GetExit.NameStudent).toBe(input.NameStudent);
  expect(GetExit.NameWorker).toBe(input.NameWorker);
  expect(GetExit.time).toBe(input.time);
  expect(GetExit.observes).toBe(input.observes);
  mongoose.connection.close();
}, 15000);
