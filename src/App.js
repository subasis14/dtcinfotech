import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./login";
import DataGridTable from "./Datagrid/ReduxGrid";
import { Provider } from "react-redux";
import StateDataGrid from "./Datagrid/StateGrid";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route
            path="/datagrid"
            element={
              <Provider store={store}>
                <DataGridTable />
              </Provider>
            }
          ></Route> */}
          <Route path="/datagrid" element={<StateDataGrid />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
