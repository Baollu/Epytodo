"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_todo = exports.update_todo_information = exports.post_todo = exports.get_last_todo = exports.view_todo = exports.all_todo = void 0;
const db_1 = __importDefault(require("../../config/db"));
async function all_todo(req, res) {
    return new Promise((resolve, reject) => {
        db_1.default.query('SELECT * FROM todo', function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
exports.all_todo = all_todo;
;
async function view_todo(req, id) {
    return new Promise((resolve, rejects) => {
        db_1.default.query('SELECT * FROM `todo` WHERE id = ?', [id], function (err, result) {
            const res = result;
            if (err)
                rejects(err);
            resolve(res[0]);
        });
    });
}
exports.view_todo = view_todo;
async function get_last_todo() {
    return new Promise((resolve, reject) => {
        db_1.default.query('SELECT * FROM todo ORDER BY id DESC LIMIT 1', function (err, result) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
exports.get_last_todo = get_last_todo;
;
async function post_todo(title, description, due_time, user_id, status) {
    return new Promise((resolve, reject) => {
        db_1.default.execute('INSERT INTO todo (title, description, due_time, user_id, status) VALUES("' + title + '", "' + description + '", "' + due_time + '", "' + user_id + '", "' + status + '")', async function (err) {
            if (err)
                reject(err);
            try {
                let result = await get_last_todo();
                resolve(result[0]);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.post_todo = post_todo;
;
async function update_todo_information(title, description, due_time, user_id, status, id) {
    return new Promise((resolve, rejects) => {
        db_1.default.execute('UPDATE `todo` SET `title` = ?, `description` = ?, `due_time` = ?, `user_id` = ?, `status` = ? WHERE `id` = ?', [title, description, due_time, user_id, status, id], function (err) {
            if (err)
                rejects(err);
            db_1.default.execute('SELECT title, description, due_time, user_id, status FROM todo WHERE id = ?', [id], function (err, result) {
                if (err)
                    rejects(err);
                resolve(result);
            });
        });
    });
}
exports.update_todo_information = update_todo_information;
async function delete_todo(res, id) {
    return new Promise((resolve, rejects) => {
        db_1.default.execute('DELETE FROM todo WHERE id = ?', [id], function (err, result) {
            if (err)
                rejects(err);
            resolve(result);
        });
    });
}
exports.delete_todo = delete_todo;
