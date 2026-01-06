import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--bg-secondary)', paddingTop: '4rem', paddingBottom: '2rem', marginTop: 'auto' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
                            BOOK<span style={{ color: 'var(--accent-primary)' }}>STORE</span>
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Your one-stop destination for knowledge, adventure, and inspiration. Discover the world through words.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="/" className="footer-link">Home</a></li>
                            <li><a href="/cart" className="footer-link">My Cart</a></li>
                            <li><a href="/login" className="footer-link">Seller Login</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>Customer Care</h4>
                        <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>FAQ</li>
                            <li>Shipping Policy</li>
                            <li>Returns & Refunds</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>Newsletter</h4>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Subscribe for latest updates and offers.</p>
                        <div style={{ display: 'flex' }}>
                            <input type="email" placeholder="Your email" style={{
                                padding: '0.75rem',
                                borderRadius: '8px 0 0 8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                outline: 'none',
                                flex: 1
                            }} />
                            <button style={{
                                background: 'var(--accent-primary)',
                                color: 'white',
                                border: 'none',
                                padding: '0 1rem',
                                borderRadius: '0 8px 8px 0',
                                cursor: 'pointer'
                            }}>Go</button>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    © 2026 Bookstore Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
