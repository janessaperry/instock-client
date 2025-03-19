import { BrowserRouter, Routes, Route } from "react-router-dom";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehouseFormPage from "./pages/WarehouseFormPage/WarehouseFormPage";
import "./App.scss";
import InventoryItemDetailsPage from "./pages/InventoryItemDetailsPage/InventoryItemDetailsPage";

function App() {
  const baseApiUrl: string = import.meta.env.VITE_API_URL;

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={<WarehousesPage baseApiUrl={baseApiUrl} />}
            />
            <Route
              path="/:warehouseId"
              element={<WarehouseDetailsPage baseApiUrl={baseApiUrl} />}
            ></Route>
            <Route
              path="/add"
              element={
                <WarehouseFormPage baseApiUrl={baseApiUrl} editMode={false} />
              }
            ></Route>
            <Route
              path="/:warehouseId/edit"
              element={
                <WarehouseFormPage baseApiUrl={baseApiUrl} editMode={true} />
              }
            ></Route>
            <Route
              path="/inventory"
              element={<InventoryPage baseApiUrl={baseApiUrl} />}
            />
            <Route
              path="/inventory/:itemId"
              element={<InventoryItemDetailsPage baseApiUrl={baseApiUrl} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
