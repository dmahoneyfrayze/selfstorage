import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { GHLService } from '@/app/lib/ghl'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { unitId, firstName, lastName, email, phone } = body

        if (!unitId || !email || !firstName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // 1. Check availability again (race condition check)
        const unit = await prisma.unit.findUnique({ where: { id: unitId } })
        if (!unit || unit.status !== 'AVAILABLE') {
            return NextResponse.json({ error: 'Unit is no longer available' }, { status: 409 })
        }

        // 2. Create/Update Contact in GHL (Mock)
        const ghlContact = await GHLService.createContact({
            email,
            firstName,
            lastName,
            phone
        })

        // 3. Create Booking in DB
        const booking = await prisma.booking.create({
            data: {
                unitId,
                customerEmail: email,
                customerName: `${firstName} ${lastName}`,
                ghlContactId: ghlContact.id,
                status: 'PENDING'
            }
        })

        // 4. Trigger GHL Workflow (e.g. "Send Contract")
        await GHLService.triggerWorkflow(ghlContact.id, 'workflow_send_contract')
        await GHLService.addNote(ghlContact.id, `Started booking for Unit ${unit.name}`)

        // 5. Update Unit Status to PENDING (hold it)
        await prisma.unit.update({
            where: { id: unitId },
            data: { status: 'PENDING' }
        })

        return NextResponse.json({
            success: true,
            bookingId: booking.id,
            message: 'Booking initiated. Check your email for the contract.'
        })

    } catch (error) {
        console.error('Booking error:', error)
        return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
    }
}
