import { studentsModel } from "./models/StudentDB";

export default class Student{
    model = studentsModel
    constructor(private props: StudentDto){}

    async Post(){
        return this.model.create({
            name: this.name,
            classStudent: this.classStudent,
            type: this.type,
            organizationId: this.organizationId,
        })
    }

    static async GetOne(studentId) {
        const student = await studentsModel.findById(studentId);
        if(!student)
            throw new Error("Estudante não encontrado!")
        return new Student({
            name: student.name,
            classStudent: student.classStudent,
            type: student.type,
            organizationId: student.organizationId,
            id: student.id,
        })
    }

    static async GetByClassName(ClassStudent){
        const Class = await studentsModel.find({classStudent: ClassStudent});
        return Class.map((Data) => ({
            name: Data.name,
            type: Data.type,
            classStudent: Data.classStudent,
            organizationId: Data.organizationId,
            id: Data.id,
        }))
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

    public get classStudent(): String {
        return this.props.classStudent;
    }

    public get type(): String {
        return this.props.type;
    }

    public get id(): string {
        return this.props.id;
    }

    public get organizationId(): string {
        return this.props.organizationId;
    }

    public set name(name: string) {
        this.props.name = name;
    }

    public set classStudent(classStudent: string) {
        this.props.classStudent = classStudent;
    }

    public set type(type: string){
        this.props.type = type;
    }
}

export type StudentDto = {
    name: string,
    classStudent: string,
    type: string,
    organizationId: string,
    id?: string,
}