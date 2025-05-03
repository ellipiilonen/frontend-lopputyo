import GetTrainings from "./GetTrainings";
import { useEffect, useState } from "react";
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CustomersTable from "./CustomersTable";
import GetCustomers from "./GetCustomers";


export default function App() {
    const [value, setValue] = useState("Home");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Resetoidaan database
    useEffect(() => {
        console.log("Resetoidaan database");
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset", {
            method: "POST"
        })
            .then(response => {
                if (!response.ok) throw new Error(`Virhe haussa: ${response.status}`);
                console.log("Resetointi onnistui");
            })
            .catch(error => {
                console.error("Resetointi epäonnistui", error);
            });
    }, []);

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Home" value="Home" />
                        <Tab label="Customers" value="Customers" />
                        <Tab label="Trainings" value="Trainings" />
                    </TabList>
                </Box>
                <TabPanel value="Home">Welcome!</TabPanel>
                <TabPanel value="Customers"><GetCustomers /></TabPanel>
                <TabPanel value="Trainings"><GetTrainings /></TabPanel>
            </TabContext>
        </Box>

    )
};



