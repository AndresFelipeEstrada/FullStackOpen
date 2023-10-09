/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Diagnosis, NewEntry, Patient } from "../types";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import WcIcon from '@material-ui/icons/Wc';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import AddNewEntry from "./AddNewEntry";

type Props = {
    patientId: string | undefined
};
const PatientDetail: React.FC<Props> = ({ patientId }) => {
    const [user, setUser] = useState<Patient>();
    const [diagnoses, setDiagoses] = useState<Diagnosis[]>([]);
    const [openModalEntry, setOpenModalEntry] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const openModal = (): void => setOpenModalEntry(true);
    const closeModal = () => {
        setOpenModalEntry(false);
    };

    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data } = await axios.post<NewEntry>(`${apiBaseUrl}/${patientId}/entries`, values);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
                const { data: diagnosis } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

                setUser(patientFromApi);
                setDiagoses(diagnosis);
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient();
    }, []);

    const icon = user?.gender === 'female' ? <ArrowDownwardIcon /> : <WcIcon />;



    const diagnosisCodeDescriptions: { [code: string]: string } = {};


    user?.entries.forEach(entry => {
        entry.diagnosisCodes?.forEach(diag => {
            const matchedDiagnosis = diagnoses.find(diagnosis => diagnosis.code === diag);
            if (matchedDiagnosis) {
                diagnosisCodeDescriptions[diag] = matchedDiagnosis.name;
            }
        });
    });

    return (
        <>
            <Button color="primary" variant="contained" style={{ marginLeft: "5px" }} onClick={() => openModal()}>
                New Entry
            </Button>

            <AddNewEntry OpenModal={openModalEntry} closeModal={closeModal} diagnoses={diagnoses} error={error} onSubmit={submitNewEntry} />

            <h2>{user?.name} {icon} </h2>
            <p><strong>Ssn: </strong>: {user?.ssn}</p>
            <p><strong>Occupation: </strong>{user?.occupation}</p>

            <strong>Entries:</strong>

            {user?.entries.map(entrie => {
                return (

                    <div key={entrie.id}>

                        <p>{entrie.date}</p> <p>{entrie.description}</p>
                        <ul>

                            {entrie.diagnosisCodes?.map(diag => {

                                return (
                                    <li key={diag}>
                                        <strong>{diag}</strong> <p>{diagnosisCodeDescriptions[diag]}</p>
                                    </li>
                                );
                            })}

                        </ul>
                    </div>
                );
            })}

        </>
    );
};

export default PatientDetail;