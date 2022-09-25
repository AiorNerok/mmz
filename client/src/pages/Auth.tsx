import { useLocation } from "react-router-dom";

import Layout from "../layout";
import { Signin, Signup } from "../components";
import { useEffect, useState } from "react";

export default function Auth() {
  const location = useLocation();

  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  useEffect(() => {
    const isSignIn = location.pathname === "/auth" ? true : false;
    setIsSignIn(isSignIn);
  }, [location.pathname]);

  return (
    <Layout>
      {isSignIn && <Signin />}
      {!isSignIn && <Signup />}
    </Layout>
  );
}
