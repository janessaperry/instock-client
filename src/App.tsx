import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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
              path="/inventory"
              element={<InventoryPage baseApiUrl={baseApiUrl} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
