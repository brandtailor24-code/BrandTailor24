import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { Scissors, Truck, Ruler, Clock, Star, CheckCircle } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center bg-[#0f392b] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                        Custom Tailoring at <span className="text-[#d4af37]">Your Doorstep</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up delay-100">
                        Doorstep Pickup & Delivery • Affordable, Premium Stitching for Men & Women
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                        <Link to="/book" className="btn btn-primary text-lg px-8 py-4">Book a Tailor</Link>
                        <Link to="/services" className="btn bg-white text-[#0f392b] hover:bg-gray-100 text-lg px-8 py-4 font-bold rounded-lg transition-all">View Services</Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] font-bold uppercase tracking-wider">Our Services</span>
                    <h2 className="text-4xl font-bold text-[#0f392b] mt-2">What We Stitch</h2>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { title: 'Men Stitching', link: '/men', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4729d7?auto=format&fit=crop&w=800&q=80' },
                        { title: 'Women Stitching', link: '/women', img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80' },
                        { title: 'Wedding Packages', link: '/wedding', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80' },
                        { title: 'Alteration Center', link: '/services', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80' }
                    ].map((cat, i) => (
                        <Link key={i} to={cat.link} className="group relative h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all z-10"></div>
                            <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                                <span className="text-[#d4af37] font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    Explore <Scissors size={16} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-[#0f392b] text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-[#d4af37] font-bold uppercase tracking-wider">Why Choose Us</span>
                            <h2 className="text-4xl font-bold mb-6 mt-2">Experience the Art of Perfect Fit</h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                We bring the boutique experience to your doorstep. No more traffic, no more waiting. Just perfect clothes, delivered to you.
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    "Tailors with 20+ years experience",
                                    "Quality checking before delivery",
                                    "100% measurement guarantee",
                                    "On-time delivery"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="text-[#d4af37]" size={24} />
                                        <span className="text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                <h3 className="text-4xl font-bold text-[#d4af37] mb-2">20+</h3>
                                <p>Years Experience</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                <h3 className="text-4xl font-bold text-[#d4af37] mb-2">5k+</h3>
                                <p>Happy Customers</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                <h3 className="text-4xl font-bold text-[#d4af37] mb-2">100%</h3>
                                <p>Fit Guarantee</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                <h3 className="text-4xl font-bold text-[#d4af37] mb-2">48h</h3>
                                <p>Express Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Services */}
            <section className="py-20 container mx-auto px-4 bg-white">
                <h2 className="text-4xl font-bold text-[#0f392b] text-center mb-16">Popular Services</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { name: "Men's Shirt Stitching", price: "₹350", icon: <Ruler /> },
                        { name: "Blouse Stitching", price: "₹550", icon: <Scissors /> },
                        { name: "Kurti Stitching", price: "₹350", icon: <Star /> },
                        { name: "Bridal Blouse Work", price: "₹1800", icon: <Star /> }
                    ].map((service, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                            <div className="w-12 h-12 bg-[#f8f9fa] rounded-full flex items-center justify-center text-[#0f392b] mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#0f392b] mb-2">{service.name}</h3>
                            <p className="text-[#d4af37] font-bold text-lg mb-4">Starts at {service.price}</p>
                            <Link to="/book" className="text-[#0f392b] font-medium hover:text-[#d4af37] flex items-center gap-2">
                                Book Now <Scissors size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#d4af37]/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-[#0f392b] mb-8">Ready to get the perfect fit?</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/book" className="btn btn-primary text-lg px-8">Book Stitching</Link>
                        <Link to="/contact" className="btn btn-secondary text-lg px-8">WhatsApp Now</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
