import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { LayoutDashboard, ShoppingBag, Users, LogOut, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Placeholder components
const DashboardStats = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/api/admin/stats');
                if (res.ok) {
                    setStats(await res.json());
                }
            } catch (err) {
                console.error("Error loading stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading stats...</div>;
    if (!stats) return <div className="p-8 text-center text-red-500">Failed to load stats</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                        <h3 className="text-3xl font-bold text-[#0f392b] mt-2">{stats.totalOrders}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <ShoppingBag size={20} />
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Pending</p>
                        <h3 className="text-3xl font-bold text-[#d4af37] mt-2">{stats.pendingOrders}</h3>
                    </div>
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                        <Clock size={20} />
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-[#0f392b] mt-2">₹{stats.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                        <TrendingUp size={20} />
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Active Users</p>
                        <h3 className="text-3xl font-bold text-[#0f392b] mt-2">{stats.totalUsers}</h3>
                    </div>
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                        <Users size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrdersTable = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/api/admin/orders');
            if (res.ok) {
                setOrders(await res.json());
            }
        } catch (err) {
            console.error("Error loading orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        if (!confirm(`Update status to ${newStatus}?`)) return;
        try {
            const res = await api.patch(`/api/admin/orders/${id}`, { status: newStatus });
            if (res.ok) {
                fetchOrders(); // Refresh
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            alert('Error updating status');
        }
    };

    const deleteOrder = async (id: string) => {
        if (!confirm('Are you sure you want to delete this order?')) return;
        try {
            const res = await api.delete(`/api/admin/orders/${id}`);
            if (res.ok) {
                fetchOrders();
            } else {
                alert('Failed to delete order');
            }
        } catch (err) {
            alert('Error deleting order');
        }
    };

    if (loading) return <div className="text-center py-8">Loading orders...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Order ID</th>
                            <th className="p-4 font-medium text-gray-500">Customer</th>
                            <th className="p-4 font-medium text-gray-500">Service</th>
                            <th className="p-4 font-medium text-gray-500">Amount</th>
                            <th className="p-4 font-medium text-gray-500">Status</th>
                            <th className="p-4 font-medium text-gray-500">Date</th>
                            <th className="p-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-[#0f392b]">{order.orderId}</td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{order.customerName || order.name}</div>
                                    <div className="text-xs text-gray-400">{order.phone}</div>
                                </td>
                                <td className="p-4 text-gray-600">{order.category} - {order.serviceType}</td>
                                <td className="p-4 font-medium">₹{order.price || '-'}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Ready' ? 'bg-blue-100 text-blue-700' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <select
                                        className="text-sm border rounded p-1 mr-2 outline-none focus:border-[#d4af37]"
                                        value={order.status}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                    >
                                        <option value="Received">Received</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Ready">Ready</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UsersTable = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/api/admin/users');
            if (res.ok) {
                setUsers(await res.json());
            }
        } catch (err) {
            console.error("Error loading users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return;
        try {
            const res = await api.delete(`/api/admin/users/${id}`);
            if (res.ok) {
                fetchUsers(); // Refresh list
            } else {
                alert('Failed to delete user');
            }
        } catch (err) {
            alert('Error deleting user');
        }
    };

    if (loading) return <div className="text-center py-8">Loading users...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Name</th>
                            <th className="p-4 font-medium text-gray-500">Phone</th>
                            <th className="p-4 font-medium text-gray-500">Role</th>
                            <th className="p-4 font-medium text-gray-500">Joined Date</th>
                            <th className="p-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                                <td className="p-4 text-gray-600">{user.phone}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">
                                    {new Date(user.registeredAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        disabled={user.role === 'admin'} // Prevent deleting admins
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Check admin access (basic check)
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userStr);
        if (user.role !== 'admin') {
            alert("Access Denied: Admins Only");
            navigate('/track');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0f392b] text-white fixed h-full z-10 hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#d4af37]">Brand Tailor</h2>
                    <p className="text-white/60 text-xs mt-1">Admin Panel</p>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-[#d4af37]' : 'text-white/70 hover:bg-white/5'}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-white/10 text-[#d4af37]' : 'text-white/70 hover:bg-white/5'}`}
                    >
                        <ShoppingBag size={20} />
                        <span>Orders</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-white/10 text-[#d4af37]' : 'text-white/70 hover:bg-white/5'}`}
                    >
                        <Users size={20} />
                        <span>Users</span>
                    </button>
                </nav>

                <div className="absolute bottom-6 px-4 w-full">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                    <p className="text-gray-500">Welcome back, Admin</p>
                </div>

                {activeTab === 'overview' && (
                    <div className="animate-fade-in">
                        <DashboardStats />
                        <h2 className="text-xl font-bold text-[#0f392b] mb-4">Recent Orders</h2>
                        <OrdersTable />
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="animate-fade-in">
                        <OrdersTable />
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="animate-fade-in">
                        <UsersTable />
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
