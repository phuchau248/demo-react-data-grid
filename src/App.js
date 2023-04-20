import "./App.css";
import RGDTable from "./rgd-table/RDGTable";
import TestTable from "./test-table/TestTable";
import TestTable2 from "./test-table/TestTable2";

function App() {
  return (
    <div className="App" style={{ margin: "20px" }}>
      {/* <RGDTable /> */}
      <TestTable />
      <TestTable2 />
    </div>
  );
}

export default App;
