import { studentsModel } from "./models/StudentDB";

export default class Student{
    constructor(private props: StudentDto){}
    model = studentsModel

    async Post(idOrganization){
        const hasRegistration = await studentsModel.findOne({registration: this.registration})
        if(hasRegistration && hasRegistration.organizationId == idOrganization)
            throw new Error('Um estudante com a mesma matricula já existe!')
        return this.model.create({
            name: this.name,
            className: this.className,
            type: this.type,
            organizationId: this.organizationId,
            registration: this.registration,
            additionalInfo: this.additionalInfo,
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
            additionalInfo: student.additionalInfo,
        })
    }

    static async GetAll(idOrganization) {
        const students = await studentsModel.find({organizationId: idOrganization});
        return students.map(
          (Data) => new Student({
            name: Data.name,
            className: Data.className,
            type: Data.type,
            organizationId: Data.organizationId,
            registration: Data.registration,
            id: Data.id,
            additionalInfo: Data.additionalInfo,
          })
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
            additionalInfo: Data.additionalInfo,
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
        registration: registrationStudentsEqual.registration,
        additionalInfo: registrationStudentsEqual.additionalInfo,
        id: registrationStudentsEqual.id,
        organizationId: registrationStudentsEqual.organizationId,
    })
    }

    static async Delete(studentId){
        await studentsModel.findByIdAndDelete(studentId);
    }

    static async DeteleByClassName(className, idOrganization) {
        const Class = await studentsModel.find({
            $and: [
              { className: className },
              { organizationId: idOrganization }
            ]
        }).deleteMany();
        if(!Class || Class.length === 0)
        throw new Error("Nenhum aluno encontrado")
    }

    
    static async updateClass(objectStudent) {
        if(objectStudent.className[0] === '1') {
            const newNameClass = objectStudent.className = '2' + objectStudent.className.slice(1);
            await studentsModel.findByIdAndUpdate(objectStudent.id, {
                className: newNameClass,
            });
        } else if(objectStudent.className[0] === '2') {
            objectStudent.className = '3' + objectStudent.className.slice(1);
            await studentsModel.findByIdAndUpdate(objectStudent.id, {
                className: objectStudent.className,
            });
        } else if(objectStudent.className[0] === '3') {
            throw new Error('Aluno do terceiro ano');
        }
    }
    
    static async doUpdate(idOrganization, listaAlunos) {
        const allStudents = await this.GetAll(idOrganization);
        for (let element of allStudents) {
            if (listaAlunos.includes(element.id)) {
                console.log(element.name)
                continue;
            }
            else if (element.className[0] === "1" || element.className[0] === '2') {
                await this.updateClass(element);
            } else if(element.className[0] === '3') {
                await element.model.findByIdAndDelete(element.id);
            } else {
                throw new Error("nenhuma condição atendida")
            }
        }
    }
    
    async Update() {
        await studentsModel.findByIdAndUpdate(this.id, {
            type: this.type,
        });
    }
    
    async updateAll() {
        await studentsModel.findByIdAndUpdate(this.id, {
            name: this.name,
            className: this.className,
            type: this.type,
            registration: this.registration,
            additionalInfo: this.additionalInfo,
        })
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
    
    public get additionalInfo(): string {
        return this.props.additionalInfo
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

    public set registration(registration: string) {
        this.props.registration = registration
    }

    public set additionalInfo(additionalInfo: string) {
        this.props.additionalInfo = additionalInfo
    }
}

export type StudentDto = {
    name: string,
    className: string,
    type: boolean,
    registration: string,
    additionalInfo: string,
    organizationId: string,
    id?: string,
}