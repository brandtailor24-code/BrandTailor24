import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { api } from '../utils/api';

interface BookingFormData {
    items: Array<{ category: string, serviceType: string }>;
    pickupDate: string;
    pickupTime: string;
    address: string;
    name: string;
    phone: string;
    paymentMode: string;
}

const Booking: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [activeCategory, setActiveCategory] = useState<string>(''); // For UI navigation only
    const [formData, setFormData] = useState<BookingFormData>({
        items: [],
        pickupDate: '',
        pickupTime: '',
        address: '',
        name: '',
        phone: '',
        paymentMode: ''
    });

    const services: Record<string, string[]> = {
        "Custom Blouse Studio": [
            "Normal Blouse (Without Lining)",
            "Lining Blouse (Simple Neck)",
            "Design Neck (With Lining)",
            "Lehenga Blouse (Specialty Cut)",
            "Designer Pattern Blouse",
            "Machine Embroidery Blouse",
            "Handloom Embroidery Blouse"
        ],
        "Lehenga Bottoms & Skirts": [
            "Normal Lehenga Bottom",
            "Designer Flared Lehenga",
            "Simple Pattu/Silk Lehenga"
        ],
        "Salwar & Ethnic Wear": [
            "Salwar Top (Without Lining)",
            "Salwar Top (With Lining)",
            "Salwar Pant (Without Lining)",
            "Salwar Pant (With Lining)"
        ],
        "Gown Collection": [
            "Simple Gown (Without Lining)",
            "Designer Gown (With Lining)"
        ],
        "Western & Co-ord Sets": [
            "Women’s Blazer",
            "Women’s Co-ord Set"
        ],
        "Celebration Combos": [
            "Mom & Daughter Combo",
            "Birthday Combo"
        ],
        "Bridal & Wedding Packages": [
            "Wedding Gown & Blouse Set",
            "Bridal Party Bulk Order"
        ]
    };

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateStep2 = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Name validation: letters and spaces only
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name should only contain letters';
        }

        // Phone validation: exactly 10 digits
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        // Date validation: no past dates
        if (!formData.pickupDate) {
            newErrors.pickupDate = 'Date is required';
        } else {
            const selectedDate = new Date(formData.pickupDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.pickupDate = 'Please select a valid future date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleService = (category: string, item: string) => {
        const exists = formData.items.find(i => i.serviceType === item && i.category === category);
        let newItems;
        if (exists) {
            newItems = formData.items.filter(i => i.serviceType !== item || i.category !== category);
        } else {
            newItems = [...formData.items, { category, serviceType: item }];
        }
        setFormData({ ...formData, items: newItems });
    };

    const nextStep = (): void => {
        if (step === 2) {
            if (validateStep2()) {
                setStep(step + 1);
            }
        } else {
            setStep(step + 1);
        }
    };

    const prevStep = (): void => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                paymentMode: 'Pay on Delivery',
                fabricSelection: 'pickup',
                pickupDetails: {
                    address: formData.address,
                    scheduledTime: new Date(),
                    status: 'Pending'
                }
            };

            await api.post('/orders', payload);
            alert('Booking Successful! We will come to your place for measurements.');
            window.location.href = '/customer'; // Or redirect to home/success page
        } catch (err) {
            console.error('Booking failed', err);
            alert('Failed to place booking. Please try again.');
        }
    };

    const fadeIn = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="pt-24 pb-12 min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {['Service', 'Details', 'Review'].map((label, i) => (
                            <span key={i} className={`text-sm font-bold ${step > i ? 'text-[#0f392b]' : 'text-gray-400'}`}>
                                {label}
                            </span>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <motion.div
                            className="h-full bg-[#d4af37] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        ></motion.div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden min-h-[500px]">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <AnimatePresence mode='wait'>
                            {/* Step 1: Service Selection */}
                            {step === 1 && (
                                <motion.div key="step1" {...fadeIn} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[#0f392b]">Choose Your Services</h2>
                                    <p className="text-gray-600">Select one or more services from different categories.</p>

                                    {/* Category Grid */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {Object.keys(services).map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                className={`p-4 border-2 rounded-xl text-left transition-all ${activeCategory === cat ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-gray-200 hover:border-gray-300'}`}
                                                onClick={() => setActiveCategory(cat)}
                                            >
                                                <span className="font-bold text-lg block mb-1">{cat}</span>
                                                <span className="text-sm text-gray-500">
                                                    {formData.items.filter(i => i.category === cat).length} selected
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Sub-items for Active Category */}
                                    {activeCategory && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-6 border-t pt-6"
                                        >
                                            <h3 className="text-lg font-bold text-[#0f392b] mb-4">Select Items for {activeCategory}</h3>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {services[activeCategory].map(item => {
                                                    const isSelected = formData.items.some(i => i.serviceType === item && i.category === activeCategory);
                                                    return (
                                                        <button
                                                            key={item}
                                                            type="button"
                                                            className={`p-3 text-sm border rounded-lg transition-all flex justify-between items-center ${isSelected ? 'bg-[#0f392b] text-white border-[#0f392b]' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                                                            onClick={() => toggleService(activeCategory, item)}
                                                        >
                                                            <span>{item}</span>
                                                            {isSelected && <Check size={16} />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Selected Items Summary */}
                                    {formData.items.length > 0 && (
                                        <div className="bg-gray-100 p-4 rounded-xl mt-6">
                                            <h4 className="font-bold text-[#0f392b] mb-2">Total Selected Services ({formData.items.length})</h4>
                                            <ul className="text-sm space-y-1 text-gray-700">
                                                {formData.items.map((item, idx) => (
                                                    <li key={idx}>• {item.serviceType} <span className="text-gray-500 text-xs">({item.category})</span></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Step 2: Pickup & Delivery Details */}
                            {step === 2 && (
                                <motion.div key="step2" {...fadeIn} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[#0f392b]">Pickup Details</h2>
                                    <p className="text-gray-600">We will come to your place to take measurements and pick up fabric (if any).</p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text" name="name"
                                                className={`w-full p-3 border rounded-lg outline-none ${errors.name ? 'border-red-500 bg-red-50' : 'focus:ring-2 focus:ring-[#0f392b]'}`}
                                                value={formData.name} onChange={handleChange}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel" name="phone"
                                                className={`w-full p-3 border rounded-lg outline-none ${errors.phone ? 'border-red-500 bg-red-50' : 'focus:ring-2 focus:ring-[#0f392b]'}`}
                                                value={formData.phone} onChange={handleChange}
                                                placeholder="10-digit mobile number"
                                                maxLength={10}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
                                        <textarea
                                            name="address" rows={3}
                                            className={`w-full p-3 border rounded-lg outline-none ${errors.address ? 'border-red-500 bg-red-50' : 'focus:ring-2 focus:ring-[#0f392b]'}`}
                                            value={formData.address} onChange={handleChange}
                                            placeholder="Enter complete address"
                                        ></textarea>
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                                            <input
                                                type="date" name="pickupDate"
                                                className={`w-full p-3 border rounded-lg outline-none ${errors.pickupDate ? 'border-red-500 bg-red-50' : 'focus:ring-2 focus:ring-[#0f392b]'}`}
                                                value={formData.pickupDate} onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                            {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
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
                                </motion.div>
                            )}

                            {/* Step 3: Review */}
                            {step === 3 && (
                                <motion.div key="step3" {...fadeIn} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[#0f392b]">Review & Confirm</h2>

                                    <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                                        <div className="flex justify-between items-start">
                                            <span className="text-gray-600">Services:</span>
                                            <div className="text-right">
                                                {formData.items.map((item, idx) => (
                                                    <div key={idx} className="font-bold mb-1">
                                                        {item.serviceType}
                                                        <span className="block text-xs font-normal text-gray-500">{item.category}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Pickup:</span>
                                            <span className="font-bold">{formData.pickupDate}, {formData.pickupTime}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Address:</span>
                                            <span className="font-bold text-right w-1/2">{formData.address}</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-500 italic text-center">
                                                * Payment can be made at the time of delivery or pickup.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={
                                        (step === 1 && formData.items.length === 0)
                                    }
                                    className="btn btn-primary flex items-center gap-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Step <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={false}
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
