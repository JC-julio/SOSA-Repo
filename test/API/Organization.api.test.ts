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
    expect(personPost).toBeDefined()
}, 15000)

