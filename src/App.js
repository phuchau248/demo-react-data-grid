import "./App.css";
import RGDTable from "./rgd-table/RDGTable";
import MaterialReactTable from "./material-react-table/MaterialReactTable";

function App() {
  return (
    <div className="App" style={{ margin: "20px" }}>
      <RGDTable />
      
      <MaterialReactTable />
    </div>
  );
}

export default App;
