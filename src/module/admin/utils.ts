import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../payload/jwtPayload';

const secret = process.env.SECRET;
if (!secret) {
    throw new Error("Where is your JWT secret?")
}

export function createToken(payload: JwtPayload): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret!, {
            expiresIn: "10d"
        }, (error, token) => {
            if (error) {
                reject()
            } else {
                resolve(token!);
            }
        });
    });
} 