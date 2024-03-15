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
    const postMessage = await axios.post("http://localhost:3000/Message/" + newLogin.manager.organizationId, validInput,
    {
        headers: {authorization: newLogin.token}
    }
    )
    expect(postMessage.data.id).toBeDefined()
}, 15000)

test("Deve testar o GetAll das mensagens", async() => {
    const newLogin = await login()
    const validInput = {
        value: 'Nada por enquanto',
        idManager: newLogin.manager.id,
        exibDate: [new Date(), new Date()],
    }
    await axios.post("http://localhost:3000/Message/" + newLogin.manager.organizationId, validInput,
    {
        headers: {authorization: newLogin.token}
    }
    )

    const validInput1 = {
        value: 'Alunos sem aula por hoje',
        idManager: newLogin.manager.id,
        exibDate: [new Date(), new Date()],
    }
    await axios.post("http://localhost:3000/Message/" + newLogin.manager.organizationId, validInput1,
    {
        headers: {authorization: newLogin.token}
    }
    )

    const getMessages = await axios.get("http://localhost:3000/Message/" + newLogin.manager.organizationId,
    {
        headers: {authorization: newLogin.token}
    }
    )
    expect(getMessages.data).toBeDefined()
}, 15000)

test("Deve testar o delete das mensagens", async() => {
    const newLogin = await login()
    const validInput = {
        value: 'Oi! Eu serei apagado',
        idManager: newLogin.manager.id,
        exibDate: [new Date(), new Date()],
    }
    const postMessage = await axios.post("http://localhost:3000/Message/" + newLogin.manager.organizationId, validInput,
    {
        headers: {authorization: newLogin.token}
    }
    )
    await axios.delete("http://localhost:3000/Message/" + postMessage.data.id,
    {
        headers: {authorization: newLogin.token}
    }
    )
}, 15000)

test("Deve testar o updateAll da API", async() =>{
    const newLogin = await login()
    const newLogin1 = await login()
    const validInput = {
        value: 'Oi! Eu serei atualizado',
        idManager: newLogin.manager.id,
        exibDate: [new Date(), new Date()],
    }
    const postMessage = await axios.post("http://localhost:3000/Message/" + newLogin.manager.organizationId, validInput,
    {
        headers: {authorization: newLogin.token}
    });
    const newInput = {
        value: 'Alunos sem aulas as quartas, quintas e sextas',
        idManager: newLogin1.manager.id,
        exibDate: [new Date(), new Date()],
    }
    await axios.put("http://localhost:3000/Message/" + newLogin.manager.organizationId + '/' + postMessage.data.id, newInput,
    {
        headers: {authorization: newLogin.token}
    }
    )
}, 15000)