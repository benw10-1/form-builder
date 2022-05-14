import React from 'react';
import ReactDOM from 'react-dom/client';

import { Home, Login, Dashboard } from "./pages"

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // router wrappers
  <BrowserRouter>
    <Routes>
      {/* path is like express routes and element is the element to be rendered */}
      <Route path={"/"} element={<Home></Home>}></Route>
      <Route path={"login"} element={<Login></Login>}></Route>
      <Route path={"dashboard"} element={<Dashboard></Dashboard>}></Route>
      {/* fallback render */}
      <Route path="*" element={<div>No page found</div>}></Route>
    </Routes>
  </BrowserRouter>
);
