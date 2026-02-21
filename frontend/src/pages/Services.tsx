import React, { useEffect, useState } from 'react';
import { Scissors, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
    id: any;
    name: string;
    desc: string;
    price: number;
    time: string;
    category: string;
}

const Services = () => {
    // Static data to ensure reliability and exact pricing matching user request
    const SERVICES_DATA: Service[] = [
        // 1. Blouse Category
        { id: 1, category: "Custom Blouse Studio", name: "Normal Blouse (Without Lining)", price: 250, time: "2-4 days", desc: "Basic stitching without lining." },
        { id: 2, category: "Custom Blouse Studio", name: "Lining Blouse (Simple Neck)", price: 500, time: "3-5 days", desc: "Stitched with lining, simple neck design." },
        { id: 3, category: "Custom Blouse Studio", name: "Design Neck (With Lining)", price: 750, time: "4-6 days", desc: "Custom neck design with lining." },
        { id: 4, category: "Custom Blouse Studio", name: "Lehenga Blouse (Specialty Cut)", price: 650, time: "5-7 days", desc: "Special cut for lehengas." },
        { id: 5, category: "Custom Blouse Studio", name: "Designer Pattern Blouse", price: 1250, time: "7-10 days", desc: "Intricate designer patterns." },
        { id: 6, category: "Custom Blouse Studio", name: "Machine Embroidery Blouse", price: 1500, time: "10-14 days", desc: "Machine embroidery work." },
        { id: 7, category: "Custom Blouse Studio", name: "Handloom Embroidery Blouse", price: 3500, time: "15-20 days", desc: "Exquisite handloom embroidery." },

        // 2. Lehenga Bottoms
        { id: 8, category: "Lehenga Bottoms & Skirts", name: "Normal Lehenga Bottom", price: 600, time: "4-6 days", desc: "Basic lehenga stitching." },
        { id: 9, category: "Lehenga Bottoms & Skirts", name: "Designer Flared Lehenga", price: 1500, time: "7-10 days", desc: "Extra flare and designer cut." },
        { id: 10, category: "Lehenga Bottoms & Skirts", name: "Simple Pattu/Silk Lehenga", price: 800, time: "5-7 days", desc: "Traditional silk lehenga stitching." },

        // 3. Salwar & Suits
        { id: 11, category: "Salwar & Ethnic Wear", name: "Salwar Top (Without Lining)", price: 400, time: "3-5 days", desc: "Simple top stitching." },
        { id: 12, category: "Salwar & Ethnic Wear", name: "Salwar Top (With Lining)", price: 550, time: "4-6 days", desc: "Top stitching with lining." },
        { id: 13, category: "Salwar & Ethnic Wear", name: "Salwar Pant (Without Lining)", price: 400, time: "3-5 days", desc: "Simple pant stitching." },
        { id: 14, category: "Salwar & Ethnic Wear", name: "Salwar Pant (With Lining)", price: 550, time: "4-6 days", desc: "Pant stitching with lining." },

        // 4. Gowns
        { id: 15, category: "Gown Collection", name: "Simple Gown (Without Lining)", price: 950, time: "5-7 days", desc: "Basic gown stitching." },
        { id: 16, category: "Gown Collection", name: "Designer Gown (With Lining)", price: 4000, time: "10-15 days", desc: "Premium designer gown." },

        // 5. Western & Co-ords (Starts at 1200)
        { id: 17, category: "Western & Co-ord Sets", name: "Women’s Co-ord Set", price: 1200, time: "7-10 days", desc: "Trendy co-ord set (Base Price). Custom styles available." },
        { id: 18, category: "Western & Co-ord Sets", name: "Women’s Blazer", price: 2500, time: "10-14 days", desc: "Custom fit blazer (Based on fabric/structure)." },

        // 6. Celebration Combos (Order Basis)
        { id: 19, category: "Celebration Combos", name: "Mom & Daughter Combo", price: 5000, time: "15-20 days", desc: "Matching outfits (Custom order basis)." },
        { id: 20, category: "Celebration Combos", name: "Birthday Combo", price: 4000, time: "10-15 days", desc: "Special birthday themed outfits." },

        // 7. Wedding Packages (Consultation)
        { id: 21, category: "Bridal & Wedding Packages", name: "Wedding Gown & Blouse Set", price: 12000, time: "20-30 days", desc: "Complete wedding ensemble." },
        { id: 22, category: "Bridal & Wedding Packages", name: "Bridal Party Bulk Orders", price: 20000, time: "25-35 days", desc: "Bulk stitching for bridal party (Contact for details)." }
    ];

    const [services, setServices] = useState<Service[]>(SERVICES_DATA);
    const [loading, setLoading] = useState(false);

    // Removed fetch to ensure data stability and exact matching with user requirements
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
                    <h2 className="text-4xl font-playfair font-bold text-brand-dark mb-4">Bespoke Services for Women</h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        From everyday elegance to bridal grandeur, we craft outfits that celebrate you.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {Object.entries(
                            services.reduce((acc, service) => {
                                const cat = service.category;
                                if (!acc[cat]) acc[cat] = [];
                                acc[cat].push(service);
                                return acc;
                            }, {} as Record<string, Service[]>)
                        ).map(([category, categoryServices]) => (
                            <div key={category}>
                                <h3 className="text-3xl font-bold text-brand-dark mb-8 border-b-2 border-brand-gold/20 pb-2 inline-block">
                                    {category} Collection
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {categoryServices.map((service) => (
                                        <div key={service.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                            <div className="p-8">
                                                <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                                                    <Scissors className="w-6 h-6 text-brand-gold" />
                                                </div>
                                                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2 block">{service.category}</span>
                                                <h3 className="text-2xl font-bold text-brand-dark mb-3">{service.name}</h3>
                                                <p className="text-gray-600 mb-6 min-h-[48px] text-sm">{service.desc}</p>

                                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                                                    <div>
                                                        <span className="text-xs text-gray-500 block">Pricing</span>
                                                        <span className="text-xl font-bold text-brand-dark">₹{service.price.toLocaleString()}</span>
                                                    </div>
                                                    <Link
                                                        to="/book"
                                                        className="px-6 py-2 bg-brand-dark text-white text-sm font-bold rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors"
                                                    >
                                                        Book
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional Category Section */}
                <div className="mt-24">
                    <div className="bg-brand-dark rounded-2xl p-12 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-playfair font-bold mb-4">Have a specific design in mind?</h2>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                                Upload a photo of any celebrity look or Pinterest design, and our designers will recreate it for you perfectly.
                            </p>
                            <Link
                                to="/book"
                                className="inline-block px-10 py-4 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105"
                            >
                                Book a Design Consultation
                            </Link>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-brand-gold/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
