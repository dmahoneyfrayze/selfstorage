'use client'

import { useState } from 'react'

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ marginBottom: '8px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Settings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage alerts and account preferences</p>
            </header>

            {/* Notifications */}
            <div className="card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Notifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Email Receipts</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Receive invoices via email</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                            style={{ height: '24px', width: '24px', cursor: 'pointer', accentColor: 'var(--primary-blue)' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>SMS Security Alerts</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Get notified when your gate code is used</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                            style={{ height: '24px', width: '24px', cursor: 'pointer', accentColor: 'var(--primary-blue)' }}
                        />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--error)' }}>Danger Zone</h3>
                <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
                    Need to move out? You can schedule a move-out date here.
                </p>
                <button
                    className="btn"
                    style={{
                        background: 'white',
                        border: '1px solid var(--error)',
                        color: 'var(--error)'
                    }}
                >
                    Schedule Move-Out
                </button>
            </div>
        </div>
    )
}
