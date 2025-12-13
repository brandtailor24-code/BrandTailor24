import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
    const pricingData = [
        {
            category: "Men's Stitching",
            items: [
                { name: "Formal Shirt", price: "₹350" },
                { name: "Casual Shirt", price: "₹350" },
                { name: "Formal Pant", price: "₹450" },
                { name: "Kurta Pajama", price: "₹650" },
                { name: "Sherwani", price: "₹2500" },
                { name: "Waistcoat", price: "₹800" }
            ]
        },
        {
            category: "Women's Stitching",
            items: [
                { name: "Normal Blouse", price: "₹550" },
                { name: "Lining Blouse", price: "₹750" },
                { name: "Princess Cut Blouse", price: "₹950" },
                { name: "Bridal Blouse", price: "₹1800" },
                { name: "Kurti (Simple)", price: "₹350" },
                { name: "Kurti (Lining)", price: "₹550" },
                { name: "Salwar Suit", price: "₹650" },
                { name: "Lehenga Stitching", price: "₹1200" }
            ]
        },
        {
            category: "Saree & Add-ons",
            items: [
                { name: "Saree Fall & Pico", price: "₹150" },
                { name: "Saree Kuchu/Tassels", price: "₹450" },
                { name: "Maggam Work (Basic)", price: "₹1200" },
                { name: "Aari Work (Basic)", price: "₹800" },
                { name: "Dupatta Pico", price: "₹50" },
                { name: "Alterations (Per item)", price: "₹100" }
            ]
        }
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#0f392b] mb-4">Transparent Pricing</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        No hidden charges. Pay for what you get. Premium quality stitching at affordable rates.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingData.map((section, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="bg-[#0f392b] p-6 text-white text-center">
                                <h3 className="text-2xl font-bold">{section.category}</h3>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-4">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2 last:border-0">
                                            <span className="text-gray-700 font-medium">{item.name}</span>
                                            <span className="text-[#d4af37] font-bold text-lg">{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 text-center">
                                    <Link to="/book" className="btn btn-outline w-full justify-center">Book Now</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Note */}
                <div className="mt-12 text-center text-gray-500 text-sm max-w-2xl mx-auto">
                    <p>* Prices may vary based on design complexity and add-ons selected.</p>
                    <p>* Urgent delivery charges extra.</p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
