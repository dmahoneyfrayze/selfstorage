'use client'

import { cancelBooking } from '@/app/actions'
import { useState } from 'react'

export function BookingCard({ booking }: { booking: any }) {
    const [isCancelling, setIsCancelling] = useState(false)

    async function handleCancel() {
        if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return

        setIsCancelling(true)
        const result = await cancelBooking(booking.id)
        if (!result.success) {
            alert('Failed to cancel booking: ' + result.error)
            setIsCancelling(false)
        }
    }

    return (
        <div className="card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Unit {booking.unit.name}</h3>
                <span style={{
                    background: booking.status === 'CONFIRMED' ? '#dcfce7' : '#fee2e2',
                    color: booking.status === 'CONFIRMED' ? '#166534' : '#991b1b',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                }}>
                    {booking.status}
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>Size</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--deep-navy)' }}>{booking.unit.size}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Monthly Rate</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>${booking.unit.price.toFixed(2)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Next Payment</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Jan 1, 2026</div> {/* Mocked for now */}
                </div>
                <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Gate Code</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700 }}>* 4829 #</div> {/* Mocked */}
                </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eee', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                    disabled={isCancelling}
                    className="btn btn-outline"
                    style={{ fontSize: '0.9rem', padding: '8px 16px', color: 'var(--error)', borderColor: 'var(--error)' }}
                    onClick={handleCancel}
                >
                    {isCancelling ? 'Cancelling...' : 'Cancel Rental'}
                </button>
                <button
                    className="btn btn-outline"
                    style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                >
                    View Contract
                </button>
            </div>
        </div>
    )
}
