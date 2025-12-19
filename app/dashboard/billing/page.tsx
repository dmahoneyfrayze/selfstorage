import { PaymentMethodSection } from './components/PaymentMethodSection'
import Link from 'next/link'

export default function BillingPage() {
    const history = [
        { id: 'INV-001', date: 'Dec 1, 2025', amount: 226.00, status: 'Paid' },
        { id: 'INV-002', date: 'Nov 1, 2025', amount: 226.00, status: 'Paid' },
        { id: 'INV-003', date: 'Oct 1, 2025', amount: 226.00, status: 'Paid' },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ marginBottom: '8px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Billing & Receipts</h1>
                <p style={{ color: 'var(--text-muted)' }}>View payment history and manage your card</p>
            </header>

            {/* Payment Method */}
            <PaymentMethodSection />

            {/* History */}
            <div className="card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Payment History</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>Date</th>
                                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>Description</th>
                                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>Amount</th>
                                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                                <th style={{ padding: '12px 8px', color: 'var(--text-muted)', fontWeight: 500 }}>Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '16px 8px' }}>{item.date}</td>
                                    <td style={{ padding: '16px 8px' }}>Monthly Rent - Unit B-104</td>
                                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>${item.amount.toFixed(2)}</td>
                                    <td style={{ padding: '16px 8px' }}>
                                        <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500 }}>{item.status}</span>
                                    </td>
                                    <td style={{ padding: '16px 8px' }}>
                                        <button style={{ color: 'var(--primary-blue)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Download</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
