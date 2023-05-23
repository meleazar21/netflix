import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { magic } from '@/lib/magic-client';
import { getDidToken, getUserEmail, logout } from '@/services/magicLink.service';
import { Paths } from '@/constants/path';

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [didToken, setDidToken] = useState("");
    const [username, setUsername] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        const getUserEmailAddress = async () => {
            const email = await getUserEmail();
            const token = await getDidToken();
            if (email) setUsername(email)
            if (didToken) setDidToken(token as string);
        }
        getUserEmailAddress();
    }, [])

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

    const handleSignout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${didToken}`,
                    "Content-Type": "application/json",
                },
            });

            await response.json();
        } catch (error) {
            console.error("Error logging out", error);
            router.push(Paths.LOGIN);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logoLink} href={Paths.HOME}>
                    <div className={styles.logoWrapper}>
                        <Image src="/images/netflix.svg" width={124} height={36} alt='picture of the author' />
                    </div>
                </Link>
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleClickHome}>Home</li>
                    <li className={styles.navItem} onClick={handleClickMyList}>My List</li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            <Image src="/images/expand.svg" alt='expand_icon' width={24} height={24} />
                            {/**Expand more icon */}
                        </button>
                        {showDropdown && <div className={styles.navDropdown}>
                            <div>
                                <span onClick={handleSignout} className={styles.linkName}>Sign out</span>
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