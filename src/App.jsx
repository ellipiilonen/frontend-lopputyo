import GetTrainings from "./GetTrainings";
import { useEffect, useState } from "react";
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CustomersTable from "./CustomersTable";
import { getCustomers, addCustomer, deleteCustomer, updateCustomer } from "./CustomersApi";
import DeleteDialog from "./DeleteDialog";


export default function App() {
    const [value, setValue] = useState("Home");
    const [customers, setCustomers] = useState([]);
    const [rmCustomer, setRmCustomer] = useState(null);

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

    async function confirmDeleteCustomer(customer) {
        const success = await deleteCustomer(customer);
        if (!success) {
            console.error("Asiakkaan poisto epäonnistui");
        }
        setRmCustomer(null);
        setCustomers(await getCustomers());
    }

    async function loadCustomers() {
        setCustomers(await getCustomers());
    }

    useEffect(() => {
        getCustomers().then(customerArray => setCustomers(customerArray))
    }, []);


    return (<>
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
                <TabPanel value="Customers">
                    <CustomersTable data={customers}
                        addCustomer={(customer, setCustomer, setCustomerData) =>
                            addCustomer(customer, setCustomer, setCustomerData)}
                        deleteCustomer={customer => setRmCustomer(customer)}
                        loadCustomers={loadCustomers} />
                    {rmCustomer && <DeleteDialog customer={rmCustomer} ok={confirmDeleteCustomer} cancel={() => setRmCustomer(null)} />}
                </TabPanel>
                <TabPanel value="Trainings"><GetTrainings /></TabPanel>
            </TabContext>
        </Box>
    </>
    )
};



