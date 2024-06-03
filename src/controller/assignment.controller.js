import mentorModel from "../model/mentor.model.js";
import studentModel from "../model/student.model.js";

class StudentMentorAssignmentController
{
     /**
    * @desc Assigns a students to a mentor
    * @request POST
    * @endpoint /assign-students-mentor
    */
    static async assignStudentsToMentor(req, res)
    {
        const {mentorId, studentIds} = req.body
        try 
        {
            const assigningStudents = studentIds.map(async studentId => {
                const student = await studentModel.findById(studentId)

                if(student.currentMentor !== null) {
                    throw new Error("Mentor already assigned");
                }
                
                const updateStudent = await studentModel.findByIdAndUpdate(studentId,
                    {currentMentor: mentorId},
                    {new: true}
                )
                const updateMentor = await mentorModel.findByIdAndUpdate(mentorId,
                    {$addToSet: {studentAssigned: studentId}},
                    {new: true}
                )

                return { mentor: updateMentor }
            })

            const updatesStudent = await Promise.all(assigningStudents)
            
            res.send({ message: "Assigned successfully", students: updatesStudent })

        } catch (error) 
        {
            console.error(error); 
            res.status(500).send({ message: `Internal Server Error in : ${error.message}` });
        }
    }

    /**
    * @desc Assign or change student mentor
    * @request PUT
    * @endpoint /assign-change/:studentId/:mentorId
    */
    static async updateStudentMentorAssignment(req, res)
    {
        const {studentId, mentorId} = req.params;
        try 
        {
            const student = await studentModel.findById(studentId)
            if(student.currentMentor)
            {
                const previousMentor = await mentorModel.findByIdAndUpdate(student.currentMentor,
                    {$pull: {studentAssigned: studentId}},
                    {new : true}
                )
                student.previousMentor =  previousMentor._id;
            }

            student.currentMentor = mentorId;
            await student.save()

            const newMentor = await mentorModel.findByIdAndUpdate(mentorId,
                {$addToSet: {studentAssigned: studentId}},
                {new: true}
            )

            res.send({message: "Updated successfull", student, mentor: newMentor})

        } catch (error)
        {
            console.error(error); 
            res.status(500).send({ message: 'Internal Server Error in updating student' });
        }
    }

    /**
    * @desc Retrieves students assigned to a specific mentor.
    * @request GET
    * @endpoint /mentor-students/:mentorId
    */
    static async getStudentsByMentorId(req, res)
    {
        const {mentorId} = req.params
        try
        {
            const findMentor = await mentorModel.findById(mentorId).populate('studentAssigned');
            if (!findMentor) {
                return res.status(404).send("Mentor not found");
            }

            res.send({mentorStudents: findMentor})

        } catch (error) 
        {
            console.error(error); 
            res.status(500).send({ message: 'Internal Server Error in getting mentor students' });
        }
    }

    /**
    * @desc Retrieves the previous mentor assigned to a student.
    * @request GET
    * @endpoint /previous-mentor/:studentId
    */
    static async getPreviousMentor(req, res)
    {
        const {studentId} = req.params
        try
        {
            const student = await studentModel.findById(studentId).populate('previousMentor');
            if(student.previousMentor === null)
            {
                return res.status(400).send({message: `No mentor was changed for ${student.name}`})
            }

            res.status(200).send({student})

        } catch (error) 
        {
            console.error(error); 
            res.status(500).send({ message: 'Internal Server Error in getting previous mentor' });
        }
    }


    /**
    * @desc Extra: Assigns a student to a mentor
    * @request POST
    * @endpoint /assign/:studentId/:mentorId
    
    static async assignStudentToMentor(req, res)
    {
        const {studentId, mentorId} = req.params;
        try 
        {
            const student = await studentModel.findById(studentId)
            if(student.currentMentor !== null) {
                return res.status(400).json({message: "Mentor already assigned"})
            }

            const updateStudent = await studentModel.findByIdAndUpdate(studentId,
                {currentMentor: mentorId},
                {new: true}
            )
            const updateMentor = await mentorModel.findByIdAndUpdate(mentorId,
                {$addToSet: {studentAssigned: studentId}},
                {new: true}
            )

            res.send({message: "Assigned successfully",student: updateStudent, mentor: updateMentor})

        } catch (error) 
        {
            console.error(error); 
            res.status(500).send({ message: 'Internal Server Error in assigning student' });
        }
    }
    */
}

export default StudentMentorAssignmentController