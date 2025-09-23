import React from "react";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-t from-black to-indigo-950 py-25 shadow-sm">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a href="#" className="hover:underline">
              The Modern Blog ™
            </a>
            . All Rights Reserved.
          </span>
          <img src={Logo} alt="The Modern Blog logo" />
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="/about" className="hover:underline me-4 md:me-6">
                Profile
              </a>
            </li>
            <li>
              <a href="/myBlogs" className="hover:underline me-4 md:me-6">
                My Blogs
              </a>
            </li>
            <li>
              <a href="/allBlogs" className="hover:underline me-4 md:me-6">
                Blogs
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
