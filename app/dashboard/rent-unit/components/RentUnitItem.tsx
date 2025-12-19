'use client'

import { bookUnit } from '@/app/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function RentUnitItem({ unit }: { unit: any }) {
    const [isBooking, setIsBooking] = useState(false)
    const router = useRouter()

    async function handleBook() {
        setIsBooking(true)
        const result = await bookUnit(unit.id)
        if (result.success) {
            router.push('/dashboard')
        } else {
            alert('Failed to book unit: ' + result.error)
            setIsBooking(false)
        }
    }

    return (
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{unit.name}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{unit.size} • {unit.type}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>
                    ${unit.price.toFixed(2)}<span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span>
                </div>
                <button
                    disabled={isBooking}
                    onClick={handleBook}
                    className="btn btn-primary"
                    style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                >
                    {isBooking ? 'Processing...' : 'Rent Now'}
                </button>
            </div>
        </div>
    )
}
