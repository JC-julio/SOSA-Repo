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
  // console.log(organizationPost.data)
  const AxiosOutput = await axios.post(
    'http://localhost:3000/Admin',
    inputLogin
  );
  const managerPost = await axios.post(
    'http://localhost:3000/Admin/' + organizationId, inputPostManager,
    {
      headers: {authorization: AxiosOutput.data.Token}
    },
  )
  const ObjectLogin = {
    organizationId : organizationPost.data.organizationId,
    manager: organizationPost.data.manager,
    managerId: organizationPost.data.managerId,
    token : AxiosOutput.data.Token
  }
  return ObjectLogin
}

test('Deve testar o post dos admins da API', async () => {
  const newLoginFirst = await login();
  // console.log(newLoginFirst)
  expect(newLoginFirst.manager).toBeDefined()
}, 30000);

test('Deve testar o GetAll dos admins da API', async () => {
  const newLoginFirst = await login();
  const newLoginTwo = await login(newLoginFirst.organizationId);
  // console.log(newLoginTwo)

  const AxiosOutput = await axios.get(
    'http://localhost:3000/Admin/' + newLoginFirst.organizationId,
    {
      headers: {authorization: newLoginFirst.token}
    },
  );
  // console.log(AxiosOutput.data)
  const AxiosOutputTwo = await axios.get(
    'http://localhost:3000/Admin/' + newLoginTwo.organizationId,
    {
      headers: {authorization: newLoginTwo.token}
    },
  );
  // console.log(AxiosOutputTwo.data)
  expect(AxiosOutputTwo.data).toBeDefined()
}, 15000);


test('Deve testar o GetOne da classe de admin da API', async() => {
const newLogin = await login()
console.log(newLogin)
const managerId = newLogin.managerId
const organizationId = newLogin.organizationId

  const AxiosGetOne = await axios.get(
    'http://localhost:3000/Admin/'+ organizationId + '/' + managerId,
    {
      headers: {authorization: newLogin.token}
    },
  );
  expect(AxiosGetOne.data.props.id).toBe(managerId)
}, 15000);

test('Deve testar o Delete da classe de admin da API', async() => {
const newLogin = await login()
const managerId = newLogin.managerId
const organizationId = newLogin.organizationId

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
const organizationId = newLogin.organizationId
const managerId = newLogin.managerId

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
}, 15000)

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
  console.log(token);
  expect(returnToken).toBeDefined
}, 30000);

test('Deve testar a eficiência do login da API com um nome de usuário invalido', async() => {
  const randomUser = Math.random().toString(36).slice(-10);
  const inputLogin = {
    user: randomUser,
    password: '12345678',
  }
  const axiosLogin = await axios.post('http://localhost:3000/Admin', inputLogin)
  console.log(axiosLogin.data.msg)
  expect(axiosLogin.data.msg).toBe('Nome de usuário inválido!')
}, 15000)

test("Deve testar a eficiência da API com uma senha incorreta", async() => {
  const randomPassword = Math.random().toString(36).slice(-10);
  const newLogin = await login()
  const inputPostManager = {
    name: 'input do post',
    type: 'Guarda',
    password: '12345678',
    organizationId: newLogin.organizationId,
  }
  const axiosPost = await axios.post('http://localhost:3000/Admin/' + newLogin.organizationId,
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
}, 15000)