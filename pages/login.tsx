import Head from "next/head";
import Image from "next/image";
import styles from "../styles/login.module.css";
import { useCallback, useEffect, useState } from "react";
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
        if (email) {
            setLoading(true);
            const idToken = await loginUser(email);
            if (!idToken) return;

            const response = await fetch('/api/login', {
                method: "POST",
                headers: {
                    'authorization': `Bearer ${idToken}`,
                    'content-type': 'application/json'
                }
            });
            const loggedInResponse = await response.json();
            if (loggedInResponse.done) {
                rout.push(Paths.HOME);
            } else {
                setLoading(false);
                setUserMsg("Something went wrong while trying to login");
            }
        } else {
            setLoading(false);
            setUserMsg("Enter a valid email address!");
        }
    }

    const handleKeyDow = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') await handleLoginWithEmail();
    };

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
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDow(e)}
                    />
                    <p className={styles.userMsg}>{userMsg}</p>
                    <button disabled={loading} className={styles.loginBtn} onClick={handleLoginWithEmail}>{loading ? "Loading..." : "Sign In"}</button>
                </div>
            </main>
        </div>
    );
}
export default Login;