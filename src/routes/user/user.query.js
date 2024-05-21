"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_user_task = exports.update_user_information = exports.delete_user = exports.information_email = exports.information_id = exports.get_all_user_info = void 0;
const db_1 = __importDefault(require("../../config/db"));
async function get_all_user_info(req, res) {
    return new Promise((resolve, reject) => {
        db_1.default.query('SELECT * FROM user', function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
exports.get_all_user_info = get_all_user_info;
;
async function information_id(req, id) {
    return new Promise((resolve, rejects) => {
        db_1.default.query('SELECT * FROM user WHERE id = ?', [id], function (err, result) {
            const res = result;
            if (err)
                rejects(err);
            resolve(res[0]);
        });
    });
}
exports.information_id = information_id;
async function information_email(res, email) {
    console.log(email);
    return new Promise((resolve, rejects) => {
        db_1.default.execute('SELECT * FROM user WHERE email = "' + email + '"', function (err, result) {
            const res = result;
            if (err)
                rejects(err);
            resolve(res[0]);
        });
    });
}
exports.information_email = information_email;
async function delete_user(res, id) {
    return new Promise((resolve, rejects) => {
        db_1.default.execute('DELETE FROM user WHERE id = ?', [id], function (err, result) {
            if (err)
                rejects(err);
            resolve(result);
        });
    });
}
exports.delete_user = delete_user;
async function update_user_information(res, password, id, email, name, firstname) {
    return new Promise((resolve, rejects) => {
        db_1.default.execute('UPDATE `user` SET `email` = ?, `password` = ?, `name` = ?, `firstname` = ? WHERE `id` = ?', [email, password, name, firstname, id], function (err) {
            if (err)
                rejects(err);
            db_1.default.execute('SELECT id, email, password, name, firstname, created_at FROM user WHERE id = ?', [id], function (err, result) {
                const res = result;
                if (err)
                    rejects(err);
                resolve(res[0]);
            });
        });
    });
}
exports.update_user_information = update_user_information;
async function get_user_task(res, mail) {
    console.log(mail);
    return new Promise((resolve, reject) => {
        db_1.default.query('SELECT * FROM todo INNER JOIN user ON todo.user_id = user.id WHERE email = "' + mail + '"', function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
exports.get_user_task = get_user_task;
;
