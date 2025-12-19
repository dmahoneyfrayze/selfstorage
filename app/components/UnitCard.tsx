'use client'

interface UnitProps {
    id: string
    name: string
    size: string
    price: number
    type: string
    status: string
    onBook: (id: string) => void
    onNotify?: () => void
}

export function UnitCard({ id, name, size, price, type, status, onBook, onNotify }: UnitProps) {
    const isAvailable = status === 'AVAILABLE';

    return (
        <div
            className="card"
            style={{
                background: 'var(--surface-white)',
                border: 'none',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
        >
            <div style={{ padding: '32px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '8px', color: 'var(--deep-navy)', fontFamily: 'var(--font-heading)' }}>{name}</h3>
                        <div style={{
                            display: 'inline-block',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            background: '#f0f0f0',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            fontWeight: 500
                        }}>
                            {type}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-blue)' }}>${price}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/month</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                    <div style={{ flex: 1, padding: '16px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Size</div>
                        <div style={{ fontWeight: 600, color: 'var(--deep-navy)', fontSize: '1.1rem' }}>{size}</div>
                    </div>
                    <div style={{ flex: 1, padding: '16px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</div>
                        <div style={{ fontWeight: 600, color: isAvailable ? '#10b981' : '#ef4444', fontSize: '1.1rem' }}>
                            {isAvailable ? 'Available' : status}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px 32px 32px 32px', background: 'var(--surface-white)' }}>
                {isAvailable ? (
                    <button
                        onClick={() => onBook(id)}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        Book Now
                    </button>
                ) : (
                    <button
                        onClick={onNotify}
                        className="btn btn-outline"
                        style={{ width: '100%' }}
                    >
                        Notify Me
                    </button>
                )}
            </div>
        </div>
    )
}
