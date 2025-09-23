import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginProcess } from "../thunk/authThunk";
import { toast } from "react-toastify";

// =============== IMAGES ============== //

import Logo from "../assets/images/logo.png";
import bgGradient2 from "../assets/images/bg-gradient-2.png";

const LoginPage = () => {

    // =========== STATE AND OTHER HOOKS =========== // 

    const [existUser, setExistUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ========== HANDLE CHANGE ============ //

    const handleChange = (e) => {
      const { name, value } = e.target;

      const existedUser = { ...existUser, [name]: value };
      setExistUser(existedUser);
    };

    // =========== HANDLE SUBMIT ============ //

    const handleSubmit = async (e) => {
      e.preventDefault();

      await dispatch(loginProcess(existUser));
      toast.success("Welcome Back");
      setExistUser({});
      navigate("/");
    };

  return (
    <>
      <div
        className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-950"
        style={{ backgroundImage: `url(${bgGradient2})` }}
      >
        {/* ========== LOGO ========== */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={Logo}
            alt="My Modern Blog"
            className="mx-auto h-15 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* ========= EMAIL ========= */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={existUser.email || ""}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:bg-white/5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>

                {/* ========= PASSWORD ========== */}
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={existUser.password || ""}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>

                {/* ========== SUBMIT BUTTON ========== */}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* =========== NAVIGATE TO SIGN UP PAGE ============ */}
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?
            <Link
              to={"/SignUpPage"}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
