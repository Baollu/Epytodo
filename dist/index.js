"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user/user"));
const todos_1 = __importDefault(require("./routes/todos/todos"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const env = require('dotenv').config();
const port = process.env.PORT;
const app = (0, express_1.default)();
const SUCCESS = 0;
const ERROR = 84;
var jwt = require('jsonwebtoken');
app.use('/', auth_1.default);
app.use('/user', user_1.default);
app.use('/todos', todos_1.default);
app.listen(process.env.PORT, () => {
    console.log('watch on port ' + process.env.PORT);
});
