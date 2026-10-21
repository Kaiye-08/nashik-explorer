import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import PlaceDetails from "./pages/PlaceDetails";
import Home from "./pages/Home";
import Places from "./pages/Places";
import MapPage from "./pages/MapPage";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/places" element={<Places />}/>
      <Route path="/map" element={<MapPage />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/places/:slug" element={<PlaceDetails />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;