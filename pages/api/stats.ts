import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants/commonStrings";
import { IJwtPayloadCustom } from "@/interfaces/ijwt-payload-custom";
import { createStats, findStatByUserVideoId, updateStates } from "@/lib/stats";
import { TypeInsertVariables } from "@/interfaces/istats-variables";
import { IServiceResponse } from "@/interfaces/iservice-response";
import { verifyToken } from "@/lib/util";

const stats = async (req: NextApiRequest, res: NextApiResponse) => {

    if (!req.cookies.token) return res.status(403).send({ message: 'Unauthorized!' });

    const issuer = await verifyToken(req.cookies.token) as string;
    let response: IServiceResponse = { success: true, obj: {} };

    if (req.method === 'POST') {
        try {

            const { videoId, watched, favourited } = req.body;
            const variables = { userId: issuer, videoId, watched, favourited };
            const insertVariables: TypeInsertVariables = { userId: issuer, videoId, watched }

            const findVideoId = await findStatByUserVideoId(issuer, videoId, req.cookies.token);
            if (!findVideoId.data.stats.length) {
                const insertedRow = await createStats(insertVariables, req.cookies.token);
                response.obj = insertedRow;
            } else {
                const updatedRow = await updateStates(variables, req.cookies.token);
                response.obj = updatedRow;
            }
            response.success = true;
            res.status(200).send(response);

        } catch (error) {
            response.success = false;
            response.obj = error;
            res.status(500).send(response);
        }
    } else {
        const { videoId } = req.query;
        const findVideoId = await findStatByUserVideoId(issuer, videoId as string, req.cookies.token);
        if (!findVideoId.data.stats.length) {
            response.success = false;
            response.obj = null;
            res.status(500).send(response);
        } else {
            response.success = true;
            response.obj = findVideoId?.data?.stats.length > 0 ? findVideoId?.data?.stats[0] : null;
            res.send(response);
        }
    }
}
export default stats;