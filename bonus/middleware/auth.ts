const SUCCESS: number = 0;
const ERROR: number = 84;
var jwt = require('jsonwebtoken');

module.exports = (req: any, res: any, next:any) => {
    var user_token: string | undefined = req.headers.authorization;
    if (user_token == undefined) {
        res.send({ "msg": "No token, authorization denied" });
        return ERROR;
    }
    var clean_token: string = user_token.replace('Bearer ', '');
    var return_value: number = SUCCESS;
    jwt.verify(clean_token, process.env.SECRET, function (err: any, decoded: any) {
        if (err) {
            res.send(401).json({ "msg": "Token is not valid" });
            return_value = ERROR;
        }
    });
    jwt.verify(clean_token, process.env.SECRET);
    next()
};

export function extract_info(req: any, res: any) {
    var user_token: string | undefined = req.headers.authorization;
    if (user_token == undefined)
        return ERROR;
    var clean_token: string = user_token.replace('Bearer ', '');
    return jwt.verify(clean_token, process.env.SECRET);
};
