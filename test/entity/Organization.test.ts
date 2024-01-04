import Organization from '../../src/entity/Organization';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();


test("Deve testar o post da classe Organization", async() => {
    await mongoose.connect(process.env.connectionString as string);
    const input = {
        name: 'CAED Cacoal'
    }
    const person = new Organization(input)
    const idPerson = (await person.Post()).id
    expect(idPerson).toBeDefined()
}, 15000)

test("Deve testar o GetOne da classe Organization", async() => {
    const input = {
        name: 'CAED ji-paraná'
    }
    const person = new Organization(input);
    const idPerson = (await person.Post()).id
    const GetPerson = await Organization.GetOne(idPerson);
    expect(GetPerson.name).toBe(input.name);
}, 15000);

test("Deve testar o GetAll da classe Organization", async() => {
    const input = {
        name: 'CAED PVH',
    }
    const person = new Organization(input);
    await person.Post()
    const input1 = {
        name: 'CAED Ariquemes'
    }
    const person1 = new Organization(input1);
    await person1.Post()
    const GetAll = await Organization.GetAll();
    const returnPerson = await GetAll.find((Element) => Element.name == input.name);
    expect(returnPerson?.name).toBe(input.name);
    const returnPerson1 = await GetAll.find((Element) => Element.name == input1.name);
    expect(returnPerson1?.name).toBe(input1.name);
}, 15000)

test("Deve testar o Delete da classe Organization", async() => {
    const input = {
        name: 'Oi! Eu serei apagado!',
    }
    const person = new Organization(input);
    const idPerson = (await person.Post()).id
    await Organization.Delete(idPerson);
}, 15000)