"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_query_1 = require("./user.query");
const bcrypt = require('bcryptjs');
const auth = require("../../middleware/auth");
const app = (0, express_1.Router)();
app.get("/", auth, async (req, res) => {
    try {
        let result = await (0, user_query_1.get_all_user_info)(req, res);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
app.get('/todos', auth, async (req, res) => {
    try {
        let result = await (0, user_query_1.get_user_task)(res, req.body.user_id);
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
        let result;
        if (isNaN(Number(id)))
            result = await (0, user_query_1.information_email)(res, id);
        else
            result = await (0, user_query_1.information_id)(req, id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
app.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    const name = req.body.name;
    const firstname = req.body.firstname;
    let password = req.body.password;
    if (email === undefined || name === undefined ||
        firstname === undefined || password === undefined) {
        res.status(500).json({ "msg": "internal server error" });
        return;
    }
    password = bcrypt.hashSync(password, 10);
    try {
        const result = await (0, user_query_1.update_user_information)(res, password, id, email, name, firstname);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
app.delete('/:id', auth, async (req, res) => {
    let id = req.params.id;
    try {
        let result = await (0, user_query_1.delete_user)(res, id);
        res.status(200).json({ "msg": `succesfully deleted record number: ${id}` });
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
exports.default = app;
