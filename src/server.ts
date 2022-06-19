import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { connect } from './database/db';
import { router as adminRouter } from './module/admin/admin.router';
import { router as projectRouter } from './module/projects/project.router';



const app = new koa();
app.use(bodyParser());
app.use(adminRouter.routes());
app.use(adminRouter.allowedMethods());
app.use(projectRouter.routes());
app.use(projectRouter.allowedMethods());

const port = process.env.PORT || 3000;

export function start() {
    connect().then(() => {
        app.listen(port, () => {
            console.log("Listening on port 3000.")
        });
    })
};