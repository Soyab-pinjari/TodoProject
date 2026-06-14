import axios from "axios";

const AUTH_URL = "http://localhost:3000/user";
const TODO_URL = "http://localhost:3000/todo";

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_URL}/register`,
    userData
  );

  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_URL}/login`,
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