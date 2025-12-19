import { prisma } from '@/app/lib/prisma'
import { BookingForm } from '@/app/components/BookingForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function BookingPage({ params }: { params: { unitId: string } }) {
    const unit = await prisma.unit.findUnique({
        where: { id: params.unitId }
    })

    if (!unit) {
        notFound()
    }

    return (
        <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ marginBottom: '16px' }}>Secure Your Unit</h1>
                <p style={{ color: 'var(--text-muted)' }}>Complete the details below to reserve <strong>{unit.name}</strong>.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
                <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Unit Details</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Name</span>
                        <span style={{ fontWeight: 600 }}>{unit.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Size</span>
                        <span style={{ fontWeight: 600 }}>{unit.size}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Type</span>
                        <span style={{ fontWeight: 600 }}>{unit.type}</span>
                    </div>
                    <hr style={{ borderColor: 'var(--border)', margin: '16px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                        <span>Monthly Rate</span>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>${unit.price}</span>
                    </div>
                </div>

                <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Next Steps</h3>
                    <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li>Fill out your contact details.</li>
                        <li>Receive digital contract via email.</li>
                        <li>Sign & Pay securely online.</li>
                        <li>Get instant access code.</li>
                    </ol>
                </div>
            </div>

            <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                <BookingForm unitId={unit.id} unitPrice={unit.price} />
            </div>
        </div>
    )
}
