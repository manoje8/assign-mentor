import { Schema, model } from "mongoose";

const mentorSchema = new Schema(
    {
    name: {type:String, required: true},
    studentAssigned: [
        {type: Schema.Types.ObjectId, default: null, ref: "student"},
    ]
    },
    {
        collection : "mentor",
        versionKey: false
    }
)

const mentorModel = model("mentor", mentorSchema)

export default mentorModel;