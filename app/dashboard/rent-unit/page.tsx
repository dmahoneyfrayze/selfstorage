import { getAvailableUnits } from '@/app/actions'
import { RentUnitItem } from './components/RentUnitItem'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function RentUnitPage() {
    const units = await getAvailableUnits()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <Link href="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>← Back to Dashboard</Link>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Rent a New Unit</h1>
                <p style={{ color: 'var(--text-muted)' }}>Select a unit to add to your account immediately.</p>
            </header>

            {units.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <h3>No Units Available</h3>
                    <p style={{ color: 'var(--text-muted)' }}>We are currently at full capacity. Please check back later.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {units.map(unit => (
                        <RentUnitItem key={unit.id} unit={unit} />
                    ))}
                </div>
            )}
        </div>
    )
}
