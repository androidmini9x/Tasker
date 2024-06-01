import {Router} from 'express';
import TaskController from '../controllers/TaskController';

const routes = Router();

routes.get('/tasks', TaskController.all);
routes.get('/tasks/:task_id', TaskController.get);
routes.post('/tasks/', TaskController.create);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);

export default routes;