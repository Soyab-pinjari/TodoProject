import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
const TODO_URL = `${BASE_URL}/todo`;

// const AUTH_URL = "https://todoproject-backend-z1z8.onrender.com/user";
// const TODO_URL = "https://todoproject-backend-z1z8.onrender.com/todo";


export const registerUser = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/user/register`,
    userData
  );
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/user/login`,
    userData
  );
  return response.data;
};


// Get Todos
export const getTodos = async (token) => {
  const response = await axios.get(TODO_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add Todo
export const addTodo = async (title, token) => {
  const response = await axios.post(
 `${TODO_URL}/create`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Delete Todo
export const deleteTodo = async (id, token) => {
  const response = await axios.delete(
    `${TODO_URL}/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const completeTodoApi = async (id, token) => {
  const response = await axios.patch(
    `${TODO_URL}/${id}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};