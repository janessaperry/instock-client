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
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Navigate to="/warehouses" replace />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route
              path="/warehouses/:warehouseId"
              element={<WarehouseDetailsPage />}
            ></Route>
            <Route
              path="/warehouses/add"
              element={<WarehouseFormPage editMode={false} />}
            ></Route>
            <Route
              path="/warehouses/:warehouseId/edit"
              element={<WarehouseFormPage editMode={true} />}
            ></Route>
            <Route path="/inventory" element={<InventoryPage />} />
            <Route
              path="/inventory/:itemId"
              element={<InventoryItemDetailsPage />}
            />
            <Route
              path="/inventory/add"
              element={<InventoryFormPage editMode={false} />}
            />
            <Route
              path="/inventory/:inventoryId/edit"
              element={<InventoryFormPage editMode={true} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
