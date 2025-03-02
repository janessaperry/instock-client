import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<WarehousesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
