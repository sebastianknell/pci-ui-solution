import { AgGridReact } from "ag-grid-react";
import { AgGridEvent, ColDef, RowNode } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { objectArrayToTsv } from "./utils";
import styles from './Grid.module.css'

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

async function copyData(data: any[]) {
  const tsv = objectArrayToTsv(data);
  try {
      await navigator.clipboard.writeText(tsv);
      console.log("Text copied to clipboard");
  } catch (err) {
      console.error("Failed to copy: ", err);
  }
}

const NeoGrid = (): JSX.Element => {
  const title = "Near-Earth Object Overview";
  const gridRef = useRef<any>();
  const [selectedData, setSelectedData] = useState<any[]>([]);

  useEffect(() => {
      document.title = title;
  }, []);

  const onRowsSelectionChanged = useCallback((event: AgGridEvent) => {
    const rows = event.api.getSelectedNodes().map((rowNode: RowNode) => rowNode.data);
    setSelectedData(rows);
  }, []);

  const clearFilters = useCallback(() => {
      gridRef.current.api.setFilterModel(null);
      gridRef.current.api.setDefaultColDef({
        sort: null
      });
  }, []);

  return (
      <>
          <div className={styles.navbar}>
              <h1 className={styles.title}>{title}</h1>
              <button className={styles.button}
              onClick={clearFilters}
              >Clear Filters and Sorters</button>
          </div>
          <button
              className={styles.button}
              style={{marginBottom: "1rem"}}
              onClick={async () => copyData(selectedData)}
              disabled={selectedData.length === 0}
          >
              Copy selected data
          </button>
          <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
              <AgGridReact
                  ref={gridRef}
                  rowData={data}
                  columnDefs={columnDefs}
                  rowGroupPanelShow={"always"}
                  rowSelection="multiple"
                  onSelectionChanged={onRowsSelectionChanged}
                  onGridReady={() => {console.log('grid ready')}}
              />
          </div>
      </>
  );
};

export default NeoGrid;
