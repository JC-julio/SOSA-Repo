import { ManagerModel } from '../entity/models/ManagerDB';
import * as bcrypt from 'bcrypt';

export default class Manager {
  model = ManagerModel;
  constructor(private props: ManagerDto) { }
  async Post() {
    const password = await bcrypt.hash(this.props.password, 6);
    return this.model.create({
      name: this.name,
      type: this.type,
      password: password,
    });
  }
  static async GetOne(managerId) {
    const manager = await ManagerModel.findById(managerId);
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
    console.log(managers);
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
