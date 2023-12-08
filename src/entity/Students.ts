import { studentsModel } from "./models/StudentDB";

export default class Student{
    model = studentsModel
    constructor(private props: StudentDto){}

    public get name(): String {
        return this.props.name;
    }

    public get ClassStudent(): String {
        return this.props.classStudent;
    }

    public get type(): String {
        return this.props.type;
    }

    public set name(name: String) {
        this.props.name = name;
    }

    public set ClassStudent(ClassStudent: String) {
        this.props.classStudent = ClassStudent;
    }

    public set type(type: String){
        this.props.type = type;
    }
}

export type StudentDto = {
    name: String,
    classStudent: String,
    type: String,
}