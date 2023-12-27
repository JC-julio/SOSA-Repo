import axios from 'axios';
import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

test('Deve testar o post dos admins da API', async () => {
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
    input,
    {
      headers: {authorization: token}
    },
  );

  console.log(AxiosOutput.data)
  expect(AxiosOutput.data).toBeDefined();
}, 300000);

// test('Deve testar o GetAll dos admins da api', async () => {
//   const input = {
//     name: 'Input pra deletar',
//     password: '12345678',
//     type: 'Servidor da CAED',
//   };
//   const AxiosOutput = await axios.post(
//     'http://localhost:3000/AdminManagement',
//     input,
//   );
//   const AxiosDEL = await axios.delete(
//     'http://localhost:3000/AdminManagement/'+ AxiosOutput.data.id,
//     AxiosOutput.data.id,
//   );
// }, 15000);

// const AxiosDEL = await axios.delete(
//   'http://localhost:3000/AdminManagement/'+ AxiosOutput.data.id,
//   AxiosOutput.data.id,
// );
// }, 15000);