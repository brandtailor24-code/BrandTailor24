import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Scissors, Shirt, Package } from 'lucide-react';

interface BookingFormData {
    category: string;
    serviceType: string;
    fabric: string;
    addons: string[];
    measurements: string;
    pickupDate: string;
    pickupTime: string;
    address: string;
    name: string;
    phone: string;
    paymentMode: string;
}

interface Addon {
    name: string;
    price: number;
}

const Booking: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<BookingFormData>({
        category: '',
        serviceType: '',
        fabric: 'own',
        addons: [],
        measurements: '',
        pickupDate: '',
        pickupTime: '',
        address: '',
        name: '',
        phone: '',
        paymentMode: ''
    });

    const services: Record<string, string[]> = {
        Men: ['Formal Shirt', 'Casual Shirt', 'Trousers', 'Sherwani', 'Kurta'],
        Women: ['Blouse', 'Kurti', 'Lehenga', 'Salwar Suit', 'Saree Fall'],
        Wedding: ['Groom Package', 'Bride Package', 'Family Package']
    };

    const addonsList: Addon[] = [
        { name: 'Aari Work', price: 500 },
        { name: 'Maggam Work', price: 1200 },
        { name: 'Lining Cloth', price: 150 },
        { name: 'Designer Tassels', price: 100 },
        { name: 'Padded Cups', price: 200 },
        { name: 'Invisible Zip', price: 50 }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddonToggle = (addon: string): void => {
        if (formData.addons.includes(addon)) {
            setFormData({ ...formData, addons: formData.addons.filter(a => a !== addon) });
        } else {
            setFormData({ ...formData, addons: [...formData.addons, addon] });
        }
    };

    const nextStep = (): void => setStep(step + 1);
    const prevStep = (): void => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    status: 'Received',
                    orderDate: new Date().toISOString()
                })
            });

            if (res.ok) {
                alert("Booking Confirmed! Order ID: #" + Math.floor(Math.random() * 10000));
                window.location.href = '/';
            } else {
                alert("Failed to book. Please try again.");
            }
        } catch (err) {
            console.error("Booking error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {['Service', 'Fabric', 'Add-ons', 'Details', 'Payment'].map((label, i) => (
                            <span key={i} className={`text-sm font-bold ${step > i ? 'text-[#0f392b]' : 'text-gray-400'}`}>
                                {label}
                            </span>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-[#d4af37] rounded-full transition-all duration-300"
                            style={{ width: `${(step / 5) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Service Selection */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-[#0f392b]">Choose Your Service</h2>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {Object.keys(services).map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            className={`p-4 border-2 rounded-xl text-left transition-all ${formData.category === cat ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-gray-200 hover:border-gray-300'}`}
                                            onClick={() => setFormData({ ...formData, category: cat, serviceType: '' })}
                                        >
                                            <span className="font-bold text-lg block mb-1">{cat}</span>
                                            <span className="text-sm text-gray-500">Select for {cat}</span>
                                        </button>
                                    ))}
                                </div>

                                {formData.category && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Specific Item</label>
                                        <div className="grid md:grid-cols-3 gap-3">
                                            {services[formData.category].map(item => (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    className={`p-3 text-sm border rounded-lg transition-all ${formData.serviceType === item ? 'bg-[#0f392b] text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                                                    onClick={() => setFormData({ ...formData, serviceType: item })}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Fabric Selection */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-[#0f392b]">Fabric Selection</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div
                                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.fabric === 'own' ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-gray-200'}`}
                                        onClick={() => setFormData({ ...formData, fabric: 'own' })}
                                    >
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#0f392b]">
                                                <Scissors />
                                            </div>
                                            <h3 className="font-bold text-lg">I have my own fabric</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm pl-16">We will pick it up along with your measurements.</p>
                                    </div>

                                    <div
                                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.fabric === 'buy' ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-gray-200'}`}
                                        onClick={() => setFormData({ ...formData, fabric: 'buy' })}
                                    >
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#0f392b]">
                                                <Shirt />
                                            </div>
                                            <h3 className="font-bold text-lg">Buy from Brand Tailore</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm pl-16">Choose from our premium catalog during consultation.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Add-ons */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-[#0f392b]">Customize with Add-ons</h2>
                                <p className="text-gray-600">Enhance your outfit with our premium extras.</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {addonsList.map((addon, i) => (
                                        <div
                                            key={i}
                                            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${formData.addons.includes(addon.name) ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-gray-200'}`}
                                            onClick={() => handleAddonToggle(addon.name)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.addons.includes(addon.name) ? 'bg-[#d4af37] border-[#d4af37]' : 'border-gray-300'}`}>
                                                    {formData.addons.includes(addon.name) && <Check size={14} className="text-white" />}
                                                </div>
                                                <span className="font-medium">{addon.name}</span>
                                            </div>
                                            <span className="text-[#0f392b] font-bold">+₹{addon.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Delivery & Details */}
                        {step === 4 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-[#0f392b]">Pickup & Delivery Details</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text" name="name" required
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none"
                                            value={formData.name} onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel" name="phone" required
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none"
                                            value={formData.phone} onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
                                    <textarea
                                        name="address" rows={3} required
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none"
                                        value={formData.address} onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                                        <input
                                            type="date" name="pickupDate" required
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none"
                                            value={formData.pickupDate} onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                                        <select
                                            name="pickupTime" required
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0f392b] outline-none"
                                            value={formData.pickupTime} onChange={handleChange}
                                        >
                                            <option value="">Select Time Slot</option>
                                            <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                                            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                                            <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Payment */}
                        {step === 5 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-[#0f392b]">Review & Payment</h2>

                                <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service:</span>
                                        <span className="font-bold">{formData.serviceType} ({formData.category})</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Fabric:</span>
                                        <span className="font-bold">{formData.fabric === 'own' ? 'Customer Fabric' : 'Store Fabric'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Pickup:</span>
                                        <span className="font-bold">{formData.pickupDate}, {formData.pickupTime}</span>
                                    </div>
                                    {formData.addons.length > 0 && (
                                        <div className="border-t pt-3 mt-3">
                                            <span className="text-gray-600 block mb-2">Add-ons:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.addons.map(a => (
                                                    <span key={a} className="bg-[#d4af37]/10 text-[#0f392b] px-2 py-1 rounded text-sm font-medium">{a}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Payment Method</label>
                                    <div className="space-y-3">
                                        {['UPI (GPay/PhonePe)', 'Credit/Debit Card', 'Cash on Delivery'].map(mode => (
                                            <label key={mode} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                                                <input
                                                    type="radio" name="paymentMode" value={mode}
                                                    className="w-5 h-5 text-[#0f392b] focus:ring-[#0f392b]"
                                                    onChange={handleChange}
                                                    checked={formData.paymentMode === mode}
                                                />
                                                <span className="ml-3 font-medium">{mode}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-10 pt-6 border-t">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="btn btn-outline flex items-center gap-2 px-6"
                                >
                                    <ChevronLeft size={20} /> Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < 5 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={
                                        (step === 1 && !formData.serviceType) ||
                                        (step === 4 && (!formData.name || !formData.phone || !formData.address || !formData.pickupDate))
                                    }
                                    className="btn btn-primary flex items-center gap-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Step <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!formData.paymentMode}
                                    className="btn btn-primary flex items-center gap-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm Booking <Check size={20} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
