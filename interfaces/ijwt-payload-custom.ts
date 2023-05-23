import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayloadCustom extends JwtPayload {
    issuer: string;
    publicAddress: string;
    email: string
}