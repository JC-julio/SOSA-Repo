import Express from 'express';
import Student from '../../entity/Students';

export default class StudentController {
    static async Post(req:Express.Request, res:Express.Response) {
        try{
            const {name, className, type, registration} = req.body;
            const { idOrganization } = req.params;
            const student = new Student({name: name, className: className, type: type, organizationId:idOrganization, registration: registration})
            const newStudent = (await student.Post(idOrganization))
            const objectStudent = {
              name: newStudent.name,
              className: newStudent.className,
              type: newStudent.type,
              organizationId: newStudent.organizationId,
              registration: newStudent.registration,
              id: newStudent.id
            }
            res.status(201).json(objectStudent)
        } catch(error) {
          let errorNumber: number;
          switch( error.message ){
              case 'Um estudante com a mesma matricula já existe!': {
                  errorNumber = 400
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

    static async GetAll(req:Express.Request, res:Express.Response) {
      try {
        const getAllStudents = await Student.GetAll(req.params.idOrganization);
        getAllStudents.map((Data) => ({
          name: Data.name,
          type: Data.type,
          organizationId: Data.organizationId,
          className: Data.className,
          registration: Data.registration,
          id: Data.id,
        }));
        res.status(226).send(getAllStudents);
      } catch(error){
        res.status(500).json({msg: error.message})
    }
    }

    static async GetByRegistration(req:Express.Request, res:Express.Response) {
      try {
        console.log(req.params.registration)
        console.log(req.params.idOrganization)
        const student = await Student.GetByRegistration(req.params.registration, req.params.idOrganization)
        res.status(226).send(student)
      } catch (error) {
        let errorNumber: number;
        switch( error.message ){
            case 'Aluno não encontrado!': {
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
                registration: Data.registration,
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