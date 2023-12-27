import axios from 'axios';
import { config } from 'dotenv';
import { ManagerModel } from '../src/entity/models/ManagerDB';
import jwt from "jsonwebtoken"
config();

test('Deve testar o post dos admins da API', async () => {
  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'http://localhost:3000/AdminManagement',
    input
  );

  expect(AxiosOutput.data).toBeDefined();
}, 300000);

test('Deve testar o GetAll dos admins da API', async () => {
  const login = {
    user: "Júlio",
    password: "JulinhoFazAPI",
  }

  const AxiosLogin = await axios.post(
    'http://localhost:3000/Login',
     login,
  )
  const token = AxiosLogin.data.Token;

  const AxiosOutput = await axios.get(
    'http://localhost:3000/AdminManagement',
    {
      headers: {authorization: token}
    },
  );

  expect(AxiosOutput).toBeTruthy();
}, 15000);


test('Deve testar o GetOne da classe de admin da API', async() => {
  const login = {
    user: "Júlio",
    password: "JulinhoFazAPI",
  }
  const AxiosLogin = await axios.post(
    'http://localhost:3000/Login',
     login,
  )
  const token = AxiosLogin.data.Token;

  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'http://localhost:3000/AdminManagement',
    input
  );
  const AxiosGetOne = await axios.get(
    'http://localhost:3000/AdminManagement/'+ AxiosOutput.data.Id,
    {
      headers: {authorization: token}
    },
  );
  // console.log(AxiosGetOne.data)
  expect(AxiosGetOne.data.props.name).toBe(input.name);
  expect(AxiosGetOne.data.props.password).not.toBe(input.password);
  expect(AxiosGetOne.data.props.type).toBe(input.type)
}, 15000);

test('Deve testar o Delete da classe de admin da API', async() => {
  const login = {
    user: "Júlio",
    password: "JulinhoFazAPI",
  }
  const AxiosLogin = await axios.post(
    'http://localhost:3000/Login',
    login,
  )
  const token = AxiosLogin.data.Token;
  //Login^
  
  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'http://localhost:3000/AdminManagement',
    input
  );
  //post^

  const AxiosDelete = await axios.delete(
    'http://localhost:3000/AdminManagement/' + AxiosOutput.data.Id,
    {
      headers: {authorization: token}
    },
  );
  //delete^
  
  expect(AxiosDelete.data.Id).toBeUndefined();
}, 15000);

test('Deve testar o Update da classe de admin da API', async() => {
  const login = {
    user: "Bruna",
    password: "12345678",
  }
  const AxiosLogin = await axios.post(
    'http://localhost:3000/Login',
    login,
  )
  const token = AxiosLogin.data.Token;
  //Login^
  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'http://localhost:3000/AdminManagement',
    input
  );
  //post^
  const AxiosPut = await axios.put(
    'http://localhost:3000/AdminManagementUpdate/' + AxiosOutput.data.Id,
    {
      type: 'Undefined"'
    },
    {
      headers: {authorization: token}
    });
  //Update^

  const AxiosGetOne = await axios.get(
    'http://localhost:3000/AdminManagement/'+ AxiosOutput.data.Id,
    {
      headers: {authorization: token}
    },
  );
  //GetOne para verificar se a mudança realmente ocorreu
  expect(AxiosGetOne.data.props.type).toBe('Guarda')
}, 15000)

test("Deve testar o Login da classe de admin da API", async() => {
  const user = {
    user: 'Bruna',
    password: '12345678',
  }
  const AxiosLogin = await axios.post(
    'http://localhost:3000/Login',
     user,
  )
  expect(AxiosLogin.data.Token).toBeDefined();
}, 15000)