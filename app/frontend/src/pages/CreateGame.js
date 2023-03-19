import axios from "axios";
import { useNavigate, useLoaderData } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";


import Button from "../components/UI/Button";
import FormElement from "../components/UI/FormElement";
import useInput from "../hooks/use-input";
import { postNyttSpill } from "../util/posts";

const INPUT_IDS = {
  spillNavn: "spillnavn",
  spilltype: "spilltype",
};

//import styles from "./LoginContent.module.css";

const CreateGame = (props) => {
  const spillTypeNavn = useLoaderData();

  const [spillType, setSpillType] = useState();

  const navigate = useNavigate();

  const {
    value: spillNavn,
    hasError: spillNavnHasError,
    valueInputHandler: spillNavnChangeHandler,
    inputBlurHandler: spillNavnBlurHandler,
    errorHandler: spillNavnError,
    errorMsg: spillNavnErrorMsg,
    reset: spillNavnReset,
  } = useInput("", () => true);

  const spillNavnInputRef = useRef();
  const spillTypeInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const nyttSpill = await postNyttSpill({
      spill_navn: spillNavn,
      spill_type: spillType,
    });

    //Vi vil ikke at spilleren skal kunne gå tilbake, da hadde vu brukt push.'
    navigate(`/spill/${ nyttSpill.id }/`, { replace: true });
  };

  useEffect(() => {
    document.title = "Opprett et spill";
    setSpillType(spillTypeNavn[0].value);
  }, []);

  const spillTypeChangeHandler = (e) => {
    setSpillType(e.target.value);
  };

  return (
    <React.Fragment>
      <h1>Opprett et spill:</h1>

      <form onSubmit={submitHandler} method="POST" className="form-group">
        <table>
          <tbody>
            <FormElement
              ref={spillNavnInputRef}
              id={INPUT_IDS.spillNavn}
              label="Spillnavn"
              type="text"
              hasError={spillNavnHasError}
              value={spillNavn}
              onChange={spillNavnChangeHandler}
              onBlur={spillNavnBlurHandler}
              error={spillNavnErrorMsg()}
            />
            <FormElement
              ref={spillTypeInputRef}
              id={INPUT_IDS.spillNavn}
              label="Spilltype"
              type="dropdown"
              payload={spillTypeNavn}
              onChange={spillTypeChangeHandler}
            />
          </tbody>
        </table>

        <Button type="submit" className="reg-button" disabled={false}>
          Opprett
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CreateGame;