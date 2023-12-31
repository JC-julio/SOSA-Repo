import { ManagerModel } from '../entity/models/ManagerDB';
import { TokenModel } from '../entity/models/BlackListDB';
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { config } from 'dotenv';
config();

export default class Manager {
  model = ManagerModel;
  TokenDB = TokenModel;
  
  constructor(private props: ManagerDto) {}

  async Post() {
    const password = await bcrypt.hash(this.props.password, 6);
    return this.model.create({
      name: this.name,
      type: this.type,
      password: password,
    });
  }
  
  static async Login(user: string, password: string) {
    if(!user)
      throw new Error('Nome de usuário não informado ou inválido!')
    if(!password)
      throw new Error('Senha não informado ou não encontrada!')
    const manager = await ManagerModel.find({name: user})
    if(!manager)
      throw new Error('Nome de usuário não informado ou inválido!')
      const ComparePassword = bcrypt.compare(password, manager[0]['password'])
    if(ComparePassword) {
      const token = jwt.sign({managerEntity: manager['id']}, process.env.secretJWTkey, {expiresIn: '7d'});
      return token;
    } else {
      throw new Error("Nome de usuário ou senha incorretos");
    }
  }

  static async logout(Token: String){
    const countToken = await TokenModel.find().countDocuments();
    if(countToken >= 30){
      console.log(countToken)
      await TokenModel.deleteMany();
    }
    const tokenVerificado = jwt.verify(Token, process.env.secretJWTkey)
    if(tokenVerificado){
      return TokenModel.create({
      bannedToken: Token,
      })
    } else {
      throw new Error("Token inválido")
    }
  }
  
  static async GetOne(managerId) {
    const manager = await ManagerModel.findById(managerId);
    if (!manager)
      throw new Error("Usuario não encontrado");
    return new Manager({
      name: manager.name,
      type: manager.type,
      id: manager.id,
    });
  }

  static async GetAll() {
    const managers = await ManagerModel.find();
    return managers.map(
      (Data) => new Manager({ name: Data.name, type: Data.type, id: Data.id }),
    ); //transformar em nova lista
  }

  static async Delete(managerId) {
    await ManagerModel.findByIdAndDelete(managerId);
  }

  async Update() {
    await ManagerModel.findByIdAndUpdate(this.id, {
      type: this.type,
    });
  }

  public get name(): string {
    return this.props.name;
  }

  public get password(): string {
    return this.props.password;
  }

  public get type(): string {
    return this.props.type;
  }

  public get id(): string {
    return this.props.id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public set type(type: string) {
    this.props.type = type;
  }
}

export type ManagerDto = {
  name: string;
  password?: string;
  type: string;
  id?: string;
};
