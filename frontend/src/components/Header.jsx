import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {
  const { users } = useSelector((state) => state.auth);

  const navLinks = [
    {
      path: "/MyBlogs",
      pageName: "My Blogs",
    },
    {
      path: "/Blogs",
      pageName: "Blogs",
    },
    {
      path: "/Categories",
      pageName: "Categories",
    },
  ];

  return (
    <>
      <header className="fixed bottom-5 left-0 right-0 max-w-4xl mx-auto z-15">
        <nav className="flex gap-x-5 border-2 border-violet-400 rounded-2xl items-center py-2 px-5 bg-indigo-950/80 backdrop-blur-sm">
          <Link to="/" className="pr-3 border-r border-gray-600">
            <img src={Logo} className="size-13 w-full" alt />
          </Link>

          <ul className="flex items-center mx-auto text-white gap-x-5">
            {navLinks.map((val, index) => (
              <li key={index} className="h-6 overflow-hidden relative group">
                <Link to={val.path}>
                  <span className="block group-hover:-translate-y-full transition-transform duration-300">
                    {val.pageName}
                  </span>
                  <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                    {val.pageName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {users && users.userName ? (
            <Link
              to="/About"
              className="nav-link border-l border-gray-600 pl-3"
            >
              <div className="shrink-0 group block">
                <div className="flex items-center">
                  {users && users.profileImage ? (
                    <img
                      className="inline-block shrink-0 size-7.5 rounded-full"
                      src={null}
                      alt="Avatar"
                    />
                  ) : (
                    <IoPersonCircleSharp className="size-7.5 text-gray-400" />
                  )}

                  <div className="ms-3">
                    <h3 className="font-semibold text-white">
                      {users.userName.slice(0, 10)}
                      {users.userName.length > 10 ? "..." : ""}
                    </h3>
                    <p className="text-sm font-medium text-gray-400 dark:text-neutral-500">
                      {users.email.slice(0, 10)}
                      {users.email.length > 10 ? "..." : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              to="/LoginPage"
              className="text-indigo-400 hover:text-indigo-300 border-l border-gray-600 pl-3"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
