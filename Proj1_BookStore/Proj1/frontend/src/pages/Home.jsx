import React, { useEffect, useState } from 'react';
import api from '../api';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchBooks();
    }, [search]); // Re-fetch on search change

    const fetchBooks = async () => {
        try {
            const url = search
                ? `/item?search=${encodeURIComponent(search)}`
                : '/item';
            const response = await api.get(url);
            if (response.data) {
                setBooks(response.data);
            }
        } catch (err) {
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);
        }
    };

    const otherBooks = books.slice(4);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>

            {/* Cinematic Hero */}
            <section style={{
                height: '90vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border-subtle)'
            }}>
                {/* Background Video/Image Gradient */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(circle at 70% 30%, #1a1a1a 0%, #050505 70%)' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
                            {user ? 'Member Access' : 'Premium Literature'}
                        </span>
                        <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
                            {user ? `Welcome Back, ${user.name.split(' ')[0]}.` : 'Discover Your'} <br />
                            <span style={{ background: 'linear-gradient(to right, #fff, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {user ? 'Your Collection.' : 'Next Obsession.'}
                            </span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                            {user
                                ? "We've curated some special reads just for you based on your recent activity."
                                : "A curated layout of the world's finest books. Explore our extensive collection of finance, thriller, and self-mastery."
                            }
                        </p>

                        {/* Interactive Search Bar */}
                        <div style={{ position: 'relative', marginBottom: '3rem', maxWidth: '500px' }}>
                            <input
                                type="text"
                                placeholder="Search by title, author, or genre..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.5rem',
                                    paddingLeft: '3.5rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                            <span style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', opacity: 0.5 }}>🔍</span>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button
                                className="btn btn-primary"
                                style={{ padding: '1rem 2.5rem' }}
                                onClick={() => document.getElementById('trending').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Start Browsing
                            </button>
                            <button
                                className="btn btn-outline"
                                style={{ padding: '1rem 2.5rem' }}
                                onClick={() => document.getElementById('collections').scrollIntoView({ behavior: 'smooth' })}
                            >
                                View Collections
                            </button>
                        </div>
                    </div>

                    {/* Hero Visual - Floating Book */}
                    <div className="animate-fade-in" style={{ position: 'relative', animationDelay: '0.2s', display: 'none', width: '400px', '@media (min-width: 1024px)': { display: 'block' } }}>
                        {/* We can use CSS to show this only on desktop if we had media queries, for now inline simple block */}
                        <div style={{ animation: 'float 6s ease-in-out infinite' }}>
                            <img
                                src="https://covers.openlibrary.org/b/id/12693998-L.jpg"
                                alt="Feature"
                                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Trust Bar */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', padding: '2rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                    <span>★ 50+ New Arrivals This Week</span>
                    <span>✓ Free Shipping Worldwide</span>
                    <span>⚡ Secure 256-bit Checkout</span>
                </div>
            </div>

            {/* Trending Section */}
            <section id="trending" className="container" style={{ marginTop: '6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Trending Now</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Highly rated by our community this week.</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {books.filter(b => b.rating >= 4.8).slice(0, 4).map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </section>

            {/* Curated Collections Section */}
            <section id="collections" className="container" style={{ marginTop: '8rem', marginBottom: '4rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Curated Collections</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Hand-picked sets for every mood.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {/* Collection 1: Finance */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        borderRadius: '16px',
                        padding: '3rem',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid var(--border-subtle)',
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <span style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', fontSize: '0.8rem' }}>Master Your Wealth</span>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 1rem', lineHeight: 1.1 }}>The Investor's <br /> Toolkit</h3>
                            <button className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', width: 'fit-content' }} onClick={() => document.getElementById('finance').scrollIntoView({ behavior: 'smooth' })}>Explorer Series</button>
                        </div>
                        <img src="https://covers.openlibrary.org/b/id/12693998-L.jpg" style={{ position: 'absolute', right: '-50px', bottom: '-50px', width: '250px', opacity: 0.5, transform: 'rotate(-15deg)' }} />
                    </div>

                    {/* Collection 2: Horror */}
                    <div style={{
                        background: 'linear-gradient(135deg, #450a0a 0%, #000000 100%)',
                        borderRadius: '16px',
                        padding: '3rem',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid var(--border-subtle)',
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <span style={{ color: '#ef4444', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', fontSize: '0.8rem' }}>Late Night Reads</span>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 1rem', lineHeight: 1.1 }}>Stephen King's <br /> Nightmares</h3>
                            <button className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', width: 'fit-content', borderColor: '#ef4444', color: '#ef4444' }} onClick={() => document.getElementById('horror').scrollIntoView({ behavior: 'smooth' })}>Dare to Read</button>
                        </div>
                        <img src="https://covers.openlibrary.org/b/id/10582030-L.jpg" style={{ position: 'absolute', right: '-40px', bottom: '-60px', width: '220px', opacity: 0.6, transform: 'rotate(15deg)' }} />
                    </div>

                    {/* Collection 3: Self Help */}
                    <div style={{
                        background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
                        borderRadius: '16px',
                        padding: '3rem',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid var(--border-subtle)',
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <span style={{ color: '#10b981', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', fontSize: '0.8rem' }}>New Year, New You</span>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 1rem', lineHeight: 1.1 }}>Atomic Habits <br /> & More</h3>
                            <button className="btn btn-outline" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', width: 'fit-content', borderColor: '#10b981', color: '#10b981' }} onClick={() => document.getElementById('selfhelp').scrollIntoView({ behavior: 'smooth' })}>Improve Now</button>
                        </div>
                        <img src="https://covers.openlibrary.org/b/id/10505143-L.jpg" style={{ position: 'absolute', right: '-50px', bottom: '-40px', width: '240px', opacity: 0.5, transform: 'rotate(-10deg)' }} />
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            {['Finance', 'Self Help', 'Horror', 'RomCom'].map(category => {
                const categoryBooks = books.filter(b => b.category === category).slice(0, 4);
                if (categoryBooks.length === 0) return null;

                return (
                    <section key={category} id={category.toLowerCase().replace(' ', '')} className="container" style={{ marginTop: '6rem' }}>
                        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ width: '40px', height: '2px', background: 'var(--accent-primary)' }}></span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{category}</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
                            {categoryBooks.map(book => (
                                <BookCard key={book._id} book={book} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default Home;
