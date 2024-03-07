import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const numberComparator = (str1: string, str2: string) => {
  if (str1 === undefined) return -1;
  if (str2 === undefined) return 1;
  return Number(str1) - Number(str2)
}

const dateComparator = (dateStr1: string, dateStr2: string) => {
  const time1 = new Date(dateStr1).getTime();
  const time2 = new Date(dateStr2).getTime();

  if (time1 === time2) return 0;
  return time1 > time2 ? 1 : -1;
}

const columnDefs: ColDef[] = [
    {
        field: "designation",
        headerName: "Designation",
        sortable: true,
        filter: true,
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        headerName: "Discovery Date",
        valueGetter: (params) =>
            new Date(params.data.discovery_date).toLocaleDateString(),
        sortable: true,
        comparator: dateComparator,
    },
    {
        field: "h_mag",
        headerName: "H (mag)",
        sortable: true,
        comparator: numberComparator,
        filter: "agNumberColumnFilter",
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        field: "moid_au",
        headerName: "MOID (au)",
        sortable: true,
        comparator: numberComparator,
        filter: "agNumberColumnFilter",
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        field: "q_au_1",
        headerName: "q (au)",
        sortable: true,
        comparator: numberComparator,
        filter: "agNumberColumnFilter",
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        field: "q_au_2",
        headerName: "Q (au)",
        sortable: true,
        comparator: numberComparator,
        filter: "agNumberColumnFilter",
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        field: "period_yr",
        headerName: "Period (yr)",
        sortable: true,
        comparator: numberComparator,
        filter: "agNumberColumnFilter",
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        field: "i_deg",
        headerName: "Inclination (deg)",
        sortable: true,
        comparator: numberComparator,
        filter: "agNumberColumnFilter",
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        // field: "pha",
        headerName: "Potentially Hazardous",
        valueGetter: (params) => {
            switch (params.data.pha) {
                case "Y":
                    return "Yes";
                case "N":
                    return "No";
                case "n/a":
                    return "";
                default:
                    return "";
            }
        },
        sortable: true,
        filter: true,
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
    {
        field: "orbit_class",
        headerName: "Orbit Class",
        enableRowGroup: true,
        sortable: true,
        filter: true,
        filterParams: {
            buttons: ["reset", "apply"],
        },
    },
];

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
