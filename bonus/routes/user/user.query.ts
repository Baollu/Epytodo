import { Request, Response } from 'express';
import db from '../../config/db'

export async function get_all_user_info(req:Request, res:Response) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM user', function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            }
        );
    });
};

export async function information_id(req: Request, id: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        db.query(
            'SELECT * FROM user WHERE id = ?', [id], function(err, result) {
                const res = result as unknown as string[]
                if (err)
                    rejects(err);
                resolve(res[0]);
            }
        )
    });
}

export async function information_email(res: Response, email: string): Promise<string> {
    console.log(email);
    return new Promise((resolve, rejects) => {
        db.execute(
            'SELECT * FROM user WHERE email = "'+email+'"', function (err, result) {
                const res = result as unknown as string[]
                if (err)
                    rejects(err);
                resolve(res[0]);
            }
        )
    });
}

export async function delete_user(res:Response, id:string) {
    return new Promise((resolve, rejects) => {
        db.execute('DELETE FROM user WHERE id = ?', [id], function(err, result) {
            if (err)
                rejects(err);
            resolve(result);
        })
    })
}


export async function update_user_information(res:Response, password: any, id:string, email:string, name:string, firstname:string): Promise<string> {
    return new Promise((resolve, rejects) => {
        db.execute('UPDATE `user` SET `email` = ?, `password` = ?, `name` = ?, `firstname` = ? WHERE `id` = ?', [email, password, name, firstname, id], function(err) {
            if (err)
                rejects(err);
        db.execute('SELECT id, email, password, name, firstname, created_at FROM user WHERE id = ?', [id], function(err, result) {
            const res = result as unknown as string[]
            if (err)
                rejects(err);
            resolve(res[0])
        })
    })
})
}

export async function get_user_task(res: Response, mail: string) {
    console.log(mail);
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM todo INNER JOIN user ON todo.user_id = user.id WHERE email = "'+mail+'"', function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            }
        );
    });
};