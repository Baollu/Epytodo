"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract_info = void 0;
const SUCCESS = 0;
const ERROR = 84;
var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    var user_token = req.headers.authorization;
    if (user_token == undefined) {
        res.send({ "msg": "No token, authorization denied" });
        return ERROR;
    }
    var clean_token = user_token.replace('Bearer ', '');
    var return_value = SUCCESS;
    jwt.verify(clean_token, process.env.SECRET, function (err, decoded) {
        if (err) {
            res.send(401).json({ "msg": "Token is not valid" });
            return_value = ERROR;
        }
    });
    jwt.verify(clean_token, process.env.SECRET);
    next();
};
function extract_info(req, res) {
    var user_token = req.headers.authorization;
    if (user_token == undefined)
        return ERROR;
    var clean_token = user_token.replace('Bearer ', '');
    return jwt.verify(clean_token, process.env.SECRET);
}
exports.extract_info = extract_info;
;
