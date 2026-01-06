import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateQty } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleCheckout = async () => {
        const name = user ? user.name : prompt("Enter your name for checkout:");
        if (!name) return;
        const address = prompt("Enter your delivery address:");
        if (!address) return;

        try {
            for (const item of cart) {
                await api.post('/order', {
                    bookId: item._id,
                    bookTitle: item.title,
                    price: item.price * item.qty,
                    address: address,
                    seller: item.seller
                });
            }
            alert(`Order placed successfully! Total: ₹${total.toFixed(2)}`);
            clearCart();
            navigate('/my-orders');
        } catch (error) {
            alert("Error placing order. Please try again.");
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', color: 'white', minHeight: '90vh' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>Your Bag <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>({cart.length} items)</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: cart.length > 0 ? '1fr 350px' : '1fr', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>Your bag is empty.</p>
                            <Link to="/" className="btn btn-primary">Start Browsing</Link>
                        </div>
                    ) : cart.map(item => (
                        <div key={item._id} style={{ display: 'flex', gap: '1.5rem', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', position: 'relative' }}>
                            <img src={item.image} alt={item.title} style={{ width: '100px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.author}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹{item.price}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.2rem 0.5rem' }}>
                                        <button onClick={() => updateQty(item._id, item.qty - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>-</button>
                                        <span>{item.qty}</span>
                                        <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>+</button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item._id)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>✕</button>
                        </div>
                    ))}
                </div>

                {cart.length > 0 && (
                    <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', height: 'fit-content', position: 'sticky', top: '100px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Summary</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                                <span style={{ color: '#4ade80' }}>FREE</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem' }}>
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary" onClick={handleCheckout} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Proceed to Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
