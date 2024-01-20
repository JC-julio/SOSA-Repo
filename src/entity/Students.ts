import { studentsModel } from "./models/StudentDB";

export default class Student{
    model = studentsModel
    constructor(private props: StudentDto){}

    async Post(){
        const hasRegistration = await studentsModel.findOne({registration: this.registration})
        if(hasRegistration)
            throw new Error('Um estudante com a mesma matricula já existe!')
        return this.model.create({
            name: this.name,
            className: this.className,
            type: this.type,
            organizationId: this.organizationId,
            registration: this.registration
        })
    }

    static async GetOne(studentId) {
        const student = await studentsModel.findById(studentId);
        if(!student)
            throw new Error("Estudante não encontrado!")
        return new Student({
            name: student.name,
            className: student.className,
            type: student.type,
            organizationId: student.organizationId,
            registration: student.registration,
            id: student.id,
        })
    }

    static async GetAll(idOrganization) {
        const students = await studentsModel.find({organizationId: idOrganization});
        if(!students || students.length === 0)
            throw new Error("Nenhum aluno encontrado")
        return students.map(
          (Data) => new Student({
            name: Data.name,
            className: Data.className,
            type: Data.type,
            organizationId: Data.organizationId,
            registration: Data.registration,
            id: Data.id,
          }),
        ); //transformar em nova lista
      }

    static async GetByClassName(className, idOrganization){
        const Class = await studentsModel.find({
            $and: [
              { className: className },
              { organizationId: idOrganization }
            ]
        });
        if(!Class)
            throw new Error('Estudante não encontrado!')
        return Class.map((Data) => ({
            name: Data.name,
            type: Data.type,
            className: Data.className,
            organizationId: Data.organizationId,
            registration: Data.registration,
            id: Data.id,
        }));
    }

    static async GetByRegistration(registration, idOrganization) {
    const registrationStudentsEqual = await studentsModel.findOne({
        $and: [
            { registration: registration },
            { organizationId: idOrganization },
        ]
    });
    if(!registrationStudentsEqual)
        throw new Error("Aluno não encontrado!")
    return new Student({
        name: registrationStudentsEqual.name,
        className: registrationStudentsEqual.className,
        type: registrationStudentsEqual.type,
        organizationId: registrationStudentsEqual.organizationId,
        registration: registrationStudentsEqual.registration,
        id: registrationStudentsEqual.id,
    })
    }

    static async Delete(studentId){
        await studentsModel.findByIdAndDelete(studentId);
    }
    
    async Update() {
        await studentsModel.findByIdAndUpdate(this.id, {
          type: this.type,
        });
      }

    public get name(): String {
        return this.props.name;
    }

    public get className(): String {
        return this.props.className;
    }

    public get type(): boolean {
        return this.props.type;
    }
    
    public get id(): string {
        return this.props.id;
    }

    public get organizationId(): string {
        return this.props.organizationId;
    }
    
    public get registration(): string {
        return this.props.registration;
    }

    public set name(name: string) {
        this.props.name = name;
    }

    public set className(className: string) {
        this.props.className = className;
    }

    public set type(type: boolean){
        this.props.type = type;
    }
}

export type StudentDto = {
    name: string,
    className: string,
    type: boolean,
    organizationId: string,
    registration: string,
    id?: string,
}