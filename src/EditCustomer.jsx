import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function EditCustomer({ updateCustomer, params, loadCustomers }) {
    const [customer, setCustomer] = useState(params.data);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        console.log("save customer ", customer);
        await updateCustomer(customer);
        setOpen(false);
        await loadCustomers();
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>


                <DialogTitle>Edit customer</DialogTitle>


                <DialogContent>

                    <TextField
                        label="First name"
                        value={customer.firstname}
                        onChange={(event) => setCustomer({ ...customer, firstname: event.target.value })}
                    />
                    <TextField
                        label="Last name"
                        value={customer.lastname}
                        onChange={(event) => setCustomer({ ...customer, lastname: event.target.value })}

                    />
                    <TextField
                        label="Email"
                        value={customer.email}
                        onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                    />
                    <TextField
                        label="Phone"
                        value={customer.phone}
                        onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                    />
                    <TextField
                        label="Street address"
                        value={customer.streetaddress}
                        onChange={(event) => setCustomer({ ...customer, streetaddress: event.target.value })}
                    />
                    <TextField
                        label="Postal code"
                        value={customer.postcode}
                        onChange={(event) => setCustomer({ ...customer, postcode: event.target.value })}
                    />
                    <TextField
                        label="City"
                        value={customer.city}
                        onChange={(event) => setCustomer({ ...customer, city: event.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}