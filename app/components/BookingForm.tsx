'use client'

import { useState } from 'react'

export function BookingForm({ unitId, unitPrice }: { unitId: string, unitPrice: number }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')
        setErrorMessage('')

        try {
            const res = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, unitId })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Booking failed')
            }

            setStatus('success')
        } catch (err: any) {
            console.error(err)
            setStatus('error')
            setErrorMessage(err.message)
        }
    }

    if (status === 'success') {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎉</div>
                <h2 style={{ marginBottom: '16px', color: 'var(--success)' }}>Booking Initiated!</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                    Please check your email <strong>{formData.email}</strong> to sign the contract and finalize your booking.
                </p>
                <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.9rem' }}>Didn't receive it? Check spam or contact support.</p>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>First Name</label>
                    <input
                        type="text"
                        required
                        className="input"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                    />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Last Name</label>
                    <input
                        type="text"
                        required
                        className="input"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                    />
                </div>
            </div>

            <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                <input
                    type="email"
                    required
                    className="input"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                />
            </div>

            <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Phone Number</label>
                <input
                    type="tel"
                    required
                    className="input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                />
            </div>

            {status === 'error' && (
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '8px' }}>
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn-primary"
                style={{ marginTop: '16px', padding: '16px', fontSize: '1.1rem' }}
            >
                {status === 'submitting' ? 'Processing...' : `Reserve and Pay $${unitPrice}`}
            </button>
        </form>
    )
}
