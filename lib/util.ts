import { JWT_SECRET } from "@/constants/commonStrings";
import { IJwtPayloadCustom } from "@/interfaces/ijwt-payload-custom";
import jwt from "jsonwebtoken";
export async function verifyToken(token: string) {
    if (!token) return null;

    const { issuer } = await jwt.verify(token, JWT_SECRET) as IJwtPayloadCustom;
    return issuer;
}