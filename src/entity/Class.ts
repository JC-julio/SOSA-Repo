import { ClassModel } from "./models/classDB";


export default class StudentClass{
    model = ClassModel
    constructor(private props: ClassDto) {}
    async Post(){
        return this.model.create({
            name: this.name,
            organizationId: this.organizationId,
        });
    }

    static async GetOne(ClassID){
        const OneClass = await ClassModel.findById(ClassID);
        if(!OneClass)
            throw new Error("Turma não encontrada");
        return new StudentClass({
            name: OneClass.name,
            organizationId: OneClass.organizationId,
            id: OneClass.id
        })
    }

    static async GetAll(){
        const Classes = await ClassModel.find();
        return Classes.map((Data) => ({
            name: Data.name,
            organizationId: Data.organizationId,
            id: Data.id,
        }))
    }

    static async Delete(classId){
        await ClassModel.findByIdAndDelete(classId);
    }


    public get name(): String {
        return this.props.name;
    }

    public get id(): String {
        return this.props.id;
    }

    public get organizationId(): String {
        return this.props.organizationId;
    }

    public set name(nameClass: String){
        this.props.name = nameClass;
    }
}

export type ClassDto = {
    name: String;
    organizationId: String;
    id?: String,
};