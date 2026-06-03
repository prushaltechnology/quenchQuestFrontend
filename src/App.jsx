import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { Footer } from "antd/es/layout/layout";
import AppFooter from "./components/layout/Footer";
import About from "./components/pages/About";
import Programs from "./components/pages/Programs";
import Project from "./components/pages/Projects";
import Contact from "./components/pages/Contact";
import GetInvolved from "./components/pages/GetInvolved";
import Profile from "./components/pages/Profile";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/programs" element={<Programs />} />
  <Route path="/projects" element={<Project />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/get-involved" element={<GetInvolved />} />
  <Route path="/profile" element={<Profile />} />
</Routes>

      <AppFooter />
    </BrowserRouter>
  );
}

export default App;