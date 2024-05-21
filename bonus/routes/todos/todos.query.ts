import { Request, Response } from 'express';
import db from '../../config/db'

export async function all_todo(req:Request, res: Response) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM todo', function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            }
        );
    });
};

export async function view_todo(req:Request, id:string): Promise<string> {
    return new Promise((resolve, rejects) => {
        db.query(
            'SELECT * FROM `todo` WHERE id = ?', [id], function(err, result) {
            const res = result as unknown as string[]
        if (err)
            rejects(err);
            resolve(res[0]);
            }
        )
    });
}

export async function get_last_todo() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM todo ORDER BY id DESC LIMIT 1',
            function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            }
        );
    });
};

export async function post_todo(title: string, description: string, due_time: string, user_id: string, status: string) {
    return new Promise((resolve, reject) => {
        db.execute(
            'INSERT INTO todo (title, description, due_time, user_id, status) VALUES("' + title + '", "' + description + '", "' + due_time + '", "' + user_id + '", "' + status + '")',
            async function (err) {
                if (err)
                    reject(err);
                try {
                    let result: any = await get_last_todo();
                    resolve(result[0]);
                } catch (err) {
                    reject(err);
                }
            }
        );
    });
};

export async function update_todo_information(title:string, description:string, due_time:string, user_id:string, status:string, id:string) {
    return new Promise((resolve, rejects) => {
        db.execute('UPDATE `todo` SET `title` = ?, `description` = ?, `due_time` = ?, `user_id` = ?, `status` = ? WHERE `id` = ?', [title, description, due_time, user_id, status, id], function(err) {
            if (err)
                rejects(err);
            db.execute('SELECT title, description, due_time, user_id, status FROM todo WHERE id = ?', [id], function(err, result) {
                if (err)
                    rejects(err);
                resolve(result)
            })
        })
    })
}

export async function delete_todo(res:Response, id:string) {
    return new Promise((resolve, rejects) => {
        db.execute('DELETE FROM todo WHERE id = ?', [id], function(err, result) {
            if (err)
                rejects(err);
            resolve(result);
        })
    })
}
