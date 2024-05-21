"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_query_1 = require("./todos.query");
const app = (0, express_1.Router)();
let bodyParser = require('body-parser');
const notFound = require("../../middleware/notFound");
const auth = require("../../middleware/auth");
app.get("/", auth, async (req, res) => {
    try {
        let result = await (0, todos_query_1.all_todo)(req, res);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
app.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        let result = await (0, todos_query_1.view_todo)(req, id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
app.post('/', auth, async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let due_time = req.body.due_time;
    let user_id = req.body.user_id;
    let status = req.body.status;
    if (title === undefined || description === undefined || due_time === undefined ||
        user_id === undefined || status === undefined) {
        res.status(500).json({ "msg": "internal server error" });
        return;
    }
    try {
        let result = await (0, todos_query_1.post_todo)(title, description, due_time, user_id, status);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
app.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const user_id = req.body.user_id;
    const due_time = req.body.due_time;
    const status = req.body.status;
    if (title === undefined || description === undefined ||
        user_id === undefined || due_time === undefined ||
        status === undefined) {
        res.status(500).json({ "msg": "internal server error" });
        return;
    }
    try {
        const result = await (0, todos_query_1.update_todo_information)(title, description, due_time, user_id, status, id);
        res.send(result[0]);
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
app.delete('/:id', auth, async (req, res) => {
    let id = req.params.id;
    try {
        let result = await (0, todos_query_1.delete_todo)(res, id);
        res.status(200).json({ "msg": `succesfully deleted record number: ${id}` });
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
exports.default = app;
