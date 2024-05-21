import mysql from 'mysql2'
import dotenv from "dotenv";

require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err)
        throw err;
    console.log("MySql Connected");
});

export default db