import React, { useState } from 'react';
import { Search, Package, CheckCircle, Truck, Scissors } from 'lucide-react';
import { api } from '../utils/api';

interface Order {
    id: string;
    status: string;
    pickupDate: string;
}

const CustomerPortal: React.FC = () => {
    const [orderId, setOrderId] = useState<string>('');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setOrder(null);

        try {
            // Updated to use api utility and new protected endpoint
            const res = await api.get(`/api/orders/${orderId}`);
            if (!res.ok) throw new Error("Order not found");
            const data = await res.json();
            setOrder(data);
        } catch (err) {
            setError("Order not found or access denied. Please check your Order ID/Phone and ensure you are logged in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <div className="container mx-auto px-4 pt-24 pb-12">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h1 className="text-3xl font-bold text-[#0f392b] mb-4">Track Your Order</h1>
                    <p className="text-gray-600 mb-8">Enter your Order ID or Phone Number.</p>

                    <form onSubmit={handleSearch} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Order ID / Phone Number"
                            className="flex-1 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f392b] outline-none shadow-sm"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary px-8">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                {/* Order Status Display */}
                {loading && <p className="text-center text-gray-500">Searching...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {order && (
                    <div className="glass-card p-8 animate-fade-in">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[#0f392b]">Order #{order.id}</h2>
                                <p className="text-gray-600">Expected Delivery: <span className="font-bold text-[#d4af37]">{order.pickupDate}</span></p>
                            </div>
                            <span className="px-4 py-2 bg-[#d4af37]/20 text-[#0f392b] font-bold rounded-full">
                                {order.status}
                            </span>
                        </div>

                        {/* Detailed Status Steps */}
                        <div className="relative flex justify-between mb-12">
                            {[
                                { label: 'Pickup', icon: <Truck size={16} /> },
                                { label: 'Stitching', icon: <Scissors size={16} /> },
                                { label: 'QC Check', icon: <CheckCircle size={16} /> },
                                { label: 'Delivery', icon: <Package size={16} /> }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center relative z-10 w-1/4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${i <= 1 ? 'bg-[#0f392b] border-[#0f392b] text-white' : 'bg-white border-gray-300 text-gray-300'
                                        }`}>
                                        {step.icon}
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${i <= 1 ? 'text-[#0f392b]' : 'text-gray-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-0" />
                            <div className="absolute top-5 left-0 h-0.5 bg-[#0f392b] -z-0 w-1/3" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerPortal;
