import { Context } from "koa";
import { Project } from "./project.model";
import qrcode from "qrcode";
import cloudinary from 'cloudinary';

export async function createProject(ctx: Context) {
    const { photos, title } = ctx.request.body;

    const project = new Project({
        photos,
        title
    });

    const QRCode = await qrcode.toDataURL(`http://localhost:3000?projectId=${project._id}`);
    const cloudinaryImage = await cloudinary.v2.uploader.upload(QRCode);
    project.QR = cloudinaryImage.secure_url;
    await project.save();
    ctx.status = 201;
    ctx.body = { project };
}

export async function getProjects(ctx: Context) {
    const project = await Project.find();
    ctx.body = { project };
}

export async function getById(ctx: Context) {
    const project = await Project.findOne({ _id: ctx.params.id });
    ctx.body = { project };
}

export async function deleteProject(ctx: Context) {
    await Project.deleteOne({ _id: ctx.params.id });
    ctx.status = 200;
}