"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Students_1 = __importDefault(require("../../entity/Students"));
class StudentController {
    static async Post(req, res) {
        try {
            const { name, className, type, registration, additionalInfo } = req.body;
            const { idOrganization } = req.params;
            const student = new Students_1.default({ name: name, className: className, type: type, organizationId: idOrganization, registration: registration, additionalInfo: additionalInfo });
            const newStudent = (await student.Post(idOrganization));
            const objectStudent = {
                name: newStudent.name,
                className: newStudent.className,
                type: newStudent.type,
                organizationId: newStudent.organizationId,
                registration: newStudent.registration,
                additionalInfo: newStudent.additionalInfo,
                id: newStudent.id,
            };
            res.status(201).json(objectStudent);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Um estudante com a mesma matricula já existe!': {
                    errorNumber = 400;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async GetOne(req, res) {
        try {
            const studentID = req.params.id;
            const returnStudent = await Students_1.default.GetOne(studentID);
            if (returnStudent.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            res.status(200).send(returnStudent);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Estudante não encontrado!': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async GetAll(req, res) {
        try {
            const getAllStudents = await Students_1.default.GetAll(req.params.idOrganization);
            getAllStudents.map((Data) => ({
                name: Data.name,
                type: Data.type,
                organizationId: Data.organizationId,
                className: Data.className,
                registration: Data.registration,
                additionalInfo: Data.additionalInfo,
                id: Data.id,
            }));
            res.status(226).send(getAllStudents);
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
    static async GetByRegistration(req, res) {
        try {
            const student = await Students_1.default.GetByRegistration(req.params.registration, req.params.idOrganization);
            res.status(226).send(student);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Aluno não encontrado!': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async GetByClassName(req, res) {
        try {
            const returnsClass = await Students_1.default.GetByClassName(req.params.className, req.params.idOrganization);
            returnsClass.map((Data) => ({
                name: Data.name,
                type: Data.type,
                organizationId: Data.organizationId,
                className: Data.className,
                registration: Data.registration,
                additionalInfo: Data.additionalInfo,
                id: Data.id,
            }));
            res.status(226).send(returnsClass);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Estudante não encontrado!': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async Delete(req, res) {
        try {
            const StudentID = req.params.id;
            const GetOneStudent = await Students_1.default.GetOne(StudentID);
            if (GetOneStudent.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            await Students_1.default.Delete(StudentID);
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Estudante não encontrado!': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async DeleteByClassName(req, res) {
        try {
            const { idOrganization, className } = req.params;
            await Students_1.default.DeteleByClassName(className, idOrganization);
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Nenhum aluno encontrado': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async doUpdate(req, res) {
        try {
            const organization = await Students_1.default.GetAll(req.body.idOrganization);
            if (!organization)
                return res.status(403).json({ msg: 'rota inacessivel' });
            await Students_1.default.doUpdate(req.params.idOrganization, req.body.listStudents);
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case "nenhuma condição atendida": {
                    errorNumber = 400;
                    break;
                }
                case "Aluno do terceiro ano": {
                    errorNumber: 400;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
        }
    }
    static async updateAll(req, res) {
        try {
            const student = await Students_1.default.GetOne(req.params.id);
            if (student.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            student.name = req.body.name;
            student.className = req.body.className;
            student.type = req.body.type;
            student.additionalInfo = req.body.additionalInfo;
            student.registration = req.body.registration;
            await student.updateAll();
            res.status(200).end();
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    static async Update(req, res) {
        try {
            const student = await Students_1.default.GetOne(req.params.id);
            if (student.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            if (student.type == false) {
                student.type = true;
            }
            else {
                student.type = false;
            }
            await student.Update();
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Estudante não encontrado!': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
}
exports.default = StudentController;
//# sourceMappingURL=StudentsController.js.map