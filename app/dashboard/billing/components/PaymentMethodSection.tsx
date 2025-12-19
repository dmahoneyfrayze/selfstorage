'use client'

import { updatePaymentMethod } from '@/app/actions'
import { useState } from 'react'

export function PaymentMethodSection() {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    async function handleSave(formData: FormData) {
        setIsSaving(true)
        const result = await updatePaymentMethod(formData)
        if (result.success) {
            setIsEditing(false)
            alert('Payment method updated successfully!')
        } else {
            alert('Failed to update payment method.')
        }
        setIsSaving(false)
    }

    if (isEditing) {
        return (
            <div className="card" style={{ border: '2px solid var(--primary-blue)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Update Card</h3>
                <form action={handleSave} style={{ display: 'grid', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Card Number</label>
                        <input name="cardNumber" type="text" placeholder="0000 0000 0000 0000" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Expiry (MM/YY)</label>
                            <input name="expiry" type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>CVC</label>
                            <input name="cvc" type="text" placeholder="123" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button type="submit" disabled={isSaving} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                            {isSaving ? 'Saving...' : 'Save Card'}
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Payment Method</h3>
                <button
                    onClick={() => setIsEditing(true)}
                    style={{ color: 'var(--primary-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                    Update Card
                </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                <div style={{ fontSize: '2rem' }}>💳</div>
                <div>
                    <div style={{ fontWeight: 600 }}>Visa ending in 4242</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Expires 12/28</div>
                </div>
            </div>
        </div>
    )
}
