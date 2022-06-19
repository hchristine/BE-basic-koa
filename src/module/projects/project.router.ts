import Router from '@koa/router';
import { isAuthorized } from '../../middlewares/isAuthorized';
import { createProject, deleteProject, getById, getProjects } from './project.handlers';

export const router = new Router({
    prefix: '/projects'
});

router
    .post('/', isAuthorized, createProject)
    .get('/', isAuthorized, getProjects)
    .get('/:id', getById)
    .delete('/:id', deleteProject);