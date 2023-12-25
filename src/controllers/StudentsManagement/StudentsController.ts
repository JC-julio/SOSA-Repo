import Express from 'express';
import Student from '../../entity/Students';

export default class StudentController {
    static async Post(req:Express.Request, res:Express.Response) {
        try{
            const {name, classStudent, type} = req.body;
            const student = new Student({name: name, classStudent: classStudent, type: type})
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
          res.status(200).send(returnStudent);
        } catch(error){
          console.error(error);
          res.status(500).json({msg: error.message});
        }
      }

    static async GetbyClass(req:Express.Request, res:Express.Response) {
        try{
            const classID = req.params.id;
            const returnsClass = await Student.GetByClass(classID);
            returnsClass.map((Data) => ({
                name: Data.name,
                type: Data.type,
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