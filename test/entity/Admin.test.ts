import Manager from '../../src/entity/Manager';
import mongoose from 'mongoose';
import { TokenModel } from '../../src/entity/models/BlackListDB';
import { config } from 'dotenv';
config();

test('Que ele possa gerenciar os dados da classe de teste de adminitradores da classe Manager.ts', () => {
  const input = {
    name: 'Bruna',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const manager = new Manager(input);
  expect(manager.name).toBe(input.name);
  expect(manager.password).toBe(input.password);
  expect(manager.type).toBe(input.type);
}, 15000);

test('Deve testar o post e o GetOne da classe Manager.ts', async () => {
  const input = {
    name: 'Bruna',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const manager = new Manager(input);
  await mongoose.connect(process.env.connectionString);
  const managerId = (await manager.Post())._id;
  const getUser = await Manager.GetOne(managerId);
  expect(getUser.name).toBe(input.name);
  expect(getUser.password).not.toBe(input.password);
  expect(getUser.type).toBe(input.type);
}, 15000);

test('Deve testar o GetAll da classe Manager.ts', async () => {
  const input = {
    name: 'Ana',
    password: '12345678',
    type: 'Servidor da CAED',
  };

  const input2 = {
    name: 'Bruna',
    password: '12345678',
    type: 'Guarda',
  };
  await mongoose.connect(process.env.connectionString);
  const manager = new Manager(input);
  manager.Post();
  const manager1 = new Manager(input2);
  await manager1.Post();
  const managers = await Manager.GetAll();
  const ReturnManager = managers.find((Element) => Element.name == input.name); //buscar dentro da lista
  expect(ReturnManager.name).toBe(input.name);
  const ReturnManager1 = managers.find(
    (Element) => Element.type == input2.type,
  );
  expect(ReturnManager1.type).toBe(input2.type);
  await mongoose.connection.close();
}, 15000);

test('Deve testar o Login e o Logout da classe Manager.ts', async () => {
  const input = {
    name: 'Júlio',
    password: 'JulinhoFazAPI',
    type: 'Guarda',
  }
  await mongoose.connect(process.env.connectionString);
  const NewLogin = new Manager(input);
  NewLogin.Post();
  const token = await Manager.Login(input.name, input.password);
    expect(token).toBeTruthy(); // Verifica se o token existe
  const bannedToken = await Manager.logout(token);
    expect(bannedToken).toBeTruthy(); // Verifica se o token invalidado existe
  const foundToken = await TokenModel.findOne({ bannedToken: token });
    expect(foundToken).toBeTruthy(); // Verifica se o token invalidado foi adicionado à lista de bloqueio
  await mongoose.connection.close();
  //esse texte foi dificil :)
}, 15000);
