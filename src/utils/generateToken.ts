import { randomBytes } from "crypto";


export function generateToken(userId:number) {
    return randomBytes(32).toString('hex');
}
