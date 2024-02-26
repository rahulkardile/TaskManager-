import express from "express"
import Todo from "../Models/Todo.js";
import { verifyUser } from "../utils/VerifyUser.js";
import { errorHandler } from "../utils/errHandler.js";

const routes = express.Router();

routes.post("/new", verifyUser, async (req, res, next) => {
    try {
        const data = req.user;
        const { title, description, date } = req.body;

        if (!title, !description, !date) return next(errorHandler(400, "something is mising"));

        const NewTodo = await Todo.create({
            title,
            description,
            date,
            user: data._id
        })

        res.status(200).json(NewTodo);

    } catch (error) {
        next(error)
    }
})

routes.patch("/update/:id", verifyUser, async (req, res, next) => {
    try {

        const id = req.params.id;
        const userId = req.user._id;

        const { title, description, status, date } = req.body;

        const List = await Todo.findById(id);
        if (!List) return next(errorHandler(404, "Not Found"));
        if (List.user != userId) return next(errorHandler(400, "bad request!"))


        if (title) List.title = title
        if (description) List.description = description
        if (status) List.status = status
        if (date) List.date = date

       const data  = await List.save();

       

        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
})

routes.get("/get", verifyUser, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const Lists = await Todo.find({ user: userId })
        res.status(200).json(Lists)
    } catch (error) {
        next(error)
    }
})

routes.delete("/delete/:id", verifyUser, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const id = req.params.id;

        const List = await Todo.findById(id);
        if (!List) return next(errorHandler(400, "Not Found"))
        if (List.user != userId) return next(errorHandler(400, "bad request!"))

        await Todo.findByIdAndDelete(id)
        res.status(200).json("delete successfully");
        
    } catch (error) {
        next(error)
    }
})


export default routes
