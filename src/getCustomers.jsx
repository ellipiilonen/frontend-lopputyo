import { useState, useRef, useEffect } from "react";
import { Container, Table, TableHead, TableCell, TableBody, TableRow, TextField } from "@mui/material";

function GetCustomers() {
    const [data, setData] = useState([]);


    useEffect(() => {
        console.log("fetchcustomers funktio");
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => {
                if (!response.ok) throw new Error(`Virhe haussa: ${response.status}`);
                return response.json();
            })
            .then(responseData => setData(responseData._embedded.customers))
            .catch(error => console.error(error));
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        { field: "firstname" },
        { field: "lastname" },
        { field: "email" },
        { field: "phone" },
        { field: "streetaddress" },
        { field: "postcode" },
        { field: "city" },
    ]);

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Street address</TableCell>
                        <TableCell>Postal code</TableCell>
                        <TableCell>City</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((customer) =>
                        <TableRow key={customer._links.self.href}>
                            <TableCell>{customer.firstname}</TableCell>
                            <TableCell>{customer.lastname}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.streetaddress}</TableCell>
                            <TableCell>{customer.postcode}</TableCell>
                            <TableCell>{customer.city}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Container>
    );

};



export default GetCustomers