import { Paths } from "@/constants/path";
import { verifyToken } from "@/lib/util";

const useRedirectrUser = async (context: any) => {
    const token = context.req.cookies.token as string;
    const userId = await verifyToken(token) as string;
    if (!userId) {
        return {
            redirect: {
                destination: Paths.LOGIN,
                permanent: false,
            }
        }
    }
    return { token, userId };
}
export default useRedirectrUser;