import GetTrainings from "./GetTrainings";
import GetCustomers from "./GetCustomers";
import { useEffect, useState } from "react";
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';


export default function App() {
    const [customers, setCustomers] = useState([]);
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



