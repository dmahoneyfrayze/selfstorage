'use client'

import Link from 'next/link'
import { useState } from 'react'
import { joinWaitlist } from '../actions'

export default function Footer() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

    async function handleSubmit(formData: FormData) {
        setStatus('submitting')
        await joinWaitlist(formData)
        setStatus('success')
        setTimeout(() => setStatus('idle'), 3000)
    }

    return (
        <footer style={{
            background: 'var(--deep-navy)',
            color: 'white',
            borderTop: '1px solid var(--border)',
            padding: '80px 0 40px',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '40px',
                    marginBottom: '60px'
                }}>
                    {/* Brand Column */}
                    <div>
                        <Link href="/" style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px', color: 'white' }}>
                            Gordon<span style={{ color: 'var(--primary-blue)' }}>Storage</span>
                        </Link>
                        <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: '24px' }}>
                            Premium autonomous self storage solutions.
                            Secure, climate-controlled, and accessible 24/7 through our digital portal.
                        </p>
                        <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                            <p>21 Twin City Crossroads</p>
                            <p>Rosslyn, ON P7K 0C5</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: 600, color: 'white' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Link href="/units" style={{ color: '#ccc' }}>Available Units</Link>
                            <Link href="/booking" style={{ color: '#ccc' }}>Book Now</Link>
                            <Link href="/faq" style={{ color: '#ccc' }}>FAQ</Link>
                            <Link href="/contact" style={{ color: '#ccc' }}>Contact Support</Link>
                        </div>
                    </div>

                    {/* Contact & Main Site */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: 600, color: 'white' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <a href="mailto:sales@gordontrailersales.ca" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc' }}>
                                📧 sales@gordontrailersales.ca
                            </a>
                            <a href="tel:807-939-2631" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc' }}>
                                📞 (807) 939-2631
                            </a>
                        </div>

                        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: 600, color: 'white' }}>Looking for Trailers?</h4>
                            <p style={{ color: '#ccc', marginBottom: '24px' }}>
                                Visit our main dealership for trailers, parts, and service.
                            </p>
                            <a
                                href="https://gordontrailersales.ca"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ padding: '12px 24px', fontSize: '0.9rem', width: 'fit-content' }}
                            >
                                Visit Main Site →
                            </a>
                        </div>
                    </div>

                    {/* Waitlist - Now in grid */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: 600, color: 'white' }}>Stay Updated</h4>
                        <p style={{ color: '#ccc', marginBottom: '16px', fontSize: '0.9rem' }}>
                            Join our waitlist to get notified when new units become available.
                        </p>

                        {status === 'success' ? (
                            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                ✓ You're on the list!
                            </div>
                        ) : (
                            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    style={{
                                        padding: '12px',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="btn btn-primary"
                                    style={{ width: '100%', fontSize: '0.9rem', padding: '10px' }}
                                >
                                    {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                    color: '#888',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} Gordon Trailer Sales & Rentals. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <Link href="/privacy" style={{ color: '#888' }}>Privacy Policy</Link>
                        <Link href="/terms" style={{ color: '#888' }}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
