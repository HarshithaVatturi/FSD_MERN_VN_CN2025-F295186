import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [added, setAdded] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const res = await api.get(`/item/${id}`);
            setBook(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async () => {
        if (!comment) return alert("Please enter a comment");
        try {
            await api.post(`/item/${id}/review`, {
                user: user.name,
                rating,
                comment
            });
            alert("Review submitted!");
            setComment('');
            fetchBook(); // Refresh data
        } catch (error) {
            console.error("Review error:", error);
        }
    };

    const handleAddToCart = () => {
        addToCart(book);
        setAdded(true);
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '4rem' }}>Loading details...</div>;
    if (!book) return null;

    return (
        <div style={{ padding: '4rem 2rem', paddingBottom: '8rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            <button onClick={() => navigate('/')} style={{ marginBottom: '2rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>←</span> Back to Store
            </button>

            {/* Glassmorphism Wrapper for Content */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: '4rem',
                alignItems: 'start',
                background: 'rgba(15, 15, 15, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '3rem',
                borderRadius: '24px',
                border: '1px solid var(--border-subtle)'
            }}>
                {/* Book Cover */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', background: 'var(--bg-secondary)' }}>
                    <img src={book.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800"} alt={book.title} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
                </div>

                {/* Book Info */}
                <div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.1, color: 'white' }}>{book.title}</h1>
                        <p style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', fontWeight: 500 }}>{book.author}</p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                                📅 {book.publication || 'Unknown Publisher'}
                            </span>
                            <span style={{ fontSize: '1.2rem', color: '#fbbf24' }}>
                                {'★'.repeat(Math.round(book.rating || 0))}
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>({book.reviews ? book.reviews.length : 0} reviews)</span>
                            </span>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>About the Book</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        {book.description || "No description available for this title."}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--accent-primary)', boxShadow: 'var(--accent-glow)' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Exclusive Price</p>
                            <span style={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>₹{book.price}</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
                            {added ? (
                                <button className="btn" style={{ flex: 1, background: '#10b981', color: 'white', cursor: 'default', borderRadius: '12px', fontSize: '1.2rem', border: 'none', padding: '1.2rem' }}>
                                    ✓ Added to Collection
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1, padding: '1.2rem 2rem', fontSize: '1.2rem' }}
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Review Section */}
                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Community Reviews</h3>

                        {/* Add Review Form */}
                        {user ? (
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'white' }}>Write a Review</h4>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: rating >= star ? '#fbbf24' : '#444' }}
                                        >★</button>
                                    ))}
                                </div>
                                <textarea
                                    placeholder="Share your thoughts on this book..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', marginBottom: '1rem', minHeight: '80px' }}
                                />
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                                    onClick={submitReview}
                                >Submit Review</button>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Please <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>login</button> to leave a review.</p>
                        )}

                        {book.reviews && book.reviews.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {book.reviews.map((review, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 600, color: 'white' }}>{review.user}</span>
                                            <span style={{ color: '#fbbf24' }}>{'★'.repeat(review.rating)}</span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)' }}>"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
