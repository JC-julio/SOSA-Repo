import axios from 'axios';
import { config } from 'dotenv';
config();
axios.defaults.validateStatus = function () {
    return true;
  };


test("Deve testar o post da classe Organization da API", async() => {
    const input = {
        name: 'CAED Cacoal'
    }
    const personPost = await axios.post('http://localhost:3000/Organization',
    input);
    console.log(personPost.data.Id)
    console.log(personPost.data)
    expect(personPost.data.Id).toBeDefined()
}, 15000)

test("Deve testar o GetOne da classe Organization da API", async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678',
        type: 'Servidor da CAED',
    };
    const AxiosPost = await axios.post(
        'https://sosa-repo.vercel.app/AdminManagement',
        inputLogin
    );
    
    const login = {
        user: inputLogin.name,
        password: inputLogin.password,
    }
    const AxiosLogin = await axios.post(
        'https://sosa-repo.vercel.app/Login',
         login,
    )
    const token = AxiosLogin.data.Token;
    //login^

    const input = {
        name: 'CAED Ji-paraná'
    }
    const personPost = await axios.post('http://localhost:3000/Organization',
    input);
    console.log("id:" + personPost.data.Id)
    //post para testar o GetOne
    console.log('fiz o post')
    const personGetOne = await axios.get(
        'http://localhost:3000/Organization/' + personPost.data.Id,
        {
            headers:{Authorization: token}
        },
    );
    console.log(personGetOne.data)
    expect(personGetOne.data.props.name).toBe(input.name)
},  15000)

test("Deve testar o GetAll da classe Organization por API", async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678',
        type: 'Servidor da CAED',
    };
    const AxiosPost = await axios.post(
        'https://sosa-repo.vercel.app/AdminManagement',
        inputLogin
    );
    
    const login = {
        user: inputLogin.name,
        password: inputLogin.password,
    }
    const AxiosLogin = await axios.post(
        'https://sosa-repo.vercel.app/Login',
         login,
    )
    const token = AxiosLogin.data.Token;
    //login^

    const axiosGetAll = await axios.get('http://localhost:3000/Organization',
    {
        headers:{Authorization: token}
    });
    console.log(axiosGetAll.data)
    expect(axiosGetAll.data).toBeDefined();
}, 15000)