import axios from 'axios';
import { config } from 'dotenv';
config();
axios.defaults.validateStatus = function () {
    return true;
  };

test("Deve testar o post da classe de estudamtes da API",async() => {
const input = {
    name: 'Julio César Aguiar',
    classStudent: '2022 A TI',
    type: 'Autorizado'
}
const AxiosPost = await axios.post('http://localhost:3000/Student', input);

expect(AxiosPost.data.Id).toBeDefined();
}, 15000)

test("Deve testar o GetOne da classe de estudantes da API", async() => {
    const input = {
        name: 'input do post',
        password: '12345678',
        type: 'Servidor da CAED',
      };
      const AxioPost = await axios.post(
        'http://localhost:3000/AdminManagement',
        input
      );
    
      const login = {
        user: input.name,
        password: input.password,
      }
    
      const AxiosLogin = await axios.post(
        'http://localhost:3000/Login',
         login,
      )
      const token = AxiosLogin.data.Token;
      //login^
    const PostParam = {
        name: 'Julio César Aguiar',
        classStudent: '2022 A TI',
        type: 'Autorizado'
    }
    const AxiosPost = await axios.post('http://localhost:3000/Student', PostParam);    
    //post para testar o GetOne^

    const AxiosGetOne = await axios.get(
        'http://localhost:3000/Student/'+ AxiosPost.data.Id,
        {
          headers: {authorization: token}
        },
      );
    // console.log(AxiosGetOne.data);
    expect(AxiosGetOne.data.props.name).toBe(PostParam.name);
    expect(AxiosGetOne.data.props.classStudent).toBe(PostParam.classStudent);
    expect(AxiosGetOne.data.props.type).toBe(PostParam.type);
}, 15000);

test("Deve testar o GetbyClass da classe de estudantes da API", async() => {
    const input = {
        name: 'input do post',
        password: '12345678',
        type: 'Servidor da CAED',
      };
      const AxioPost = await axios.post(
        'http://localhost:3000/AdminManagement',
        input
      );
    
      const login = {
        user: input.name,
        password: input.password,
      }
    
      const AxiosLogin = await axios.post(
        'http://localhost:3000/Login',
         login,
      )
      const token = AxiosLogin.data.Token;
      //login^

      const PostParam = {
        name: 'Thicianae Frata Borges',
        classStudent: '2022 B TI',
        type: 'Autorizado'
        }
        const AxiosPost = await axios.post('http://localhost:3000/Student', PostParam);    
        //post para testar o GetOne^

        const ReturnStudents = await axios.get('http://localhost:3000/Student/Class/' + PostParam.classStudent,
        {
            headers: {authorization: token}
          },
        )

        expect(ReturnStudents).toBeDefined();
}, 15000)