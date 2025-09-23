import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpProcess } from "../thunk/authThunk";
import { toast } from "react-toastify";

import Logo from "../assets/images/logo.png";
import bgGradient2 from "../assets/images/bg-gradient-2.png"

const SignUpPage = () => {

    // ============= STATES AND HOOKS ============== //

    const [user, setuser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ============ HANDLE CHANGE ============== //

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newUser = { ...user, [name]: value };
        setuser(newUser);
    };

    // ============ HANDLE SUBMIT ============== //

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = user;

        if (password === confirmPassword) {
            try {
                dispatch(signUpProcess(user));
                toast.success(`Hello ${user.userName}`);
                setuser({});
                navigate("/LoginPage");
            } catch (error) {
                console.log(error.message);
            }

        } else {
            toast.error("confirm password not matched");

        }
    };

  return (
    <>
      <section
        className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-950"
        style={{ backgroundImage: `url(${bgGradient2})` }}
      >

        {/* ============== LOGO ============== */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={Logo}
            alt="My Modern Blog"
            className="mx-auto h-15 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Register to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >

            {/* ============= USER NAME ============= */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm/6 font-medium text-gray-100"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  value={user.userName || ""}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* ============== EMAIL ============== */}
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
                  value={user.email || ""}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* ============== PASSWORD ============== */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={user.password || ""}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* ============== CONFIRM PASSWORD ============== */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={user.confirmPassword || ""}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* ============= SUBMIT BUTTON ============== */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* ============== NAVIGATE TO LOGIN ============== */}
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            already a member?
            <Link
              to={"/Login"}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
