import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { Auth, Authors, Home, Logs, MyPosts } from "./pages";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/authors" element={<Authors />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/signup" element={<Auth />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
