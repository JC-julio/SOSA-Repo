import StudentClass from '../../src/entity/Class';
import mongoose, { mongo } from 'mongoose';
import { config } from 'dotenv';
config();

test('testar a classe Class.ts, métodos tradiconais', () => {
    const input = {
        nameClass: '2021 B TI',
    } 

    const Class = new StudentClass(input);
    expect(Class.nameClass).toBe(input.nameClass);
}, 15000);

test('Devete testar o post e o GetOne da classe Class.ts', async () => {
    const input = {
        nameClass: '2022 B TI',
    }

    const Class = new StudentClass(input);
    await mongoose.connect(process.env.connectionString);
    const ClassId = (await Class.Post())._id;
    const GetClass = await StudentClass.GetOne(ClassId);
    expect(GetClass.nameClass).toBe(input.nameClass);
    await mongoose.connection.close();
}, 15000)

test('Deve testar o GetAll da classe Class.ts',async () => {
    const input = {
        nameClass: '2022 B AGRO',
    };

    const input2 = {
        nameClass: '2021 B AGROTEC',
    };
    await mongoose.connect(process.env.connectionString);
    const Class = new StudentClass(input);
    Class.Post();
    const Class1 = new StudentClass(input2);
    Class1.Post();
    //OI
    const Classes = await StudentClass.GetAll();
    const ReturnClasses = Classes.find((Element) => Element.nameClass == input.nameClass);//buscar pelo mesmo nome dentro da lista retornada
    expect(ReturnClasses.nameClass).toBe(input.nameClass);
    const ReturnClasses1 = Classes.find((Element) => Element.nameClass == input2.nameClass);//buscar pelo mesmo nome dentro da lista retornada
    expect(ReturnClasses1.nameClass).toBe(input2.nameClass);
}, 15000)