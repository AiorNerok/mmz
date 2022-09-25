import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TokenAtom } from "store";
import { IsAuthCheck } from "utils/IsAuthCheck";
import ModlaDialog from "./ModlaDialog";

export default function Navbars() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigator = useNavigate();
  const lsToken = localStorage.getItem("token") || "";
  const atomToken = useRecoilValue(TokenAtom);

  useEffect(() => {
    const checkAuth = IsAuthCheck(lsToken, atomToken);

    if (checkAuth) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [atomToken, lsToken]);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    navigator("/auth");
  };

  let list_link = [
    {
      label: "Посты",
      to: "/",
    },
    {
      label: "Авторы",
      to: "/authors",
    },
    {
      label: "Логи",
      to: "/logs",
    },
    {
      label: "Мои Посты",
      to: "/myposts",
    },
  ];

  return (
    <nav className="border-gray-200 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="w-full" id="navbar-default">
          {isAuth && (
            <ul className="flex items-center p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 w-full">
              {list_link.map((i) => {
                return (
                  <li key={i.label}>
                    <Link
                      to={i.to}
                      className="block py-2 pr-4 pl-3"
                      aria-current="page"
                    >
                      {i.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <ModlaDialog />
              </li>
              <li className="flex-1 text-right">
                <button onClick={LogoutHandler} type="button">
                  Logout
                </button>
              </li>
            </ul>
          )}
          {!isAuth && (
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/auth"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signup"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
