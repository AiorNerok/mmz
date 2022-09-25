import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const navigate = useNavigate();

  const SignUpHandler = () => {
    axios({
      url: "http://127.0.0.1:8000/users/",
      method: "post",
      data: {
        username,
        email,
        password,
        password_repeat: passwordRepeat,
      },
    })
      .then((r: AxiosResponse) => {
        if (r.status === 200) {
          navigate("/auth");
        }
      })
      .catch((r: AxiosError) => console.log(r));
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  onChange={(event) => setPasswordRepeat(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password Repeat"
                />
              </div>
            </div>

            <div>
              <button
                onClick={SignUpHandler}
     
                className="group relative flex w-full justify-center border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
          </form>
          <span>
            <Link to={"/auth"}>Войти?</Link>
          </span>
        </div>
      </div>
    </>
  );
}
