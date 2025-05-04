import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteCustomerDialog({ customer, ok, cancel }) {
    return <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            {"Delete the customer?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the customer {customer.firstname} {customer.lastname}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => cancel()}>Cancel</Button>
            <Button color="error" onClick={() => ok(customer)} autoFocus>Delete</Button>
        </DialogActions>
    </Dialog>
}