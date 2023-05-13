import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import NavBar from '@/components/navbar'
import Card from '@/components/card'
import { CardSize } from '@/enums/card-size'
import SectionCard from '@/components/section-cards'
import { IVideo } from '@/interfaces/ivideo'
import { getVideos } from '@/services/video.service'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const disneyVideo = getVideos();
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username='meleazar18' />
      <Banner
        title='Social Network'
        subtitle='the creation of facebook by Mark Zuckemberg'
        imageUrl='/images/socialnetworkimage.jpg'
      />
      <div className={styles.sectionWrapper}>
        <SectionCard title='Disney' videos={disneyVideo as Array<IVideo>} size={CardSize.LARGE} />
        <SectionCard title='Disney' videos={disneyVideo as Array<IVideo>} size={CardSize.SMALL} />
      </div>
    </div>
  )
}