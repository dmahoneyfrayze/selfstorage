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
        <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{ padding: '24px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{name}</h3>
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            background: 'rgba(255,255,255,0.05)',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)'
                        }}>
                            {type}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>${price}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/month</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                    <div style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Size</div>
                        <div style={{ fontWeight: 600 }}>{size}</div>
                    </div>
                    <div style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Status</div>
                        <div style={{ fontWeight: 600, color: isAvailable ? 'var(--success)' : 'var(--error)' }}>
                            {isAvailable ? 'Available' : status}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
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
