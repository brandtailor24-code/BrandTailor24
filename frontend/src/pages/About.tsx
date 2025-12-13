import React from 'react';
import { Award, Users, ShieldCheck, Target, Clock } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#0f392b] mb-4">About Brand Tailore</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Redefining custom tailoring with a blend of tradition and technology. We bring the boutique to your doorstep.
                    </p>
                </div>

                {/* Vision & Mission */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#d4af37]">
                        <Target className="w-12 h-12 text-[#0f392b] mb-4" />
                        <h2 className="text-2xl font-bold text-[#0f392b] mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To become the most trusted and accessible custom tailoring service, empowering individuals to wear their confidence through perfectly fitted clothes.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#0f392b]">
                        <Award className="w-12 h-12 text-[#d4af37] mb-4" />
                        <h2 className="text-2xl font-bold text-[#0f392b] mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To provide hassle-free, premium quality stitching services with doorstep convenience, ensuring every garment is a masterpiece of craftsmanship.
                        </p>
                    </div>
                </div>

                {/* Stats / Experience */}
                <div className="bg-[#0f392b] rounded-3xl p-12 text-white mb-20">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-[#d4af37] mb-2">20+</div>
                            <div className="text-lg opacity-90">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-[#d4af37] mb-2">50+</div>
                            <div className="text-lg opacity-90">Expert Tailors</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-[#d4af37] mb-2">10k+</div>
                            <div className="text-lg opacity-90">Orders Delivered</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-[#d4af37] mb-2">100%</div>
                            <div className="text-lg opacity-90">Fit Guarantee</div>
                        </div>
                    </div>
                </div>

                {/* Our Guarantee */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold text-[#0f392b] mb-12">Our Promise to You</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-700">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Perfect Fit Guarantee</h3>
                            <p className="text-gray-600">If it doesn't fit, we alter it for free. No questions asked.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-700">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dedicated Stylist</h3>
                            <p className="text-gray-600">Get personal advice on fabrics, trends, and designs.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-700">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">On-Time Delivery</h3>
                            <p className="text-gray-600">We respect your time. Delivery dates are set in stone.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
