'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const navItems = [
        { name: 'Overview', path: '/dashboard', icon: '🏠' },
        { name: 'Billing & Receipts', path: '/dashboard/billing', icon: '💳' },
        { name: 'Settings & Alerts', path: '/dashboard/settings', icon: '⚙️' },
    ]

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <div className="container" style={{ padding: '40px 24px', display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '32px' }}>
                {/* Sidebar */}
                <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #eee' }}>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--deep-navy)' }}>John Doe</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Unit #B-104</div>
                        </div>

                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {navItems.map(item => {
                                const isActive = pathname === item.path
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 16px',
                                            borderRadius: '8px',
                                            color: isActive ? 'var(--primary-blue)' : 'var(--text-main)',
                                            background: isActive ? 'rgba(31, 91, 192, 0.05)' : 'transparent',
                                            fontWeight: isActive ? 600 : 400,
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <span>{item.icon}</span>
                                        {item.name}
                                    </Link>
                                )
                            })}

                            <Link
                                href="/login"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    color: 'var(--error)',
                                    marginTop: '16px',
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                <span>🚪</span>
                                Sign Out
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* content */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
