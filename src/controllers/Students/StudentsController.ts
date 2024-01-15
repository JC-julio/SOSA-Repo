import Express from 'express';
import Student from '../../entity/Students';

export default class StudentController {
    static async Post(req:Express.Request, res:Express.Response) {
        try{
            const {name, className, type} = req.body;
            const { idOrganization } = req.params;
            const student = new Student({name: name, className: className, type: type, organizationId:idOrganization})
            const newStudent = (await student.Post())
            const studentId = newStudent.id;
            res.status(201).json({newStudent, studentId})
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
            return res.status(401).json({msg: 'rota inacessivel'})
          res.status(200).send(returnStudent);
        } catch(error){
          let errorNumber: number;
          switch( error.message ){
              case 'Estudante não encontrado!': {
                  errorNumber = 404
                  break
              }
              default: {
                  errorNumber = 500
                  break
              }
          }
          res.status(errorNumber).json({msg: error.message})
      }
      }

    static async GetByClassName(req:Express.Request, res:Express.Response) {
        try{
            const returnsClass = await Student.GetByClassName(
              req.params.className,
              req.params.idOrganization);
            returnsClass.map((Data) => ({
                name: Data.name,
                type: Data.type,
                organizationId: Data.organizationId,
                className: Data.className,
                id: Data.id,
            }))
            res.status(226).send(returnsClass);
        } catch(error){
          let errorNumber: number;
          switch( error.message ){
              case 'Estudante não encontrado!': {
                  errorNumber = 404
                  break
              }
              default: {
                  errorNumber = 500
                  break
              }
          }
          res.status(errorNumber).json({msg: error.message})
      }
    }

    static async Delete(req:Express.Request, res:Express.Response) {
        try{
            const StudentID = req.params.id;
            const GetOneStudent = await Student.GetOne(StudentID)
            if(GetOneStudent.organizationId != req.params.idOrganization)
              return res.status(401).json({msg: 'rota inacessivel'})
            await Student.Delete(StudentID);
            res.status(200).end()
        } catch(error){
          let errorNumber: number;
          switch( error.message ){
              case 'Estudante não encontrado!': {
                  errorNumber = 404
                  break
              }
              default: {
                  errorNumber = 500
                  break
              }
          }
          res.status(errorNumber).json({msg: error.message})
      }
    }
    
    static async Update(req:Express.Request, res:Express.Response) {
      try {
        const student = await Student.GetOne(req.params.id);
        if(student.organizationId != req.params.idOrganization)
          return res.status(401).json({msg: 'rota inacessivel'})
        if (student.type == false){ 
          student.type = true;
        } else { 
          student.type = false;
        }  
         await student.Update();
        res.status(200).end();
      } catch (error){
        let errorNumber: number;
        switch( error.message ){
          case 'Estudante não encontrado!': {
          errorNumber = 404
        break
        }
          default: {
          errorNumber = 500
        break
    }
  }
  res.status(errorNumber).json({msg: error.message})
    }
  }
}