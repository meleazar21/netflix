import useRedirectrUser from "@/utils/redirectUser";
import { NextApiRequest } from "next";

interface IContext {
    req: NextApiRequest;
}
export async function getServerSideProps(context: IContext) {
    return await useRedirectrUser(context);
}

const MyList = () => {
    return (
        <div>My List</div>
    )
}
export default MyList;