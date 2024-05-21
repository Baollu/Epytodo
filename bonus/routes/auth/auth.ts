import { Router } from 'express';
import { QueryResult } from "mysql2";
import db from "../../config/db";

const auth: Router = Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var jwt = require('jsonwebtoken');

interface User {
    name: string;
    firstname: string;
    password: string;
    email: string;
};

async function create_user_from_db(mail: string, password: string, name: string, firstname: string) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO user (email, password, name, firstname) VALUES("' + mail + '", "' + password + '", "' + name + '", "' + firstname + '")',
            function (err, result) {
                if (err) {
                    if (err["code"] == "ER_DUP_ENTRY")
                        reject({ "msg": "Account already exists" });
                    else
                        reject({ "msg": "Internal server error" });
                };
                resolve(result);
            }
        );
    });
};

auth.use(bodyParser.json());
auth.post("/register", jsonParser, async (req, res) => {
    if (req.body.email == undefined || req.body.password == undefined || req.body.name == undefined || req.body.firstname == undefined) {        
        res.status(500).json({ "msg": "Internal server error" });
        return;
    }
    try {
        await create_user_from_db(req.body.email, req.body.password, req.body.name, req.body.firstname);
        var token: string = jwt.sign({ email: req.body.email, mdp: req.body.password }, process.env.SECRET);
        res.send({ "token": token });
    } catch (err) {
        res.status(409);
        res.send(err);
    }
});

async function get_user_db_info(mail: string, password: string): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM user WHERE email = \"' + mail + '\" AND password = \"' + password + '\"',
            function (err, result, fields) {
                if (err) {
                    reject({ "msg": "Internal server error" });
                };
                resolve(result);
            }
        );
    });
};

auth.post('/login', jsonParser, async (req, res) => {
    const { email, password } = req.body as User;
    if (email == undefined || password == undefined) {
        res.status(500).json({"msg":"internal server error"});
        return;
    }
    try {
        var db_result: Array<User> = await get_user_db_info(email, password) as Array<User>;
        if (db_result.length == 0)
            res.status(401).json({"msg":"Invalid Credentials"});
        else {
            var token: string = jwt.sign({ email: email, mdp: password }, process.env.SECRET);
            res.send({ "token": token });
        }
    } catch (err) {
        res.status(409);
        res.send(err);
    }
});

auth.get("/", (req, res) => {
    res.send("okay");
});

export default auth
