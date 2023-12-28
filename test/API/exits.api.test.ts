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
}, 15000)