import axios from 'axios';
import { config } from 'dotenv';
import { only } from 'node:test';
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
        headers: {authorization: AxiosOutput.data.Token}
      },
    )
    const ObjectLogin = {
      manager: {
        name: organizationPost.data.manager.name,
        type: organizationPost.data.manager.type,
        id: organizationPost.data.manager.id,
        organizationId: organizationPost.data.manager.organizationId
      },
      token : AxiosOutput.data.token
    }
    return ObjectLogin
  }

test("Deve testar o post da classe Organization da API", async() => {
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
    const personPost = await axios.post('http://localhost:3000/Organization',
    dataPostOrganization);
    expect(personPost.data.manager.organizationId).toBeDefined()
    expect(personPost.data.manager.id).toBeDefined()
}, 15000)

test("Deve testar o GetOne da classe Organization da API", async() => {
    const newLogin = await login()
    const organizationId = newLogin.manager.organizationId

    const personGetOne = await axios.get(
        'http://localhost:3000/Organization/' + organizationId + '/' + organizationId,
        {
            headers:{Authorization: newLogin.token}
        },
    );
    expect(personGetOne.data.props).toBeDefined()
},  15000)

test("Deve testar o GetAll da classe Organization por API", async() => {
    const randomUser = Math.random().toString(36).slice(-10);
    const newLogin = await login()
    const organizationId = newLogin.manager.organizationId

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
    const personPost = await axios.post('http://localhost:3000/Organization',
    dataPostOrganization);

    const axiosGetAll = await axios.get('http://localhost:3000/Organization/' + personPost.data.organizationId,
    {
        headers:{Authorization: newLogin.token}
    });
    expect(axiosGetAll.data).toBeDefined();
}, 15000)

test("Deve testar o Delete da classe Organization por API", async() => {
    const randomUser = Math.random().toString(36).slice(-10);
    const newLogin = await login()
    const organizationId = newLogin.manager.organizationId


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
    const personPost = await axios.post('http://localhost:3000/Organization',
    dataPostOrganization);
    //post para deletar^ 

    const axisoDelete = await axios.delete('http://localhost:3000/Organization/' + organizationId + '/' + organizationId,
    {
        headers:{Authorization: newLogin.token}
    });
    //delete

    const personGetOne = await axios.get(
        'http://localhost:3000/Organization/' + organizationId + '/' + organizationId,
        {
            headers:{Authorization: newLogin.token}
        },
    );
    expect(personGetOne.data.msg).toBe("Organização não encontrada!");
}, 15000)