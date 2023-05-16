import Head from "next/head";
import Image from "next/image";
import styles from "../styles/login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Paths } from "@/constants/path";
import { magic } from "@/lib/magic-client";
import { loginUser } from "@/services/magicLink.service";

const Login = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("");
    const [userMsg, setUserMsg] = useState<string>("");
    const rout = useRouter();

    useEffect(() => {
        const handleComplete = () => {
            setLoading(false);
        }
        rout.events.on("routeChangeComplete", handleComplete);
        rout.events.on("routeChangeError", handleComplete);
        return () => {
            rout.events.off("routeChangeComplete", handleComplete);
            rout.events.on("routeChangeError", handleComplete);
        }
    }, [])

    const handleLoginWithEmail = async () => {
        if (email && email.trim() === 'eleazarg2112@gmail.com') {
            setLoading(true);
            const idToken = await loginUser(email);
            if (!idToken) return;
            rout.push(Paths.HOME);
        } else {
            setUserMsg("Enter a valid email address!");
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix SignIn</title>
            </Head>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <a className={styles.logoLink} href="/">
                        <div className={styles.logoWrapper}>
                            <Image src="/images/netflix.svg" width={124} height={36} alt='picture of the author' />
                        </div>
                    </a>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h2 className={styles.signinHeader}>Sign In</h2>
                    <input
                        className={styles.emailInput}
                        disabled={loading}
                        type="text"
                        placeholder="email address"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                    />
                    <p className={styles.userMsg}>{userMsg}</p>
                    <button disabled={loading} className={styles.loginBtn} onClick={handleLoginWithEmail}>{loading ? "Loading..." : "Sign In"}</button>
                </div>
            </main>
        </div>
    );
}
export default Login;