import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface INavBar {
    username: string;
}

const NavBar = (props: INavBar) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const router = useRouter();

    const handleClickHome = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push("/");
    }

    const handleClickMyList = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/browse/my-list');
    }

    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        <Image src="/images/netflix.svg" width={124} height={36} alt='picture of the author' />
                    </div>
                </a>
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleClickHome}>Home</li>
                    <li className={styles.navItem} onClick={handleClickMyList}>My List</li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{props.username}</p>
                            <Image src="/images/expand.svg" alt='expand_icon' width={24} height={24} />
                            {/**Expand more icon */}
                        </button>
                        {showDropdown && <div className={styles.navDropdown}>
                            <div>
                                <Link href="/login" className={styles.linkName}>Sign out</Link>
                                <div className={styles.lineWrapper}></div>
                            </div>
                        </div>}
                    </div>
                </nav>
            </div>
        </div>
    );
}
export default NavBar;