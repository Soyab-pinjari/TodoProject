require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require('./middleware/auth');
const userRoutes = require('./routes/userRoute');
const connect = require("./Config/db");
const todoRoute = require("./routes/todoRoutes");

const app = express();

connect();

app.use(cors());          
app.use(express.json());  
app.use("/user" , userRoutes);
app.use(auth);
app.use("/todo", todoRoute);

app.listen(3000, () => {
    console.log("Server run on 3000");
});