import { useState, useRef, useEffect } from "react";

function GetTrainings() {
    const [data, setData] = useState([]);


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
            <h2>Trainings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Activity</th>
                        <th>Customer</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((training) => (
                        <tr key={training.id}>
                            <td>{training.date}</td>
                            <td>{training.duration}</td>
                            <td>{training.activity}</td>
                            <td>{training.customer.firstname} {training.customer.lastname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default GetTrainings