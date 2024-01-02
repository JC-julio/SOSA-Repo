import mongoose from "mongoose";


const OrganizationSchema = new mongoose.Schema({
    name: String,
})

export const OrganizationModel = mongoose.model("organization", OrganizationSchema)