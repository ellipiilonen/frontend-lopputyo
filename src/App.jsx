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



