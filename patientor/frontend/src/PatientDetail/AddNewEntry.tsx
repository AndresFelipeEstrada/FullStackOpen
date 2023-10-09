import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import EntryForm from "./EntryForm";
import { Diagnosis, NewEntry } from "../types";

interface Props {
    OpenModal: boolean
    closeModal: () => void
    onSubmit: (values: NewEntry) => void
    diagnoses: Diagnosis[]
    error: string
}

const AddNewEntry = ({ OpenModal, closeModal, diagnoses, error, onSubmit }: Props) => {
    return (

        <Dialog open={OpenModal} fullWidth={true} onClose={() => closeModal()} >
            <DialogTitle>Add New Entry</DialogTitle>
            <Divider />
            <DialogContent>
                {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
                <EntryForm diagnoses={diagnoses} onSubmit={onSubmit} />
            </DialogContent>

        </Dialog>
    );
};

export default AddNewEntry;