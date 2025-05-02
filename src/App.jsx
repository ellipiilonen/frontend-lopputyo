import getCustomers from "./getCustomers";
import { useEffect, useState } from "react";
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';


export default function App() {
    const [customers, setCustomers] = useState([]);
    const [value, setValue] = useState("home");

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
                    </TabList>
                </Box>
                <TabPanel value="Home">Welcome!</TabPanel>
                <TabPanel value="Customers"><getCustomers /></TabPanel>
            </TabContext>
        </Box>

    )
};



