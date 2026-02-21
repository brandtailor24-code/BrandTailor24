import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Truck, Clock, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <header className="relative h-[90vh] flex items-center justify-center bg-brand-dark overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <div className="mb-6 inline-block">
                        <span className="py-2 px-6 border border-brand-gold/50 rounded-full text-brand-gold text-sm tracking-[0.2em] uppercase backdrop-blur-sm">
                            Experience Luxury
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-playfair text-white mb-6 leading-tight">
                        Bangalore’s Premium Doorstep <br />
                        <span className="text-brand-gold italic">Designer Studio for Women</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
                        Exquisite craftsmanship meets modern convenience. From Bridal Lehengas to Designer Blouses, get bespoke tailoring delivered to your doorstep.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            to="/book"
                            className="w-full md:w-auto px-10 py-4 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-gold/20"
                        >
                            Book a Pickup
                        </Link>
                        <Link
                            to="/services"
                            className="w-full md:w-auto px-10 py-4 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            Explore Services
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-playfair font-bold text-brand-dark mb-4">Why Choose Brand Tailor?</h2>
                        <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Truck className="w-10 h-10 text-brand-gold" />}
                            title="Doorstep Convenience"
                            description="We pick up your fabric and measurements from your home and deliver the stitched outfit back to you."
                        />
                        <FeatureCard
                            icon={<Scissors className="w-10 h-10 text-brand-gold" />}
                            title="Expert Design Consultation"
                            description="Our designers help you choose the best styles, embroidery, and cuts for your body type."
                        />
                        <FeatureCard
                            icon={<Clock className="w-10 h-10 text-brand-gold" />}
                            title="On-Time Delivery"
                            description="We value your time. Guaranteed delivery within the promised timeframe, every single time."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2 block">Process</span>
                        <h2 className="text-4xl font-playfair font-bold text-brand-dark mb-4">How It Works</h2>
                        <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Experience the easiest way to get your clothes stitched perfectly without stepping out.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>

                        <StepCard
                            number="1"
                            title="Book Pickup"
                            description="Schedule a pickup online. Our designer visits you for measurements."
                        />
                        <StepCard
                            number="2"
                            title="Design & Stitch"
                            description="Expert tailors craft your outfit with precision and premium finishing."
                        />
                        <StepCard
                            number="3"
                            title="Quality Check"
                            description="Every garment undergoes a strict quality inspection."
                        />
                        <StepCard
                            number="4"
                            title="Doorstep Delivery"
                            description="Your perfect outfit is delivered to your home."
                        />
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-24 bg-brand-dark text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2 block">Collections</span>
                            <h2 className="text-4xl font-playfair font-bold mb-4">Our Services</h2>
                        </div>
                        <Link to="/services" className="hidden md:flex items-center text-brand-gold hover:text-white transition-colors gap-2 group">
                            View All Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServicePreviewCard
                            image="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            title="Bridal & Lehengas"
                        />
                        <ServicePreviewCard
                            image="https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            title="Designer Blouses"
                        />
                        <ServicePreviewCard
                            image="https://images.unsplash.com/photo-1583391733958-d757271e869f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            title="Salwar & Kurtis"
                        />
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/services" className="inline-flex items-center text-brand-gold font-medium">
                            View All Services <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
        <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
    <div className="relative z-10 text-center bg-gray-50 px-4">
        <div className="w-12 h-12 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
            {number}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const ServicePreviewCard = ({ image, title }: { image: string, title: string }) => (
    <div className="group relative overflow-hidden rounded-xl h-96 cursor-pointer">
        <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
            <p className="text-brand-gold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">Explore Collection</p>
        </div>
    </div>
);

export default LandingPage;
