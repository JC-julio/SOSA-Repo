import { ClassModel } from "./models/classDB";


export default class StudentClass{
    model = ClassModel
    constructor(private props: ExitsDto) {}

    async Post(){
        return this.model.create({
            name: this.nameClass
        });
    }

    static async GetOne(ClassID){
        const OneClass = await ClassModel.findById(ClassID);
        return new StudentClass({
            nameClass: OneClass.name,
            id: OneClass.id
        })
    }

    static async GetAll(){
        const Classes = await ClassModel.find();
        return Classes.map((Data) => ({
            nameClass: Data.name,
            id: Data.id,
        }))
    }

    static async Delete(classId){
        await ClassModel.findByIdAndDelete(classId);
    }


    public get nameClass(): string {
        return this.props.nameClass;
    }

    public get id(): string {
        return this.props.id;
    }

    public set nameClass(nameClass: string){
        this.props.nameClass = nameClass;
    }
}

export type ExitsDto = {
    nameClass: string;
    id?: string,
};