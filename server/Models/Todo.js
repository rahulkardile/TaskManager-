import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true}
)
const Todo = mongoose.model("Todo", TodoSchema);

export default Todo