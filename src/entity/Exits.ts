import { ExitsModel } from './models/ExitsDB';
import { error } from 'console';
export default class Exits {
  model = ExitsModel;
  constructor(private props: ExitsDto) {}
  // const Data = new Date();
  // const Data = '04-02-2007';
  // const Data = '04-02-2007T12:00:00';
  async Post() {
    return this.model.create({
      idStudent: this.idStudent,
      idWorker: this.idWorker,
      organizationId: this.organizationId,
      time: 30,
      observes: this.observes,
      dateExit: this.dateExit,
      confirmExit: 'Saída em progresso',
    });
  }

  static async GetOne(ExitID) {
    const exit = await ExitsModel.findById(ExitID);
    if (!exit)
      throw new error("Registro não encontrado")
    return new Exits({
      idStudent: exit.idStudent,
      idWorker: exit.idWorker,
      organizationId: exit.organizationId,
      time: exit.time,
      observes: exit.observes,
      dateExit: exit.dateExit,
      confirmExit: exit.confirmExit,
      id: exit.id,
    });
  }

  static async GetExits(DateInit: Date, DateEnd: Date, idOrganization: String) {
    const saidas = await ExitsModel.find({
      $and: [
      {dateExit: { $gte: DateInit, $lte: DateEnd } },
      {organizationId: idOrganization},
    ]
    });
    // Mapeia cada item e ordena dentro da função map
    const formattedExits = saidas.map((Data) => ({
      idStudent: Data.idStudent,
      idWorker: Data.idWorker,
      organizationId: Data.organizationId,
      time: Data.time,
      observes: Data.observes,
      dateExit: Data.dateExit,
      confirmExit: Data.confirmExit,
      id: Data.id,
    })).sort((a, b) => a.dateExit.getTime() - b.dateExit.getTime());
    return formattedExits;
  }


  static async GetAll(idOrganization){
    const exits = await ExitsModel.find({organizationId: idOrganization});
    return exits.map((Data) => ({
      idStudent: Data.idStudent,
      idWorker: Data.idStudent,
      organizationId: Data.organizationId,
      time: Data.time,
      observes: Data.observes,
      dateExit: Data.dateExit,
      confirmExit: Data.confirmExit,
      id: Data.id,
    }))// transforma a lista recebida em um objeto a cada indice da lista, assim como na classe
       //manager.ts :)  
  }

  static async DeleteAll(idOrganization){
    const ExitsByOrgazanizationId = ExitsModel.find({organizationId: idOrganization})
    await ExitsByOrgazanizationId.deleteMany();
  }

  async Update() {
    await ExitsModel.findByIdAndUpdate(this.id, {
    confirmExit: this.confirmExit,
    })
    return this.confirmExit
  }

  public get idStudent(): string {
    return this.props.idStudent;
  }

  public get idWorker(): string {
    return this.props.idWorker;
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

  public get id(): string{
    return this.props.id;
  }

  public get confirmExit(): string {
    return this.props.confirmExit;
  }

  public get organizationId(): string {
    return this.props.organizationId;
  }

  public set idStudent(idStudent: string) {
    this.props.idStudent = idStudent;
  }

  public set idWorker(idWorker: string) {
    this.props.idWorker = idWorker;
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

  public set confirmExit(confirmExit: string) {
    this.props.confirmExit = confirmExit;
  }
}
export type ExitsDto = {
  idStudent: string;
  idWorker: string;
  organizationId: string;
  time?: number;
  observes: string;
  dateExit: Date;
  confirmExit?: string;
  id?: string,
};