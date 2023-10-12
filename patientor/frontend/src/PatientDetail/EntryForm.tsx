import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, NumberField, SelectField, TextField, TypeOption } from "../AddPatientModal/FormField";
import { Diagnosis, NewEntry, TypeEntries } from "../types";
import { Button } from "@material-ui/core";

interface Props {
    onSubmit: (values: NewEntry) => void
    diagnoses: Diagnosis[]
}

const typeOptions: TypeOption[] = [
    { value: TypeEntries.HealthCheck, label: "HealthCheck" },
    { value: TypeEntries.Hospital, label: "Hospital" },
    { value: TypeEntries.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

const EntryForm = ({ onSubmit, diagnoses }: Props) => {
    return (
        <Formik
            initialValues={{
                date: `${Date.now()}`,
                type: "HealthCheck",
                specialist: "",
                employerName: "",
                diagnosisCodes: [],
                description: "",
                healthCheckRating: '',
                sickLeave: {
                    startDate: "",
                    endDate: ""
                },
                discharge: {
                    date: "",
                    criteria: ""
                }
            }}
            onSubmit={onSubmit}
        >
            {({ setFieldValue, setFieldTouched, values, isValid, dirty }) => {
                console.log(values);
                return (
                    <Form className="form ui">
                        <SelectField label="Type" name="type" options={typeOptions} />

                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <Field
                            label="EmployerName"
                            placeholder="EmployerName"
                            name="employerName"
                            component={TextField}
                        />


                        {values.type === 'HealthCheck' ? (
                            <Field
                                label="HealthCheckRating"
                                name="healthCheckRating"
                                component={NumberField}
                                min={0}
                                max={3}
                            />
                        ) : values.type === 'Hospital' ? (
                            <>


                                <Field
                                    label="Criteria"
                                    placeholder="Criteria"
                                    name="discharge.criteria"
                                    component={TextField}
                                />

                                <Field
                                    label="Date"
                                    placeholder="Date"
                                    name="discharge.date"
                                    component={TextField}
                                />
                            </>
                        ) : values.type === 'OccupationalHealthcare' ? (
                            <>
                                <Field
                                    label="StartDate"
                                    placeholder="StartDate"
                                    name="sickLeave.startDate"
                                    component={TextField}
                                />

                                <Field
                                    label="EndDate"
                                    placeholder="EndDate"
                                    name="sickLeave.endDate"
                                    component={TextField}
                                />
                            </>
                        ) : null}

                        <Button
                            style={{
                                float: "left",
                            }}
                            type="submit"
                            variant="contained"
                            disabled={!dirty || !isValid}
                        >
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default EntryForm;