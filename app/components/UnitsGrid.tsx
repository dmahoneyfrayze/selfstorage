'use client'

import { useState } from 'react'
import { UnitCard } from './UnitCard'
import { useRouter } from 'next/navigation'
import { WaitlistModal } from './WaitlistModal'

interface Unit {
    id: string
    name: string
    size: string
    price: number
    type: string
    status: string
}

export function UnitsGrid({ initialUnits }: { initialUnits: Unit[] }) {
    const router = useRouter()
    const [filterType, setFilterType] = useState('All')

    const unitTypes = ['All', ...Array.from(new Set(initialUnits.map(u => u.type)))]

    const filteredUnits = filterType === 'All'
        ? initialUnits
        : initialUnits.filter(u => u.type === filterType)

    const [waitlistType, setWaitlistType] = useState<string | null>(null)

    const handleBook = (id: string) => {
        router.push(`/booking/${id}`)
    }

    const handleNotify = (type: string) => {
        setWaitlistType(type)
    }

    return (
        <div>
            {/* Filter Bar */}
            <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {unitTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '0px',
                            border: type === filterType ? '2px solid var(--primary-blue)' : '2px solid #ccc',
                            background: type === filterType ? 'var(--primary-blue)' : 'transparent',
                            color: type === filterType ? 'white' : 'var(--text-main)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem'
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {filteredUnits.length > 0 ? (
                    filteredUnits.map(unit => (
                        <UnitCard
                            key={unit.id}
                            {...unit}
                            onBook={handleBook}
                            onNotify={() => handleNotify(unit.type)}
                        />
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                        No units found matching your criteria.
                    </div>
                )}
            </div>

            <WaitlistModal
                unitType={waitlistType || ''}
                isOpen={!!waitlistType}
                onClose={() => setWaitlistType(null)}
            />
        </div>
    )
}
