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
        name: organizationPost.data.manager.name,
        type: organizationPost.data.manager.type,
        id: organizationPost.data.manager.id,
        organizationId: organizationPost.data.manager.organizationId
      },
      token : AxiosOutput.data.token
    }
    return ObjectLogin
  }

test("Deve testar o post e o GetOne da classe de estudantes da API", async() => {
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
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
  console.log(AxiosPost.data.studentId)    
  const AxiosGetOne = await axios.get(
      'http://localhost:3000/Student/'+ organizationId + '/' + AxiosPost.data.studentId,
      {
        headers: {authorization: newLogin.token}
      },
    );
  console.log(AxiosGetOne.data)
  expect(AxiosGetOne.data.props.name).toBe(postParam.name);
  expect(AxiosGetOne.data.props.className).toBe(postParam.className);
  expect(AxiosGetOne.data.props.type).toBe(postParam.type);
}, 15000);

test("Deve testar o GetbyClassName da classe de estudantes da API", async() => {
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId


      const PostParam = {
        name: 'Thicianae Frata Borges',
        className: '2022 B TI',
        type: false,
        }
        const AxiosPost = await axios.post('http://localhost:3000/Student/'+ organizationId, PostParam,
        {
          headers: {authorization: newLogin.token}
        },
        );
        const postParamTwo = {
          name: 'Júlio César Aguiar',
          className: '2022 B TI',
          type: true
        }   
        const axiosPostTwo = await axios.post('http://localhost:3000/Student/' + organizationId, postParamTwo,
        {
          headers: {authorization: newLogin.token}
        },
        )
        const studentsGetByClassName = await axios.get('http://localhost:3000/StudentGet/' + organizationId + '/' + PostParam.className,
        {
            headers: {authorization: newLogin.token}
          },
        )
        console.log(studentsGetByClassName.data)
        expect(studentsGetByClassName).toBeDefined();
}, 15000);

test("Deve testar o método Delete da classe de estudantes da API", async() => {
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
  const PostParam = {
    name: 'Thicianae Frata Borges',
    classStudent: '2022 B TI',
    type: 'Autorizado'
    }
    const postParamTwo = {
      name: 'Júlio César Aguiar',
      className: '2022 B TI',
      type: true
    }   
    const axiosPostTwo = await axios.post('http://localhost:3000/Student/' + organizationId, postParamTwo,
    {
      headers: {authorization: newLogin.token}
    }
    )

    const DeleteStudent = await axios.delete('http://localhost:3000/Student/'+ organizationId + '/' + axiosPostTwo.data.studentId,
    {
        headers: {authorization: newLogin.token}
      },
    );
    //Delete
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Student/'+ organizationId + '/' + axiosPostTwo.data.studentId,
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
  const PostParam = {
    name: 'Thicianae Frata Borges',
    className: '2022 B TI',
    type: false,
  }
    const AxiosPost = await axios.post('http://localhost:3000/Student/' + organizationId, PostParam,
    {
      headers: {authorization: newLogin.token}
    },
    );    
    //post para testar o Update

    const AxiosPut = await axios.put('http://localhost:3000/Student/' + organizationId + '/' + AxiosPost.data.studentId,
    {},
    {
        headers: {authorization: newLogin.token}
      },
    );
    //Update^
    const AxiosGetOne = await axios.get(
      'http://localhost:3000/Student/'+ organizationId + '/' + AxiosPost.data.studentId,
      {
        headers: {authorization: newLogin.token}
      },
  );
    //GetOne para testar o Update
    // console.log(AxiosGetOne.data.props.type)
    expect(AxiosGetOne.data.props.type).toBe(true);
}, 15000);