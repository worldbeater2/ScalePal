import Blog from "./pages/Blog";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import ScrollToTop from "./units/ScrollToTop";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
     <ScrollToTop />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/home" element={<Homepage />} />
      
      </Routes>
    </>
  );
}

export default App;
