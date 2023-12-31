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

async function postStudent() {
const newLogin = await login()
  const organizationId = newLogin.organizationId
  const postParam = {
      name: 'Julio César Aguiar',
      className: '2022 A TI',
      type: false
  }
  const AxiosPost = await axios.post('http://localhost:3000/Student/' + organizationId ,
  postParam,
  {
    headers: {authorization: newLogin.token}
  },
  );
  const AxiosGetOne = await axios.get(
    'http://localhost:3000/Student/'+ organizationId + '/' + AxiosPost.data.studentId,
    {
      headers: {authorization: newLogin.token}
    },
  );
  const studentObject = {
    name: AxiosGetOne.data.props.name,
    className: AxiosGetOne.data.props.className,
    type: AxiosGetOne.data.props.type,
    id: AxiosPost.data.studentId,
  }
  return studentObject;
}

test('Deve testar o post e o GetOne da classe de saídas da API', async () => {
    const newLogin = await login()
    const managerId = newLogin.managerId
    const organizationId = newLogin.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id
      
    const input = {
        idStudent: studentId,
        idWorker: managerId,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date(),
        confirmExit: false,
    };

    const AxiosPost = await axios.post(
        'http://localhost:3000/ExitPost/' + organizationId + '/' + input.idStudent + '/' + input.idWorker,
        input,
        {
            headers: {authorization: newLogin.token}
        },
    );
    console.log(AxiosPost.data.exitId)
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Exits/' + organizationId + '/' + AxiosPost.data.exitId,
        {
            headers: {authorization: newLogin.token}
        }, 
    )
    expect(AxiosGetOne.data.props.idStudent).toBe(input.idStudent);
    expect(AxiosGetOne.data.props.idWorker).toBe(input.idWorker);
    expect(AxiosGetOne.data.props.time).toBe(input.time);
    expect(AxiosGetOne.data.props.observes).toBe(input.observes);
    expect(new Date(AxiosGetOne.data.props.dateExit)).toStrictEqual(new Date(input.dateExit));
    expect(AxiosGetOne.data.props.confirmExit).toBe(input.confirmExit);
}, 15000);

test("Deve testar o GetExits da classe de saídas da API", async() => {
    const newLogin = await login()
    const managerId = newLogin.managerId
    const organizationId = newLogin.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id
      
    const input = {
        idStudent: studentId,
        idWorker: managerId,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2001'),
        confirmExit: false,
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/ExitPost/' + organizationId + '/' + input.idStudent + '/' + input.idWorker,
        input,
        {
            headers: {authorization: newLogin.token}
        },
    );
    const input1 = {
        idStudent: studentId,
        idWorker: managerId,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2007'),
        confirmExit: false,
    };
    const AxiosPost1 = await axios.post(
        'http://localhost:3000/ExitPost/' + organizationId + '/' + input1.idStudent + '/' + input1.idWorker,
        input1,
        {
            headers: {authorization: newLogin.token}
        },
    );
    const input2 = {
        idStudent: studentId,
        idWorker: managerId,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2013'),
        confirmExit: false,
    };
    const AxiosPost2 = await axios.post(
        'http://localhost:3000/ExitPost/' + organizationId + '/' + input2.idStudent + '/' + input2.idWorker,
        input2,
        {
            headers: {authorization: newLogin.token}
        },
    );
//posts^
    const GetExits = await axios.get('http://localhost:3000/Exits/' + organizationId + '/' + input.dateExit + '/' + input2.dateExit,
    {
        headers: { authorization: newLogin.token },
    }
    );
    console.log(GetExits.data)
    expect(GetExits.data).toBeDefined();
}, 15000)

test("Deve testar o GetAll da classe de saídas da API", async() => {
    const newLogin = await login()
    const managerId = newLogin.managerId
    const organizationId = newLogin.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id

    const input = {
        idStudent: studentId,
        idWorker: managerId,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2001'),
        confirmExit: false,
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/ExitPost/' + organizationId + '/' + input.idStudent + '/' + input.idWorker,
        input,
        {
            headers: {authorization: newLogin.token}
        },)

        const input1 = {
            idStudent: studentId,
            idWorker: managerId,
            time: 15,
            observes: 'Isso aqui está nos testes de API',
            dateExit: new Date('04-02-2007'),
            confirmExit: false,
        };
        const AxiosPost1 = await axios.post(
            'http://localhost:3000/ExitPost/' + organizationId + '/' + input1.idStudent + '/' + input1.idWorker,
            input1,
            {
                headers: {authorization: newLogin.token}
            },
        );
        const input2 = {
            idStudent: studentId,
            idWorker: managerId,
            time: 15,
            observes: 'Isso aqui está nos testes de API',
            dateExit: new Date('12-12-2013'),
            confirmExit: false,
        };
        const AxiosPost2 = await axios.post(
            'http://localhost:3000/ExitPost/' + organizationId + '/' + input2.idStudent + '/' + input2.idWorker,
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
    const managerId = newLogin.managerId
    const organizationId = newLogin.organizationId

    const DeleteAll = await axios.delete('http://localhost:3000/Exits/' + organizationId,
    {
        headers: { authorization: newLogin.token },
    });
    // console.log(DeleteAll.status)
    expect(DeleteAll.status).toBe(200)
}, 15000)

test("Deve testar o Update da classe de saídas da API", async() => {
    const newLogin = await login()
    const managerId = newLogin.managerId
    const organizationId = newLogin.organizationId
    const newStudent = await postStudent()
    const studentId = newStudent.id

    const input = {
        idStudent: studentId,
        idWorker: managerId,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2023'),
        confirmExit: false,
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/ExitPost/' + organizationId + '/' + studentId + '/' + managerId,
         input,
         {
            headers: {authorization: newLogin.token}
          },
    )
    //post para teste^
    console.log(AxiosPost.data)
    const update = await axios.put('http://localhost:3000/Exits/'+ organizationId + '/' + AxiosPost.data.exitId,
    {},
    {
        headers: {authorization: newLogin.token}
      },
    )
    //update^
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Exits/' + organizationId + '/' + AxiosPost.data.exitId,
        {
            headers: {authorization: newLogin.token}
        }, 
    )
      console.log(AxiosGetOne.data)
      //GetOne para verificar se a mudança realmente ocorreu
      expect(AxiosGetOne.data.props.confirmExit).toBe(true)
    }, 15000)