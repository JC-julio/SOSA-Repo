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
    const isManager = await ManagerModel.find({name: this.props.name})
    if(isManager.length != 0)
      throw new Error("Um usuário com este nome já existe")
    return  await this.model.create({
      name: this.props.name,
      type: this.props.type,
      password: password,
      organizationId: this.props.organizationId,
    });
  }
  
  static async GetOne(managerId) {
    const manager = await ManagerModel.findById(managerId);
    if (!manager)
    throw new Error('Administrador não encontrado')
  return new Manager({
    name: manager.name,
    type: manager.type,
    organizationId: manager.organizationId,
    id: manager.id,
  });
}

static async GetAll(idOrganization) {
  const managers = await ManagerModel.find({organizationId: idOrganization});
  return managers.map(
    (Data) => new Manager({ 
      name: Data.name,
      type: Data.type,
      id: Data.id,
      organizationId: Data.organizationId }),
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

static async Login(user: string, password: string) {
    if(!user)
      throw new Error('Nome de usuário não informado')
    if(!password)
      throw new Error('Senha não informada')
    const [manager] = await ManagerModel.find({name: user})
    if(!manager)
      throw new Error('Nome de usuário inválido!')
      const passwordIsValid = await bcrypt.compare(password, manager['password'])
    if(!passwordIsValid) {
      throw new Error("Senha incorreta");
    } else {
      const token = jwt.sign({managerEntity: manager['id']}, process.env.secretJWTkey, {expiresIn: '7d'});
      const objectReturn = {
        token: token,
        manager: {
            name: manager['name'],
            type: manager['type'],
            id: manager['id'],
            organizationId: manager['organizationId'],
        }
      }
      return objectReturn;
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

  public get organizationId(): string{
    return this.props.organizationId;
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
  organizationId: string;
  id?: string;
};
