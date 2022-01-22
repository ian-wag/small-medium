import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 370) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener('scroll', changeBackground);
  });

  return (
    <header
      className={
        navbar
          ? 'sticky top-0 z-50 flex justify-between p-5 max-w-7xl mx-auto bg-white border-b border-black transition duration-500'
          : 'sticky top-0 z-50 flex justify-between p-5 max-w-7xl mx-auto bg-yellow-400 border-b border-black transition duration-500'
      }
    >
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img className="w-32 object-contain cursor-pointer" src="/logo.png" alt="logo" />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3 className="cursor-pointer">About</h3>
          <h3 className="cursor-pointer">Contact</h3>
          <h3
            className={
              navbar
                ? 'text-white bg-green-600 p-4 py-1 rounded-full cursor-pointer transition duration-500'
                : 'text-white bg-black p-4 py-1 rounded-full cursor-pointer transition duration-500'
            }
          >
            Follow
          </h3>
        </div>
      </div>
      <div
        className={
          navbar
            ? 'flex items-center space-x-5 text-green-600 cursor-pointer transition duration-500'
            : 'flex items-center space-x-5 text-black cursor-pointer transition duration-500'
        }
      >
        <h3 className="hidden md:inline-flex">Sign In</h3>
        <h3
          className={
            navbar
              ? 'border border-black text-green-600 px-4 py-1 rounded-full cursor-pointer transition duration-500'
              : 'border border-black bg-black text-white px-4 py-1 rounded-full cursor-pointer transition duration-500'
          }
        >
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
