import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    name: String,
})

export const ClassModel = mongoose.model('Class', ClassSchema)