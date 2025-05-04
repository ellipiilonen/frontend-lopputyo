import { useState, useRef, useEffect } from "react";
import CustomersTable from "./CustomersTable";


export async function getCustomers() {
    console.log("fetchcustomers funktio");
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
    if (!response.ok) {
        throw new Error(`Virhe haussa: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.customers;
};

// Asiakkaan lisäys
export async function addCustomer(customer, setCustomer, setCustomerData) {

    console.log("Asiakkaan lisäys");
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
    if (!response.ok) {
        throw new Error(`Virhe lisätessä asiakasta: ${response.status}`);
    }

    const data = await response.json();
    console.log("Asiakkaan lisääminen onnistui");
    setCustomerData((prevData) => [...prevData, data]);

    // Lomakkeen nollaus:
    setCustomer({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    })
};


// Asiakkaan poisto:
export async function deleteCustomer(customer) {
    const response = await fetch(customer._links.customer.href, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Virhe poistaessa asiakasta: ${response.status}`);
    }
    return true;
};

// Asiakkaan muokkaus:
export async function updateCustomer(customer) {
    const response = await fetch(customer._links.customer.href, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error(`Virhe asiakkaan muokkauksessa: ${response.status}`);
    }
    return true;
}