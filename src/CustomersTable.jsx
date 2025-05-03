import { Box, Button, Stack, TextField } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";


function CustomersTable({ data }) {

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
    const columns = [
        {
            field: "firstname",
            headerName: "First name",
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "lastname",
            headerName: "Last name",
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "phone",
            headerName: "Phone",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "streetaddress",
            headerName: "Street address",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "postcode",
            headerName: "Postal code",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "city",
            headerName: "City",
            sortable: true,
            filter: true,
            flex: 1
        },

    ];

    useEffect(() => {
        if (data) {
            setCustomerData(data);
        }
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    }

    // Asiakkaan lisäys
    const addCustomer = () => {
        console.log("Asiakkaan lisäys");
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Virhe lisätessä asiakasta");
                }
                return response.json();
            })
            .then(data => {
                console.log("Asiakkaan lisääminen onnistui");
                setCustomerData((prevData) => [...prevData, data]);
            });
        // Lomakkeen nollaus:
        setCustomer({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            streetaddress: "",
            postcode: "",
            city: ""
        })
            .catch(error => {
                console.error("Virhe lisäyksessä:", error);
            });
    };


    return (
        <>
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
                <Button onClick={addCustomer}>Add</Button>
            </Stack>
            <div>
                <div style={{ width: 1000, height: 800 }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={customerData}
                        columnDefs={columns}
                    />
                </div>
            </div>
        </>
    );

};



export default CustomersTable;