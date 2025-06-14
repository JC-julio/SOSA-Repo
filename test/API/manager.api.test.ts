import axios from 'axios';
import { config } from 'dotenv';
import { TokenModel } from '../../src/entity/models/BlackListDB';
config();
axios.defaults.validateStatus = function () {
  return true;
};

async function login(organizationId?) {
  const randomUser = Math.random().toString(36).slice(-10);
  const randomUser1 = Math.random().toString(36).slice(-10);
  const dataPostOrganization = {
    organization: {
        name: 'CAED Cacoal'
    },
    manager: {
        name: randomUser,
        password: '12345678',
        type: 'Servidor da CAED',
    }
}
  const inputLogin = {
    user : dataPostOrganization.manager.name,
    password: dataPostOrganization.manager.password
  }
  const inputPostManager = {
    name: randomUser1,
    password: dataPostOrganization.manager.password,
    type: dataPostOrganization.manager.type
  }
  const organizationPost = await axios.post('http://localhost:3000/Organization',
  dataPostOrganization);
  const AxiosOutput = await axios.post(
    'http://localhost:3000/Admin',
    inputLogin
  );
  const managerPost = await axios.post(
    'http://localhost:3000/Admin/' + organizationId, inputPostManager,
    {
      headers: {authorization: AxiosOutput.data.token}
    },
  )
  const ObjectLogin = {
    manager: {
      name: organizationPost.data.name,
      type: organizationPost.data.type,
      id: organizationPost.data.id,
      organizationId: organizationPost.data.organizationId
    },
    token : AxiosOutput.data.token
  }
  return ObjectLogin
}

test.only('Deve testar o post dos admins da API', async () => {
  const newLoginFirst = await login();
  console.log(newLoginFirst)
  expect(newLoginFirst.manager).toBeDefined()
}, 30000);

test('Deve testar o GetAll dos admins da API', async () => {
  const newLoginFirst = await login();
  const newLoginTwo = await login(newLoginFirst.manager.organizationId);
  // console.log(newLoginTwo)

  const AxiosOutput = await axios.get(
    'http://localhost:3000/Admin/' + newLoginFirst.manager.organizationId,
    {
      headers: {authorization: newLoginFirst.token}
    },
  );
  // console.log(AxiosOutput.data)
  const AxiosOutputTwo = await axios.get(
    'http://localhost:3000/Admin/' + newLoginFirst.manager.organizationId,
    {
      headers: {authorization: newLoginTwo.token}
    },
  );
  // console.log(AxiosOutputTwo.data)
  expect(AxiosOutputTwo.data).toBeDefined()
}, 15000);

test('Deve testar o GetOne da classe de admin da API', async() => {
const newLogin = await login()
const managerId = newLogin.manager.id
const organizationId = newLogin.manager.organizationId

  const AxiosGetOne = await axios.get(
    'http://localhost:3000/Admin/'+ organizationId + '/' + managerId,
    {
      headers: {authorization: newLogin.token}
    },
  );
  console.log(AxiosGetOne.data)
  expect(AxiosGetOne.data.props.id).toBe(managerId)
}, 15000);

test('Deve testar o Delete da classe de admin da API', async() => {
const newLogin = await login()
const managerId = newLogin.manager.id
const organizationId = newLogin.manager.organizationId

  const AxiosDelete = await axios.delete(
    'http://localhost:3000/Admin/' + organizationId + '/' + managerId,
    {
      headers: {authorization: newLogin.token}
    },
  );
  //delete^

  const AxiosGetOne = await axios.get(
    'http://localhost:3000/Admin/' + organizationId + '/' + managerId,
    {
      headers: {authorization: newLogin.token}
    },
  );
  // console.log(AxiosGetOne.data)
  expect(AxiosGetOne.data.msg).toBe("Administrador não encontrado");
  
}, 15000);

test('Deve testar o Update da classe de admin da API', async() => {
const newLogin = await login()
const organizationId = newLogin.manager.organizationId
const managerId = newLogin.manager.id

  const AxiosPut = await axios.put(
    'http://localhost:3000/Admin/' + organizationId + '/' + managerId,
    {},
    {
      headers: {authorization: newLogin.token}
    });
  //Update^

  const AxiosGetOne = await axios.get(
    'http://localhost:3000/Admin/' + organizationId + '/' + managerId,
    {
      headers: {authorization: newLogin.token}
    },
  );
  //GetOne para verificar se a mudança realmente ocorreu
  expect(AxiosGetOne.data.props.type).toBe('Guarda')
}, 15000);

test("Deve testar o logout da classe de admin da API", async() => {
const newLogin = await login()
const token = newLogin.token

  const AxiosLogout = await axios.post(
    'http://localhost:3000/Admin/Logout/' + token,
    {},
    {
    headers: {authorization: token}
    },
  );
  const returnToken = TokenModel.findOne({bannedToken: token}) 
  expect(returnToken).toBeDefined
}, 30000);

test('Deve testar a eficiência do login da API com um nome de usuário invalido', async() => {
  const randomUser = Math.random().toString(36).slice(-10);
  const inputLogin = {
    user: randomUser,
    password: '12345678',
  }
  const axiosLogin = await axios.post('http://localhost:3000/Admin', inputLogin)
  expect(axiosLogin.data.msg).toBe('Nome de usuário inválido!')
}, 15000);

test("Deve testar a eficiência da API com uma senha incorreta", async() => {
  const randomPassword = Math.random().toString(36).slice(-10);
  const newLogin = await login()
  const inputPostManager = {
    name: 'input do post',
    type: 'Guarda',
    password: '12345678',
    organizationId: newLogin.manager.organizationId,
  }
  const axiosPost = await axios.post('http://localhost:3000/Admin/' + newLogin.manager.organizationId,
  inputPostManager,
  {
    headers: {authorization: newLogin.token}
  })
  // console.log(axiosPost.data)
  const inputLogin = {
    user: 'input do post',
    password: randomPassword,
  }
  const axiosLogin = await axios.post('http://localhost:3000/Admin', inputLogin)
  // console.log(axiosLogin.data)
  expect(axiosLogin.data.msg).toBe('Senha incorreta')
}, 15000);

test("Deve testar o login da API", async() => {
  const randomUser = Math.random().toString(36).slice(-10);
  const dataPostOrganization = {
    organization: {
        name: 'CAED Cacoal'
    },
    manager: {
        name: randomUser,
        password: '12345678',
        type: 'Servidor da CAED',
    }
  }
  const organizationPost = await axios.post('http://localhost:3000/Organization',
  dataPostOrganization);
  const inputLogin = {
    user : dataPostOrganization.manager.name,
    password: dataPostOrganization.manager.password
  }
  const AxiosOutput = await axios.post(
    'http://localhost:3000/Admin',
    inputLogin
  );
}, 15000);