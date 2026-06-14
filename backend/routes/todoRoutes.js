const express = require("express");
const router = express.Router();

const { createTodo,getTodos,deleteTodos, updateTodos, completeTodos,}=require("../controllers/todoController");

router.post("/create", createTodo);
router.get("/", getTodos);
router.put("/:id",updateTodos);
router.delete("/:id",deleteTodos);
router.patch('/:id/complete',completeTodos);

module.exports = router;