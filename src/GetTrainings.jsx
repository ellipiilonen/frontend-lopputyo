import { useState, useRef, useEffect } from "react";
import { Container, Table, TableHead, TableCell, TableBody, TableRow, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
dayjs.locale("fi");
import { AgGridReact } from "ag-grid-react";


import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function GetTrainings() {
    const [data, setData] = useState([]);
    const gridRef = useRef();

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

    const columns = [
        {
            field: "date",
            headerName: "Date",
            valueFormatter: (params) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm"),
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "duration",
            headerName: "Duration",
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "activity",
            headerName: "Activity",
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            valueGetter: (params) =>
                `${params.data.customer.firstname} ${params.data.customer.lastname}`,
            headerName: "Customer",
            sortable: true,
            filter: true,
        }
    ];

    return (
        <div>
            <div style={{ width: 1000, height: 500 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columns}
                    rowSelection="single"
                />
            </div>
        </div>
    );

};

export default GetTrainings