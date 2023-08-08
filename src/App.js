import "./App.css";
import DataTable from "./rgd-table/RDGTable";
import MaterialReactTable from "./material-react-table/MaterialReactTable";

function App() {
  return (
    <div className="App" style={{ margin: "20px" }}>
      <DataTable />

      <MaterialReactTable />
    </div>
  );
}

export default App;
