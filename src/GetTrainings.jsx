import { useState, useRef, useEffect } from "react";
import Stack from '@mui/material/Stack';
import { Container, Table, TableHead, TableCell, TableBody, TableRow, TextField } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
dayjs.locale("fi");


import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function GetTrainings() {
    const [data, setData] = useState([]);

    // fetchataan training data
    useEffect(() => {
        console.log("fetchtrainings funktio");
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            .then(response => {
                if (!response.ok) throw new Error(`Virhe haussa: ${response.status}`);
                return response.json();
            })
            .then(responseData => setData(responseData))
            .catch(error => console.error(error));
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        { field: "date" },
        { field: "duration" },
        { field: "activity" },
        { field: "customer" }
    ]);

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Activity</TableCell>
                        <TableCell>Customer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((training) =>
                        <TableRow key={training.id}>
                            <TableCell>{dayjs(training.date).format('DD.MM.YYYY HH:mm')}</TableCell>
                            <TableCell>{`${training.duration} minutes`}</TableCell>
                            <TableCell>{training.activity}</TableCell>
                            <TableCell>{`${training.customer.firstname} ${training.customer.lastname}`}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Container>
    );

};

export default GetTrainings