import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const whereClause = status ? { status } : {}

        const units = await prisma.unit.findMany({
            where: whereClause,
            orderBy: {
                name: 'asc'
            }
        })

        return NextResponse.json(units)
    } catch (error) {
        console.error('Error fetching units:', error)
        return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        // Minimal validation
        if (!body.name || !body.price || !body.size) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const unit = await prisma.unit.create({
            data: {
                name: body.name,
                size: body.size,
                price: parseFloat(body.price),
                type: body.type || 'Standard',
                status: body.status || 'AVAILABLE',
                description: body.description
            }
        })

        return NextResponse.json(unit)
    } catch (error) {
        console.error('Error creating unit:', error)
        return NextResponse.json({ error: 'Failed to create unit' }, { status: 500 })
    }
}
