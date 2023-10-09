import { Form, Formik } from "formik";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Diagnosis, NewEntry } from "../types";

interface Props {
    onSubmit: (values: NewEntry) => void
    diagnoses: Diagnosis[]
}

const EntryForm = ({ onSubmit, diagnoses }: Props) => {
    return (
        <Formik
            initialValues={{
                "date": "",
                "type": "",
                "specialist": "",
                "employerName": "",
                "diagnosisCodes": [],
                "description": "",
                "sickLeave": {
                    "startDate": "",
                    "endDate": ""
                }
            }}
            onSubmit={onSubmit}
        >
            {({ setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui">


                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />


                    </Form>
                );
            }}
        </Formik>
    );
};

export default EntryForm;