import { getTrainings, addTraining, deleteTraining } from "./TrainingsApi";
import { useEffect, useState } from "react";
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CustomersTable from "./CustomersTable";
import { getCustomers, addCustomer, deleteCustomer, updateCustomer } from "./CustomersApi";
import DeleteDialog from "./DeleteDialog";
import TrainingsTable from "./TrainingsTable";
import DeleteTrainingDialog from "./DeleteTrainingDialog";


export default function App() {
    const [value, setValue] = useState("Home");
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [rmCustomer, setRmCustomer] = useState(null);
    const [rmTraining, setRmTraining] = useState(null);

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

    // Asiakkaan poiston vahvistus
    async function confirmDeleteCustomer(customer) {
        const success = await deleteCustomer(customer);
        if (!success) {
            console.error("Asiakkaan poisto epäonnistui");
        }
        setRmCustomer(null);
        setCustomers(await getCustomers());
    }

    // Harjoituksen poiston vahvistus
    async function confirmDeleteTraining(training) {
        const success = await deleteTraining(training);
        if (!success) {
            console.error("Harjoituksen poisto epäonnistui");
        }
        setRmTraining(null);
        setTrainings(await getTrainings());
    }

    // Lataa asiakkaat
    async function loadCustomers() {
        setCustomers(await getCustomers());
    }

    // Lataa harjoitukset
    async function loadTrainings() {
        setTrainings(await getTrainings());
    }

    useEffect(() => {
        getCustomers().then(customerArray => setCustomers(customerArray));

        getTrainings().then(trainingArray => setTrainings(trainingArray));
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

                <TabPanel value="Trainings">
                    <TrainingsTable tData={trainings}
                        customers={customers}
                        addTraining={(training, setTraining, setTrainingData) =>
                            addTraining(training, setTraining, setTrainingData)}
                        loadTrainings={loadTrainings}
                        deleteTraining={training => setRmTraining(training)} />
                    {rmTraining && <DeleteTrainingDialog training={rmTraining} ok={confirmDeleteTraining} cancel={() => setRmTraining(null)} />}

                </TabPanel>

            </TabContext>
        </Box>
    </>
    )
};



