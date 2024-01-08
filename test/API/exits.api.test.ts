import axios from 'axios';
import { config } from 'dotenv';
config();
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
axios.defaults.validateStatus = function () {
return true;
};
async function login() {
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
  console.log(inputLogin)
  const organizationPost = await axios.post('http://localhost:3000/Organization',
  input);
  console.log(organizationPost.data)
  await delay(1000)
  const newLogin = await axios.post('http://localhost:3000/Admin/Login',
  inputLogin
  );
  console.log(newLogin.data.msg)
//   const returnLogin = {
//     organizationId: organizationPost.data.organizationId,
//     managerId: organizationPost.data.manager,
//     token: newLogin.data.Token,
//   };
//   console.log(returnLogin)
//   return returnLogin;
  }

test.only('Deve testar o post da classe de saídas da API', async () => {
    const newLogin = await login()
    console.log(newLogin)
    const inputStudent = {
        name: 'Julio César Aguiar',
        classStudent: '2022 A TI',
        type: 'Autorizado'
    }
    const PostStudent = await axios.post(
    'https://sosa-repo.vercel.app/Student',
    inputStudent);
    //post do estudante    

    const inputManager = {
        name: 'Bruna',
        password: '12345678',
        type: 'Servidor da CAED',
      };
      const AxiosOutput = await axios.post(
        'https://sosa-repo.vercel.app/AdminManagement',
        inputManager
      );
      //post do servidor da CAED
      
    const input = {
        idStudent: PostStudent.data.Id,
        idWorker: AxiosOutput.data.Id,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date(),
        confirmExit: false,
    };

    const AxiosPost = await axios.post(
        'https://sosa-repo.vercel.app/Exits/' + input.idStudent + '/' + input.idWorker,
        input
    );
    
    expect(AxiosPost.data).toBeDefined();
}, 15000);

test('Deve testar o GetOne da classe exits da API', async() => {
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
    
    const inputStudent = {
        name: 'Julio César Aguiar',
        classStudent: '2022 A TI',
        type: 'Autorizado'
    }
    const PostStudent = await axios.post(
    'https://sosa-repo.vercel.app/Student',
    inputStudent);
    //post do estudante    

    const inputManager = {
        name: 'Bruna',
        password: '12345678',
        type: 'Servidor da CAED',
      };
      const PostManager = await axios.post(
        'https://sosa-repo.vercel.app/AdminManagement',
        inputManager
      );
      //post do servidor da CAED
      
    const input = {
        idStudent: PostStudent.data.Id,
        idWorker: PostManager.data.Id,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date(),
        confirmExit: false,
    };

    const AxiosOutput = await axios.post(
        'https://sosa-repo.vercel.app/Exits/' + input.idStudent + '/' + input.idWorker,
        input
    )
    //post^
    // console.log(AxiosOutput.data.Id
    
    const AxiosGetOne = await axios.get(
        'https://sosa-repo.vercel.app/Exits/'+ AxiosOutput.data.Id,
        {
          headers: {authorization: token}
        },
      );
        // console.log(AxiosGetOne.data)
      expect(AxiosGetOne.data.props.idStudent).toBe(input.idStudent);
      expect(AxiosGetOne.data.props.idWorker).toBe(input.idWorker);
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
    
    const inputStudent = {
        name: 'Julio César Aguiar',
        classStudent: '2022 A TI',
        type: 'Autorizado'
    }
    const PostStudent = await axios.post(
    'https://sosa-repo.vercel.app/Student',
    inputStudent);
    //post do estudante    

    const inputManager = {
        name: 'Bruna',
        password: '12345678',
        type: 'Servidor da CAED',
      };
    const PostManager = await axios.post(
        'https://sosa-repo.vercel.app/AdminManagement',
        inputManager
      );
      //post do servidor da CAED

    const input = {
        idStudent: PostStudent.data.Id,
        idWorker: PostManager.data.Id,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('01-01-2001'),
        confirmExit: false,
    };
    const AxiosPost = await axios.post(
        'https://sosa-repo.vercel.app/Exits/' + input.idStudent + '/' + input.idWorker,
         input,
    )

    const input1 = {
        idStudent: PostStudent.data.Id,
        idWorker: PostManager.data.Id,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('04-02-2007'),
        confirmExit: false,
    };
    const AxiosPost1 = await axios.post(
        'https://sosa-repo.vercel.app/Exits/' + input1.idStudent + '/' + input1.idWorker,
         input1,
    )
    // console.log('oi, sou eu de novo')
    const input2 = {
        idStudent: PostStudent.data.Id,
        idWorker: PostManager.data.Id,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2013'),
        confirmExit: false,
    };
    const AxiosPost2 = await axios.post(
        'https://sosa-repo.vercel.app/Exits/' + input2.idStudent + '/' + input2.idWorker,
         input2,
    )
//posts^
    const GetExits = await axios.get('https://sosa-repo.vercel.app/Exits/' + input.dateExit + '/' + input2.dateExit,
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

    const GetAll = await axios.get('https://sosa-repo.vercel.app/Exits',
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

    const DeleteAll = await axios.delete('https://sosa-repo.vercel.app/Exits',
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

    const inputStudent = {
        name: 'Julio César Aguiar',
        classStudent: '2022 A TI',
        type: 'Autorizado'
    }
    const PostStudent = await axios.post(
    'https://sosa-repo.vercel.app/Student',
    inputStudent);
    //post do estudante    

    const inputManager = {
        name: 'Bruna',
        password: '12345678',
        type: 'Servidor da CAED',
      };
    const PostManager = await axios.post(
        'https://sosa-repo.vercel.app/AdminManagement',
        inputManager
    );
    //post do servidor da CAED

    const input = {
        idStudent: PostStudent.data.Id,
        idWorker: PostManager.data.Id,
        time: 15,
        observes: 'Isso aqui está nos testes de API',
        dateExit: new Date('12-12-2023'),
        confirmExit: false,
    };
    const AxiosPost = await axios.post(
        'https://sosa-repo.vercel.app/Exits/' + input.idStudent + '/' + input.idWorker,
         input,
    )
    //post para teste^
    
    const update = await axios.put('https://sosa-repo.vercel.app/Exits/'+ AxiosPost.data.Id,
    {},
    {
        headers: {authorization: token}
      },
    )
    //update^
    const AxiosGetOne = await axios.get(
        'https://sosa-repo.vercel.app/Exits/'+ AxiosPost.data.Id,
        {
          headers: {authorization: token}
        },
      );
      console.log(AxiosGetOne.data.props.confirmExit)
      //GetOne para verificar se a mudança realmente ocorreu
      expect(AxiosGetOne.data.props.confirmExit).toBe(true)
    }, 15000)