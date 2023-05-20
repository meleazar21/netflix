import { magicAdmin } from "../../lib/magic";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "@/services/hasura.service";
import { JWT_SECRET } from "@/constants/commonStrings";
import { setTokenCookie } from "@/lib/cookies";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const didToken = auth ? auth.substring(7, auth.length) : "";
            const metadata = await magicAdmin.users.getMetadataByToken(didToken)

            const token = jwt.sign({
                ...metadata,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000 * 7 * 24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-default-role": "user",
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-user-id": `${metadata.issuer}`,
                }
            }, JWT_SECRET);

            const isNewUserQuery = await isNewUser(metadata.issuer ?? "", token);
            isNewUserQuery && await createNewUser(metadata, token);
            setTokenCookie(token, res);
            res.send({ done: true, msg: 'is a new user' });
        } catch (error) {
            console.error("something went wrong login in:", error);
            res.status(500).send({ done: false });
        }
    } else {
        res.send({ done: false });
    }
}
export default login;