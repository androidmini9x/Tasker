import {Request, Response} from 'express'
import { request } from '../utils/request';

class TaskController {
    static async all(req: Request, res: Response) {
        const {status, data} = await request('tasks');
        return res.status(status).send(data);
    }
    static async get(req: Request, res: Response) {
        const {status, data} = await request(`tasks/${req.params.task_id}`);
        return res.status(status).send(data);
    }
    static async create(req: Request, res: Response) {
        const body = req.body;
        const {status, data} = await request('tasks', 'POST', body);
        return res.status(status).send(data);
    }
    static async update(req: Request, res: Response) {
        const body = req.body;
        const {status, data} = await request(`tasks/${req.params.task_id}`, 'PUT', body);
        return res.status(status).send(data);
    }
    static async delete(req: Request, res: Response) {
        const body = req.body;
        const {status, data} = await request(`tasks/${req.params.task_id}`, 'DELETE');
        return res.status(status).send(data);
    }
}

export default TaskController;