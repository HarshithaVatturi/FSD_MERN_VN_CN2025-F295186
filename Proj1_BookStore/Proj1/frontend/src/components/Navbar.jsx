import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout } = useAuth();

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1.2rem 0',
            zIndex: 1000,
            background: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                    BOOK<span style={{ color: 'var(--accent-primary)' }}>STORE</span>.
                </Link>

                <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                    <Link to="/" style={{ color: 'white', transition: 'color 0.2s' }}>Discover</Link>
                    <a href="#trending" style={{ transition: 'color 0.2s' }}>Trending</a>
                    <a href="#collections" style={{ transition: 'color 0.2s' }}>Collections</a>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {user ? (
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', height: '40px' }} className="nav-profile">
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Hi, {user.name.split(' ')[0]}</span>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold' }}>
                                {user.name.charAt(0)}
                            </div>
                            {/* Simple Dropdown for Logout */}
                            <div className="profile-dropdown" style={{
                                position: 'absolute', top: '100%', right: 0,
                                paddingTop: '10px',
                                display: 'none', flexDirection: 'column', minWidth: '180px',
                                zIndex: 1100
                            }}>
                                <div style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    {user.role === 'admin' && (
                                        <Link to="/admin" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', padding: '0.5rem 0', display: 'block', fontWeight: 600 }}>Admin Panel</Link>
                                    )}
                                    {user.role === 'seller' && (
                                        <Link to="/seller" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', padding: '0.5rem 0', display: 'block', fontWeight: 600 }}>Seller Hub</Link>
                                    )}
                                    <Link to="/my-orders" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '0.5rem 0', display: 'block' }}>My Orders</Link>
                                    <button onClick={logout} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', padding: '0.5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '0.5rem' }}>Logout</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Log In</Link>
                    )}

                    <Link to="/cart" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                        Cart {cart.length > 0 && `(${cart.length})`}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
