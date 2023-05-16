import { CardSize } from "@/enums/card-size";
import Card from "./card";
import styles from "../styles/section-cards.module.css";
import { IVideo } from "@/interfaces/ivideo";
import Link from "next/link";

interface ISectionCard {
    title: string;
    videos: Array<IVideo>;
    size: CardSize
}

const SectionCards = (props: ISectionCard) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{props.title}</h2>
            <div className={styles.cardWrapper}>
                {props.videos.map((video: IVideo, index: number) => {
                    return (
                        <Link href={`/video/${video.id.videoId ? video.id.videoId : video.id}`} key={index}>
                            <Card
                                id={video.id.videoId}
                                imageUrl={video.snippet.thumbnails.high.url}
                                size={props.size}
                            />
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
export default SectionCards;