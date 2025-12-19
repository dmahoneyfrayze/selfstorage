import { ServiceRequestForm } from './components/ServiceRequestForm'
import Link from 'next/link'
import { Suspense } from 'react'

export default function RequestsPage() {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Link href="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', display: 'block' }}>← Back to Dashboard</Link>

            <header style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Submit Request</h1>
                <p style={{ color: 'var(--text-muted)' }}>How can we help you today?</p>
            </header>

            <Suspense fallback={<div>Loading form...</div>}>
                <ServiceRequestForm />
            </Suspense>
        </div>
    )
}
