// Libraries
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehouseFormPage from "./pages/WarehouseFormPage/WarehouseFormPage";
import InventoryItemDetailsPage from "./pages/InventoryItemDetailsPage/InventoryItemDetailsPage";
import InventoryFormPage from "./pages/InventoryFormPage/InventoryFormPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ModalWelcome from "./components/ModalWelcome/ModalWelcome.tsx";

// Styles
import "./App.scss";

function App () {
  const documentRoot = document.getElementById("root");

  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => {
    const modalSeen = window.sessionStorage.getItem("modalSeen");

    if ( modalSeen === null ) {
      window.sessionStorage.setItem("modalSeen", "false");
      setShowModal(true);
    }
    else if ( modalSeen === "false" ) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    window.sessionStorage.setItem("modalSeen", "true");
    setShowModal(false);
  }

  return (
    <>
      <BrowserRouter>
        <Header/>
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Navigate to="/warehouses" replace/>}/>
            <Route path="/warehouses" element={<WarehousesPage/>}/>
            <Route
              path="/warehouses/:warehouseId"
              element={<WarehouseDetailsPage/>}
            ></Route>
            <Route
              path="/warehouses/add"
              element={<WarehouseFormPage editMode={false}/>}
            ></Route>
            <Route
              path="/warehouses/:warehouseId/edit"
              element={<WarehouseFormPage editMode={true}/>}
            ></Route>
            <Route path="/inventory" element={<InventoryPage/>}/>
            <Route
              path="/inventory/:itemId"
              element={<InventoryItemDetailsPage/>}
            />
            <Route
              path="/inventory/add"
              element={<InventoryFormPage editMode={false}/>}
            />
            <Route
              path="/inventory/:inventoryId/edit"
              element={<InventoryFormPage editMode={true}/>}
            />
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </main>

        {showModal && documentRoot && (
          createPortal(<ModalWelcome handleClose={handleClose}/>, documentRoot)
        )}

        <Footer setShowModal={setShowModal}/>
      </BrowserRouter>
    </>
  );
}

export default App;
