import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, ChevronRight } from 'lucide-react';

const WomenCategory = () => {
    const categories = [
        {
            title: "Blouse Stitching",
            items: ["Simple Blouse", "Designer Blouse", "Bridal Blouse", "Padded Blouse", "Aari Work Add-on"],
            img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Salwar & Suit",
            items: ["Churidar", "Anarkali", "Straight Suit", "Palazzo Suit", "Lining Options"],
            img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Kurtis",
            items: ["A-line Kurti", "Straight Kurti", "Fancy Kurti", "Short Kurti"],
            img: "https://images.unsplash.com/photo-1583391733958-d024443f0371?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Lehenga Stitching",
            items: ["Simple Lehenga", "Bridal Lehenga", "With Cancan Option"],
            img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Saree Services",
            items: ["Saree Fall & Pico", "Saree Rolling", "Tassels", "Maggam Add-on"],
            img: "https://images.unsplash.com/photo-1610030469668-9655df089690?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#0f392b] mb-4">Women's Tailoring</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        From elegant blouses to stunning lehengas, we craft outfits that celebrate you.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all z-10"></div>
                                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-[#0f392b] mb-4">{cat.title}</h3>
                                <ul className="space-y-3 mb-6">
                                    {cat.items.map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700">
                                            <ChevronRight size={16} className="text-[#d4af37] mr-2" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/book" className="btn btn-outline w-full justify-center">Book Now</Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add-on Highlight */}
                <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#d4af37]/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#0f392b] mb-4">Premium Add-ons Available</h2>
                            <p className="text-gray-600 text-lg">Customize your outfit with our premium add-ons like Aari work, Maggam work, designer tassels, and more.</p>
                        </div>
                        <Link to="/book" className="btn btn-primary text-lg px-8 whitespace-nowrap">Explore Add-ons</Link>
                    </div>
                </div>

                {/* Measurement Guide CTA */}
                <div className="mt-8 bg-[#0f392b] text-white rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">Need Help with Measurements?</h3>
                    <p className="text-gray-300 mb-6">Check out our detailed measurement guide to ensure the perfect fit</p>
                    <Link to="/measurements/women" className="btn btn-secondary">
                        View Measurement Guide
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WomenCategory;
