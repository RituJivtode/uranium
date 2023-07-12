"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express is an server-side web framework for node.js which execute our code on the web
const express_1 = __importDefault(require("express"));
//body parser is a middleware, used to process data sent through an HTTP request body.
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = __importDefault(require("./routes/route")); //imported route
const mongoose_1 = __importDefault(require("mongoose")); //ODM library for mongoDB
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()); //transforms the text-based JSON input into JS-accessible variables
//extended: true precises that the req.body object will contain values of any type instead of just strings.
app.use(body_parser_1.default.urlencoded({ extended: true }));
mongoose_1.default
    .connect("mongodb+srv://Uranium-Batch:aruSjkdGdfhc9MRK@functionup.eel5r.mongodb.net/Ritu's-EnverX-Assignment?authSource=admin&replicaSet=atlas-izl4lk-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
app.use("/", route_1.default);
//port is two-way communication link between two programs running on the network
app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
});
