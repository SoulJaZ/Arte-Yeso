
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
     
        <Header />
        
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
        
          </Routes>
       
        <Footer />
      
    </Router>
  );
};

export default App;
