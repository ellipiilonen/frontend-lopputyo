

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


// Fetchataan harjoitukset
export async function getTrainings() {
    // fetchataan training data
    console.log("fetchtrainings funktio");
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')

    if (!response.ok) {
        throw new Error(`Virhe haussa: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

// Harjoituksen lisäys:
export async function addTraining(training, setTraining, setTrainingData) {
    console.log("Harjoituksen lisäys");
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(training)
    })
    if (!response.ok) {
        throw new Error(`Virhe lisätessä harjoitusta: ${response.status}`);
    }
    const updatedTrainingData = await getTrainings();
    console.log("Harjoituksen lisääminen onnistui");
    setTrainingData(updatedTrainingData)

    // Lomakkeen nollaus:
    setTraining({
        date: "",
        activity: "",
        duration: "",
        customer: ""
    });
};

// Harjoituksen poisto:
export async function deleteTraining(training) {
    const trainingId = training.id
    const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${trainingId}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error(`Virhe poistaessa harjoitusta: ${response.status}`);
    }
    return true;
};





