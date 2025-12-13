import React from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Upload, Edit3, ChevronRight } from 'lucide-react';

const MenCategory = () => {
    const categories = [
        {
            title: "Shirts",
            items: ["Formal Shirt Stitching", "Casual Shirt Stitching", "Kurta Shirt"],
            img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Pants",
            items: ["Formal Pants", "Jeans Alteration", "Chinos", "Trouser Stitching"],
            img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Ethnic Wear",
            items: ["Sherwani", "Kurta Pajama", "Waistcoat Stitching"],
            img: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Accessories Work",
            items: ["Button Replacement", "Pocket Design", "Sleeve Alteration", "Zip Replacement"],
            img: "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#0f392b] mb-4">Men's Tailoring</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the perfect fit with our premium men's tailoring services. From formal wear to ethnic classics.
                    </p>
                </div>

                {/* Subcategories */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
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

                {/* Measurement Options */}
                <div className="bg-[#0f392b] rounded-2xl p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold text-center mb-12">Measurement Options</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
                            <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 text-[#0f392b]">
                                <Ruler size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Home Visit</h3>
                            <p className="text-gray-300 mb-4">Our expert tailor will visit your home to take precise measurements.</p>
                        </div>
                        <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
                            <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 text-[#0f392b]">
                                <Upload size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Send Sample</h3>
                            <p className="text-gray-300 mb-4">Send us your best-fitting garment, and we'll clone the fit perfectly.</p>
                        </div>
                        <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
                            <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 text-[#0f392b]">
                                <Edit3 size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Enter Manually</h3>
                            <p className="text-gray-300 mb-4">Know your sizes? Enter them directly in our detailed form.</p>
                            <Link to="/measurements/men" className="text-[#d4af37] hover:underline font-medium">
                                View Measurement Guide →
                            </Link>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/book" className="btn btn-primary text-lg px-10 py-3">Book Your Stitching</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenCategory;
