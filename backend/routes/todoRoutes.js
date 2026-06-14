const express = require("express");
const router = express.Router();

const { createTodo,getTodos,deleteTodos, updateTodos,}=require("../controllers/todoController");

router.post("/create", createTodo);
router.get("/", getTodos);
router.put("/:id",updateTodos);
router.delete("/:id",deleteTodos);

module.exports = router;