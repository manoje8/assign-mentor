import studentModel from "../model/student.model.js";

class Student{

    /**
    * @desc Create student
    * @request POST
    * @endpoint /create
    */
    static async create(req, res)
    {
        try 
        {
            let {name} = req.body

            if(!name) res.status(400).json({message: "Please enter the valid name."})

            let existUser = await studentModel.findOne({name})
            if(existUser) res.status(400).json({message: "Name already exist"})

            let createStudent = await studentModel.create(req.body)

            res.status(200).json({message: "Student created", createStudent})
        } catch (error) 
        {
            console.log("Error in creating student: ", error);
        }
        
    }

    /**
    * @desc Get all the students
    * @request Get
    * @endpoint /all-student
    */
    static async getAllStudents(req, res)
    {
        try 
        {
            const allStudents = await studentModel.find();
            res.json(allStudents)
        } catch (error) 
        {
            console.log("Error in getting students: ", error);
        }
    }
}

export default Student