import axios from 'axios';
import { config } from 'dotenv';
config();
axios.defaults.validateStatus = function () {
    return true;
  };

  async function Login() {
    const input = {
      organization: {
          name: 'CAED Cacoal'
      },
      manager: {
          name: 'input do login',
          password: '12345678',
          type: 'Servidor da CAED',
      }
  }
  const inputLogin = {
    user : input.manager.name,
    password: input.manager.password
  }
  const organizationPost = await axios.post('http://localhost:3000/Organization',
  input);
  const newLogin = await axios.post('http://localhost:3000/Organization/' + organizationPost.data.organizationId + '/Login',
  inputLogin
  )
  const returnLogin = {
    organizationId: organizationPost.data.organizationId,
    managerId: organizationPost.data.managerId,
    token: newLogin.data.Token,
  };
  return returnLogin;
  }

test("Deve testar o post da classe de estudantes da API", async() => {
  const loginData = await Login()
  const token = loginData.token
  console.log(loginData)
  console.log(token)
  const postParam = {
      name: 'Julio César Aguiar',
      classStudent: '2022 A TI',
      type: 'Autorizado'
  }
  const AxiosPost = await axios.post('http://localhost:3000/Organization/' + loginData.organizationId + '/Student',
  postParam,
  {
    headers: {authorization: loginData.token}
  },
  );    
  const AxiosGetOne = await axios.get(
      'http://localhost:3000/Organization/'+ loginData.organizationId + '/Student/' + AxiosPost.data.Id,
      {
        headers: {authorization: token}
      },
    );
  console.log(AxiosGetOne.data)
  expect(AxiosGetOne.data.props.name).toBe(postParam.name);
  expect(AxiosGetOne.data.props.classStudent).toBe(postParam.classStudent);
  expect(AxiosGetOne.data.props.type).toBe(postParam.type);
}, 15000);

// test("Deve testar o GetbyClassName da classe de estudantes da API", async() => {
//     const input = {
//         name: 'input do post',
//         password: '12345678',
//         type: 'Servidor da CAED',
//       };
//       const AxioPost = await axios.post(
//         'https://sosa-repo.vercel.app/AdminManagement',
//         input
//       );
    
//       const login = {
//         user: input.name,
//         password: input.password,
//       }
    
//       const AxiosLogin = await axios.post(
//         'https://sosa-repo.vercel.app/Login',
//          login,
//       )
//       const token = AxiosLogin.data.Token;
//       //login^

//       const PostParam = {
//         name: 'Thicianae Frata Borges',
//         classStudent: '2022 B TI',
//         type: 'Autorizado'
//         }
//         const AxiosPost = await axios.post('https://sosa-repo.vercel.app/Student', PostParam);    
//         //post para testar o GetOne^

//         const ReturnStudents = await axios.get('https://sosa-repo.vercel.app/Student/Class/' + PostParam.classStudent,
//         {
//             headers: {authorization: token}
//           },
//         )
//         expect(ReturnStudents).toBeDefined();
// }, 15000);

// test("Deve testar o método Delete da classe de estudantes da API", async() => {
//     const input = {
//         name: 'input do post',
//         password: '12345678',
//         type: 'Servidor da CAED',
//       };
//       const AxioPost = await axios.post(
//         'https://sosa-repo.vercel.app/AdminManagement',
//         input
//       );
    
//       const login = {
//         user: input.name,
//         password: input.password,
//       }
    
//       const AxiosLogin = await axios.post(
//         'https://sosa-repo.vercel.app/Login',
//          login,
//       )
//       const token = AxiosLogin.data.Token;
//       //login^
//       const PostParam = {
//         name: 'Thicianae Frata Borges',
//         classStudent: '2022 B TI',
//         type: 'Autorizado'
//         }
//         const AxiosPost = await axios.post('https://sosa-repo.vercel.app/Student', PostParam);    
//         //post para testar o GetOne^

//         const DeleteStudent = await axios.delete('https://sosa-repo.vercel.app/Student/' + AxiosPost.data.Id,
//         {
//             headers: {authorization: token}
//           },
//         );
//         //Delete
//         const AxiosGetOne = await axios.get(
//             'https://sosa-repo.vercel.app/Student/'+ AxiosPost.data.Id,
//             {
//               headers: {authorization: token}
//             },
//         );
//         expect(AxiosGetOne.data.msg).toBe("Estudante não encontrado!");
// }, 15000)

// test("Deve testar o Update da classe de estudantes da API", async() => {
//     const input = {
//         name: 'input do post',
//         password: '12345678',
//         type: 'Servidor da CAED',
//       };
//       const AxioPost = await axios.post(
//         'https://sosa-repo.vercel.app/AdminManagement',
//         input
//       );
    
//       const login = {
//         user: input.name,
//         password: input.password,
//       }
    
//       const AxiosLogin = await axios.post(
//         'https://sosa-repo.vercel.app/Login',
//          login,
//       )
//       const token = AxiosLogin.data.Token;
//       //login^
//       const PostParam = {
//         name: 'Thicianae Frata Borges',
//         classStudent: '2022 B TI',
//         type: 'Autorizado',
//         }
//         const AxiosPost = await axios.post('https://sosa-repo.vercel.app/Student', PostParam);    
//         //post para testar o Update

//         const AxiosPut = await axios.put('https://sosa-repo.vercel.app/Student/' + AxiosPost.data.Id,
//         {},
//         {
//             headers: {authorization: token}
//           },
//         );
//         //Update^
//         const AxiosGetOne = await axios.get(
//             'https://sosa-repo.vercel.app/Student/'+ AxiosPost.data.Id,
//             {
//               headers: {authorization: token}
//             },
//         );
//         //GetOne para testar o Update
//         console.log(AxiosGetOne.data.props.type)
//         expect(AxiosGetOne.data.props.type).toBe('Não autorizado');
// }, 15000);