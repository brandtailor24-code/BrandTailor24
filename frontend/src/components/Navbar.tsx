import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Scissors, LogOut } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-brand-dark text-brand-gold shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Brand */}
                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img src={logo} alt="Brand Tailor Logo" className="h-16 w-auto object-contain rounded-full" />
                        <span className="text-xl font-bold tracking-wider text-brand-gold uppercase">Brand Tailor</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="nav-link text-sm uppercase tracking-widest hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link to="/services" className="nav-link text-sm uppercase tracking-widest hover:text-white transition-colors">
                            Services
                        </Link>
                        <Link to="/#how-it-works" className="nav-link text-sm uppercase tracking-widest hover:text-white transition-colors">
                            How It Works
                        </Link>
                        <Link to="/contact" className="nav-link text-sm uppercase tracking-widest hover:text-white transition-colors">
                            Contact
                        </Link>

                        {token ? (
                            <div className="flex items-center space-x-6 ml-4">
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-sm uppercase tracking-widest hover:text-white transition-colors">
                                        Admin
                                    </Link>
                                )}
                                <div className="flex items-center space-x-4">
                                    <span className="text-brand-gold/80 font-medium">Hi, {user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-4 py-2 border border-brand-gold/30 rounded-full hover:bg-brand-gold/10 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="text-xs uppercase tracking-widest">Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="ml-4 px-8 py-2.5 bg-brand-gold text-brand-dark font-medium rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105"
                            >
                                Login
                            </Link>
                        )}

                        <Link
                            to="/book"
                            className="ml-4 px-8 py-2.5 border border-brand-gold text-brand-gold font-medium rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
                        >
                            Book Pickup
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-brand-gold hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-brand-dark border-t border-brand-gold/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md hover:bg-brand-gold/10">Home</Link>
                        <Link to="/services" className="block px-3 py-2 rounded-md hover:bg-brand-gold/10">Services</Link>
                        <Link to="/#how-it-works" className="block px-3 py-2 rounded-md hover:bg-brand-gold/10">How It Works</Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md hover:bg-brand-gold/10">Contact</Link>
                        <Link to="/book" className="block px-3 py-2 rounded-md text-brand-gold font-semibold">Book Pickup</Link>

                        {token ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="block px-3 py-2 rounded-md hover:bg-brand-gold/10">Admin Dashboard</Link>
                                )}
                                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-400 hover:bg-brand-gold/10">
                                    Logout ({user.name})
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-brand-gold/10">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
