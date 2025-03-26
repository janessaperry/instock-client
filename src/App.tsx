// Libraries
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehouseFormPage from "./pages/WarehouseFormPage/WarehouseFormPage";
import InventoryItemDetailsPage from "./pages/InventoryItemDetailsPage/InventoryItemDetailsPage";
import InventoryFormPage from "./pages/InventoryFormPage/InventoryFormPage";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Types
// Styles
import "./App.scss";

function App() {
  const baseApiUrl: string = import.meta.env.VITE_API_URL;

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Navigate to="/warehouses" replace />} />
            <Route
              path="/warehouses"
              element={<WarehousesPage baseApiUrl={baseApiUrl} />}
            />
            <Route
              path="/warehouses/:warehouseId"
              element={<WarehouseDetailsPage baseApiUrl={baseApiUrl} />}
            ></Route>
            <Route
              path="/warehouses/add"
              element={
                <WarehouseFormPage baseApiUrl={baseApiUrl} editMode={false} />
              }
            ></Route>
            <Route
              path="/warehouses/:warehouseId/edit"
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
            <Route
              path="/inventory/add"
              element={
                <InventoryFormPage baseApiUrl={baseApiUrl} editMode={false} />
              }
            />
            <Route
              path="/inventory/:inventoryId/edit"
              element={
                <InventoryFormPage baseApiUrl={baseApiUrl} editMode={true} />
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
