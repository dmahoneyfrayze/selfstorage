import { getAvailableUnits } from '@/app/actions'
import { UnitsGrid } from '@/app/components/UnitsGrid'

export const dynamic = 'force-dynamic'

export default async function UnitsPage() {
    const units = await getAvailableUnits()

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--deep-navy)' }}>Available Units</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                    Browse our selection of secure, climate-controlled storage units.
                </p>
            </div>

            <UnitsGrid initialUnits={units} />
        </div>
    )
}
