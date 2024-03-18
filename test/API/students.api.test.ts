import axios from 'axios';
import { config } from 'dotenv';
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
      name: organizationPost.data.name,
      type: organizationPost.data.type,
      id: organizationPost.data.id,
      organizationId: organizationPost.data.organizationId
    },
    token : AxiosOutput.data.token
  }
  return ObjectLogin
}

test("Deve testar o post e o GetOne da classe de estudantes da API", async() => {
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
  const randomUser = Math.random().toString(36).slice(-15);
  const postParam = {
      name: 'Julio César Aguiar',
      className: '2022 A TI',
      type: false,
      registration: randomUser,
      additionalInfo: 'nada',
  }
  const AxiosPost = await axios.post('http://localhost:3000/Student/' + organizationId ,
  postParam,
  {
    headers: {authorization: newLogin.token}
  },
  );
  console.log(AxiosPost.data.id)
  const AxiosGetOne = await axios.get(
      'http://localhost:3000/Student/'+ organizationId + '/' + AxiosPost.data.id,
      {
        headers: {authorization: newLogin.token}
      },
    );
  expect(AxiosGetOne.data.props.name).toBe(postParam.name);
  expect(AxiosGetOne.data.props.className).toBe(postParam.className);
  expect(AxiosGetOne.data.props.type).toBe(postParam.type);
}, 15000);

test("Deve testar o GetbyClassName da classe de estudantes da API", async() => {
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
  const randomUser = Math.random().toString(36).slice(-15);
  const randomUser1 = Math.random().toString(36).slice(-15);
  const PostParam = {
    name: 'Thicianae Frata Borges',
    className: '2022 B TI',
    type: false,
    registration: randomUser,
    additionalInfo: 'nada',
    }
  const AxiosPost = await axios.post('http://localhost:3000/Student/'+ organizationId, PostParam,
    {
      headers: {authorization: newLogin.token}
    },
    );
  const postParamTwo = {
    name: 'Júlio César Aguiar',
    className: '2022 B TI',
    type: true,
    registration: randomUser1,
  }   
  const axiosPostTwo = await axios.post('http://localhost:3000/Student/' + organizationId,
   postParamTwo,
  {
    headers: {authorization: newLogin.token}
  },
  )
  const studentsGetByClassName = await axios.get('http://localhost:3000/StudentGet/' + organizationId + '/' + PostParam.className,
  {
      headers: {authorization: newLogin.token}
    },
  )
    expect(studentsGetByClassName).toBeDefined();
}, 15000);

test("Deve testar o método Delete da classe de estudantes da API", async() => {
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
  const randomUser = Math.random().toString(36).slice(-15);
  const randomUser1 = Math.random().toString(36).slice(-15);
  const PostParam = {
    name: 'Thiciane Frata Borges',
    classStudent: '2022 B TI',
    type: 'Autorizado',
    registration: randomUser,
    additionalInfo: 'nada',
    }
    const postParamTwo = {
      name: 'Júlio César Aguiar',
      className: '2022 B TI',
      type: true,
      registration: randomUser1,
      additionalInfo: 'nada',
    }   
    const axiosPostTwo = await axios.post('http://localhost:3000/Student/' + organizationId, postParamTwo,
    {
      headers: {authorization: newLogin.token}
    }
    )

    const DeleteStudent = await axios.delete('http://localhost:3000/Student/'+ organizationId + '/' + axiosPostTwo.data.id,
    {
        headers: {authorization: newLogin.token}
      },
    );
    //Delete
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Student/'+ organizationId + '/' + axiosPostTwo.data.id,
        {
          headers: {authorization: newLogin.token}
        },
    );
    expect(AxiosGetOne.data.msg).toBe("Estudante não encontrado!");
}, 15000)

test("Deve testar o Update da classe de estudantes da API", async() => {
  const newLogin = await login()
  const managerId = newLogin.manager.id
  const organizationId = newLogin.manager.organizationId
  const randomUser = Math.random().toString(36).slice(-15);
  const PostParam = {
    name: 'Thicianae Frata Borges',
    className: '2022 B TI',
    type: false,
    registration: randomUser,
    additionalInfo: 'nada',
  }
    const AxiosPost = await axios.post('http://localhost:3000/Student/' + organizationId, PostParam,
    {
      headers: {authorization: newLogin.token}
    },
    );    
    //post para testar o Update

    const AxiosPut = await axios.put('http://localhost:3000/Student/' + organizationId + '/' + AxiosPost.data.id,
    {},
    {
        headers: {authorization: newLogin.token}
    },
    );
    //Update^
    const AxiosGetOne = await axios.get(
      'http://localhost:3000/Student/'+ organizationId + '/' + AxiosPost.data.id,
      {
        headers: {authorization: newLogin.token}
      },
  );
    //GetOne para testar o Update
    expect(AxiosGetOne.data.props.type).toBe(true);
}, 15000);

test("Deve testar o GetAll da entidade Students da API", async() => {
  const randomUser = Math.random().toString(36).slice(-15);
  const newLogin = await login()
  const postParam = {
    name: 'Julio César Aguiar',
    className: '2022 A TI',
    type: false,
    registration: randomUser,
    additionalInfo: 'nada',
  }
  const AxiosPost = await axios.post('http://localhost:3000/Student/' + newLogin.manager.organizationId ,
  postParam,
  {
    headers: {authorization: newLogin.token}
  },
  );
  const randomUser1 = Math.random().toString(36).slice(-15);
  const postParam2 = {
    name: 'Thiciane Frata Borges',
    className: '2022 B TI',
    type: true,
    registration: randomUser1,
    additionalInfo: 'nada',
  }
  const axiosPost2 = await axios.post('http://localhost:3000/Student/' + newLogin.manager.organizationId ,
  postParam2,
  {
    headers: {authorization: newLogin.token}
  },
  );

  const getAllStudents = await axios.get(
    'http://localhost:3000/Student/' + newLogin.manager.organizationId,
    {
      headers: {authorization: newLogin.token}
    },
    )
    expect(getAllStudents.data).not.toBe("Nenhum aluno encontrado");
  }, 15000)

test("Deve testar a função que seleciona o aluno com base em sua matricula", async() => {
  const newLogin = await login();
  const randomRegister = Math.random().toString(36).slice(-15);
  const input = {
    name: 'Julião',
    className: '2022 A TI',
    type: true,
    organizationId: newLogin.manager.organizationId,
    registration: randomRegister,
  };
  const postStudent = await axios.post('http://localhost:3000/Student/' + newLogin.manager.organizationId,
  input,
  {
    headers: {authorization: newLogin.token}
  },
  )
  const getStudent = await axios.get("http://localhost:3000/StudentGetByRegistration/" + input.registration + '/' + newLogin.manager.organizationId,
  {
    headers: {authorization: newLogin.token}
  },
  )
  expect(getStudent.data.props.name).toBe(input.name);
  expect(getStudent.data.props.className).toBe(input.className);
  expect(getStudent.data.props.type).toBe(input.type);
  expect(getStudent.data.props.organizationId).toBe(input.organizationId);
  expect(getStudent.data.props.registration).toBe(input.registration)
}, 15000)

test.only("Deve testar a função que atualiza todas as propriedades de um aluno", async() => {
  const newLogin = await login();
  const randomRegister = Math.random().toString(36).slice(-15);
  const newRandomRegister = Math.random().toString(36).slice(-15);
  const input = {
    name: 'Julião',
    className: '2022 A TI',
    type: true,
    additionalInfo: 'autorizado',
    organizationId: newLogin.manager.organizationId,
    registration: randomRegister,
  };
  const postStudent = await axios.post('http://localhost:3000/Student/' + newLogin.manager.organizationId,
  input,
  {
    headers: {authorization: newLogin.token}
  });

  const newInput = {
    name: 'Julião Novo 1',
    className: '3°A TI',
    type: false,
    additionalInfo: 'nothing',
    organizationId: newLogin.manager.organizationId,
    registration: newRandomRegister,
  };
  await axios.put('http://localhost:3000/Student/' + newLogin.manager.organizationId + '/' + postStudent.data.id, newInput,
  {
    headers: {authorization: newLogin.token}
  },
)

const AxiosGetOne = await axios.get(
  'http://localhost:3000/Student/'+ newLogin.manager.organizationId + '/' + postStudent.data.id,
  {
    headers: {authorization: newLogin.token}
  },
);
expect(AxiosGetOne.data.props.type).toBe(false);
expect(AxiosGetOne.data.props.additionalInfo).toBe(newInput.additionalInfo)
expect(AxiosGetOne.data.props.organizationId).toBe(newInput.organizationId)
}, 15000)

test("deve testar a função que apaga todos os alunos com base no nome da turma", async() => {
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
  const randomUser = Math.random().toString(36).slice(-15);
  const randomUser1 = Math.random().toString(36).slice(-15);
  const PostParam = {
    name: 'Thicianae Frata Borges',
    className: '3°B TI',
    organizationId: organizationId,
    type: false,
    registration: randomUser,
    additionalInfo: 'nada',
    }
  const AxiosPost = await axios.post('http://localhost:3000/Student/'+ organizationId, PostParam,
    {
      headers: {authorization: newLogin.token}
    },
    );
  const postParamTwo = {
    name: 'Júlio César Aguiar',
    className: '3°B TI',
    organizationId: organizationId,
    type: true,
    registration: randomUser1,
    additionalInfo: 'nada',
  }   
  const axiosPostTwo = await axios.post('http://localhost:3000/Student/' + organizationId,
   postParamTwo,
  {
    headers: {authorization: newLogin.token}
  },
  )
  await axios.delete('http://localhost:3000/StudentDel/' + organizationId + '/' + PostParam.className,
  {
      headers: {authorization: newLogin.token}
    },
  )
  const AxiosGetOne = await axios.get(
    'http://localhost:3000/Student/'+ newLogin.manager.organizationId + '/' + AxiosPost.data.id,
    {
      headers: {authorization: newLogin.token}
    },
  );
  const AxiosGetOne1 = await axios.get(
    'http://localhost:3000/Student/'+ newLogin.manager.organizationId + '/' + axiosPostTwo.data.id,
    {
      headers: {authorization: newLogin.token}
    })
    expect(AxiosGetOne.data.msg).toBe("Estudante não encontrado!");
    expect(AxiosGetOne1.data.msg).toBe("Estudante não encontrado!");
}, 15000)