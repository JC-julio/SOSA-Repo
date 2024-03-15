import axios from 'axios';
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
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
        name: organizationPost.data.name,
        type: organizationPost.data.type,
        id: organizationPost.data.id,
        organizationId: organizationPost.data.organizationId
      },
      token : AxiosOutput.data.token
    }
    return ObjectLogin
}

test("Deve testar o post das mensagens", async() => {
    const newLogin = await login()
    const validInput = {
        value: 'Nada por enquanto',
        idManager: newLogin.manager.id,
        exibDate: [new Date(), new Date()],
    }
    console.log(newLogin.token)
    const postMessage = await axios.post("http://localhost:3000/Message/" + newLogin.manager.organizationId, validInput,
    {
        headers: {authorization: newLogin.token}
    }
    )
    expect(postMessage.data.id).toBeDefined()
}, 15000)

test("")