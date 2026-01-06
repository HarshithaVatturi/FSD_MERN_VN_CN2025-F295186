import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                // Fetch orders for the logged-in user
                const res = await api.get('/order');
                setOrders(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div style={{ padding: '4rem 2rem', minHeight: '80vh', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>My Collection</h1>

            {loading ? (
                <p>Loading your library...</p>
            ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '1rem' }}>You haven't purchased any books yet.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Browse Store</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{
                            background: 'rgba(15, 15, 15, 0.6)',
                            backdropFilter: 'blur(10px)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>{order.bookTitle || "Book"}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>₹{order.price}</p>
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontWeight: 600,
                                    background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                                    color: order.status === 'Delivered' ? '#10b981' : '#eab308'
                                }}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
