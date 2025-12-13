import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Men', path: '/men' },
        { name: 'Women', path: '/women' },
        { name: 'Wedding', path: '/wedding' },
        { name: 'About', path: '/about' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#0f392b]">
                    <Scissors className="w-8 h-8 text-[#d4af37]" />
                    <span>Brand Tailore</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-[#0f392b] hover:text-[#d4af37] font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/login" className="text-[#0f392b] hover:text-[#d4af37] font-medium transition-colors">Login</Link>
                    <Link to="/book" className="btn btn-primary">
                        Book Stitching
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-[#0f392b]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 flex flex-col items-center gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-[#0f392b] font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/login" className="text-[#0f392b] font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                    <Link to="/book" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                        Book Stitching
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
