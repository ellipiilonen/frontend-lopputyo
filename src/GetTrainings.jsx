import { useState, useRef, useEffect } from "react";

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import TrainingsTable from "./TrainingsTable";

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


    return (
        <div>
            <TrainingsTable data={data} />
        </div>
    );

};

export default GetTrainings