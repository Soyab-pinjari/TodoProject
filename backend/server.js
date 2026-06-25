require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require('./middleware/auth');
const userRoutes = require('./routes/userRoute');
const connect = require("./Config/db");
const todoRoute = require("./routes/todoRoutes");

const app = express();

connect();

const cors = require("cors");

app.use(
  cors({
    origin: "https://todo-project-psi-five.vercel.app/",
    credentials: true,
  })
);        
app.use(express.json());  
app.use("/user" , userRoutes);
app.use(auth);
app.use("/todo", todoRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});