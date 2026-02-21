import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Instagram, Globe } from 'lucide-react';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("Message sent successfully!");
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#0f392b] mb-4">Get in Touch</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions about measurements, fabrics, or pricing? We're here to help!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <h2 className="text-2xl font-bold text-[#0f392b] mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <a href="https://wa.me/918088383279" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Chat on WhatsApp</p>
                                        <p className="font-bold text-[#0f392b] text-lg">+91 8088383279</p>
                                    </div>
                                </a>

                                <a href="tel:+918088383279" className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Call Us Now</p>
                                        <p className="font-bold text-[#0f392b] text-lg">+91 8088383279</p>
                                    </div>
                                </a>

                                <a href="mailto:brandtailor24@gmail.com" className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Us</p>
                                        <p className="font-bold text-[#0f392b] text-lg">brandtailor24@gmail.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Visit Our Workshop</p>
                                        <p className="font-bold text-[#0f392b]">123, Fashion Street, Jubilee Hills, Hyderabad</p>
                                    </div>
                                </div>

                                <a href="https://www.instagram.com/brandtailor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors group">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        <Instagram size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Follow on Instagram</p>
                                        <p className="font-bold text-[#0f392b] text-lg">@brandtailor</p>
                                    </div>
                                </a>

                                <a href="https://www.google.com/search?q=Brand+Tailor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Find us on Google</p>
                                        <p className="font-bold text-[#0f392b] text-lg">Brand Tailor Reviews</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-gray-200 rounded-2xl overflow-hidden h-64 shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.467808381232!2d78.4055!3d17.4365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f3fdf6bde9%3A0x7a39e9466c34831a!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Location Map"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
                        <h2 className="text-2xl font-bold text-[#0f392b] mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text" required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none bg-gray-50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email" required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none bg-gray-50"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows={5} required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none bg-gray-50"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full btn btn-primary py-4 flex items-center justify-center gap-2">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
