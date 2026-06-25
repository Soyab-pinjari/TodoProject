const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const { createTodo,getTodos,deleteTodos, updateTodos, completeTodos,}=require("../controllers/todoController");

router.post("/create",auth ,createTodo);
router.get("/", auth,getTodos);
router.put("/:id",auth,updateTodos);
router.delete("/:id",auth,deleteTodos);
router.patch('/:id/complete',completeTodos);

module.exports = router;