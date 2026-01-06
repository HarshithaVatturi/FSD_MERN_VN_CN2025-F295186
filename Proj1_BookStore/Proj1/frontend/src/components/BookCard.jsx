import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/book/${book._id}`)}
            style={{
                background: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
            }}
            className="book-card"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
        >
            <div style={{
                height: '340px',
                overflow: 'hidden',
                position: 'relative',
                background: '#151515',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <img
                    src={book.image}
                    alt={book.title}
                    style={{
                        height: '100%',
                        width: 'auto',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05) translateY(-5px)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1) translateY(0)'}
                />
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', lineHeight: 1.4, margin: 0 }}>{book.title}</h3>
                    <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>₹{book.price}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{book.author}</p>

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.85rem', padding: '0.6rem' }}>View Details</button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
