import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: String,
    className: String,
    type: Boolean,
    additionalInfo: String,
    registration: String,
    organizationId: String,
})

export const studentsModel = mongoose.model('students', StudentSchema);