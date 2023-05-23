import Loader from '@/components/loading'
import { Paths } from '@/constants/path'
import { isUserLogin } from '@/services/magicLink.service'
import '@/styles/globals.css'
import useRedirectrUser from '@/utils/redirectUser'
import { NextApiRequest } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface IContext {
  req: NextApiRequest;
}

const getServerSideProps = async (context: IContext) => {
  const { userId } = await useRedirectrUser(context);

  if (!userId) {
    return {
      redirect: {
        destination: Paths.LOGIN,
        permanent: false,
      }
    }
  }
  return { props: {} };
}

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      setLoading(true);
      const isLoggedIn = await isUserLogin();
      if (isLoggedIn) router.push(Paths.HOME);
      else router.push(Paths.LOGIN);
    }

    checkIsLoggedIn();
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
