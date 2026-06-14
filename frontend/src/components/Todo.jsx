import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import{addTodo,getTodos,completeTodoApi} from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPen,faCircleCheck ,
  faCheck, } from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return null;
    }
    return token;
  };

  const loadTodos = async () => {
    try {
      const token = checkAuth();

      if (!token) return;
    const res = await getTodos(token);

      setTodos(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodos = async () => {
    try {
      if(title=="") return;

      const token = checkAuth();

      await addTodo(title, token);
     
      setTitle("");
      loadTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const token = checkAuth();

      const newTitle = prompt("Enter new Task");
      
      if (!newTitle) return;

      await axios.put(
        `http://localhost:3000/todo/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = checkAuth();

      await axios.delete(
        `http://localhost:3000/todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      loadTodos();
    } catch (error) {
      console.log(error);
    }
  };


   const completedTodo = async (id) => {
    try {
     const token = checkAuth();

          await completeTodoApi(id, token);

          loadTodos();
              } catch (error) {
                console.log(error);
              }
            };

  useEffect(() => {
    loadTodos();
  }, []);

 

  return (
    <>
   
   <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
    
  <div className="w-[500px] bg-slate-800 rounded-xl p-6 shadow-lg">

    <h1 className="text-3xl font-bold text-center mb-6">Todo App </h1>

    <div className="flex gap-3 mb-6">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a task..."
        className="flex-1 px-4 py-2 border-2 bg-white rounded-lg text-black outline-none"/>

      <button onClick={addTodos} className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold" >
       Add
      </button>
    </div>

    <div className="space-y-3">

      {todos.map((todo) => (
        
        <div key={todo._id} className="bg-slate-700 p-3 rounded-lg flex items-center justify-between" >
          <p className="font-medium">{todo.title}</p>
          <div className="flex gap-2">
            <button onClick={() => updateTodo(todo._id)}
              className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded-md font-medium"> <FontAwesomeIcon icon={faPen} /> </button>

            <button onClick={() => deleteTodo(todo._id)} className="bg-red-500 hover:bg-red-600 px-3 py-1 " ><FontAwesomeIcon icon={faTrash} /> </button>
            
            <button onClick={() => completedTodo(todo._id)}
             className="bg-green-500 hover:bg-green-300 px-3 py-1 " >  
              <FontAwesomeIcon icon={todo.completed ? faCircleCheck : faCheck} />
                </button>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>
      </>
  )
}

export default Todo
