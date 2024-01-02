import axios from 'axios';
import { config } from 'dotenv';
import { TokenModel } from '../../src/entity/models/BlackListDB';
config();
axios.defaults.validateStatus = function () {
  return true;
};

test('Deve testar o post dos admins da API', async () => {
  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    input
  );

  expect(AxiosOutput.data).toBeDefined();
}, 30000);

test('Deve testar o GetAll dos admins da API', async () => {
  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosPost = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    input
  );

  const login = {
    user: input.name,
    password: input.password,
  }

  const AxiosLogin = await axios.post(
    'https://sosa-repo.vercel.app/Login',
     login,
  )
  const token = AxiosLogin.data.Token;
  //login^

  const AxiosOutput = await axios.get(
    'https://sosa-repo.vercel.app/AdminManagement',
    {
      headers: {authorization: token}
    },
  );

  expect(AxiosOutput).toBeTruthy();
}, 15000);


test('Deve testar o GetOne da classe de admin da API', async() => {
  const inputLogin = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosPost = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    inputLogin
  );

  const login = {
    user: inputLogin.name,
    password: inputLogin.password,
  }
  const AxiosLogin = await axios.post(
    'https://sosa-repo.vercel.app/Login',
     login,
  )
  const token = AxiosLogin.data.Token;

  const input = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosOutput = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    input
  );
  const AxiosGetOne = await axios.get(
    'https://sosa-repo.vercel.app/AdminManagement/'+ AxiosOutput.data.Id,
    {
      headers: {authorization: token}
    },
  );
  console.log(AxiosGetOne.data)
  // console.log(AxiosGetOne.data)
  expect(AxiosGetOne.data.props.name).toBe(input.name);
  expect(AxiosGetOne.data.props.password).not.toBe(input.password);
  expect(AxiosGetOne.data.props.type).toBe(input.type)
}, 15000);

test('Deve testar o Delete da classe de admin da API', async() => {
  const inputLogin = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosPost = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    inputLogin
  );
  
  const login = {
    user: inputLogin.name,
    password: inputLogin.password,
  }
  const AxiosLogin = await axios.post(
    'https://sosa-repo.vercel.app/Login',
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
    'https://sosa-repo.vercel.app/AdminManagement',
    input
  );
  //post^

  const AxiosDelete = await axios.delete(
    'https://sosa-repo.vercel.app/AdminManagement/' + AxiosOutput.data.Id,
    {
      headers: {authorization: token}
    },
  );
  //delete^

  const AxiosGetOne = await axios.get(
    'https://sosa-repo.vercel.app/AdminManagement/'+ AxiosOutput.data.Id,
    {
      headers: {authorization: token}
    },
  );

  expect(AxiosGetOne.data.msg).toBe("Usuario não encontrado");
  
}, 15000);

test('Deve testar o Update da classe de admin da API', async() => {
  const inputLogin = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosPost = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    inputLogin
  );

  const login = {
    user: inputLogin.name,
    password: inputLogin.password,
  }
  const AxiosLogin = await axios.post(
    'https://sosa-repo.vercel.app/Login',
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
    'https://sosa-repo.vercel.app/AdminManagement',
    input
  );
  //post^

  const AxiosPut = await axios.put(
    'https://sosa-repo.vercel.app/AdminManagementUpdate/' + AxiosOutput.data.Id,
    {},
    {
      headers: {authorization: token}
    });
  //Update^

  const AxiosGetOne = await axios.get(
    'https://sosa-repo.vercel.app/AdminManagement/'+ AxiosOutput.data.Id,
    {
      headers: {authorization: token}
    },
  );
  //GetOne para verificar se a mudança realmente ocorreu
  expect(AxiosGetOne.data.props.type).toBe('Guarda')
}, 15000)

test("Deve testar o Login da classe de admin da API", async() => {
  const inputLogin = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosPost = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    inputLogin
  );

  const user = {
    user: inputLogin.name,
    password: inputLogin.password,
  }
  const AxiosLogin = await axios.post(
    'https://sosa-repo.vercel.app/Login',
     user,
  )
  expect(AxiosLogin.data.Token).toBeDefined();
}, 15000)

test('Deve testar o Logout da classe admin da API', async () => {
  const inputLogin = {
    name: 'input do post',
    password: '12345678',
    type: 'Servidor da CAED',
  };
  const AxiosPost = await axios.post(
    'https://sosa-repo.vercel.app/AdminManagement',
    inputLogin
  );

  const login = {
    user: inputLogin.name,
    password: inputLogin.password,
  }
  const AxiosLogin = await axios.post(
    'https://sosa-repo.vercel.app/Login',
    login,
    )
  const token = AxiosLogin.data.Token;
// console.log(token)
  //login^

  const AxiosLogout = await axios.post(
    'https://sosa-repo.vercel.app/Logout/' + token,
    {},
    {
    headers: {authorization: token}
    },
  );
  
  const returnToken = TokenModel.findOne({bannedToken: token}) 
  // console.log(token);
  expect(returnToken).toBeDefined
}, 30000);