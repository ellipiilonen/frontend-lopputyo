import { useState, useRef, useEffect } from "react";

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
            <h2>Customers</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Street address</th>
                        <th>Postcode</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((customer) => (
                        <tr key={customer._links.self.href}>
                            <td>{customer.firstname}</td>
                            <td>{customer.lastname}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.streetaddress}</td>
                            <td>{customer.postcode}</td>
                            <td>{customer.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default GetCustomers