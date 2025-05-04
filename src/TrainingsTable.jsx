import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useMemo, useState } from "react";
import dayjs from "dayjs";
dayjs.locale("fi");
import { addTraining, getTrainings } from "./TrainingsApi";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputAdornment from '@mui/material/InputAdornment';

function TrainingsTable({ tData, customers, loadTrainings, deleteTraining }) {

    const gridRef = useRef();
    const [trainingData, setTrainingData] = useState([]);
    const [training, setTraining] = useState({
        date: null,
        duration: "",
        activity: "",
        customer: ""
    });

    const columns = useMemo(() => [
        {
            field: "date", headerName: "Date",
            valueFormatter: (params) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm"),
            filter: true, flex: 1
        },
        {
            field: "duration", headerName: "Duration",
            valueFormatter: (params) =>
                `${params.value} minutes`,
            filter: true, flex: 1
        },
        {
            field: "activity", headerName: "Activity", filter: true, flex: 1
        },
        {
            valueGetter: (params) =>
                `${params.data.customer.firstname} ${params.data.customer.lastname}`,
            headerName: "Customer",
            filter: true, flex: 1
        },
        {
            field: "delete", headerName: "Delete", flex: 1,
            cellRenderer: (params) => {
                const training = params.data;
                return <Button
                    variant="outlined" color="error" size="small"
                    onClick={() => deleteTraining(training)}>Delete</Button>
            }, width: 100,
        },
    ], []);

    useEffect(() => {
        if (tData) {
            console.log("Trainings data:", tData);
            setTrainingData(tData);
        }
    }, [tData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTraining({ ...training, [name]: value });
    }

    return (
        <>
            <h2>Add a training:</h2>
            <Stack
                mt={2}
                direction="row"
                spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={dayjs(training.date)}
                        onChange={(newDate =>
                            setTraining({ ...training, date: newDate }))} />
                </LocalizationProvider>

                <TextField
                    label="Duration"
                    name="duration"
                    onChange={handleChange}
                    value={training.duration}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">minutes</InputAdornment>
                            )
                        }
                    }} />

                <TextField
                    label="Activity"
                    name="activity"
                    onChange={handleChange}
                    value={training.activity} />
                <FormControl fullWidth>
                    <InputLabel id="select-customer">Customer</InputLabel>
                    <Select
                        label="Customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleChange}
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer._links.customer.href} value={customer._links.customer.href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={() => addTraining(training, setTraining, setTrainingData)}>Add</Button>
            </Stack>
            <div>
                <h2>Trainings list:</h2>
                <div style={{ width: 1000, height: 500 }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={trainingData}
                        columnDefs={columns}
                        rowSelection="single"
                    />
                </div>
            </div>
        </>
    );

};

export default TrainingsTable;