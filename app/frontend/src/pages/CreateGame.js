import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Button from "../components/UI/Button";
import FormElement from "../components/UI/FormElement";
import useInput from "../hooks/use-input";

const INPUT_IDS = {
  spillNavn: "spillnavn",
  spilltype: "spilltype",
};

//import styles from "./LoginContent.module.css";

const CreateGame = (props) => {
  const [spillTypeNavn, setSpillTypeNavn] = useState();
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
    //Vi vil ikke at spilleren skal kunne gå tilbake, da hadde vu brukt push.
    navigate("/lobby/spill/1", { replace: true });

    return;
    const payload = {
      spill_navn: spillNavn,
      spill_type: spillType,
    };
    try {
      const response = await axios.post(
        "https://brettspill.localhost/lobby/spill/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const setSpillTyper = async () => {
      try {
        const response = await axios.get(
          "https://brettspill.localhost/lobby/spill/get_alle_spill_typer/",
          {
            headers: { Accept: "application/json" },
          }
        );
        setSpillTypeNavn(response.data);
        setSpillType(response.data[1].value);
      } catch (error) {
        console.log(error);
      }
    };

    document.title = "Opprett et spill";

    setSpillTyper();
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
              label="Kallenavn"
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
          Registrer
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CreateGame;
