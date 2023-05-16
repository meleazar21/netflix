import Loader from '@/components/loading'
import { Paths } from '@/constants/path'
import { isUserLogin } from '@/services/magicLink.service'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    /* const checkIsLoggedIn = async () => {
       setLoading(true);
       const isLoggedIn = await isUserLogin();
       if (isLoggedIn) router.push(Paths.HOME);
       else router.push(Paths.LOGIN);
     }
     */
    //checkIsLoggedIn();
    const handleComplete = () => {
      setLoading(false);
    }
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);
    }
  }, []);

  return loading ? <Loader /> : <Component {...pageProps} />
}
