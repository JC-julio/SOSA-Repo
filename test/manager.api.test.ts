import axios from 'axios';
import { config } from 'dotenv';
import mongoose from 'mongoose';
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

  // console.log(AxiosOutput.data)
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
  // console.log(token)

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
  console.log(token)

  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'http://localhost:3000/AdminManagement',
    input
  );
console.log(AxiosOutput.data.Id);
  const AxiosGetOne = await axios.get(
    'http://localhost:3000/AdminManagement/'+ AxiosOutput.data.Id
  );
  console.log(AxiosGetOne.data)
  expect(AxiosGetOne.data.props.name).toBe(input.name);
  expect(AxiosGetOne.data.props.password).not.toBe(input.password);
  expect(AxiosGetOne.data.props.type).toBe(input.type)
}, 15000);
