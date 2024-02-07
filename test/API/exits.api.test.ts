import axios, { Axios } from 'axios';
import { config } from 'dotenv';
config();
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

async function postStudent() {
  const randomUser1 = Math.random().toString(36).slice(-15);
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
  const postParam = {
      name: 'Julio César Aguiar',
      className: '2022 A TI',
      type: false,
      registration: randomUser1,
  }
  const AxiosPost = await axios.post('http://localhost:3000/Student/' + organizationId ,
  postParam,
  {
    headers: {authorization: newLogin.token}
  },
  );
  const AxiosGetOne = await axios.get(
      'http://localhost:3000/Student/'+ organizationId + '/' + AxiosPost.data.id,
      {
          headers: {authorization: newLogin.token}
      },
    );
  const studentObject = {
    name: AxiosGetOne.data.props.name,
    className: AxiosGetOne.data.props.className,
    type: AxiosGetOne.data.props.type,
    registration: AxiosGetOne.data.props.registration,
    id: AxiosPost.data.id,
  }
  return studentObject;
}

test('Deve testar o post e o GetOne da classe de saídas da API', async () => {
    const newLogin = await login()
    const managerId = newLogin.manager.id
    const organizationId = newLogin.manager.organizationId
    const newStudent = await postStudent()
    console.log(newStudent)
    const studentId = newStudent.id
      
    const input = {
        idStudent: studentId,
        idWorker: managerId,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date(),
    };

    const AxiosPost = await axios.post(
        'http://localhost:3000/Exits/' + organizationId,
        input,
        {
            headers: {authorization: newLogin.token}
        },
    );
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Exits/' + organizationId + '/' + AxiosPost.data.id,
        {
            headers: {authorization: newLogin.token}
        }, 
    )
    expect(AxiosGetOne.data.props.idStudent).toBe(input.idStudent);
    expect(AxiosGetOne.data.props.idWorker).toBe(input.idWorker);
    expect(AxiosGetOne.data.props.observes).toBe(input.observes);
    expect(new Date(AxiosGetOne.data.props.dateExit)).toStrictEqual(new Date(input.dateExit));
}, 15000);

test("Deve testar o GetExits da classe de saídas da API", async() => {
    const newLogin = await login()
    const managerId = newLogin.manager.id
    const organizationId = newLogin.manager.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id
      
    const input = {
        idStudent: studentId,
        idWorker: managerId,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2001'),
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/Exit/' + organizationId,
        input,
        {
            headers: {authorization: newLogin.token}
        },
    );
    const input1 = {
        idStudent: studentId,
        idWorker: managerId,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2007'),
    };
    const AxiosPost1 = await axios.post(
        'http://localhost:3000/Exit/' + organizationId,
        input1,
        {
            headers: {authorization: newLogin.token}
        },
    );
    const input2 = {
        idStudent: studentId,
        idWorker: managerId,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2013'),
    };
    const AxiosPost2 = await axios.post(
        'http://localhost:3000/Exit/' + organizationId,
        input2,
        {
            headers: {authorization: newLogin.token}
        },
    );
//posts^
    const GetExits = await axios.get('http://localhost:3000/Exits/' + organizationId,
    {
        headers: { authorization: newLogin.token },
    }
    );
    expect(GetExits.data).toBeDefined();
}, 15000)

test("Deve testar o GetAll da classe de saídas da API", async() => {
    const newLogin = await login()
    const managerId = newLogin.manager.id
    const organizationId = newLogin.manager.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id

    const input = {
        idStudent: studentId,
        idWorker: managerId,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2001'),
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/Exit/' + organizationId,
        input,
        {
            headers: {authorization: newLogin.token}
        },)

        const input1 = {
            idStudent: studentId,
            idWorker: managerId,

            observes: 'Isso aqui está nos testes de API',
            dateExit: new Date('04-02-2007'),

        };
        const AxiosPost1 = await axios.post(
            'http://localhost:3000/Exit/' + organizationId,
            input1,
            {
                headers: {authorization: newLogin.token}
            },
        );
        const input2 = {
            idStudent: studentId,
            idWorker: managerId,

            observes: 'Isso aqui está nos testes de API',
            dateExit: new Date('12-12-2013'),

        };
        const AxiosPost2 = await axios.post(
            'http://localhost:3000/Exit/' + organizationId,
            input2,
            {
                headers: {authorization: newLogin.token}
            },
        );
    const GetAll = await axios.get('http://localhost:3000/Exits/' + organizationId,
    {
        headers: { authorization: newLogin.token },
    });
    expect(GetAll.data).toBeDefined();
}, 15000)

test("Deve testar o DeleteAll da classe de saídas da API", async() => {
    const newLogin = await login()
    const managerId = newLogin.manager.id
    const organizationId = newLogin.manager.organizationId
    const DeleteAll = await axios.delete('http://localhost:3000/Exits/' + organizationId,
    {
        headers: { authorization: newLogin.token },
    });
    expect(DeleteAll.status).toBe(200)
}, 15000)

test("Deve testar o Update da classe de saídas da API", async() => {
    const newLogin = await login()
    const managerId = newLogin.manager.id
    const organizationId = newLogin.manager.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id

    const input = {
        idStudent: studentId,
        idWorker: managerId,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2023'),
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/Exit/' + organizationId,
         input,
         {
            headers: {authorization: newLogin.token}
          },
    )
    console.log(AxiosPost.data)
    //post para teste^
    const update = await axios.put('http://localhost:3000/Exits/'+ organizationId + '/' + AxiosPost.data.id,
    {},
    {
        headers: {authorization: newLogin.token}
      },
    )
    //update^
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Exits/' + organizationId + '/' + AxiosPost.data.id,
        {
            headers: {authorization: newLogin.token}
        }, 
    )
      //GetOne para verificar se a mudança realmente ocorreu
      expect(AxiosGetOne.data.props.confirmExit).toBe('Saida concluida')
    }, 15000)
    
test('Deve testar o Update após o tempo determinado pela setTimeout de cancelamento de saida', async() => {
    const newLogin = await login()
    const managerId = newLogin.manager.id
    const organizationId = newLogin.manager.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id

    const input = {
        idStudent: studentId,
        idWorker: managerId,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2023'),
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/Exit/' + organizationId,
         input,
         {
            headers: {authorization: newLogin.token}
          },
    )
    //post para teste^
    await delay(500)
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Exits/' + organizationId + '/' + AxiosPost.data.exitId,
        {
            headers: {authorization: newLogin.token}
        }, 
    )
    expect(AxiosGetOne.data.props.confirmExit).toBe('Saída expirada')
}, 20000)
