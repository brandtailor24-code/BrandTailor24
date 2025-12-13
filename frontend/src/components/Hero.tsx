import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#f8f9fa]">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0f392b]/5 rounded-l-full -z-10" />

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[#d4af37] font-bold tracking-wider uppercase mb-4 block">Premium Tailoring Service</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#0f392b] mb-6 leading-tight">
                        Crafting Elegance, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f392b] to-[#1a5c45]">Stitch by Stitch</span>
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 max-w-lg">
                        Experience the perfect fit with Brand Tailore. We combine traditional craftsmanship with modern convenience to deliver bespoke clothing that defines you.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/track" className="btn btn-primary gap-2">
                            Track Order <ArrowRight size={20} />
                        </Link>
                        <Link to="/tailor" className="btn btn-secondary">
                            Tailor Login
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Tailoring"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#d4af37] rounded-full opacity-20 blur-3xl" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0f392b] rounded-full opacity-20 blur-3xl" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
