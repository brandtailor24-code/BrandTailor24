import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Plus, Search, Package, CheckCircle, Clock, User, Ruler, DollarSign, Calendar } from 'lucide-react';

interface Order {
    id: string;
    name?: string;
    customerName?: string;
    phone: string;
    address: string;
    status: string;
    serviceType?: string;
    pickupDate?: string;
    deliveryDate?: string;
    measurements?: Record<string, string | number>;
    instructions?: string;
    assignedTailor?: string;
    paymentMode?: string;
}

const TailorDashboard: React.FC = () => {
    const [viewMode, setViewMode] = useState<'admin' | 'tailor'>('admin');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Mock Tailors List
    const tailors = ['Ramesh', 'Suresh', 'Priya', 'Anita'];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/orders');
            const data = await res.json();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string): Promise<void> => {
        // Optimistic update
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));

        try {
            await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
        } catch (err) {
            console.error("Failed to update status", err);
            fetchOrders(); // Revert on error
        }
    };

    const assignTailor = async (id: string, tailorName: string): Promise<void> => {
        // Optimistic update
        setOrders(orders.map(o => o.id === id ? { ...o, assignedTailor: tailorName } : o));

        // In a real app, you'd send this to the backend
        console.log(`Assigned order ${id} to ${tailorName}`);
    };

    const filteredOrders = viewMode === 'tailor'
        ? orders.filter(o => o.status !== 'Completed') // Tailors see active work
        : orders; // Admins see all

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-12">

                {/* Header & Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0f392b]">
                            {viewMode === 'admin' ? 'Admin Dashboard' : 'Tailor Workspace'}
                        </h1>
                        <p className="text-gray-500">
                            {viewMode === 'admin' ? 'Manage orders, payments, and assignments' : 'View your daily tasks and measurements'}
                        </p>
                    </div>

                    <div className="flex bg-white rounded-lg p-1 shadow-sm border">
                        <button
                            className={`px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'admin' ? 'bg-[#0f392b] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setViewMode('admin')}
                        >
                            Admin View
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'tailor' ? 'bg-[#0f392b] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setViewMode('tailor')}
                        >
                            Tailor View
                        </button>
                    </div>
                </div>

                {/* Stats Cards (Admin Only) */}
                {viewMode === 'admin' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-gray-500 text-sm mb-1">Total Orders</div>
                            <div className="text-2xl font-bold text-[#0f392b]">{orders.length}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-gray-500 text-sm mb-1">Pending</div>
                            <div className="text-2xl font-bold text-orange-500">{orders.filter(o => o.status === 'Received').length}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-gray-500 text-sm mb-1">In Progress</div>
                            <div className="text-2xl font-bold text-blue-500">{orders.filter(o => o.status === 'In Progress').length}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-gray-500 text-sm mb-1">Completed</div>
                            <div className="text-2xl font-bold text-green-500">{orders.filter(o => o.status === 'Completed').length}</div>
                        </div>
                    </div>
                )}

                {/* Orders List */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* List Column */}
                    <div className="lg:col-span-1 space-y-4 h-[calc(100vh-300px)] overflow-y-auto pr-2">
                        {loading ? <p>Loading...</p> : filteredOrders.map(order => (
                            <div
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedOrder?.id === order.id ? 'border-[#d4af37] bg-[#d4af37]/5 shadow-md' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-[#0f392b]">{order.id}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-orange-100 text-orange-800'
                                        }`}>{order.status}</span>
                                </div>
                                <h3 className="font-medium mb-1">{order.serviceType || 'Custom Order'}</h3>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <User size={14} /> {order.name || order.customerName}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <Calendar size={14} /> Due: {order.pickupDate || order.deliveryDate}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Details Column */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-fit min-h-[500px]">
                        {selectedOrder ? (
                            <div className="animate-fade-in">
                                <div className="flex justify-between items-start border-b pb-6 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#0f392b] mb-2">Order Details</h2>
                                        <p className="text-gray-500">ID: {selectedOrder.id} • Placed on {new Date().toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-1">Status</div>
                                        <select
                                            className="p-2 border rounded-lg font-medium outline-none focus:ring-2 focus:ring-[#0f392b]"
                                            value={selectedOrder.status}
                                            onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                            disabled={viewMode === 'tailor' && selectedOrder.status === 'Completed'}
                                        >
                                            <option value="Received">Received</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Ready">Ready</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h3 className="font-bold text-[#0f392b] mb-4 flex items-center gap-2">
                                            <User size={18} /> Customer Info
                                        </h3>
                                        <div className="space-y-2 text-gray-600 bg-gray-50 p-4 rounded-xl">
                                            <p><span className="font-medium">Name:</span> {selectedOrder.name || selectedOrder.customerName}</p>
                                            <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                                            <p><span className="font-medium">Address:</span> {selectedOrder.address}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-[#0f392b] mb-4 flex items-center gap-2">
                                            <Ruler size={18} /> Measurements & Notes
                                        </h3>
                                        <div className="space-y-2 text-gray-600 bg-gray-50 p-4 rounded-xl">
                                            {selectedOrder.measurements && typeof selectedOrder.measurements === 'object' ? (
                                                Object.entries(selectedOrder.measurements).map(([key, val]) => (
                                                    <p key={key} className="capitalize"><span className="font-medium">{key}:</span> {val}</p>
                                                ))
                                            ) : (
                                                <p>Standard Sizing / To be measured</p>
                                            )}
                                            {selectedOrder.instructions && (
                                                <p className="mt-2 text-sm italic border-t pt-2">"{selectedOrder.instructions}"</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 border-t pt-6">
                                    {viewMode === 'admin' && (
                                        <div>
                                            <h3 className="font-bold text-[#0f392b] mb-4">Assign Tailor</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {tailors.map(t => (
                                                    <button
                                                        key={t}
                                                        onClick={() => assignTailor(selectedOrder.id, t)}
                                                        className={`px-3 py-1 rounded-full text-sm border transition-all ${selectedOrder.assignedTailor === t ? 'bg-[#0f392b] text-white border-[#0f392b]' : 'border-gray-300 hover:border-[#0f392b]'}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="font-bold text-[#0f392b] mb-4 flex items-center gap-2">
                                            <DollarSign size={18} /> Payment Info
                                        </h3>
                                        <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl border border-green-100">
                                            <span className="font-medium text-green-800">{selectedOrder.paymentMode || 'COD'}</span>
                                            <span className="text-sm text-green-600">Payment Pending</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <Package size={48} className="mb-4 opacity-50" />
                                <p>Select an order to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TailorDashboard;
