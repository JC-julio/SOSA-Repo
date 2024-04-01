"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDB_1 = require("./models/MessageDB");
class Message {
    constructor(props) {
        this.props = props;
        this.model = MessageDB_1.messageModel;
    }
    async post() {
        return await this.model.create({
            value: this.value,
            idManager: this.idManager,
            exibDate: this.exibDate,
            organizationId: this.organizationId,
        });
    }
    static async getOne(id) {
        const message = await MessageDB_1.messageModel.findById(id);
        if (!message)
            throw new Error("nenhuma mensagem encontrada");
        return new Message({
            value: message.value,
            idManager: message.idManager,
            exibDate: message.exibDate,
            organizationId: message.organizationId,
            id: message.id,
        });
    }
    static async GetAll(idOrganization) {
        const messages = await MessageDB_1.messageModel.find({ organizationId: idOrganization });
        if (!messages)
            throw new Error("nenhuma mensagem encontrada");
        return messages.map((Data) => new Message({
            value: Data.value,
            idManager: Data.idManager,
            exibDate: Data.exibDate,
            organizationId: Data.organizationId,
            id: Data.id,
        }));
    }
    static async delete(id) {
        await MessageDB_1.messageModel.findByIdAndDelete(id);
    }
    async updateAll() {
        await MessageDB_1.messageModel.findByIdAndUpdate(this.id, {
            value: this.value,
            idManager: this.idManager,
            exibDate: this.exibDate,
        });
    }
    get value() {
        return this.props.value;
    }
    get idManager() {
        return this.props.idManager;
    }
    get exibDate() {
        return this.props.exibDate;
    }
    get organizationId() {
        return this.props.organizationId;
    }
    get id() {
        return this.props.id;
    }
    set value(value) {
        this.props.value = value;
    }
    set idManager(idManager) {
        this.props.idManager = idManager;
    }
    set exibDate(exibDate) {
        this.props.exibDate = exibDate;
    }
    set organizationId(organizationId) {
        this.props.organizationId = organizationId;
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map