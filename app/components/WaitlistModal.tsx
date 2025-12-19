'use client'

import { useState } from 'react'

interface WaitlistModalProps {
    unitType: string
    isOpen: boolean
    onClose: () => void
}

export function WaitlistModal({ unitType, isOpen, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, unitType })
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Failed to join')

            setStatus('success')
            setMessage(data.message)
            setTimeout(() => {
                onClose()
                setStatus('idle')
                setEmail('')
                setMessage('')
            }, 3000)

        } catch (err: any) {
            setStatus('error')
            setMessage(err.message)
        }
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                background: 'var(--surface)', padding: '32px', borderRadius: '16px',
                width: '90%', maxWidth: '400px', border: '1px solid var(--border)'
            }} onClick={e => e.stopPropagation()}>
                <h3 style={{ marginBottom: '16px' }}>Join Waitlist</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    Get notified when a <strong>{unitType}</strong> unit becomes available.
                </p>

                {status === 'success' ? (
                    <div style={{ color: 'var(--success)', textAlign: 'center', padding: '20px' }}>
                        ✓ {message}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{
                                width: '100%', padding: '12px', borderRadius: '8px',
                                border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)',
                                color: 'white', marginBottom: '16px'
                            }}
                        />
                        {status === 'error' && <p style={{ color: 'var(--error)', marginBottom: '16px' }}>{message}</p>}

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                            <button type="submit" disabled={status === 'submitting'} className="btn btn-primary" style={{ flex: 1 }}>
                                {status === 'submitting' ? '...' : 'Notify Me'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
