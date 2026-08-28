import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Privacy from "./pages/Privacy/Privacy";
import HuffmanVisualizerPage from "./pages/HuffmanVisualizerPage/HuffmanVisualizerPage";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/huffman-visualizer" element={<HuffmanVisualizerPage />} />
            </Routes>
            <Footer />
            <Chatbot />
        </Router>
    );
}

export default App;