import mongoose from 'mongoose';
import Manager from '../../src/entity/Manager';
import Organization from "../../src/entity/Organization"
import Message from "../../src/entity/Message"
import { config } from 'dotenv';
config();

async function login() {
    const validOrganization = {
        name: 'CAED CACOAL',
    }

    const organization = new Organization(validOrganization)
    const postOrganization = await organization.Post()
    const validManager = {
        name: 'Julinho',
        type: 'Servidor da CAED',
        password: '12345678',
        organizationId: postOrganization.id
    }
    const manager = new Manager(validManager) 
    const postmanager = await manager.Post()
    return {
        idManager: postmanager.id,
        organizationId: postOrganization.id,
    }
}

async function postMessage() {
    const newLogin = await login()
    const validMessage = {
        value: 'Turmas não liberadas hoje',
        idManager: newLogin.idManager,
        exibDate: ['segunda-feira', 'Terça-feira', 'quarta-feira', '...'],
        organizationId: newLogin.organizationId
    }
    const message = new Message(validMessage)
    const postmessage = await message.post()
    return postmessage.id
}

test("Deve fazer um post de uma nova mensagem", async() => {
    await mongoose.connect(process.env.connectionString as string);
    const newLogin = await login()
    const validMessage = {
        value: 'Turmas não liberadas hoje',
        idManager: newLogin.idManager,
        exibDate: ['segunda-feira', 'Terça-feira', 'quarta-feira', '...'],
        organizationId: newLogin.organizationId
    }
    const message = new Message(validMessage)
    const postmessage = await message.post()
    expect(postmessage.id).toBeDefined()
}, 15000)