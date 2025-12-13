import React from 'react';
import { Link } from 'react-router-dom';
import { Download, PlayCircle, ArrowLeft, Ruler } from 'lucide-react';

const MenMeasurements = () => {
    const shirtMeasurements = [
        { name: "Chest/Bust", instruction: "Measure around the fullest part of your chest, keeping the tape parallel to the floor" },
        { name: "Shoulder Width", instruction: "Measure from one shoulder seam to the other across your back" },
        { name: "Sleeve Length", instruction: "Measure from the shoulder seam down to your wrist" },
        { name: "Shirt Length", instruction: "Measure from the base of your collar down to where you want the shirt to end" },
        { name: "Collar Size", instruction: "Measure around your neck where the collar sits" }
    ];

    const pantMeasurements = [
        { name: "Waist", instruction: "Measure around your natural waistline" },
        { name: "Hip", instruction: "Measure around the fullest part of your hips" },
        { name: "Thigh", instruction: "Measure around the fullest part of your thigh" },
        { name: "Inseam/Length", instruction: "Measure from the crotch seam down to your ankle" },
        { name: "Ankle Opening", instruction: "Measure the width of the pant leg at the ankle" }
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4 max-w-6xl">
                <Link to="/men" className="inline-flex items-center gap-2 text-[#0f392b] hover:underline mb-6">
                    <ArrowLeft size={20} />
                    Back to Men's Category
                </Link>

                <h1 className="text-4xl font-bold text-[#0f392b] mb-4">Men's Measurement Guide</h1>
                <p className="text-gray-600 mb-8">Follow our detailed guide to take accurate measurements at home for perfect-fitting garments.</p>

                <div className="flex flex-wrap gap-4 mb-12">
                    <button className="btn btn-primary gap-2">
                        <Download size={20} /> Download PDF Guide
                    </button>
                    <button className="btn btn-secondary gap-2">
                        <PlayCircle size={20} /> Watch Video Tutorial
                    </button>
                </div>

                {/* Shirt Measurements */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#0f392b] rounded-full flex items-center justify-center">
                            <Ruler className="text-white" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-[#0f392b]">Shirt Measurements</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src="/shirt_measurements_1765622258897.png"
                                alt="Shirt measurement diagram"
                                className="w-full rounded-lg border-2 border-gray-200"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#0f392b] mb-4">How to Measure</h3>
                            <div className="space-y-4">
                                {shirtMeasurements.map((item, i) => (
                                    <div key={i} className="border-l-4 border-[#d4af37] pl-4 py-2">
                                        <h4 className="font-bold text-gray-800 mb-1">{i + 1}. {item.name}</h4>
                                        <p className="text-gray-600 text-sm">{item.instruction}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pant Measurements */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#0f392b] rounded-full flex items-center justify-center">
                            <Ruler className="text-white" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-[#0f392b]">Pant/Trouser Measurements</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src="/pant_measurements_1765622277791.png"
                                alt="Pant measurement diagram"
                                className="w-full rounded-lg border-2 border-gray-200"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#0f392b] mb-4">How to Measure</h3>
                            <div className="space-y-4">
                                {pantMeasurements.map((item, i) => (
                                    <div key={i} className="border-l-4 border-[#d4af37] pl-4 py-2">
                                        <h4 className="font-bold text-gray-800 mb-1">{i + 1}. {item.name}</h4>
                                        <p className="text-gray-600 text-sm">{item.instruction}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-[#0f392b] text-white rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4">Pro Tips for Accurate Measurements</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>Use a flexible measuring tape and keep it snug but not tight</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>Measure over light clothing for more accurate results</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>Stand naturally and don't hold your breath while measuring</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>Have someone help you for the most accurate measurements</span>
                        </li>
                    </ul>
                </div>

                <div className="text-center mt-12">
                    <Link to="/book" className="btn btn-primary text-lg px-10 py-3">
                        Ready to Book Your Order
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenMeasurements;
