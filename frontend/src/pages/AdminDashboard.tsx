import React, { useEffect, useState } from 'react';
import { 
    Phone, Users, Trash2, Shield, Calendar, 
    TrendingUp, CheckCircle2, MessageSquare, MapPin, Search, 
    Star, Clock, UserCheck, Play, Check, X, ShieldAlert
} from 'lucide-react';

interface OrderItem {
    category: string;
    serviceType: string;
    price?: number;
}

interface Order {
    _id: string;
    orderId: string;
    customerName: string;
    phone: string;
    status: 'Received' | 'In Progress' | 'Ready' | 'Completed' | 'Cancelled';
    items: OrderItem[];
    address?: string;
    pickupDate?: string;
    pickupTime?: string;
    paymentMode?: string;
    createdAt: string;
}

interface UserData {
    _id: string;
    name: string;
    phone: string;
    role: 'user' | 'admin';
    registeredAt: string;
}

interface ReviewData {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
    createdAt: string;
}

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'registered' | 'bookings' | 'production' | 'completed'>('bookings');
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, totalUsers: 0 });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');

    // Fetch dashboard data
    const fetchData = async () => {
        setLoading(true);
        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            
            // Fetch stats
            const statsRes = await fetch('http://localhost:5000/api/admin/stats', { headers });
            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }

            // Fetch users
            const usersRes = await fetch('http://localhost:5000/api/admin/users', { headers });
            if (usersRes.ok) {
                const usersData = await usersRes.json();
                setUsers(usersData);
            }

            // Fetch bookings/orders
            const ordersRes = await fetch('http://localhost:5000/api/orders', { headers });
            if (ordersRes.ok) {
                const ordersData = await ordersRes.json();
                setOrders(ordersData);
            }

            // Fetch reviews
            const reviewsRes = await fetch('http://localhost:5000/api/reviews');
            if (reviewsRes.ok) {
                const reviewsData = await reviewsRes.json();
                setReviews(reviewsData);
            }
        } catch (error) {
            console.error("Failed to load dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Update order status
    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus as any } : o));
                // Refresh stats
                const statsRes = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (statsRes.ok) {
                    setStats(await statsRes.json());
                }
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    // User management actions
    const handleToggleAdmin = async (id: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
        try {
            const res = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) {
                setUsers(users.map(u => u._id === id ? { ...u, role: newRole as any } : u));
            }
        } catch (error) {
            console.error("Error updating role", error);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setUsers(users.filter(u => u._id !== id));
                setStats({ ...stats, totalUsers: Math.max(0, stats.totalUsers - 1) });
            }
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    // Filters and categories
    const getJustRegistered = () => {
        // Filter users who signed up but do not have any orders
        return users.filter(user => {
            const hasOrder = orders.some(o => o.phone === user.phone);
            return !hasOrder && user.role !== 'admin';
        }).filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.phone.includes(searchQuery));
    };

    const getBookedOrders = () => {
        // Orders newly received (Pending pickup/confirmation)
        return orders.filter(o => o.status === 'Received')
            .filter(o => o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.phone.includes(searchQuery));
    };

    const getInProductionOrders = () => {
        // Orders in progress or ready
        return orders.filter(o => ['In Progress', 'Ready'].includes(o.status))
            .filter(o => o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.phone.includes(searchQuery));
    };

    const getCompletedOrders = () => {
        // Completed or Cancelled orders
        return orders.filter(o => ['Completed', 'Cancelled'].includes(o.status))
            .filter(o => o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.phone.includes(searchQuery));
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Received': return 'bg-blue-500/10 text-blue-300 border border-blue-500/20';
            case 'In Progress': return 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20';
            case 'Ready': return 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
            case 'Completed': return 'bg-green-500/10 text-green-300 border border-green-500/20';
            case 'Cancelled': return 'bg-red-500/10 text-red-300 border border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-300 border border-gray-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#072016] to-[#030d09] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-[#d4af37] font-playfair mb-2">Boutique Control Hub</h1>
                        <p className="text-gray-400 text-sm">Monitor customers, tailor workflows, and process order pipelines.</p>
                    </div>

                    {/* Stats Panel */}
                    <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[100px]">
                            <Users className="w-5 h-5 mx-auto text-[#d4af37] mb-1" />
                            <span className="block text-[10px] uppercase tracking-wider text-gray-400">Total Users</span>
                            <span className="text-xl font-bold text-white">{stats.totalUsers}</span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[100px]">
                            <Calendar className="w-5 h-5 mx-auto text-[#d4af37] mb-1" />
                            <span className="block text-[10px] uppercase tracking-wider text-gray-400">All Orders</span>
                            <span className="text-xl font-bold text-white">{stats.totalOrders}</span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center min-w-[100px]">
                            <Clock className="w-5 h-5 mx-auto text-orange-400 mb-1" />
                            <span className="block text-[10px] uppercase tracking-wider text-gray-400">Active</span>
                            <span className="text-xl font-bold text-orange-400">{stats.pendingOrders}</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#d4af37]/60 px-4 mb-2">Customer Pipeline</h3>
                        
                        <button
                            onClick={() => { setActiveTab('registered'); setSearchQuery(''); }}
                            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all ${activeTab === 'registered' ? 'bg-[#d4af37] text-[#072016] font-bold shadow-lg scale-[1.02]' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                        >
                            <div className="flex items-center gap-3">
                                <UserCheck className="w-5 h-5" />
                                <span>Just Registered</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'registered' ? 'bg-[#072016] text-[#d4af37]' : 'bg-white/10 text-gray-300'}`}>
                                {getJustRegistered().length}
                            </span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('bookings'); setSearchQuery(''); }}
                            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all ${activeTab === 'bookings' ? 'bg-[#d4af37] text-[#072016] font-bold shadow-lg scale-[1.02]' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                        >
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5" />
                                <span>New Bookings</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'bookings' ? 'bg-[#072016] text-[#d4af37]' : 'bg-white/10 text-gray-300'}`}>
                                {getBookedOrders().length}
                            </span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('production'); setSearchQuery(''); }}
                            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all ${activeTab === 'production' ? 'bg-[#d4af37] text-[#072016] font-bold shadow-lg scale-[1.02]' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                        >
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5" />
                                <span>In Production</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'production' ? 'bg-[#072016] text-[#d4af37]' : 'bg-white/10 text-gray-300'}`}>
                                {getInProductionOrders().length}
                            </span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('completed'); setSearchQuery(''); }}
                            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all ${activeTab === 'completed' ? 'bg-[#d4af37] text-[#072016] font-bold shadow-lg scale-[1.02]' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Completed & Done</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'completed' ? 'bg-[#072016] text-[#d4af37]' : 'bg-white/10 text-gray-300'}`}>
                                {getCompletedOrders().length}
                            </span>
                        </button>
                    </div>

                    {/* Content Workspace */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search Bar */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by customer name or phone number..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none text-white focus:border-[#d4af37]/60 transition-colors placeholder-gray-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button onClick={fetchData} className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-sm font-medium rounded-xl border border-white/15 transition-all">
                                Refresh
                            </button>
                        </div>

                        {/* List Area */}
                        {loading ? (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center text-gray-400">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
                                Loading data...
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* TAB: JUST REGISTERED */}
                                {activeTab === 'registered' && (
                                    getJustRegistered().length === 0 ? (
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center text-gray-400">
                                            No newly registered customers without bookings.
                                        </div>
                                    ) : (
                                        getJustRegistered().map(user => (
                                            <div key={user._id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                                                    <p className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                                                        <Phone className="w-4 h-4 text-[#d4af37]" /> {user.phone}
                                                    </p>
                                                    <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">
                                                        Joined: {new Date(user.registeredAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex gap-3">
                                                    <a href={`tel:${user.phone}`} className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-sm flex items-center gap-1.5 transition-colors">
                                                        <Phone className="w-4 h-4" /> Call
                                                    </a>
                                                    <button onClick={() => handleToggleAdmin(user._id, user.role)} className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 rounded-xl text-sm flex items-center gap-1.5 transition-colors">
                                                        <Shield className="w-4 h-4" /> Make Admin
                                                    </button>
                                                    <button onClick={() => handleDeleteUser(user._id)} className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )
                                )}

                                {/* TAB: NEW BOOKINGS */}
                                {activeTab === 'bookings' && (
                                    getBookedOrders().length === 0 ? (
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center text-gray-400">
                                            No new bookings pending pickup.
                                        </div>
                                    ) : (
                                        getBookedOrders().map(order => (
                                            <div key={order._id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#d4af37]/30 p-6 rounded-2xl space-y-4 transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs text-[#d4af37] font-mono font-semibold bg-[#d4af37]/10 px-2.5 py-1 rounded-full border border-[#d4af37]/20 uppercase tracking-wider mb-2 inline-block">
                                                            {order.orderId}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-white">{order.customerName}</h3>
                                                        <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                                            <Phone className="w-4 h-4 text-[#d4af37]" /> {order.phone}
                                                        </p>
                                                    </div>
                                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <div className="border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1.5">Tailoring Services Requested</h4>
                                                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                                            {order.items && order.items.map((item, idx) => (
                                                                <li key={idx}>
                                                                    <span className="font-semibold text-white">{item.serviceType}</span> ({item.category})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="text-sm">
                                                            <span className="text-gray-400 block font-bold text-xs uppercase tracking-wider">Preferred Pickup Date/Slot</span>
                                                            <span className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                                                                <Clock className="w-4 h-4 text-[#d4af37]" /> {order.pickupDate || '-'} ({order.pickupTime || '-'})
                                                            </span>
                                                        </div>
                                                        <div className="text-sm">
                                                            <span className="text-gray-400 block font-bold text-xs uppercase tracking-wider">Address</span>
                                                            <span className="text-white flex items-start gap-1.5 mt-1">
                                                                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                                                <span className="leading-tight">{order.address || 'Pickup requested'}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border-t border-white/10 pt-4 flex flex-wrap justify-between items-center gap-3">
                                                    <div className="text-xs text-gray-500">
                                                        Booked on: {new Date(order.createdAt).toLocaleString()}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <a href={`tel:${order.phone}`} className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-sm flex items-center gap-1.5 transition-colors">
                                                            <Phone className="w-4 h-4" /> Call Client
                                                        </a>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(order._id, 'In Progress')}
                                                            className="px-5 py-2 bg-[#d4af37] text-[#072016] font-bold rounded-xl text-sm flex items-center gap-1.5 hover:bg-white transition-all shadow-md"
                                                        >
                                                            <Play className="w-4 h-4 fill-current" /> Start Production
                                                        </button>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(order._id, 'Cancelled')}
                                                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-1 transition-colors"
                                                        >
                                                            <X className="w-4 h-4" /> Cancel Booking
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                )}

                                {/* TAB: IN PRODUCTION */}
                                {activeTab === 'production' && (
                                    getInProductionOrders().length === 0 ? (
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center text-gray-400">
                                            No orders currently in progress or ready.
                                        </div>
                                    ) : (
                                        getInProductionOrders().map(order => (
                                            <div key={order._id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 p-6 rounded-2xl space-y-4 transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs text-[#d4af37] font-mono font-semibold bg-[#d4af37]/10 px-2.5 py-1 rounded-full border border-[#d4af37]/20 uppercase tracking-wider mb-2 inline-block">
                                                            {order.orderId}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-white">{order.customerName}</h3>
                                                        <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                                            <Phone className="w-4 h-4 text-[#d4af37]" /> {order.phone}
                                                        </p>
                                                    </div>
                                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>

                                                {/* Stitch progress representation */}
                                                <div className="py-2">
                                                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                                                        <span>Cutting & Design</span>
                                                        <span>Stitching</span>
                                                        <span>Ready for Delivery</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full transition-all duration-500 ${order.status === 'Ready' ? 'w-full bg-purple-500' : 'w-1/2 bg-yellow-500'}`}></div>
                                                    </div>
                                                </div>

                                                <div className="border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Tailoring Items</h4>
                                                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                                            {order.items && order.items.map((item, idx) => (
                                                                <li key={idx}>
                                                                    <span className="font-semibold text-white">{item.serviceType}</span> ({item.category})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400 block font-bold text-xs uppercase tracking-wider">Address details</span>
                                                        <span className="text-white text-sm flex items-start gap-1.5 mt-1 leading-tight">
                                                            <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                                            {order.address || 'Address not listed'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="border-t border-white/10 pt-4 flex flex-wrap justify-between items-center gap-3">
                                                    <span className="text-xs text-gray-500">
                                                        Current phase: <strong className="text-white">{order.status}</strong>
                                                    </span>
                                                    <div className="flex gap-2">
                                                        {order.status === 'In Progress' ? (
                                                            <button 
                                                                onClick={() => handleUpdateStatus(order._id, 'Ready')}
                                                                className="px-5 py-2 bg-purple-600 text-white font-bold rounded-xl text-sm flex items-center gap-1.5 hover:bg-purple-500 transition-colors shadow-md border border-purple-500/20"
                                                            >
                                                                <Check className="w-4 h-4" /> Mark Ready
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                onClick={() => handleUpdateStatus(order._id, 'Completed')}
                                                                className="px-5 py-2 bg-[#d4af37] text-[#072016] font-bold rounded-xl text-sm flex items-center gap-1.5 hover:bg-white transition-all shadow-md"
                                                            >
                                                                <Check className="w-4 h-4" /> Complete & Deliver
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                )}

                                {/* TAB: COMPLETED & DONE */}
                                {activeTab === 'completed' && (
                                    getCompletedOrders().length === 0 && reviews.length === 0 ? (
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center text-gray-400">
                                            No completed orders or reviews found.
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {/* Completed Orders List */}
                                            {getCompletedOrders().length > 0 && (
                                                <div className="space-y-4">
                                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37]/60 px-2">Completed Deliveries</h3>
                                                    {getCompletedOrders().map(order => (
                                                        <div key={order._id} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all">
                                                            <div>
                                                                <span className="text-xs text-[#d4af37] font-mono font-semibold bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/20 uppercase mb-2 inline-block">
                                                                    {order.orderId}
                                                                </span>
                                                                <h3 className="text-lg font-bold text-white">{order.customerName}</h3>
                                                                <p className="text-gray-400 text-xs mt-1">
                                                                    Completed on: {new Date(order.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                                                    {order.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Reviews list */}
                                            {reviews.length > 0 && (
                                                <div className="space-y-4 pt-4 border-t border-white/10">
                                                    <h3 className="text-sm font-bold uppercase tracking-widest text-pink-400 px-2 flex items-center gap-1">
                                                        <MessageSquare className="w-4 h-4" /> Customer Reviews & Ratings
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {reviews.map(review => (
                                                            <div key={review._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <h4 className="font-bold text-white leading-tight">{review.name}</h4>
                                                                        <span className="text-xs text-gray-500">{review.date || 'Review'}</span>
                                                                    </div>
                                                                    <div className="flex text-[#d4af37]">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'opacity-25'}`} />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm text-gray-300 italic leading-relaxed">
                                                                    "{review.comment}"
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
