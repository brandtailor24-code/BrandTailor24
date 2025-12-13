import React from 'react';
import { Link } from 'react-router-dom';
import { Download, PlayCircle, ArrowRight, Ruler } from 'lucide-react';

const Measurements = () => {
    const categories = [
        {
            title: "Men's Measurements",
            description: "Detailed guides for shirts, pants, sherwanis, and more",
            link: "/measurements/men",
            icon: "👔",
            items: ["Formal Shirts", "Casual Shirts", "Pants & Trousers", "Sherwanis", "Kurtas"]
        },
        {
            title: "Women's Measurements",
            description: "Complete guides for blouses, kurtis, lehengas, and sarees",
            link: "/measurements/women",
            icon: "👗",
            items: ["Blouses", "Kurtis", "Lehengas", "Salwar Suits", "Saree Services"]
        }
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#0f392b] mb-4">Measurement Guides</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Follow our simple guides to take accurate measurements at home. Perfect fit guaranteed!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                            <div className="text-6xl mb-4">{category.icon}</div>
                            <h2 className="text-2xl font-bold text-[#0f392b] mb-3">{category.title}</h2>
                            <p className="text-gray-600 mb-6">{category.description}</p>

                            <ul className="space-y-2 mb-6">
                                {category.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={category.link}
                                className="btn btn-primary w-full justify-center gap-2"
                            >
                                View Guide <ArrowRight size={20} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* General Tips */}
                <div className="bg-[#0f392b] text-white rounded-2xl p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Ruler size={32} className="text-[#d4af37]" />
                        <h2 className="text-3xl font-bold">General Measurement Tips</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-[#d4af37]">Before You Start</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Use a flexible measuring tape</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Wear light, fitted clothing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Stand naturally and relax</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Have someone help you for accuracy</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3 text-[#d4af37]">While Measuring</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Keep the tape parallel to the floor</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Don't pull the tape too tight</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Measure twice to confirm accuracy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#d4af37] mt-1">•</span>
                                    <span>Write down each measurement immediately</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/20 text-center">
                        <p className="text-lg mb-4">Need help? Our team is here to assist you!</p>
                        <Link to="/contact" className="btn btn-secondary">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Measurements;
