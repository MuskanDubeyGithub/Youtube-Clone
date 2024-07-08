import Image from 'next/image';
import Link from 'next/link';
import { getVideos } from './firebase/functions';
import styles from './page.module.css'


export default async function Home() {
  const videos = await getVideos();

  return (
    <main>
      {
        videos.map((video) => (
          <Link key={video.id} href={`/watch?v=${video.filename}`}>
            <Image src={'/thumbnail.png'} alt='video' width={390} height={220}
              className={styles.thumbnail}/>
              {video.title}
          </Link>
        ))
      }
    </main>
  )
}

export const revalidate = 30;