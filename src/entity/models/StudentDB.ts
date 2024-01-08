import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: String,
    className: String,
    type: Boolean,
    organizationId: String,
})

export const studentsModel = mongoose.model('students', StudentSchema);