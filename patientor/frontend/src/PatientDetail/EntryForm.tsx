import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
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

                        <Field
                            label="Ingrese la descripcion"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
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