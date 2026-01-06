import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('user'); // 'user', 'seller', 'admin'
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin
                ? { email, password }
                : { name, email, password, role };

            const res = await api.post(endpoint, payload);

            if (res.data) {
                login(res.data);
                const userRole = res.data.role;
                if (userRole === 'seller') {
                    navigate('/seller');
                } else if (userRole === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('Auth Error:', err);
            const msg = err.response?.data?.message || err.message || 'Connection failed. Please check if the server is running.';
            setError(msg);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            padding: '2rem'
        }}>
            <div style={{
                background: 'rgba(10, 10, 10, 0.95)',
                backgroundImage: "url('/comic_bg.png')",
                backgroundBlendMode: 'overlay',
                backgroundSize: '400px',
                padding: '2.5rem',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '480px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Mode Toggle Tabs */}
                <div style={{ display: 'flex', marginBottom: '2.5rem', background: '#1a1a1a', borderRadius: '12px', padding: '4px' }}>
                    <button
                        onClick={() => { setIsLogin(true); setError(''); }}
                        style={{
                            flex: 1, padding: '0.8rem', borderRadius: '10px', border: 'none',
                            background: isLogin ? 'var(--accent-primary)' : 'transparent',
                            color: isLogin ? 'white' : 'var(--text-secondary)',
                            fontWeight: 700, cursor: 'pointer', transition: '0.3s'
                        }}
                    >Login</button>
                    <button
                        onClick={() => { setIsLogin(false); setError(''); }}
                        style={{
                            flex: 1, padding: '0.8rem', borderRadius: '10px', border: 'none',
                            background: !isLogin ? 'var(--accent-primary)' : 'transparent',
                            color: !isLogin ? 'white' : 'var(--text-secondary)',
                            fontWeight: 700, cursor: 'pointer', transition: '0.3s'
                        }}
                    >Sign Up</button>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem', fontWeight: 800 }}>
                        {isLogin ? 'Welcome Back' : 'Create New Account'}
                    </h2>

                    {error && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.85rem', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {!isLogin && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>FULL NAME</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="name@carrier.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PASSWORD</label>
                            <input
                                type="password"
                                placeholder="Min 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={inputStyle}
                            />
                        </div>

                        {!isLogin && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ACCOUNT TYPE</label>
                                <div style={{ display: 'flex', gap: '0.5rem', background: 'black', padding: '4px', borderRadius: '10px' }}>
                                    {['user', 'seller', 'admin'].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setRole(r)}
                                            style={{
                                                flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none',
                                                background: role === r ? 'var(--accent-primary)' : 'transparent',
                                                color: role === r ? 'white' : 'var(--text-secondary)',
                                                cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.7rem',
                                                fontWeight: 800, transition: '0.3s'
                                            }}
                                        >{r}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px' }}>
                            {isLogin ? 'SIGN IN' : 'GET STARTED'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
};

export default Auth;
