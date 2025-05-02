import { useState, useRef, useEffect } from "react";

function trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        console.log("fetchtrainings funktio");
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/')
            .then(response => {
                if (!response.ok) throw new Error("virhe haussa")
                return response.json();
            })
            .then(responseCustomers => setCustomers(responseCustomers))
            .catch(error => console.error(error));
    });


    return (
        <>
        </>
    )
}

export default customers