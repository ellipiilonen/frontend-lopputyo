import { Box, Button, Stack, TextField } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCustomers, addCustomer, updateCustomer } from "./CustomersApi";
import EditCustomer from "./EditCustomer";
import { SettingsPowerRounded } from "@mui/icons-material";


export function CustomersTable({ data, addCustomer, deleteCustomer, loadCustomers }) {

    const [customerData, setCustomerData] = useState([]);
    const gridRef = useRef();
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });

    // Määritellään taulukko
    const columns = useMemo(() => [{ field: "firstname", headerName: "First name", filter: true, flex: 1 },
    { field: "lastname", headerName: "Last name", filter: true, flex: 1 },
    { field: "email", headerName: "Email", filter: true, flex: 1 },
    { field: "phone", headerName: "Phone", filter: true, flex: 1 },
    { field: "streetaddress", headerName: "Street address", filter: true, flex: 1 },
    { field: "postcode", headerName: "Postal code", filter: true, flex: 1 },
    { field: "city", headerName: "City", filter: true, flex: 1 },
    {
        cellRenderer: (params) => <EditCustomer
            updateCustomer={updateCustomer}
            params={params}
            loadCustomers={loadCustomers}
        />

    },
    {
        field: "delete", headerName: "Delete", flex: 1,
        cellRenderer: (params) => {
            const customer = params.data;
            return <Button
                variant="outlined" color="error" size="small"
                onClick={() => deleteCustomer(customer)}>Delete</Button>
        }, width: 100,
    },
    ], []);

    useEffect(() => {
        if (data) {
            setCustomerData(data);
        }
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    }

    return (
        <>
            <h2>Add a customer:</h2>
            <Stack
                mt={2}
                direction="row"
                spacing={2}>
                <TextField
                    label="First name"
                    name="firstname"
                    onChange={handleChange}
                    value={customer.firstname} />
                <TextField
                    label="Last name"
                    name="lastname"
                    onChange={handleChange}
                    value={customer.lastname} />
                <TextField
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={customer.email} />
                <TextField
                    label="Phone"
                    name="phone"
                    onChange={handleChange}
                    value={customer.phone} />
                <TextField
                    label="Street address"
                    name="streetaddress"
                    onChange={handleChange}
                    value={customer.streetaddress} />
                <TextField
                    label="Postal code"
                    name="postcode"
                    onChange={handleChange}
                    value={customer.postcode} />
                <TextField
                    label="City"
                    name="city"
                    onChange={handleChange}
                    value={customer.city} />
                <Button variant="outlined" onClick={() => addCustomer(customer, setCustomer, setCustomerData)}>Add</Button>
            </Stack>
            <h2>Customer list:</h2>
            <div>
                <div style={{ marginTop: 30, width: 1500, height: 800 }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={customerData}
                        columnDefs={columns}
                        rowSelection="single"
                    />
                </div>
            </div>
        </>
    );

};



export default CustomersTable;