'use client'

import { motion } from 'framer-motion'

export default function ContactPage() {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '800px', margin: '0 auto' }}
                >
                    <h1 className="text-gradient" style={{ marginBottom: '24px', textAlign: 'center' }}>Contact Us</h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '60px', fontSize: '1.25rem' }}>
                        Have questions about our autonomous storage units? We're here to help.
                    </p>

                    <div className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
                        <div style={{ display: 'grid', gap: '32px' }}>
                            <div>
                                <h3 style={{ color: 'white', marginBottom: '8px' }}>Visit Us</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                    Gordon Trailer Sales & Rentals<br />
                                    21 Twin City Crossroads<br />
                                    Rosslyn, ON P7K 0C5
                                </p>
                            </div>

                            <div>
                                <h3 style={{ color: 'white', marginBottom: '8px' }}>Get in Touch</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                    Phone: (807) 939-2631<br />
                                    Email: sales@gordontrailersales.ca
                                </p>
                            </div>

                            <div>
                                <h3 style={{ color: 'white', marginBottom: '8px' }}>Hours</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                    <strong>Facility Access:</strong> 24/7 (Autonomous)<br />
                                    <strong>Office Support:</strong> Mon-Fri 9am - 5pm
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
