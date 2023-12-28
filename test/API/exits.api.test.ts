import axios from 'axios';
import { config } from 'dotenv';
config();
axios.defaults.validateStatus = function () {
    return true;
};

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
    console.log(AxiosOutput.data.Id)
    
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