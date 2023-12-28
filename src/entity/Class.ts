import { ClassModel } from "./models/classDB";


export default class StudentClass{
    model = ClassModel
    constructor(private props: ClassDto) {
        console.log(props)
    }
    async Post(){
        return this.model.create({
            name: this.name
        });
    }

    static async GetOne(ClassID){
        const OneClass = await ClassModel.findById(ClassID);
        return new StudentClass({
            name: OneClass.name,
            id: OneClass.id
        })
    }

    static async GetAll(){
        const Classes = await ClassModel.find();
        return Classes.map((Data) => ({
            name: Data.name,
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

    public set name(nameClass: String){
        this.props.name = nameClass;
    }
}

export type ClassDto = {
    name: String;
    id?: String,
};