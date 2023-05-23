import { CardSize } from "@/enums/card-size";
import Card from "./card";
import styles from "../styles/section-cards.module.css";
import { IVideoResponse } from "@/interfaces/ivideoResponse";
import Link from "next/link";

interface ISectionCard {
    title: string;
    videos: Array<IVideoResponse>;
    size: CardSize
}

const SectionCards = (props: ISectionCard) => {
    return (
        <section className={styles.container}>
            {props.videos.length > 0 && (
                <>
                    <h2 className={styles.title}>{props.title}</h2>
                    <div className={styles.cardWrapper}>
                        {props.videos.map((video: IVideoResponse, index: number) => {
                            return (
                                <Link href={`/video/${video.id.videoId ? video.id.videoId : video.id}`} key={index}>
                                    <Card
                                        id={video.id.videoId}
                                        imageUrl={video.snippet?.thumbnails?.high.url || `https://i.ytimg.com/vi/${video.id.videoId}/maxresdefault.jpg`}
                                        size={props.size}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </>
            )}
        </section>
    )
}
export default SectionCards;