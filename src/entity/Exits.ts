import { ExitsModel } from './models/ExitsDB';
export default class Exits {
  model = ExitsModel;
  constructor(private props: ExitsDto) {}
  // const Data = new Date();
  // const Data = '04-02-2007';
  // const Data = '04-02-2007T12:00:00';
  async Post() {
    return this.model.create({
      nameStudent: this.NameStudent,
      nameWorker: this.NameWorker,
      time: this.time,
      observes: this.observes,
    });
  }

  static async GetOne(ExitID) {
    const Exit = await ExitsModel.findById(ExitID);
    return new Exits({
      NameStudent: Exit.nameStudent,
      NameWorker: Exit.nameWorker,
      time: Exit.time,
      observes: Exit.observes,
    });
  }

  public get NameStudent(): string {
    return this.props.NameStudent;
  }

  public get NameWorker(): string {
    return this.props.NameWorker;
  }

  public get time(): number {
    return this.props.time;
  }

  public get observes(): string {
    return this.props.observes;
  }

  public set NameStudents(NameStudent: string) {
    this.props.NameStudent = NameStudent;
  }

  public set NameWorker(nameWorker: string) {
    this.props.NameWorker = nameWorker;
  }

  public set time(time: number) {
    this.props.time = time;
  }

  public set observes(observes: string) {
    this.props.observes = observes;
  }
}
export type ExitsDto = {
  NameStudent: string;
  NameWorker: string;
  time: number;
  observes: string;
};
