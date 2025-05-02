import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";


function CustomersTable({ data }) {


    console.log("CustomersTable funktiossa");
    const gridRef = useRef();

    const columns = [
        {
            field: "firstname",
            headerName: "First name",
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "lastname",
            headerName: "Last name",
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "phone",
            headerName: "Phone",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "streetaddress",
            headerName: "Street address",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "postcode",
            headerName: "Postal code",
            sortable: true,
            filter: true,
            flex: 1
        }, {
            field: "city",
            headerName: "City",
            sortable: true,
            filter: true,
            flex: 1
        },

    ];

    return (
        <div>
            <div style={{ width: 1000, height: 800 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columns}
                />
            </div>
        </div>
    );

};



export default CustomersTable;