import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const SellerDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('my-books'); // 'my-books', 'add-book', 'orders'
    const [books, setBooks] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch books and orders on component mount
    useEffect(() => {
        fetchBooks();
        fetchOrders();
    }, []);

    const fetchBooks = async () => {
        if (!user) return;
        try {
            const res = await api.get(`/item?seller=${user._id}`);
            setBooks(res.data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        }
    };

    const fetchOrders = async () => {
        if (!user) return;
        try {
            const res = await api.get(`/order?seller=${user._id}`);
            setOrders(res.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    const handleBookAdded = () => {
        fetchBooks();
        setActiveTab('my-books');
    };

    const handleDeleteBook = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await api.delete(`/item/${id}`);
            fetchBooks();
        } catch (error) {
            alert("Error deleting book");
        }
    };

    const totalSalesValue = orders.reduce((acc, order) => acc + order.price, 0);
    const pendingCount = orders.filter(o => o.status === 'Pending').length;

    const stats = [
        { label: 'Total Sales', value: `₹${totalSalesValue.toFixed(2)}` },
        { label: 'Books Listed', value: books.length.toString() },
        { label: 'Pending Orders', value: pendingCount.toString() }
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', background: 'var(--bg-secondary)', padding: '2rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '3rem', letterSpacing: '1px' }}>
                    Seller<span style={{ color: 'var(--accent-primary)' }}>Hub</span>
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { id: 'my-books', label: 'My Books', icon: '📚' },
                        { id: 'add-book', label: 'Add New Book', icon: '➕' },
                        { id: 'orders', label: 'Orders', icon: '📦' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: activeTab === item.id ? 'var(--accent-primary)' : 'transparent',
                                color: activeTab === item.id ? 'white' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '1rem',
                                fontWeight: 500,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            marginTop: 'auto',
                            background: 'rgba(236, 72, 153, 0.1)',
                            color: 'var(--accent-secondary)',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}>
                        ⬅ Back to Store
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Dashboard</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.name || 'Seller'}</span>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold' }}>
                            {user?.name.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{stat.label}</p>
                            <p style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', padding: '2rem', minHeight: '500px' }}>
                    {activeTab === 'my-books' && <BooksList books={books} onDelete={handleDeleteBook} />}
                    {activeTab === 'add-book' && <AddBookForm onBookAdded={handleBookAdded} />}
                    {activeTab === 'orders' && <OrdersList orders={orders} />}
                </div>
            </main>
        </div>
    );
};

// Sub-components for Seller Dashboard

const BooksList = ({ books, onDelete }) => (
    <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>My Library</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
            <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1rem' }}>Title</th>
                    <th style={{ padding: '1rem' }}>Author</th>
                    <th style={{ padding: '1rem' }}>Price</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{book.title}</td>
                        <td style={{ padding: '1rem' }}>{book.author}</td>
                        <td style={{ padding: '1rem' }}>₹{book.price}</td>
                        <td style={{ padding: '1rem' }}>
                            <button onClick={() => onDelete(book._id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}>Delete Listing</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const AddBookForm = ({ onBookAdded }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        image: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/item', { ...formData, seller: user._id });
            alert("Book added successfully!");
            onBookAdded();
        } catch (error) {
            alert("Error adding book");
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Add New Book</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Book Title</label>
                        <input name="title" onChange={handleChange} required type="text" placeholder="Enter title" style={dashboardInputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Author</label>
                        <input name="author" onChange={handleChange} required type="text" placeholder="Enter author" style={dashboardInputStyle} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price (₹)</label>
                        <input name="price" onChange={handleChange} required type="number" placeholder="499" style={dashboardInputStyle} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
                    <textarea name="description" onChange={handleChange} rows="4" placeholder="Book summary..." style={dashboardInputStyle}></textarea>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Cover Image URL</label>
                    <input name="image" onChange={handleChange} type="url" placeholder="https://..." style={dashboardInputStyle} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>Publish Book</button>
            </form>
        </div>
    );
};

const OrdersList = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const res = await axios.get(`http://localhost:8000/order?seller=${user._id}`);
                setOrders(res.data);
            } catch (error) {
                console.error("Failed to fetch orders");
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>All Orders</h3>
            {orders.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No orders found.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{order.bookTitle}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Sold to: <span style={{ color: 'white' }}>{order.customerName}</span> ({order.address})
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>₹{order.price}</p>
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '999px',
                                    background: 'rgba(74, 222, 128, 0.1)',
                                    color: '#4ade80'
                                }}>{order.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const dashboardInputStyle = {
    width: '100%',
    padding: '1rem',
    background: 'var(--bg-primary)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none'
};

export default SellerDashboard;
