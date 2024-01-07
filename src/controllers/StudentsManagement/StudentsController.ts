import Express from 'express';
import Student from '../../entity/Students';

export default class StudentController {
    static async Post(req:Express.Request, res:Express.Response) {
        try{
            const {name, classStudent, type} = req.body;
            const { idOrganization } = req.params;
            const student = new Student({name: name, classStudent: classStudent, type: type, organizationId:idOrganization})
            const studentID = (await student.Post())._id;
            res.status(201).json({Id: studentID});
        } catch(error){
            console.error(error);
            res.status(500).json({msg: error.message});
        }
    }

    static async GetOne(req:Express.Request, res:Express.Response) {
        try{
          const studentID = req.params.id;
          const returnStudent = await Student.GetOne(studentID);
          if(returnStudent.organizationId != req.params.idOrganization)
            res.status(401).json({msg: 'rota inacessivel'})
          res.status(200).send(returnStudent);
        } catch(error){
          console.error(error);
          res.status(500).json({msg: error.message});
        }
      }

    static async GetByClassName(req:Express.Request, res:Express.Response) {
        try{
            const ClassName = req.params.ClassName;
            const returnsClass = await Student.GetByClassName(ClassName);
            const FilterClassByOrganizationId = returnsClass.filter(turm => 
            req.params.idOrganization.includes(turm.organizationId));
            if(FilterClassByOrganizationId.length == 0)
              res.status(404).json({msg: 'nenhum estudante encontrado'})
            returnsClass.map((Data) => ({
                name: Data.name,
                type: Data.type,
                organizationId: Data.organizationId,
                classStudent: Data.classStudent,
                id: Data.id,
            }))
            res.status(226).send(returnsClass);
        } catch(error){
            console.error(error)
            res.status(500).json({msg: error.message})
        }
    }

    static async Delete(req:Express.Request, res:Express.Response) {
        try{
            const StudentID = req.params.id;
            const GetOneStudent = await Student.GetOne(StudentID)
            if(GetOneStudent.organizationId != req.params.idOrganization)
              res.status(401).json({msg: 'rota inacessivel'})
            await Student.Delete(StudentID);
            res.status(200).end()
        } catch(error) {
            console.error(error);
            res.status(500).json({msg: error.message});
        }
    }
    
    static async Update(req:Express.Request, res:Express.Response) {
            try {
            const student = await Student.GetOne(req.params.id);
            if(student.organizationId != req.params.idOrganization)
              res.status(401).json({msg: 'rota inacessivel'})
            if (student.type == 'Autorizado'){ 
              student.type = 'Não autorizado';
            } else { 
              student.type = 'Autorizado';
            }  
              await student.Update();
              res.status(200).end();
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: error.message });
            }
    }
}