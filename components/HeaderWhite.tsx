import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between p-5 max-w-7xl mx-auto bg-white">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img className="w-32 object-contain cursor-pointer" src="/logo.png" alt="logo" />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3 className="cursor-pointer">About</h3>
          <h3 className="cursor-pointer">Contact</h3>
          <h3 className="text-white bg-green-600 p-4 py-1 rounded-full cursor-pointer">Follow</h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600 cursor-pointer">
        <h3 className="hidden md:inline-flex">Sign In</h3>
        <h3 className="border border-black text-green-600 px-4 py-1 rounded-full cursor-pointer">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
