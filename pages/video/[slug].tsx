import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import cls from 'classnames'
import { IVideo } from "@/interfaces/ivideo";
import { getVideoById } from "@/services/video.service";
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import NavBar from '@/components/navbar';
import Like from '@/components/icons/like-icon';
import DisLike from '@/components/icons/dislike-icon';
import { useEffect, useState } from 'react';
import { IParam } from '@/interfaces/iparam';
import { statsService } from '@/services/stats.service';
import { IVideoInput } from '@/interfaces/ivideo-input';
import { Favourited } from '@/enums/favourited';

Modal.setAppElement("#__next");

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params as IParam;
    const videoById = await getVideoById(params.slug);
    const video: IVideo = {
        channelTitle: videoById[0]?.snippet?.channelTitle ?? "",
        title: videoById[0]?.snippet?.title ?? "",
        description: videoById[0]?.snippet?.description ?? "",
        publishTime: videoById[0]?.snippet?.publishedAt ?? "",
        viewCount: videoById[0]?.statistics?.viewCount ?? 0,
    };
    return {
        props: {
            video,
        },
        revalidate: 10, // In seconds
    };
}

export async function getStaticPaths() {
    const listOfVideos = ["lB95KLmpLR4", "9GgxinPwAGc", "8BFdFeOS3oM"];

    const paths = listOfVideos.map((slug) => ({
        params: { slug },
    }));

    return { paths, fallback: 'blocking' };
}

interface IGetStaticProps {
    video: IVideo;
}

const video = (props: IGetStaticProps) => {

    const [toggles, setToggles] = useState({ like: false, dislike: false });

    const router = useRouter();
    const { slug } = router.query;

    const runRatingService = async (favorited: Favourited) => {
        const videoInput: IVideoInput = {
            favourited: favorited,
            videoId: slug as string,
            watched: true,
        };
        const isLiked = favorited === Favourited.LIKED;
        setToggles({ like: isLiked, dislike: !isLiked });
        const result = await statsService.likeVideo(videoInput);
        if (!result.success) setToggles({ like: !isLiked, dislike: isLiked });
    }

    const handleToggleLike = () => {
        runRatingService(Favourited.LIKED);
    }

    const handleToggleDisLike = () => {
        runRatingService(Favourited.DISLIKED);
    }

    const handleSuccess = (response: any) => {
        const isLiked = response.obj.favourited === Favourited.LIKED;
        setToggles({ like: isLiked, dislike: !isLiked });
    }
    const handleError = (error: any) => {
        console.log(error);
    }

    useEffect(() => {
        statsService.getVideoById(slug as string, handleSuccess, handleError);
    }, [])

    return (
        <div className={styles.container}>
            <NavBar />
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <iframe className={styles.videoPlayer} id="ytplayer" data-type="text/html" width="100%" height="360"
                    src={`https://www.youtube.com/embed/${slug}?controls=0&rel=0&autoplay=1&origin=http://example.com`}
                    data-frameborder="0"></iframe>
                <div className={styles.likeDislikeBtnWrapper}>
                    <div className={styles.likeBtnWrapper}>
                        <button onClick={handleToggleLike}>
                            <div className={styles.btnWrapper}>
                                <Like fill='none' selected={toggles.like} />
                            </div>
                        </button>
                    </div>
                    <div className={styles.likeBtnWrapper}>
                        <button onClick={handleToggleDisLike}>
                            <div className={styles.btnWrapper}>
                                <DisLike fill='none' selected={toggles.dislike} />
                            </div>
                        </button>
                    </div>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{new Date().toLocaleDateString()}</p>
                            <h2 className={styles.title}>{props.video.title}</h2>
                            <p className={styles.description}>
                                {props.video.description}
                            </p>
                        </div>
                        <div className={styles.col2}>
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>{props.video.channelTitle}</span>
                            </p>
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>{props.video?.viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default video;