import React from 'react';
import { Link } from 'react-router-dom';
import { Download, PlayCircle, ArrowLeft, Ruler } from 'lucide-react';

const WomenMeasurements = () => {
    const blouseMeasurements = [
        { name: "Bust", instruction: "Measure around the fullest part of your bust, keeping the tape parallel to the floor" },
        { name: "Waist", instruction: "Measure around your natural waistline" },
        { name: "Shoulder Width", instruction: "Measure from one shoulder point to the other across your back" },
        { name: "Blouse Length", instruction: "Measure from the shoulder down to where you want the blouse to end" },
        { name: "Sleeve Length", instruction: "Measure from shoulder to wrist or desired sleeve length" },
        { name: "Armhole Depth", instruction: "Measure from shoulder seam down to underarm" }
    ];

    const kurtiMeasurements = [
        { name: "Bust", instruction: "Measure around the fullest part of your bust" },
        { name: "Waist", instruction: "Measure around your natural waistline" },
        { name: "Hip", instruction: "Measure around the fullest part of your hips" },
        { name: "Kurti Length", instruction: "Measure from shoulder to desired length (knee, ankle, etc.)" },
        { name: "Shoulder Width", instruction: "Measure across the back from shoulder to shoulder" },
        { name: "Sleeve Length", instruction: "Measure from shoulder to desired sleeve length" }
    ];

    const lehengaMeasurements = [
        { name: "Waist", instruction: "Measure around your natural waistline where the lehenga will sit" },
        { name: "Hip", instruction: "Measure around the fullest part of your hips" },
        { name: "Lehenga Length", instruction: "Measure from waist to floor (or desired length)" },
        { name: "Flare", instruction: "Specify how much flare/fullness you want in the skirt" }
    ];

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4 max-w-6xl">
                <Link to="/women" className="inline-flex items-center gap-2 text-[#0f392b] hover:underline mb-6">
                    <ArrowLeft size={20} />
                    Back to Women's Category
                </Link>

                <h1 className="text-4xl font-bold text-[#0f392b] mb-4">Women's Measurement Guide</h1>
                <p className="text-gray-600 mb-8">Follow our detailed guide to take accurate measurements for blouses, kurtis, lehengas, and more.</p>

                <div className="flex flex-wrap gap-4 mb-12">
                    <button className="btn btn-primary gap-2">
                        <Download size={20} /> Download PDF Guide
                    </button>
                    <button className="btn btn-secondary gap-2">
                        <PlayCircle size={20} /> Watch Video Tutorial
                    </button>
                </div>

                {/* Blouse Measurements */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#0f392b] rounded-full flex items-center justify-center">
                            <Ruler className="text-white" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-[#0f392b]">Blouse Measurements</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src="/blouse_measurements_1765622297074.png"
                                alt="Blouse measurement diagram"
                                className="w-full rounded-lg border-2 border-gray-200"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#0f392b] mb-4">How to Measure</h3>
                            <div className="space-y-4">
                                {blouseMeasurements.map((item, i) => (
                                    <div key={i} className="border-l-4 border-[#d4af37] pl-4 py-2">
                                        <h4 className="font-bold text-gray-800 mb-1">{i + 1}. {item.name}</h4>
                                        <p className="text-gray-600 text-sm">{item.instruction}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kurti Measurements */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#0f392b] rounded-full flex items-center justify-center">
                            <Ruler className="text-white" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-[#0f392b]">Kurti Measurements</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src="/kurti_measurements_1765622313197.png"
                                alt="Kurti measurement diagram"
                                className="w-full rounded-lg border-2 border-gray-200"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#0f392b] mb-4">How to Measure</h3>
                            <div className="space-y-4">
                                {kurtiMeasurements.map((item, i) => (
                                    <div key={i} className="border-l-4 border-[#d4af37] pl-4 py-2">
                                        <h4 className="font-bold text-gray-800 mb-1">{i + 1}. {item.name}</h4>
                                        <p className="text-gray-600 text-sm">{item.instruction}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lehenga Measurements */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#0f392b] rounded-full flex items-center justify-center">
                            <Ruler className="text-white" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-[#0f392b]">Lehenga Measurements</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src="/lehenga_measurements_1765622330070.png"
                                alt="Lehenga measurement diagram"
                                className="w-full rounded-lg border-2 border-gray-200"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#0f392b] mb-4">How to Measure</h3>
                            <div className="space-y-4">
                                {lehengaMeasurements.map((item, i) => (
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
                            <span>Wear a well-fitted bra when taking bust measurements</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>Keep the measuring tape parallel to the floor for all circumference measurements</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>Don't pull the tape too tight - it should be snug but comfortable</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>For best results, have someone help you take measurements</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#d4af37] font-bold">•</span>
                            <span>Measure over light clothing or directly on skin for accuracy</span>
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

export default WomenMeasurements;
