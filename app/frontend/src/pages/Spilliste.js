import React, { useEffect, useState, useCallback } from "react";
import { Link, useLoaderData } from "react-router-dom";
import dayjs from "dayjs";

import { getSpillListe } from '../util/gets';

//import styles from "./Home.module.css";

const DATE_FORMAT = "DD/MM/YY h:m";

const liste = [{
  "id": 9999,
  "spill_type_navn": "Fire på rad",
  "spill_navn": "Dummyspill",
  "spill_type": "4PRA",
  "opprettet_tid": "2023-02-02T21:34:33.692353Z",
  "start_tid": null,
  "slutt_tid": null,
  "spillere": []
}
];

const Spilliste = (props) => {
  const spillListe = useLoaderData();

  useEffect(() => {
    document.title = "Spilliste";
  }, []);

  return (
    <React.Fragment>
      <h1>Velkommen til brettspill!</h1>
      <h2>Spilliste</h2>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Type</th>
            <th>Starttid</th>
            <th>Sluttid</th>
          </tr>
        </thead>

        <tbody>
          {spillListe.map((spill) => (
            <tr key={spill.id}>
              <td>
                <Link to={`/lobby/spill/${spill.id}`}>{spill.spill_navn}</Link>
              </td>
              <td>{spill.spill_type_navn}</td>
              <td>{spill.start_tid ? dayjs(spill.start_tid).format(DATE_FORMAT) : 'Ikke startet'}</td>
              <td>{spill.slutt_tid ? dayjs(spill.slutt_tid).format(DATE_FORMAT) : 'Ikke ferdig'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Spilliste;

export function loader() {
  return getSpillListe();
}