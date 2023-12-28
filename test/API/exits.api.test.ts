import axios from 'axios';
import { config } from 'dotenv';
config();

test('Deve testar o post das classe de saídas da API', async () => {
    const input = {
        nameStudent: 'Julio',
        nameWorker: 'Ana',
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date(),
        confirmExit: false,
    };

    const AxiosPost = await axios.post(
        'http://localhost:3000/ExitsManagement',
        input
    )
    expect(AxiosPost.data).toBeDefined();
}, 15000);

test('Deve testar o GetOne da classe exits da API', async() => {
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
        nameStudent: 'Júlio César Aguiar',
        nameWorker: 'Ana',
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date(),
        confirmExit: false,
    };

    const AxiosOutput = await axios.post(
        'http://localhost:3000/ExitsManagement',
        input
    )
    //post^
    // console.log(AxiosOutput.data.Id
    
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/ExitsManagement/'+ AxiosOutput.data.Id,
        {
          headers: {authorization: token}
        },
      );
        // console.log(AxiosGetOne.data)
      expect(AxiosGetOne.data.props.nameStudent).toBe(input.nameStudent);
      expect(AxiosGetOne.data.props.nameWorker).toBe(input.nameWorker);
      expect(AxiosGetOne.data.props.time).toBe(input.time)
      expect(AxiosGetOne.data.props.observes).toBe(input.observes)
      expect(AxiosGetOne.data.props.dateExit).toEqual(input.dateExit.toISOString());
      expect(AxiosGetOne.data.props.confirmExit).toBe(input.confirmExit)
}, 15000);

test("Deve testar o GetExits da classe de saídas da API", async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678', 
        type: 'Servidor da CAED',
    };
    const AxiosPostLogin = await axios.post(
        'http://localhost:3000/ExitsManagement',
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
    
    // console.log('oi')
    const input = {
        nameStudent: 'Júlio César Aguiar',
        nameWorker: 'Ana',
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('01-01-2001'),
        confirmExit: false,
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/ExitsManagement',
         input,
    )
    // console.log('oi de novo')
    const input1 = {
        nameStudent: 'Júlio César Aguiar',
        nameWorker: 'Ana',
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2007'),
        confirmExit: false,
    };
    const AxiosPost1 = await axios.post(
        'http://localhost:3000/ExitsManagement',
         input1,
    )
    // console.log('oi, sou eu de novo')
    const input2 = {
        nameStudent: 'Júlio César Aguiar',
        nameWorker: 'Ana',
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2013'),
        confirmExit: false,
    };
    const AxiosPost2 = await axios.post(
        'http://localhost:3000/ExitsManagement',
         input2,
    )
//posts^
    const GetExits = await axios.get('http://localhost:3000/ExitsManagement/' + input.dateExit + '/' + input2.dateExit,
    {
        headers: { authorization: token },
    }
    );
    expect(GetExits.data).toBeDefined();
}, 15000)

test("Deve testar o GetAll da classe de saídas da API", async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678', 
        type: 'Servidor da CAED',
    };
    const AxiosPostLogin = await axios.post(
        'http://localhost:3000/ExitsManagement',
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
    const GetAll = await axios.get('http://localhost:3000/ExitsManagement',
    {
        headers: { authorization: token },
    });
    expect(GetAll.data).toBeDefined();
}, 15000)

test("Deve testar o DeleteAll da classe de saídas da API", async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678', 
        type: 'Servidor da CAED',
    };
    const AxiosPostLogin = await axios.post(
        'http://localhost:3000/ExitsManagement',
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

    const DeleteAll = await axios.delete('http://localhost:3000/ExitsManagement',
    {
        headers: { authorization: token },
    });
    // console.log(DeleteAll.status)
    expect(DeleteAll.status).toBe(200)
}, 15000)

test("Deve testar o Update da classe de saídas da API", async() => {
    const inputLogin = {
        name: 'input do post',
        password: '12345678', 
        type: 'Servidor da CAED',
    };
    const AxiosPostLogin = await axios.post(
        'http://localhost:3000/ExitsManagement',
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
        nameStudent: 'Júlio César Aguiar',
        nameWorker: 'Ana Paula Risscher',
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2023'),
        confirmExit: false,
    };
    const AxiosPost = await axios.post(
        'http://localhost:3000/ExitsManagement',
         input,
    )
    //post para teste^
    
    const update = await axios.put('http://localhost:3000/ExitsManagement/'+ AxiosPost.data.Id,
    {},
    {
        headers: {authorization: token}
      },
    )
    //update^
    const AxiosGetOne = await axios.get(
        'http://localhost:3000/ExitsManagement/'+ AxiosPost.data.Id,
        {
          headers: {authorization: token}
        },
      );
      console.log(AxiosGetOne.data.props.confirmExit)
      //GetOne para verificar se a mudança realmente ocorreu
      expect(AxiosGetOne.data.props.confirmExit).toBe(true)
    }, 15000)