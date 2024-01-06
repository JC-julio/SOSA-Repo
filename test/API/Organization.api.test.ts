import axios from 'axios';
import { config } from 'dotenv';
config();
axios.defaults.validateStatus = function () {
    return true;
  };


test("Deve testar o post da classe Organization da API", async() => {
    const input = {
        organization: {
            name: 'CAED Cacoal'
        },
        manager: {
            name: 'input do post',
            password: '12345678',
            type: 'Servidor da CAED',
        }
    }
    const personPost = await axios.post('http://localhost:3000/Organization',
    input);
    expect(personPost.data.organizationId).toBeDefined()
    expect(personPost.data.managerId).toBeDefined()
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
    const personPost = await axios.post('https://sosa-repo.vercel.app/Organization',
    input);
    //post para testar o GetOne
    const personGetOne = await axios.get(
        'https://sosa-repo.vercel.app/Organization/' + personPost.data.Id,
        {
            headers:{Authorization: token}
        },
    );
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

    const axiosGetAll = await axios.get('https://sosa-repo.vercel.app/Organization',
    {
        headers:{Authorization: token}
    });
    expect(axiosGetAll.data).toBeDefined();
}, 15000)

test("Deve testar o Delete da classe Organization por API", async() => {
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
        name: 'Oi! Eu serei deletado!'
    }
    const personPost = await axios.post('https://sosa-repo.vercel.app/Organization',
    input);
    //post para deletar

    const axisoDelete = await axios.delete('https://sosa-repo.vercel.app/Organization/' + personPost.data.Id,
    {
        headers:{Authorization: token}
    });
    //delete

    const personGetOne = await axios.get(
        'https://sosa-repo.vercel.app/Organization/' + personPost.data.Id,
        {
            headers:{Authorization: token}
        },
    );
    expect(personGetOne.data.msg).toBe("Organização não encontrada!");
}, 15000)