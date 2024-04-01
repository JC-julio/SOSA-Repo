"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExitsDB_1 = require("./models/ExitsDB");
class Exits {
    constructor(props) {
        this.props = props;
        this.model = ExitsDB_1.ExitsModel;
    }
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
        const exit = await ExitsDB_1.ExitsModel.findById(ExitID);
        if (!exit)
            throw new Error("Registro não encontrado");
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
    static async GetExits(DateInit, DateEnd, idOrganization) {
        const saidas = await ExitsDB_1.ExitsModel.find({
            $and: [
                { dateExit: { $gte: DateInit, $lte: DateEnd } },
                { organizationId: idOrganization },
            ]
        });
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
    static async GetAll(idOrganization) {
        const exits = await ExitsDB_1.ExitsModel.find({ organizationId: idOrganization });
        return exits.map((Data) => ({
            idStudent: Data.idStudent,
            idWorker: Data.idWorker,
            organizationId: Data.organizationId,
            time: Data.time,
            observes: Data.observes,
            dateExit: Data.dateExit,
            confirmExit: Data.confirmExit,
            id: Data.id,
        }));
    }
    static async DeleteAll(idOrganization) {
        const ExitsByOrgazanizationId = ExitsDB_1.ExitsModel.find({ organizationId: idOrganization });
        await ExitsByOrgazanizationId.deleteMany();
    }
    async Update() {
        await ExitsDB_1.ExitsModel.findByIdAndUpdate(this.id, {
            confirmExit: this.confirmExit,
        });
        return this.confirmExit;
    }
    get idStudent() {
        return this.props.idStudent;
    }
    get idWorker() {
        return this.props.idWorker;
    }
    get time() {
        return this.props.time;
    }
    get observes() {
        return this.props.observes;
    }
    get dateExit() {
        return this.props.dateExit;
    }
    get id() {
        return this.props.id;
    }
    get confirmExit() {
        return this.props.confirmExit;
    }
    get organizationId() {
        return this.props.organizationId;
    }
    set idStudent(idStudent) {
        this.props.idStudent = idStudent;
    }
    set idWorker(idWorker) {
        this.props.idWorker = idWorker;
    }
    set time(time) {
        this.props.time = time;
    }
    set observes(observes) {
        this.props.observes = observes;
    }
    set dateExit(DateExit) {
        this.props.dateExit = DateExit;
    }
    set confirmExit(confirmExit) {
        this.props.confirmExit = confirmExit;
    }
}
exports.default = Exits;
//# sourceMappingURL=Exits.js.map