import React from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue, patientList } from "./state/index";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetail from './PatientDetail/PatientDetal';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(patientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  const match = useMatch('/patient/:id');

  const id = match?.params.id;


  return (
    <div className="App">

      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage />} />
          <Route path="/patient/:id" element={<PatientDetail patientId={id} />} />
        </Routes>
      </Container>

    </div>
  );
};

export default App;
