import Head from 'next/head';
import Link from 'next/link';
import HeaderYellow from '../components/HeaderYellow';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';
import { TrendingUpIcon } from '@heroicons/react/solid';
import Footer from '../components/Footer';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto relative">
      <Head>
        <title>Small – A medium like blog.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderYellow />
      <div className="flex justify-evenly items-center bg-yellow-400 border-b border-black py-5 sm:py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif hidden sm:block">
            <span className="underline decoration-black decoration-4">Small</span> is a place to
            write, read, and connect
          </h1>
          <h1 className="text-6xl font-serif sm:hidden">Write, read, and connect</h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect with millions of
            readers.
          </h2>
          <Link href="signup">
            <h3 className="bg-white w-32 border border-black px-4 py-2 text-center rounded-full cursor-pointer">
              Start Writing
            </h3>
          </Link>
        </div>
        <img
          className="hidden md:inline-flex h-48 py-10 px-14 lg:h-full"
          src="/SLogo.png"
          alt="S logo"
        />
      </div>
      <div className="flex items-center p-2 md:px-6 mt-6 font-bold text-sm text-gray-700">
        <TrendingUpIcon className="h-6 w-6 border-2 rounded-full border-gray-700" />
        <h3 className="ml-2">TRENDING ON SMALL</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-md group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt="post image"
              />
              <div className="flex justify-between px-5 py-3 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p>{post.description}</p>
                  <p className="text-xs text-gray-500">{post.author.name}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt="author avatar"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `
  *[_type =="post"]{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
