import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, unitType } = body

        if (!email || !unitType) {
            return NextResponse.json({ error: 'Email and Unit Type are required' }, { status: 400 })
        }

        // Check if already on waitlist for this type
        const existing = await prisma.waitlist.findFirst({
            where: { email, unitType }
        })

        if (existing) {
            return NextResponse.json({ message: 'You are already on the waitlist for this unit type.' })
        }

        await prisma.waitlist.create({
            data: {
                email,
                unitType
            }
        })

        return NextResponse.json({
            success: true,
            message: 'You have been added to the waitlist. We will notify you when a unit becomes available.'
        })

    } catch (error) {
        console.error('Waitlist error:', error)
        return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
    }
}
