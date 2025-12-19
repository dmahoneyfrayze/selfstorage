'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link href="/" className="nav-logo">
                    Gordon<span style={{ color: 'var(--primary-blue)' }}>Storage</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links">
                    {!user ? (
                        <>
                            <Link href="/units" className="nav-link">Units</Link>
                            <Link href="/faq" className="nav-link">FAQ</Link>
                            <Link href="/contact" className="nav-link">Contact</Link>
                            <Link href="/login" className="nav-link">Sign In</Link>
                            <Link href="/booking" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                                Book Now
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" className="nav-link" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Dashboard</Link>
                            <Link href="/dashboard/rent-unit" className="nav-link">My Units</Link>
                            <Link href="/dashboard/settings" className="nav-link">Settings</Link>
                            <button
                                onClick={logout}
                                className="nav-link"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 'inherit',
                                    fontFamily: 'inherit'
                                }}>
                                Sign Out
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Menu Dropdown */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    {!user ? (
                        <>
                            <Link href="/units" className="mobile-link" onClick={() => setIsOpen(false)}>Units</Link>
                            <Link href="/faq" className="mobile-link" onClick={() => setIsOpen(false)}>FAQ</Link>
                            <Link href="/contact" className="mobile-link" onClick={() => setIsOpen(false)}>Contact</Link>
                            <Link href="/login" className="mobile-link" onClick={() => setIsOpen(false)}>Sign In</Link>
                            <Link href="/booking" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', padding: '16px 40px' }}>
                                Book Now
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" className="mobile-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link href="/dashboard/rent-unit" className="mobile-link" onClick={() => setIsOpen(false)}>My Units</Link>
                            <Link href="/dashboard/settings" className="mobile-link" onClick={() => setIsOpen(false)}>Settings</Link>
                            <button
                                onClick={() => { logout(); setIsOpen(false); }}
                                className="mobile-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                                Sign Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
