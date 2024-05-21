"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../../config/db"));
const auth = (0, express_1.Router)();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');
;
async function create_user_from_db(mail, password, name, firstname) {
    return new Promise((resolve, reject) => {
        db_1.default.query('INSERT INTO user (email, password, name, firstname) VALUES("' + mail + '", "' + password + '", "' + name + '", "' + firstname + '")', function (err, result) {
            if (err) {
                if (err["code"] == "ER_DUP_ENTRY")
                    reject({ "msg": "Account already exists" });
                else
                    reject({ "msg": "Internal server error" });
            }
            ;
            resolve(result);
        });
    });
}
;
auth.use(bodyParser.json());
auth.post("/register", jsonParser, async (req, res) => {
    if (req.body.email == undefined || req.body.password == undefined || req.body.name == undefined || req.body.firstname == undefined) {
        res.status(500).json({ "msg": "Internal server error" });
        return;
    }
    try {
        await create_user_from_db(req.body.email, req.body.password, req.body.name, req.body.firstname);
        var token = jwt.sign({ email: req.body.email, mdp: req.body.password }, process.env.SECRET);
        res.send({ "token": token });
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
async function get_user_db_info(mail, password) {
    return new Promise((resolve, reject) => {
        db_1.default.query('SELECT * FROM user WHERE email = \"' + mail + '\" AND password = \"' + password + '\"', function (err, result, fields) {
            if (err) {
                reject({ "msg": "Internal server error" });
            }
            ;
            resolve(result);
        });
    });
}
;
auth.post('/login', jsonParser, async (req, res) => {
    const { email, password } = req.body;
    if (email == undefined || password == undefined) {
        res.status(500).json({ "msg": "internal server error" });
        return;
    }
    try {
        var db_result = await get_user_db_info(email, password);
        if (db_result.length == 0)
            res.status(401).json({ "msg": "Invalid Credentials" });
        else {
            var token = jwt.sign({ email: email, mdp: password }, process.env.SECRET);
            res.send({ "token": token });
        }
    }
    catch (err) {
        res.status(409);
        res.send(err);
    }
});
auth.get("/", (req, res) => {
    res.send("okay");
});
exports.default = auth;
