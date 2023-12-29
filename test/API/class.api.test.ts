import axios from 'axios';
import { config } from 'dotenv';
config();
axios.defaults.validateStatus = function () {
    return true;
  };

test("Deve testar o post das classe de turmas da API", async() => {
    const input = {
        name: "2022 A TI"
    }

    const AxiosPost = await axios.post('http://localhost:3000/Class',
    input);
    // console.log(AxiosPost.data.Id)
    expect(AxiosPost.data).toBeDefined();
}, 15000)

test('Deve testar o GetOne da classe de turmas da API', async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678',
        type: 'Servidor da CAED',
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/AdminManagement',
        inputLogin
    );
    
    const login = {
        user: inputLogin.name,
        password: inputLogin.password,
    }
    const AxiosLogin = await axios.post(
        'http://localhost:3000/Login',
         login,
    )
    const token = AxiosLogin.data.Token;
    //login^

    const input = {
        name: "2022 A TI"
    }
    const postForGet = await axios.post('http://localhost:3000/Class',
    input);
    //post para testar o GetOne

    const AxiosGetOne = await axios.get('http://localhost:3000/Class/' + postForGet.data.Id,
    {
        headers: {authorization: token}
      },
    );
    expect(AxiosGetOne.data.props.name).toEqual(input.name);
}, 15000)

test("Deve testar o GetAll da classe de turmas da API", async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678',
        type: 'Servidor da CAED',
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/AdminManagement',
        inputLogin
    );
    
    const login = {
        user: inputLogin.name,
        password: inputLogin.password,
    }
    const AxiosLogin = await axios.post(
        'http://localhost:3000/Login',
         login,
    )
    const token = AxiosLogin.data.Token;
    //login^

    const GetAll = await axios.get('http://localhost:3000/Class', 
    {
        headers: {authorization: token}
      },
    );
    // console.log(GetAll.data);
    expect(GetAll.data).toBeDefined();
}, 15000)

test('Deve testar o Delete da classe de turmas da API', async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678',
        type: 'Servidor da CAED',
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/AdminManagement',
        inputLogin
    );
    
    const login = {
        user: inputLogin.name,
        password: inputLogin.password,
    }
    const AxiosLogin = await axios.post(
        'http://localhost:3000/Login',
         login,
    )
    const token = AxiosLogin.data.Token;
    //login^

    const input = {
        name: "Oi, eu serei deletado!"
    }
    const PostForDelete = await axios.post('http://localhost:3000/Class',
    input);
    //Post para deletar logo em seguida

    const AxiosDelete = await axios.delete("http://localhost:3000/Class/" + PostForDelete.data.Id,
    {
        headers: {authorization: token}
    },
    )

    const AxiosGetOne = await axios.get('http://localhost:3000/Class/' + PostForDelete.data.Id,
    {
        headers: {authorization: token}
      },
    );
    console.log(AxiosGetOne.data.error)
    expect(AxiosGetOne.data.error).toBe("Turma não encontrada");
}, 15000)