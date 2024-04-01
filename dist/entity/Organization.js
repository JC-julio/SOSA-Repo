"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrganizationDB_1 = require("./models/OrganizationDB");
class Organization {
    constructor(props) {
        this.props = props;
        this.model = OrganizationDB_1.OrganizationModel;
    }
    async Post() {
        return this.model.create({
            name: this.name,
        });
    }
    static async GetOne(OrganizationId) {
        const organization = await OrganizationDB_1.OrganizationModel.findById(OrganizationId);
        if (!organization)
            throw new Error("Organização não encontrada!");
        return new Organization({
            name: organization.name,
            id: organization.id,
        });
    }
    static async GetAll() {
        const organizations = await OrganizationDB_1.OrganizationModel.find();
        return organizations.map((Data) => new Organization({
            name: Data.name,
            id: Data.id,
        }));
    }
    static async Delete(OrganizationId) {
        await OrganizationDB_1.OrganizationModel.findByIdAndDelete(OrganizationId);
    }
    get name() {
        return this.props.name;
    }
    get id() {
        return this.props.id;
    }
    set name(name) {
        this.props.name = name;
    }
}
exports.default = Organization;
//# sourceMappingURL=Organization.js.map