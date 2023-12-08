import { model } from 'mongoose';
import { ExitsModel } from './models/ExitsDB';
export default class Exits {
  model = ExitsModel;
  constructor(private props: ExitsDto) {}
  // const Data = new Date();
  // const Data = '04-02-2007';
  // const Data = '04-02-2007T12:00:00';
  async Post() {
    return this.model.create({
      nameStudent: this.nameStudent,
      nameWorker: this.nameWorker,
      time: this.time,
      observes: this.observes,
      dateExit: this.dateExit,
    });
  }

  static async GetOne(ExitID) {
    const exit = await ExitsModel.findById(ExitID);
    return new Exits({
      nameStudent: exit.nameStudent,
      nameWorker: exit.nameWorker,
      time: exit.time,
      observes: exit.observes,
      dateExit: exit.dateExit,
    });
  }

  static async GetAll(){
    const exits = await ExitsModel.find();
    return exits.map((Data) => ({
      NameStudent: Data.nameStudent,
      NameWorker: Data.nameWorker,
      time: Data.time,
      observes: Data.observes,
      dateExit: Data.dateExit,
    }))// transforma a lista recebida em um objeto a cada indice da lista, assim como na classe
       //manager.ts :)  
  }

  static async DeleteAll(){
    await ExitsModel.deleteMany();
  }

  public get nameStudent(): string {
    return this.props.nameStudent;
  }

  public get nameWorker(): string {
    return this.props.nameWorker;
  }

  public get time(): number {
    return this.props.time;
  }

  public get observes(): string {
    return this.props.observes;
  }

  public get dateExit(): Date{
    return this.props.dateExit;
  }

  public set nameStudents(nameStudent: string) {
    this.props.nameStudent = nameStudent;
  }

  public set nameWorker(nameWorker: string) {
    this.props.nameWorker = nameWorker;
  }

  public set time(time: number) {
    this.props.time = time;
  }

  public set observes(observes: string) {
    this.props.observes = observes;
  }

  public set dateExit(DateExit: Date){
    this.props.dateExit = DateExit;
  }
}
export type ExitsDto = {
  nameStudent: string;
  nameWorker: string;
  time: number;
  observes: string;
  dateExit: Date;
};
