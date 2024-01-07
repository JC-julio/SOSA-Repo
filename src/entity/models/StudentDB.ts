import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: String,
    className: String,
    type: String,
    organizationId: String,
})

export const studentsModel = mongoose.model('students', StudentSchema);