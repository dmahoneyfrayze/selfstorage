'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link href="/" className="nav-logo">
                    Gordon<span style={{ color: 'var(--primary-blue)' }}>Storage</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links">
                    <Link href="/units" className="nav-link">Units</Link>
                    <Link href="/faq" className="nav-link">FAQ</Link>
                    <Link href="/contact" className="nav-link">Contact</Link>
                    <Link href="/login" className="nav-link">Sign In</Link>
                    <Link href="/booking" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                        Book Now
                    </Link>
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
                    <Link href="/units" className="mobile-link" onClick={() => setIsOpen(false)}>Units</Link>
                    <Link href="/faq" className="mobile-link" onClick={() => setIsOpen(false)}>FAQ</Link>
                    <Link href="/contact" className="mobile-link" onClick={() => setIsOpen(false)}>Contact</Link>
                    <Link href="/login" className="mobile-link" onClick={() => setIsOpen(false)}>Sign In</Link>
                    <Link href="/booking" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', padding: '16px 40px' }}>
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
