import Manager from '../../src/entity/Manager';
import Organization from '../../src/entity/Organization';
import mongoose from 'mongoose';
import { TokenModel } from '../../src/entity/models/BlackListDB';
import { config } from 'dotenv';
config();

test('Que ele possa gerenciar os dados da classe de teste de adminitradores da classe Manager.ts', async () => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    name: 'Bruna',
    password: '12345678',
    type: 'Servidor da CAED',
    organizationId: idOrganization,
  };
  const manager = new Manager(input);
  expect(manager.name).toBe(input.name);
  expect(manager.password).toBe(input.password);
  expect(manager.type).toBe(input.type);
  expect(manager.organizationId).toBe(input.organizationId)
}, 15000);

test('Deve testar o post e o GetOne da classe Manager.ts', async () => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    name: 'Julio',
    password: '12345678',
    type: 'Guarda',
    organizationId: idOrganization,  
  }
  const manager = new Manager(input)
  const managerPost = (await manager.Post())
  const getUser = await Manager.GetOne(managerPost);
  expect(getUser.name).toBe(input.name);
  expect(getUser.password).not.toBe(input.password);
  expect(getUser.type).toBe(input.type);
  expect(getUser.organizationId).toBe(input.organizationId)
}, 15000);

test('Deve testar o GetAll da entidade manager', async () => {
  await mongoose.connect(process.env.connectionString as string);

  const initialOrganizationInput = {
    name: 'CAED ji-paraná',
  };
  const createdOrganization = new Organization(initialOrganizationInput);
  const createdOrganizationId = (await createdOrganization.Post()).id;

  const initialManagerInput = {
    name: 'Julio',
    password: '12345678',
    type: 'Guarda',
    organizationId: createdOrganizationId,
  };
  const createdManager = new Manager(initialManagerInput);
  await createdManager.Post()

  const secondManagerInput = {
    name: 'Guilherme',
    password: '12345678',
    type: 'Guarda',
    organizationId: createdOrganizationId,
  };
  const secondManager = new Manager(secondManagerInput);
  await secondManager.Post()

  const retrievedManagers = await Manager.GetAll(createdOrganizationId);
  console.log(retrievedManagers)
  const retrievedManagerByName = retrievedManagers.find(
    (manager) => manager.name == initialManagerInput.name
  );
  expect(retrievedManagerByName!.name).toBe(initialManagerInput.name);

  const retrievedManagerByType = retrievedManagers.find(
    (manager) => manager.type == secondManagerInput.type
  );
  expect(retrievedManagerByType!.type).toBe(secondManagerInput.type);

  await mongoose.connection.close();
}, 15000);


test('Deve testar o Login e o Logout da classe Manager.ts', async () => {
  await mongoose.connect(process.env.connectionString as string);
  const inputOrganization = {
    name: 'CAED ji-paraná'
  }
  const organization = new Organization(inputOrganization);
  const idOrganization = (await organization.Post()).id;
  const input = {
    name: 'Julio',
    password: '12345678',
    type: 'Guarda',
    organizationId: idOrganization,  
  }
    const manager = new Manager(input)
    await manager.Post()
  
  const NewLogin = new Manager(input);
  NewLogin.Post();
  const token = await Manager.Login(input.name, input.password);
    expect(token).toBeTruthy(); // Verifica se o token existe
  const bannedToken = await Manager.logout(token);
    expect(bannedToken).toBeTruthy(); // Verifica se o token invalidado existe
  const foundToken = await TokenModel.findOne({ bannedToken: token });
  //  console.log(foundToken!.bannedToken)
    expect(foundToken!.bannedToken).toBe(token); // Verifica se o token invalidado foi adicionado à lista de bloqueio
  await mongoose.connection.close();
}, 15000);
