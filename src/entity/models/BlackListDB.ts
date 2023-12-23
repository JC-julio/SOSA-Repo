import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    bannedToken: String,
})

export const TokenModel = mongoose.model('BlackList', TokenSchema)