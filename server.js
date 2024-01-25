//this is the file to set up app
import dotenv from "dotenv";
dotenv.config();

import express from "express"; //import necessary modules
import cors from "cors";
import mongoose from "mongoose";
import memberRouter from "./routes/members-route.js";

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
db.on('error',(error) => console.error(error));
db.once('open',(r) => console.error("connected to DB"));

//set up Express to create an app and configure it to parse requests with JSON payloads
const app = express ();

app.use(express.json());
app.use(cors());
app.use('/', memberRouter);

//define a route that listens to requests
//define the server code
//With the process.env.PORT variable, we set up the port 
//automatically by allowing the API to be deployed to a cloud platform 
//like AWS or Azure. 
const PORT = process.env.PORT || 3000;

//to set up the server to listen on the specified port
app.listen( PORT, () =>{
    console.log("Server is listening at port:", PORT);
});
