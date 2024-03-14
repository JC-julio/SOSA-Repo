import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    value: String,
    idManager: String,
    exibDate: Array<String>,
    organizationId: String,
});

export const messageModel = mongoose.model('message', messageSchema)