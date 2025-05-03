import { useState, useRef, useEffect } from "react";
import CustomersTable from "./CustomersTable";


// Fetchataan asiakkaat
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

    return (
        <div>
            <CustomersTable data={data} />
        </div>
    );

};



export default GetCustomers;