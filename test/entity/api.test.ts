import axios from 'axios';
import { config } from 'dotenv';
config();

test('Deve testar a API', async () => {
  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'http://localhost:3000/AdminManagement',
    input,
  );
  expect(AxiosOutput.data.name).toBe(input.name);
  expect(AxiosOutput.data.password).not.toBe(input.password);
  expect(AxiosOutput.data.type).toBe(input.type);
}, 15000);

test('Deve testar o DeleteUser', async () => {
  const input = {
    name: 'Input pra deletar',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'http://localhost:3000/AdminManagement',
    input,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const AxiosDEL = await axios.delete(
    'http://localhost:3000/AdminManagement',
    AxiosOutput.data.id,
  );
}, 15000);
