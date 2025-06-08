<<<<<<< Updated upstream
import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import StatusBar from './components/StatusBar';
import News from './components/News';
import Events from './components/Events';
import WhyChoose from './components/WhyChoose';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <StatusBar />
      <News />
      <Events />
      <WhyChoose />
      <CallToAction />
      <Footer />
    </div>
=======
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HoiVien from "./pages/HoiVien";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hoivien" element={<HoiVien />} />
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;