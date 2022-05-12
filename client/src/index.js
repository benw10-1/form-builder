import React from 'react';
import ReactDOM from 'react-dom/client';

import { App, Login, Dashboard } from "./pages"

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<App></App>}></Route>
      <Route path={"login"} element={<Login></Login>}></Route>
      <Route path={"dashboard"} element={<Dashboard></Dashboard>}></Route>
      <Route path="*" element={<div>No page found</div>}></Route>
    </Routes>
  </BrowserRouter>
);
