import { Schema, model } from "mongoose";

const studentSchema = new Schema(
    {
    name: {type:String, required: true},
    currentMentor: {type: Schema.Types.ObjectId, default: null, ref: "mentor"},
    previousMentor: {type: Schema.Types.ObjectId, default: null, ref: "mentor"}
    },
    {
        collection : "student",
        versionKey: false
    }
)

const studentModel = model("student", studentSchema)

export default studentModel;