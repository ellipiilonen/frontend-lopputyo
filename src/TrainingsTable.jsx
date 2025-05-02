import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";
import dayjs from "dayjs";
dayjs.locale("fi");

function TrainingsTable({ data }) {

    console.log("TrainingsTable funktiossa");

    const gridRef = useRef();

    const columns = [
        {
            field: "date",
            headerName: "Date",
            valueFormatter: (params) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm"),
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "duration",
            headerName: "Duration",
            valueFormatter: (params) =>
                `${params.value} minutes`,
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            field: "activity",
            headerName: "Activity",
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            valueGetter: (params) =>
                `${params.data.customer.firstname} ${params.data.customer.lastname}`,
            headerName: "Customer",
            sortable: true,
            filter: true,
        }
    ];

    return (
        <div>
            <div style={{ width: 1000, height: 800 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columns}
                    rowSelection="single"
                />
            </div>
        </div>
    );

};

export default TrainingsTable;