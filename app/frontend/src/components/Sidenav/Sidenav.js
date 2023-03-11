import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import styles from "./Sidenav.module.css";

const Sidenav = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(authActions.loggingOut());
  };

  return (
    <div className={styles.sidenav}>
      <ul>
        {isAuthenticated && (
          <React.Fragment>
            <li>
              <span>Innlogget som:</span>
              <br />
              request.user
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/spill">
                Spilliste
              </NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/lag_spill">
                Lag spill
              </NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/"  onClick={logoutHandler}>
                Logg ut
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {!isAuthenticated && (
          <React.Fragment>
            <li>
              <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/register">
                Registrer deg
              </NavLink>
            </li>
            <li>
              <NavLink className={(navData) => navData.isActive ? styles.active : ''} to="/login">
                Logg inn
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Sidenav;
