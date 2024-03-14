import { messageModel } from "./models/MessageDB"

export default class Message {
    constructor(private props: messageDTO) {}
    model = messageModel
    async post() {
        return await this.model.create({
            value: this.value,
            idManager: this.idManager,
            exibDate: this.exibDate,
            organizationId: this.organizationId,
        })
    }

    static async getOne(id: String) {
        return await messageModel.findById(id)
    }

    static async GetAll(idOrganization) {
        const messages = await messageModel.find({organizationId: idOrganization})
        return messages.map(
          (Data) => new Message({ 
            value: Data.value,
            idManager: Data.idManager,
            exibDate: Data.exibDate,
            organizationId: Data.organizationId,
            id: Data.id,
        }))
      }

      static async delete(id) {
        await messageModel.findByIdAndDelete(id)
      }

    async updateAll() {
        await messageModel.findByIdAndUpdate(this.id, {
            value: this.value,
            idManager: this.idManager,
            exibDate: this.exibDate,
        })
      }

    public get value() {
        return this.props.value
    }

    public get idManager() {
        return this.props.idManager
    }

    public get exibDate() {
        return this.props.exibDate
    }

    public get organizationId() {
        return this.props.organizationId
    }
    
    public get id() {
        return this.props.id
    }

    public set value(value: String) {
        this.props.value = value
    }

    public set idManager(idManager: String) {
        this.props.idManager = idManager
    }

    public set exibDate(exibDate: Array<String>) {
        this.props.exibDate = exibDate
    }

    public set organizationId(organizationId: String) {
        this.props.organizationId = organizationId
    }
}

export type messageDTO = {
    value: String,
    idManager: String,
    exibDate: Array<String>,
    organizationId: String,
    id?: String,
}