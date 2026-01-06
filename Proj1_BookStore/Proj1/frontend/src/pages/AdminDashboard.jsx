import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [orders, setOrders] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [statsData, setStatsData] = useState({ totalUsers: 0, totalSellers: 0 });

    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchStats();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/order');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/user');
            setUsersList(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await api.get('/user/stats');
            setStatsData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to remove this user?")) return;
        try {
            await api.delete(`/user/${id}`);
            fetchUsers();
            fetchStats();
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangeRole = async (id, newRole) => {
        try {
            await api.put(`/user/${id}/role`, { role: newRole });
            fetchUsers();
            fetchStats();
        } catch (err) {
            console.error(err);
        }
    };

    const totalRevenue = orders.reduce((acc, order) => acc + (order.price || 0), 0);
    const recentOrdersCount = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return orderDate > dayAgo;
    }).length;

    const stats = [
        { label: 'Total Users', value: statsData.totalUsers, change: '+12%' },
        { label: 'Active Sellers', value: statsData.totalSellers, change: '+5%' },
        { label: 'Total Revenue', value: `₹${totalRevenue.toFixed(0)}`, change: '+23%' },
        { label: 'Orders (24h)', value: recentOrdersCount.toString(), change: '+2%' },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
            <aside style={{ width: '260px', background: 'var(--bg-secondary)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '3rem', color: 'white' }}>
                    Admin<span style={{ color: 'var(--accent-secondary)' }}>Panel</span>
                </h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                        { id: 'overview', label: 'Overview', icon: '📊' },
                        { id: 'users', label: 'Manage Users', icon: '👥' },
                        { id: 'sellers', label: 'Manage Sellers', icon: '🏪' },
                        { id: 'orders', label: 'All Orders', icon: '📦' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                textAlign: 'left',
                                padding: '1rem',
                                borderRadius: '10px',
                                background: activeTab === item.id ? 'var(--accent-primary)' : 'transparent',
                                color: activeTab === item.id ? 'white' : 'var(--text-secondary)',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span>{item.icon}</span> {item.label}
                        </button>
                    ))}
                </nav>
                <button
                    onClick={logout}
                    style={{
                        marginTop: 'auto',
                        padding: '1rem',
                        background: 'rgba(229, 9, 20, 0.1)',
                        color: 'var(--accent-primary)',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}>
                    Logout
                </button>
            </aside>

            <main style={{ flex: 1, padding: '3rem' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Admin Overview</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user?.name || 'Administrator'}.</p>
                </header>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.label}</p>
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                <span style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</span>
                                <span style={{
                                    fontSize: '0.875rem',
                                    color: stat.change.startsWith('+') ? '#4ade80' : '#f87171',
                                    background: stat.change.startsWith('+') ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                }}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {activeTab === 'overview' && <RecentActivity orders={orders} />}
                    {activeTab === 'users' && <UsersTable users={usersList} onDelete={handleDeleteUser} onRoleChange={handleChangeRole} />}
                    {activeTab === 'sellers' && <SellersTable users={usersList} onDelete={handleDeleteUser} />}
                    {activeTab === 'orders' && <OrdersTable orders={orders} />}
                </div>
            </main>
        </div>
    );
};

const RecentActivity = ({ orders }) => (
    <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>System Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No recent logs.</p> :
                orders.slice(0, 5).map((order, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '100px' }}>
                            {new Date(order.createdAt).toLocaleTimeString()}
                        </span>
                        <span>New Order: <span style={{ color: 'white' }}>{order.bookTitle}</span> by {order.customerName}</span>
                    </div>
                ))}
        </div>
    </div>
);

const UsersTable = ({ users, onDelete, onRoleChange }) => (
    <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Registered Users</h3>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead style={{ color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <tr>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Email</th>
                    <th style={{ padding: '1rem' }}>Role</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>No users found</td></tr> :
                    users.map(u => (
                        <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1rem' }}>{u.name}</td>
                            <td style={{ padding: '1rem' }}>{u.email}</td>
                            <td style={{ padding: '1rem' }}><span style={{ color: u.role === 'admin' ? 'var(--accent-primary)' : '#4ade80', textTransform: 'capitalize' }}>{u.role}</span></td>
                            <td style={{ padding: '1rem' }}>
                                {u.role === 'user' && (
                                    <button
                                        onClick={() => onRoleChange(u._id, 'seller')}
                                        style={{ color: 'var(--accent-primary)', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                                    >Make Seller</button>
                                )}
                                <button
                                    onClick={() => onDelete(u._id)}
                                    style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
);

const SellersTable = ({ users, onDelete }) => {
    const sellers = users.filter(u => u.role === 'seller');
    return (
        <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Seller Accounts</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead style={{ color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <tr>
                        <th style={{ padding: '1rem' }}>Store Name</th>
                        <th style={{ padding: '1rem' }}>Owner</th>
                        <th style={{ padding: '1rem' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.length === 0 ? <tr><td colSpan="3" style={{ padding: '1rem', textAlign: 'center' }}>No sellers found</td></tr> :
                        sellers.map(s => (
                            <tr key={s._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem' }}>{s.name}'s Books</td>
                                <td style={{ padding: '1rem' }}>{s.name}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => onDelete(s._id)}
                                        style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >Delete Hub</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div >
    );
};

const OrdersTable = ({ orders }) => (
    <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Global Orders</h3>
        {orders.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No orders found.</p> :
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead style={{ color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <tr>
                        <th style={{ padding: '1rem' }}>Book</th>
                        <th style={{ padding: '1rem' }}>Customer</th>
                        <th style={{ padding: '1rem' }}>Price</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1rem' }}>{order.bookTitle}</td>
                            <td style={{ padding: '1rem' }}>{order.customerName}</td>
                            <td style={{ padding: '1rem' }}>₹{order.price}</td>
                            <td style={{ padding: '1rem' }}><span style={{ color: '#ec4899', background: 'rgba(236,72,153,0.1)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{order.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>}
    </div>
);

export default AdminDashboard;
