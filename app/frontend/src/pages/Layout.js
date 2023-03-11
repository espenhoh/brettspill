import { React } from 'react';
import { Outlet } from 'react-router-dom';
import Counter from "../components/UI/Counter";
import Sidenav from "../components/Sidenav/Sidenav";
import Logout from "../components/Content/Logout";

import { useSelector } from "react-redux";


const Layout = () => {
    const auth = useSelector((state) => state.auth);
  
    return (
      <>
        {auth.logoutVisible ? <Logout /> : null}
        <Sidenav />
        <main>
          <Outlet />
          <Counter />
        </main>
      </>
    );
  };
  
  
  export default Layout;