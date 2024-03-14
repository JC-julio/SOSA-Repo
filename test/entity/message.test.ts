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
    const randoName = Math.random().toString(36).slice(-15);
    const validManager = {
        name: randoName,
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

async function postMessage(organizationId?) {
    const newLogin = await login()
    const validMessage = {
        value: 'Turmas não liberadas hoje',
        idManager: newLogin.idManager,
        exibDate: ['segunda-feira', 'Terça-feira', 'quarta-feira', '...'],
        organizationId: organizationId || newLogin.organizationId
    }
    const message = new Message(validMessage)
    const postmessage = await message.post()
    return {
        id: postmessage.id,
        organizationId: newLogin.organizationId,
        idManager: newLogin.idManager
    }
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

test("Deve testar o GetOne da entidade Message", async() => {
    await mongoose.connect(process.env.connectionString as string);
    const newMessage = await postMessage()
    const message = await Message.getOne(newMessage.id)
    console.log(message)
    expect(message!.value).toBeDefined()
    expect(message!.idManager).toBeDefined()
    expect(message!.exibDate).toBeDefined()
    expect(message!.organizationId).toBeDefined()
    expect(message!.id).toBeDefined()
}, 15000)

test("Deve testar o GetAll da entidade Message", async() => {
    await mongoose.connect(process.env.connectionString as string);
    const newMessage = await postMessage()
    const newMessage1 = await postMessage(newMessage.organizationId)
    const getMessages = await Message.GetAll(newMessage.organizationId)
    const getMessageId = getMessages.find((element) => element.id === newMessage.id)
    expect(getMessageId).toBeDefined()
    const getMessageId1 = getMessages.find((element) => element.id === newMessage1.id)
    expect(getMessageId1).toBeDefined()
}, 15000)

test("Deve testar o delete da entidade Message", async() => {
    await mongoose.connect(process.env.connectionString as string);
    const newMessage = await postMessage()
    await Message.delete(newMessage.id)
    expect(async() => await Message.getOne(newMessage.id)).rejects.toThrow(new Error("nenhuma mensagem encontrada"))
}, 15000)

test("Deve testar o updateAll da entidade Message", async() => {
    await mongoose.connect(process.env.connectionString as string);
    const newMessage = await postMessage()
    const putMessage = {
        value: 'Todo mundo liberado',
        idManager: newMessage.idManager,
        exibDate: ['aaaaaaa', 'aaaaaaaaa', 'saaaaaaa']
    }
    const message = await Message.getOne(newMessage.id)
    message.value = putMessage.value
    message.idManager = putMessage.idManager
    message.exibDate = putMessage.exibDate
    await message.updateAll()
    const getMessage = await Message.getOne(newMessage.id)
    expect(getMessage.value).toBe('Todo mundo liberado')
    expect(getMessage.idManager).toBe(putMessage.idManager)
    expect(getMessage.exibDate[0]).toBe(putMessage.exibDate[0])
}, 15000)