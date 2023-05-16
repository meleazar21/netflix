import Image from 'next/image';
import styles from '../styles/banner.module.css'
import { useRouter } from 'next/router';
import { Paths } from '@/constants/path';

interface IBanner {
    imageUrl: string;
    title: string;
    subtitle: string;
    videoId: string;
}
const Banner = (props: IBanner) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`${Paths.VIDEO}/${props.videoId}`)
    }
    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <div className={styles.left}>
                    <div className={styles.nseriesWrapper}>
                        <p className={styles.firstLetter}>N</p>
                        <p className={styles.series}>S E R I E S</p>
                    </div>
                    <h3 className={styles.title}>{props.title}</h3>
                    <h3 className={styles.subtitle}>{props.subtitle}</h3>
                    <div className={styles.playBtnWrapper}>
                        <button className={styles.btnWithIcon} onClick={() => handleClick()}>
                            <Image
                                src='/images/play_arrow.svg'
                                alt='play_icon'
                                width={32}
                                height={32}
                            />
                            <span>Play</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={styles.bannerImg}
                style={{
                    backgroundImage: `url(${props.imageUrl})`,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundSize: 'cover',
                    backgroundPosition: '50%'
                }}>
            </div>
        </div>
    )
}
export default Banner;