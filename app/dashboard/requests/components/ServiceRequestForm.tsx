'use client'

import { submitServiceRequest } from '@/app/actions'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export function ServiceRequestForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const type = searchParams.get('type') || 'other'

    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        const result = await submitServiceRequest(formData)
        if (result.success) {
            alert('Request submitted successfully! We will contact you shortly.')
            router.push('/dashboard')
        } else {
            alert('Failed to submit request.')
            setIsSubmitting(false)
        }
    }

    const typeLabels: Record<string, string> = {
        key: 'Key / Lock Issue',
        transport: 'Transport / Moving Help',
        other: 'Other Inquiry'
    }

    return (
        <form action={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Request Type</label>
                <input
                    type="text"
                    name="type"
                    value={typeLabels[type] || type}
                    readOnly
                    style={{
                        width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd',
                        background: '#f8f9fa', color: 'var(--text-muted)'
                    }}
                />
            </div>

            {type === 'transport' && (
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Requested Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>
            )}

            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Details</label>
                <textarea
                    name="details"
                    rows={4}
                    required
                    placeholder="Please minimize details about your request..."
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%' }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
        </form>
    )
}
