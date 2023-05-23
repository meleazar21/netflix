import NavBar from "@/components/navbar";
import { Paths } from "@/constants/path";
import { IVideoResponse } from "@/interfaces/ivideoResponse";
import { statsService } from "@/services/stats.service";
import useRedirectrUser from "@/utils/redirectUser";
import { NextApiRequest } from "next";
import styles from "../../styles/my-list.module.css";
import Head from "next/head";
import SectionCards from "@/components/section-cards";
import { CardSize } from "@/enums/card-size";

interface IContext {
    req: NextApiRequest;
}
export async function getServerSideProps(context: IContext) {
    const { userId, token } = await useRedirectrUser(context);

    if (!userId) {
        return {
            redirect: {
                destination: Paths.LOGIN,
                permanent: false,
            }
        }
    }
    const myVideoList = await statsService.getLikedVideos(userId, token);
    console.log({ myVideoList });
    return { props: { myVideoList } };
}

interface IServerSideProps {
    myVideoList: Array<IVideoResponse>
}
const MyList = (props: IServerSideProps) => {
    return (
        <div>
            <Head>
                <title>My List</title>
            </Head>
            <main className={styles.main}>
                <NavBar />
                <div className={styles.sectionWrapper}>
                    <SectionCards title="My List" videos={props.myVideoList} size={CardSize.SMALL} />
                </div>
            </main>
        </div>
    )
}
export default MyList;