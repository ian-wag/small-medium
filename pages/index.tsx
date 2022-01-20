import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Small. A Medium like Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
}
