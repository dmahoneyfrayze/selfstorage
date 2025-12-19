import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log('[Webhook Received]', body)

        // Expected payload from simulating GHL automation:
        // { type: "CONTRACT_SIGNED", email: "...", unitId: "..." }

        if (body.type === 'CONTRACT_SIGNED' && body.unitId) {
            // 1. Find the booking
            // In a real scenario, we might look up by contact ID or pass the booking ID in custom data
            // specific logic depends on what GHL sends back. A robust way is to pass Booking ID as a custom field to GHL.

            const booking = await prisma.booking.findFirst({
                where: { unitId: body.unitId, customerEmail: body.email, status: 'PENDING' }
            })

            if (booking) {
                // Update Booking to CONFIRMED
                await prisma.booking.update({
                    where: { id: booking.id },
                    data: { status: 'CONFIRMED' }
                })

                // Update Unit to OCCUPIED
                await prisma.unit.update({
                    where: { id: body.unitId },
                    data: { status: 'OCCUPIED' }
                })

                return NextResponse.json({ success: true, message: 'Unit Confirmed' })
            }
        }

        return NextResponse.json({ success: true, message: 'Webhook processed (no action taken)' })

    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
    }
}
