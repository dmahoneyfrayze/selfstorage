import { prisma } from '@/app/lib/prisma'
import { UnitsGrid } from '@/app/components/UnitsGrid'

export const dynamic = 'force-dynamic'

export default async function UnitsPage() {
    const units = await prisma.unit.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Available Units</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    Browse our selection of secure, climate-controlled storage units.
                </p>
            </div>

            <UnitsGrid initialUnits={units} />
        </div>
    )
}
