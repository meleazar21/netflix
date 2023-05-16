import { useRouter } from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import cls from 'classnames'

Modal.setAppElement("#__next");

const video = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div className={styles.container}>
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
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{new Date().toLocaleDateString()}</p>
                            <h2 className={styles.title}>Peter Pan Movie 2023</h2>
                            <p className={styles.description}>
                                Follow the adventures of Peter Pan, a boy who does not want to grow up, and how he recruits three siblings in London, and together they embark on a magical adventure on the enchanted island .
                                Follow the adventures of Peter Pan, a boy who does not want to grow up, and how he recruits three siblings in London, and together they embark on a magical adventure on the enchanted island .
                                Follow the adventures of Peter Pan, a boy who does not want to grow up, and how he recruits three siblings in London, and together they embark on a magical adventure on the enchanted island .
                                Follow the adventures of Peter Pan, a boy who does not want to grow up, and how he recruits three siblings in London, and together they embark on a magical adventure on the enchanted island .
                                Follow the adventures of Peter Pan, a boy who does not want to grow up, and how he recruits three siblings in London, and together they embark on a magical adventure on the enchanted island .
                                Follow the adventures of Peter Pan, a boy who does not want to grow up, and how he recruits three siblings in London, and together they embark on a magical adventure on the enchanted island .
                            </p>
                        </div>
                        <div className={styles.col2}>
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>Netflix</span>
                            </p>
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>1000</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default video;