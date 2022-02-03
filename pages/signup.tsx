import Link from 'next/link';

import Header from '../components/HeaderWhite';

const SignUp = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center mt-40">
        <h1 className="font-serif text-3xl mb-24">Join Small.</h1>
        <h3 className="border border-gray-400 text-gray-600 text-sm text-center w-52 px-4 py-2 mb-4 rounded-full cursor-pointer">
          Sign up with Google
        </h3>
        <h3 className="border border-gray-400 text-gray-600 text-sm text-center w-52 px-4 py-2 mb-4 rounded-full cursor-pointer">
          Sign up with Facebook
        </h3>
        <h3 className="border border-gray-400 text-gray-600 text-sm text-center w-52 px-4 py-2 rounded-full cursor-pointer mb-12">
          Sign up with email
        </h3>
        <p>
          Already have an account?{' '}
          <span className="text-green-700 font-bold cursor-pointer">Sign in</span>
        </p>
        <Link href="/">
          <p className="text-green-700 font-bold cursor-pointer mt-4 text-lg">Go Back Home</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
