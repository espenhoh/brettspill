import React, { useEffect, useRef} from "react";
import { Link, useNavigate, Form, redirect } from 'react-router-dom';
import FormElement from "../components/UI/FormElement";
import useInput from "../hooks/use-input";

import { useDispatch } from "react-redux";
import { authActions} from "../store/authSlice";

//import styles from "./LoginContent.module.css";

const INPUT_IDS = {
  USERNAME: "kallenavn",
  PASS1: "pass",
};

const validPass1 = (pass1) => {
  return pass1.length > 7;
};

const usernameIsValid = (username) => {
  const trimmedUsername = username.trim();
  const reUsername = /^[a-z0-9\u00E6\u00F8\u00E5]*$/;
  return trimmedUsername.length > 6 && reUsername.test(trimmedUsername);
};

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: username,
    hasError: usernameHasError,
    valueInputHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    errorMsg: usernameErrorMsg,
  } = useInput(
    "Kallenavn må være > 6 tegn og bare bokstaver og tall",
    usernameIsValid
  );

  const {
    value: pass1,
    hasError: pass1HasError,
    valueInputHandler: pass1ChangeHandler,
    inputBlurHandler: pass1BlurHandler,
    errorMsg: pass1ErrorMsg,
  } = useInput("passord > 7 tegn", validPass1);


  const usernameInputRef = useRef();
  const passwordInputRef = useRef();



  useEffect(() => {
    document.title = "Logg inn";
    usernameInputRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      <h1>Logg deg inn!</h1>
      <Form method="post" action="/spill/">
        <table>
          <tbody>
            <FormElement
              ref={usernameInputRef}
              id={INPUT_IDS.USERNAME}
              label="Kallenavn"
              type="text"
              hasError={usernameHasError}
              value={username}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              error={usernameErrorMsg()}
            />
            <FormElement
              ref={passwordInputRef}
              id={INPUT_IDS.PASS1}
              label="Passord"
              type="password"
              hasError={pass1HasError}
              value={pass1}
              onChange={pass1ChangeHandler}
              onBlur={pass1BlurHandler}
              error={pass1ErrorMsg()}
            />
          </tbody>
        </table>
        <p>
          Ikke registrert enda? Lag en spillkonto <Link to="/lobby/register">her</Link>.
        </p>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </Form>
    </React.Fragment>
  );
};

export default Login;


export async function loginAction({request}) {
  const formData = await request.formData();
  const post = {
    brukernavn: formData.get('Kallenavn'),
    passord: formData.get('Passord'),
  }
  console.log(post);

  return redirect('/spill/');
};