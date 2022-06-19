import Router from '@koa/router';
import { isAuthorized } from '../../middlewares/isAuthorized';
import { login, register, uploadFile } from './admin.handlers';
import multer from '@koa/multer';


export const router = new Router({
    prefix: '/admin'
});

const upload = multer({ dest: 'uploads/' });

router
    .post('/register', register)
    .post('/login', login)
    .post('/upload', isAuthorized, upload.single('image'), uploadFile);