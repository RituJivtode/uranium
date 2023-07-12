// express is an server-side web framework for node.js which execute our code on the web
import express from "express";
//body parser is a middleware, used to process data sent through an HTTP request body.
import bodyParser from "body-parser";
import route from "./routes/route";  //imported route
import mongoose from "mongoose";  //ODM library for mongoDB

const app = express();
app.use(bodyParser.json()); //transforms the text-based JSON input into JS-accessible variables
//extended: true precises that the req.body object will contain values of any type instead of just strings.
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Uranium-Batch:aruSjkdGdfhc9MRK@functionup.eel5r.mongodb.net/Ritu's-EnverX-Assignment?authSource=admin&replicaSet=atlas-izl4lk-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err: any) => console.log(err));

app.use("/", route);

//port is two-way communication link between two programs running on the network
app.listen(process.env.PORT || 3000, function() {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
