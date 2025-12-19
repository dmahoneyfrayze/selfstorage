'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass"
            style={{ position: 'sticky', top: 0, width: '100%', zIndex: 50 }}
        >
            <div className="container" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Gordon
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ color: 'var(--primary)' }}
                    >
                        Storage
                    </motion.span>
                </Link>

                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    {[
                        { name: 'Units', path: '/units' },
                        { name: 'FAQ', path: '/faq' },
                        { name: 'Contact', path: '/contact' }
                    ].map((item, i) => (
                        <Link key={item.path} href={item.path} style={{ position: 'relative' }}>
                            <motion.span
                                className="nav-link"
                                style={{
                                    color: pathname === item.path ? 'var(--primary)' : 'var(--text-muted)',
                                    transition: 'color 0.2s',
                                    fontWeight: 500
                                }}
                                whileHover={{ color: 'var(--text-main)' }}
                            >
                                {item.name}
                            </motion.span>
                            {pathname === item.path && (
                                <motion.div
                                    layoutId="underline"
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        bottom: -4,
                                        height: '2px',
                                        background: 'var(--primary)',
                                        borderRadius: '2px'
                                    }}
                                />
                            )}
                        </Link>
                    ))}

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/booking" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
                            Book Now
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    )
}
