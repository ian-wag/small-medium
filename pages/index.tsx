import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Small. A Medium like Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-evenly items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">Small</span> is a place to
            write, read, and connect
          </h1>
          <h2 className="font-semibold">
            It's easy and free to post you thinking on any topic and connect with millions of
            readers.
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-48 py-10 px-14 lg:h-full"
          src="/SLogo.png"
          alt="S logo"
        />
      </div>
    </div>
  );
}
