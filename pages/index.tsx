import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import NavBar from '@/components/navbar'
import { CardSize } from '@/enums/card-size'
import SectionCard from '@/components/section-cards'
import { IVideo } from '@/interfaces/ivideo'
import { getPopularVideos, getVideos } from '@/services/video.service'

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailers");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  return { props: { disneyVideos, productivityVideos, travelVideos, popularVideos } }
}
interface IServerSideProps {
  disneyVideos: Array<IVideo>;
  productivityVideos: Array<IVideo>;
  travelVideos: Array<IVideo>;
  popularVideos: Array<IVideo>;
}
export default function Home(props: IServerSideProps) {
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar username='meleazar18' />
        <Banner
          title='Social Network'
          subtitle='the creation of facebook by Mark Zuckemberg'
          imageUrl='/images/socialnetworkimage.jpg'
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title='Disney' videos={props.disneyVideos as Array<IVideo>} size={CardSize.LARGE} />
          <SectionCard title='Travel' videos={props.travelVideos as Array<IVideo>} size={CardSize.SMALL} />
          <SectionCard title='Productivity' videos={props.productivityVideos as Array<IVideo>} size={CardSize.MEDIUM} />
          <SectionCard title='Populars' videos={props.popularVideos as Array<IVideo>} size={CardSize.SMALL} />
        </div>
      </div>
    </div>
  )
}
