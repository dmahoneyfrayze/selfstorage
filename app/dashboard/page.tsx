import { getUserBookings } from '@/app/actions'
import { BookingCard } from './components/BookingCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const bookings = await getUserBookings()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--deep-navy)' }}>My Units</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage your access and active rentals</p>
                </div>
                <Link href="/dashboard/rent-unit" className="btn btn-primary">
                    + Add Unit
                </Link>
            </header>

            {bookings.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <h3>No Active Rentals</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>You don't have any active storage units at the moment.</p>
                    <Link href="/dashboard/rent-unit" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                        Rent a Unit Now
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {bookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>Service & Requests</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <Link
                    href="/dashboard/requests?type=key"
                    className="card"
                    style={{
                        display: 'flex', flexDirection: 'column', gap: '8px',
                        padding: '16px', textDecoration: 'none', color: 'inherit',
                        cursor: 'pointer', transition: 'transform 0.2s',
                        border: '1px solid transparent'
                    }}
                >
                    <span style={{ fontSize: '1.5rem' }}>🔑</span>
                    <span style={{ fontWeight: 600 }}>Key / Lock Request</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lost key or lock issues</span>
                </Link>

                <Link
                    href="/dashboard/requests?type=transport"
                    className="card"
                    style={{
                        display: 'flex', flexDirection: 'column', gap: '8px',
                        padding: '16px', textDecoration: 'none', color: 'inherit',
                        cursor: 'pointer', transition: 'transform 0.2s',
                        border: '1px solid transparent'
                    }}
                >
                    <span style={{ fontSize: '1.5rem' }}>🚛</span>
                    <span style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Transport / Moving</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Request loading help</span>
                </Link>

                <Link
                    href="/dashboard/requests?type=other"
                    className="card"
                    style={{
                        display: 'flex', flexDirection: 'column', gap: '8px',
                        padding: '16px', textDecoration: 'none', color: 'inherit',
                        cursor: 'pointer', transition: 'transform 0.2s',
                        border: '1px solid transparent'
                    }}
                >
                    <span style={{ fontSize: '1.5rem' }}>❓</span>
                    <span style={{ fontWeight: 600 }}>Other Inquiry</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>General questions</span>
                </Link>
            </div>
        </div>
    )
}
