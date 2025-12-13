import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Heart, Users } from 'lucide-react';

const WeddingPackages = () => {
    const packages = [
        {
            title: "Groom Package",
            icon: <Star className="w-12 h-12 text-[#d4af37]" />,
            items: ["Sherwani Stitching", "Kurta Pajama", "Waistcoat", "Pagdi Making", "Design Consultation", "Priority Delivery"],
            price: "Starts at ₹5,000",
            color: "bg-gray-900 text-white"
        },
        {
            title: "Bride Package",
            icon: <Heart className="w-12 h-12 text-[#d4af37]" />,
            items: ["Bridal Blouse", "Lehenga Stitching", "Dupatta Heavy Work", "Saree Draping Package", "Dedicated Tailor", "Priority Delivery"],
            price: "Starts at ₹8,000",
            color: "bg-[#0f392b] text-white"
        },
        {
            title: "Family Package",
            icon: <Users className="w-12 h-12 text-[#d4af37]" />,
            items: ["10 Dress Stitching Bundle", "Women Blouse Bundle (5 pack)", "Kids Ethnic Wear Package", "Group Measurement Session", "Bulk Discount Applied"],
            price: "Custom Pricing",
            color: "bg-white text-[#0f392b] border border-gray-200"
        }
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] font-bold uppercase tracking-wider">Special Occasions</span>
                    <h1 className="text-4xl font-bold text-[#0f392b] mt-2 mb-4">Wedding Packages</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Make your big day perfect with our exclusive wedding tailoring packages. Expert craftsmanship for the bride, groom, and the entire family.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <div key={index} className={`rounded-2xl p-8 shadow-xl relative overflow-hidden ${pkg.color} transform hover:-translate-y-2 transition-all duration-300`}>
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#d4af37]/20 rounded-full blur-xl"></div>

                            <div className="mb-6 flex justify-center">
                                {pkg.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-center mb-2">{pkg.title}</h3>
                            <p className="text-[#d4af37] font-bold text-center text-lg mb-8">{pkg.price}</p>

                            <ul className="space-y-4 mb-8">
                                {pkg.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check size={20} className="text-[#d4af37] mt-1 flex-shrink-0" />
                                        <span className="text-sm md:text-base opacity-90">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="btn w-full bg-[#d4af37] text-[#0f392b] hover:bg-[#c5a028] font-bold py-3 rounded-lg text-center block">
                                Enquire Now
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Process Section */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold text-[#0f392b] mb-12">How It Works</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-20 right-20 h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                        {[
                            { step: "1", title: "Consultation", desc: "Meet our expert designers" },
                            { step: "2", title: "Measurements", desc: "Precise fitting session" },
                            { step: "3", title: "Trials", desc: "Ensure perfect fit" },
                            { step: "4", title: "Delivery", desc: "Ready for the big day" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-md w-64">
                                <div className="w-12 h-12 bg-[#0f392b] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-sm">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeddingPackages;
