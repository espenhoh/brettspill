import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login, {loginAction} from "./pages/Login";
import Spilliste,  { loader as spillListeLoader } from "./pages/Spilliste";
import SpillLobby, { spillLoader } from "./pages/SpillLobby";
import CreateGame, { spillTypeLoader } from "./pages/CreateGame";

import "./index.css";
import Register from "./pages/Register";
import IkkeFunnet from "./pages/IkkeFunnet";
import Layout from "./pages/Layout";
import Feilside from "./pages/Feilside";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Feilside/>}>
      <Route index element={<Navigate replace to="login" />} />
      <Route path="spill/" element={<Spilliste />} loader={spillListeLoader} action={loginAction}/>
      <Route path="spill/:spillId" element={<SpillLobby />} loader={spillLoader} />
      <Route path="lag_spill" element={<CreateGame />} loader={spillTypeLoader}/>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<IkkeFunnet />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
