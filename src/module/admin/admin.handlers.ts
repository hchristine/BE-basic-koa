import { Context } from "koa";
import { Admin } from "./admin.model";
import { createToken } from "./utils";
import cloudinary from 'cloudinary';


export async function register(ctx: Context) {
    const { email, password, name } = ctx.request.body;
    debugger;

    const adminExists = await Admin.findOne({ email, name });

    if (adminExists) {
        ctx.status = 401;
        ctx.body = { message: 'Admin already exists!!!' };
        return;
    }
    const doc = await Admin.register({
        email,
        password,
        name
    });

    const token = await createToken({ email, name, adminId: String(doc._id) });

    ctx.body = { token };
}

export async function login(ctx: Context) {
    const { email, password } = ctx.request.body;

    const admin = await Admin.login({ email, password });
    const token = await createToken({
        adminId: admin._id,
        email: admin.email,
        name: admin.name
    });
    ctx.body = { token };
}

export async function uploadFile(ctx: Context) {
    if (!ctx.request.file) {
        ctx.status = 400;
        return;
    }
    const path = await upload(ctx.request.file.path);
    ctx.body = { path }
}


function upload(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(path, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result!.secure_url)
        });
    });
}