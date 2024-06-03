import mentorModel from "../model/mentor.model.js";

class Mentor{

    /**
    * @desc Create mentor
    * @request POST
    * @endpoint /create
    */
    static async create(req, res)
    {
        try 
        {
            let {name} = req.body
            if(!name) {
                return res.status(400).json({message: "Please enter the valid name."})
            }

            let existUser = await mentorModel.findOne({name})
            if(existUser) {
                return res.status(400).json({message: "Name already exist"})
            }

            let createMentor = await mentorModel.create(req.body)

            res.status(200).json({message: "Mentor created", createMentor})
        } catch (error) 
        {
            console.log("Error in creating Mentor: ", error);
        }
        
    }

    /**
    * @desc Get all the mentors
    * @request GET
    * @endpoint /all-mentor
    */
    static async getAllMentors(req, res)
    {
        try 
        {
            const allMentors = await mentorModel.find();
            res.json(allMentors)
        } catch (error) 
        {
            console.log("Error in getting Mentors: ", error);
        }
    }
}

export default Mentor