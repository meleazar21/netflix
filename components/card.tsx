import { CardSize } from "@/enums/card-size";
import Image from "next/image";
import styles from "../styles/card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";

interface ICard {
    imageUrl: string;
    size: CardSize;
    id: string;
}
const Card = (props: ICard) => {
    const [imageSrc, setImageSrc] = useState(props.imageUrl);
    const setStyleBySize = (size: string) => {
        switch (size) {
            case CardSize.LARGE:
                return styles.lgItem;
            case CardSize.MEDIUM:
                return styles.mdItem;
            case CardSize.SMALL:
                return styles.smItem;
            default:
                return styles.mdItem;
        }
    }

    const handleOnError = (e: any) => {
        setImageSrc("https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80");
    }

    return (
        <div
            className={styles.container}>
            <motion.div whileHover={{ scaleY: 1.1 }} className={cls(setStyleBySize(props.size), styles.imgMotionWrapper)}>
                <Image
                    onError={handleOnError}
                    src={imageSrc}
                    alt="image"
                    width={300}
                    height={300}
                    className={`${styles.cardImg} ${setStyleBySize(props.size)}`}
                />
            </motion.div>
        </div>
    );
}
export default Card;