const Todo = require('../models/Todo')

// console.log(Todo.schema.obj);
const createTodo = async (req, res) => {

    try {

        const todo = await Todo.create({
            title: req.body.title,
            userId:req.user.userId
        });
      
    res.status(201).json(todo);

    } catch (error) {
        console.error("Create Todo Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

const getTodos = async (req, res) => {
   
    try {
 
        const todos = await Todo.find({userId: req.user.userId}).sort({createdAt:-1});

        res.status(200).json(todos);

    } catch (error) {
        console.error("Get Todos Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

const updateTodos = async(req,res)=>{
                try {
                const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            req.body,
            {
                  returnDocument: 'after' 
            }
            );
          res.json(todo);

    } catch (error) {
        console.log("Update todo error :",error);
        res.status(500).json({message:error.message});

    }
}

const completeTodos = async (req,res)=> {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id,{completed:true},{returnDocument: 'after' })
        res.json(todo);
        console.log(todo);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteTodos = async (req,res)=>{
    res.send("Delete Route Hit");
    try {
        const todos =await Todo.findOneAndDelete({
  _id: req.params.id,
  userId: req.user.userId
});
        // res.json(todos);
} catch (error) {
    console.log("Delete todos Error : ", error);
    res.status(500).json({message:error.message});
}
}

module.exports = {createTodo,getTodos,updateTodos,updateTodos,deleteTodos,completeTodos};