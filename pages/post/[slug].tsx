import { GetStaticProps, GetStaticPaths } from 'next';
import HeaderWhite from '../../components/HeaderWhite';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';
import PortableText from 'react-portable-text';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface Props {
  post: Post;
}
interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Posts = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <HeaderWhite />

      <img
        className="w-full h-40 object-cover max-w-7xl mx-auto"
        src={urlFor(post.mainImage).url()!}
        alt="main post image"
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt="author avatar"
          />
          <p className="font-extralight text-sm">
            <span className="text-green-600">{post.author.name}</span> on{' '}
            {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => <h1 className="text-2xl font-bold my-5" {...props} />,
              h2: (props: any) => <h1 className="text-xl font-bold my-5" {...props} />,
              li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-7xl my-5 mx-auto border border-yellow-400" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-400 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">Thank you for submitting your comment!</h3>
          <p>Once comment has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-yellow-400">Enjoy this article?</h3>
          <h4 className="text-3xl font-bold">Leave A Comment Below!</h4>
          <hr className="py-3 mt-2" />

          <input {...register('_id')} name="_id" value={post._id} type="hidden" />

          <label htmlFor="nameField" className="block text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register('name', { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-400 outline-none focus:ring mb-5"
            type="text"
            id="nameField"
            placeholder="Biz Stone"
          />

          <label htmlFor="emailField" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register('email', { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-400 outline-none focus:ring mb-5"
            type="email"
            id="emailField"
            placeholder="name@example.com"
          />

          <label htmlFor="commentField" className="block text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            {...register('comment', { required: true })}
            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-400 outline-none focus:ring mb-5"
            placeholder="What are your thoughts?"
            rows={8}
            id="commentField"
          />

          <div className="flex flex-col p-5">
            {errors.name && <span className="text-red-500">- Name Field Is Required</span>}
            {errors.email && <span className="text-red-500">- Email Field Is Required</span>}
            {errors.comment && <span className="text-red-500">- Comment Field Is Required</span>}
          </div>

          <input
            type="submit"
            value="Submit"
            className="shadow bg-yellow-400 hover:bg-yellow-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </form>
      )}

      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500 text-lg">{comment.name}:</span> {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == 'post']{
    _id,
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id &&
      approved == true],
      description,
      mainImage,
      slug,
      body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    // every 60 seconds the cache will be updated
    revalidate: 60,
  };
};
