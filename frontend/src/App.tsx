import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import CustomerPortal from './pages/CustomerPortal';
import Measurements from './pages/Measurements';
import MenMeasurements from './pages/MenMeasurements';
import WomenMeasurements from './pages/WomenMeasurements';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import TailorDashboard from './pages/TailorDashboard';
import MenCategory from './pages/MenCategory';
import WomenCategory from './pages/WomenCategory';
import WeddingPackages from './pages/WeddingPackages';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/men" element={<MenCategory />} />
                <Route path="/women" element={<WomenCategory />} />
                <Route path="/wedding" element={<WeddingPackages />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/book" element={<Booking />} />
                <Route path="/track" element={<CustomerPortal />} />
                <Route path="/measurements" element={<Measurements />} />
                <Route path="/measurements/men" element={<MenMeasurements />} />
                <Route path="/measurements/women" element={<WomenMeasurements />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tailor" element={<TailorDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
