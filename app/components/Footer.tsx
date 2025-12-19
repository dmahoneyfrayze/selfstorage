'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            padding: '80px 0 40px',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '60px',
                    marginBottom: '80px'
                }}>
                    {/* Brand Column */}
                    <div>
                        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, display: 'block', marginBottom: '24px' }}>
                            <span style={{ color: 'white' }}>Gordon</span>
                            <span style={{ color: 'var(--primary)', marginLeft: '4px' }}>Storage</span>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                            Premium autonomous self storage solutions.
                            Secure, climate-controlled, and accessible 24/7 through our digital portal.
                        </p>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <p>21 Twin City Crossroads</p>
                            <p>Rosslyn, ON P7K 0C5</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '24px' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { name: 'Available Units', path: '/units' },
                                { name: 'Book Now', path: '/booking' },
                                { name: 'FAQ', path: '/faq' },
                                { name: 'Contact Support', path: '/contact' }
                            ].map(item => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className="footer-link"
                                        style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Main Site */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '24px' }}>Contact</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)' }}>
                            <li>
                                <span style={{ display: 'block', color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '4px' }}>Email</span>
                                sales@gordontrailersales.ca
                            </li>
                            <li>
                                <span style={{ display: 'block', color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '4px' }}>Phone</span>
                                (807) 939-2631
                            </li>
                        </ul>

                        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Looking for Trailers?</p>
                            <a
                                href="https://gordontrailersales.ca"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'white', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                            >
                                Visit Main Site
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} Gordon Trailer Sales & Rentals. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .footer-link:hover {
                    color: var(--primary) !important;
                }
            `}</style>
        </footer>
    )
}
