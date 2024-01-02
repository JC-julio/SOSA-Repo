import { OrganizationModel } from "./models/OrganizationDB";
import { studentsModel } from "./models/StudentDB";

export default class Organization {
    model = OrganizationModel
    constructor(private props: OrganizationDto) {}

    async Post(){
        return this.model.create({
            name: this.name,
        })
    }

    static async GetOne(OrganizationId) {
        const organization = await studentsModel.findById(OrganizationId);
        if(!organization)
            throw new Error("Organização não encontrada!");
        return new Organization({
            name: organization.name,
            id: organization.id,
        })
    }
    
    static async GetAll() {
        const organizations = await OrganizationModel.find();
        return organizations.map((Data) => new Organization({
            name: Data.name,
            id: Data.id,
        }))
    }

    static async Delete(OrganizationId) {
        await OrganizationModel.findByIdAndDelete(OrganizationId);
    }

    public get name(): String {
        return this.props.name;
    }

    public get id(): String {
        return this.props.id;
    }

    public set name(name: String) {
        this.props.name = name;
    }
}

export type OrganizationDto = {
    name: String,
    id?: String,
}