import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import{addTodo,getTodos,completeTodoApi} from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPen,faCircleCheck ,faUserCircle ,  faTimes,
  faCheck, } from "@fortawesome/free-solid-svg-icons";

import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../Config";
function Todo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [open,setOpen]=useState(false);
  const [user,setuser]=useState({});
  const navigate = useNavigate();


  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return null;
    }
    return token;
  };


   const userData =()=>{
    const token = localStorage.getItem("token");
    if(token){
       const userData = jwtDecode(token);
       console.log(userData)
       setuser(userData.userName
);
    }
  }

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
        `${BASE_URL}/todo/${id}`,
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


  const logout = ()=>{
  localStorage.removeItem("token");
  navigate("/login");
    
 }

  const deleteTodo = async (id) => {
    try {
      const token = checkAuth();

      await axios.delete(
        `${BASE_URL}/todo/${id}`,
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
    userData();
  }, []);


 

  return (
    <>

<div className="min-h-screen bg-slate-900 text-white">

   {/* User Menu Top Right */}
     <div className="flex justify-end p-5">
      {/* User Icon */}
       <button
      onClick={() => setOpen(true)}
      className="bg-slate-700 hover:bg-slate-800 text-white w-10 h-10 rounded-full flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faUserCircle} size="lg" />
    </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 text-white rounded-lg shadow-lg border border-slate-700">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="font-semibold">Profile</h2>

            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4">
            <p className="font-medium">
              Username: {user}
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Welcome back!
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      )}

    </div>


    <div className="flex items-center justify-center">
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
           
      </div>
      </>
  )
}

export default Todo
