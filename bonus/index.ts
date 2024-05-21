import express, { Express } from "express";
import userRoutes from "./routes/user/user";
import todosRoutes from "./routes/todos/todos";
import authRoutes from "./routes/auth/auth";
import db from "./config/db";

const env: any = require('dotenv').config();
const port: string | undefined = process.env.PORT;
const app: Express = express();
const SUCCESS: number = 0;
const ERROR: number = 84;

var jwt = require('jsonwebtoken');

app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/todos', todosRoutes);

app.listen(process.env.PORT, () => {
    console.log('watch on port ' + process.env.PORT);
});
