import React, { useEffect, useState } from 'react';
import { Phone, Search, Users, ClipboardList, Trash2, Shield } from 'lucide-react';

interface Inquiry {
    _id: string;
    name: string;
    phone: string;
    serviceType: string;
    message: string;
    image?: string;
    status: 'New' | 'Contacted' | 'Pickup Scheduled' | 'Completed' | 'Cancelled';
    createdAt: string;
}

interface UserData {
    _id: string;
    name: string;
    phone: string;
    role: 'user' | 'admin';
    registeredAt: string;
}

const AdminDashboard = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, totalUsers: 0 });

    // User State
    const [usersList, setUsersList] = useState<UserData[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [activeTab, setActiveTab] = useState<'inquiries' | 'users'>('inquiries');

    const token = localStorage.getItem('token');

    // Fetch Inquiries
    const fetchInquiries = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/inquiries', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setInquiries(data);
            setFilteredInquiries(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching inquiries:", error);
            setLoading(false);
        }
    };

    // Fetch Stats
    const fetchStats = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setUsersList(data);
            setLoadingUsers(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoadingUsers(false);
        }
    };

    const deleteUser = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setUsersList(usersList.filter(u => u._id !== id));
                fetchStats();
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const updateUserRole = async (id: string, currentRole: string) => {
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
                setUsersList(usersList.map(u => u._id === id ? { ...u, role: newRole as any } : u));
            }
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    useEffect(() => {
        fetchInquiries();
        fetchStats();
        fetchUsers();
    }, []);

    useEffect(() => {
        let result = inquiries;
        if (filter !== 'All') {
            result = result.filter(i => i.status === filter);
        }
        if (search) {
            result = result.filter(i =>
                i.name.toLowerCase().includes(search.toLowerCase()) ||
                i.phone.includes(search)
            );
        }
        setFilteredInquiries(result);
    }, [filter, search, inquiries]);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/inquiries/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                // Optimistic update
                setInquiries(inquiries.map(i => i._id === id ? { ...i, status: newStatus as any } : i));
                fetchStats(); // Refresh stats
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'Contacted': return 'bg-yellow-100 text-yellow-800';
            case 'Pickup Scheduled': return 'bg-purple-100 text-purple-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600">Manage inquiries and users.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center min-w-[120px]">
                            <p className="text-gray-500 text-xs uppercase tracking-wide">Total Inquiries</p>
                            <p className="text-2xl font-bold text-brand-dark">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center min-w-[120px]">
                            <p className="text-gray-500 text-xs uppercase tracking-wide">Pending</p>
                            <p className="text-2xl font-bold text-orange-500">{stats.pendingOrders}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('inquiries')}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'inquiries'
                                ? 'border-brand-dark text-brand-dark'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <ClipboardList size={18} />
                        Inquiries
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'users'
                                ? 'border-brand-dark text-brand-dark'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <Users size={18} />
                        Users Management
                    </button>
                </div>

                {activeTab === 'inquiries' ? (
                    <>
                        {/* Filters */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                                {['All', 'New', 'Contacted', 'Pickup Scheduled', 'Completed', 'Cancelled'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setFilter(s)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === s ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search name or phone..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold w-full md:w-64"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Needed</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Loading inquiries...</td>
                                            </tr>
                                        ) : filteredInquiries.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No inquiries found.</td>
                                            </tr>
                                        ) : (
                                            filteredInquiries.map((inquiry) => (
                                                <tr key={inquiry._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Phone size={12} /> {inquiry.phone}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {inquiry.serviceType}
                                                        {inquiry.image && (
                                                            <a href={inquiry.image} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-500 hover:underline mt-1">
                                                                View Design
                                                            </a>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={inquiry.message}>
                                                        {inquiry.message || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                                                            {inquiry.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <select
                                                            value={inquiry.status}
                                                            onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                                                            className="text-sm border-gray-300 rounded-md focus:ring-brand-gold focus:border-brand-gold"
                                                        >
                                                            <option value="New">New</option>
                                                            <option value="Contacted">Contacted</option>
                                                            <option value="Pickup Scheduled">Scheduled</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                        {inquiry.phone && (
                                                            <a href={`tel:${inquiry.phone}`} className="ml-3 text-brand-gold hover:text-brand-dark inline-flex items-center gap-1" title="Call Now">
                                                                <Phone size={16} />
                                                            </a>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loadingUsers ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading users...</td>
                                            </tr>
                                        ) : usersList.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No users found.</td>
                                            </tr>
                                        ) : (
                                            usersList.map((user) => (
                                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(user.registeredAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Phone size={12} /> {user.phone}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => updateUserRole(user._id, user.role)}
                                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                                            title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                                                        >
                                                            <Shield size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(user._id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
