import { ExitsModel } from './models/ExitsDB';
export default class Exits {
  model = ExitsModel;
  constructor(private props: ExitsDto) {}

  async Post() {
    return this.model.create({
      nameStudent: this.NameStudent,
      nameWorker: this.NameWorker,
      time: this.time,
      observes: this.observes,
    });
  }

  public get NameStudent(): string {
    return this.props.NameStudent;
  }

  public get NameWorker(): string {
    return this.props.NameWorker;
  }

  public get time(): string {
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

  public set time(time: string) {
    this.props.time = time;
  }

  public set observes(observes: string) {
    this.props.observes = observes;
  }
}
export type ExitsDto = {
  NameStudent: string;
  NameWorker: string;
  time: string;
  observes: string;
};
