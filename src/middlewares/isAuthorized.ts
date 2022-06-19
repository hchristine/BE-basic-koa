import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { JwtPayload } from '../payload/jwtPayload';

export const isAuthorized = async (ctx: Context, next: Next) => {
    if (!ctx.request.headers.authorization) {
        ctx.status = 403;
        return;
    };

    const decodedData = await new Promise((resolve) => {
        jwt.verify(ctx.request.headers.authorization!, process.env.SECRET!, (error, decoded) => {
            if (error) {
                resolve(undefined);
                return;
            }
            resolve(decoded);
        });
    });

    if (!decodedData) {
        ctx.status = 400;
        return;
    }
    ctx.admin = decodedData;
    await next();
};