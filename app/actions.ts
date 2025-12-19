'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/lib/prisma'

// Simulated User ID for now since we don't have real auth yet
const SIMULATED_USER_EMAIL = 'john.doe@example.com'

export async function getUserBookings() {
    // In a real app, we would get the session/user here
    return await prisma.booking.findMany({
        where: {
            customerEmail: SIMULATED_USER_EMAIL,
            status: { in: ['PENDING', 'CONFIRMED'] }
        },
        include: {
            unit: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function getAvailableUnits() {
    return await prisma.unit.findMany({
        where: {
            status: 'AVAILABLE'
        }
    })
}

export async function bookUnit(unitId: string) {
    try {
        // 1. Check if unit is still available
        const unit = await prisma.unit.findUnique({
            where: { id: unitId }
        })

        if (!unit || unit.status !== 'AVAILABLE') {
            return { success: false, error: 'Unit is no longer available' }
        }

        // 2. Create booking
        await prisma.booking.create({
            data: {
                unitId: unitId,
                customerEmail: SIMULATED_USER_EMAIL,
                status: 'CONFIRMED', // Auto-confirm for demo
                startDate: new Date(),
            }
        })

        // 3. Update unit status
        await prisma.unit.update({
            where: { id: unitId },
            data: { status: 'OCCUPIED' }
        })

        revalidatePath('/dashboard')
        revalidatePath('/units')
        return { success: true }
    } catch (error) {
        console.error('Failed to book unit:', error)
        return { success: false, error: 'Failed to create booking' }
    }
}

export async function cancelBooking(bookingId: string) {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        })

        if (!booking) {
            return { success: false, error: 'Booking not found' }
        }

        // Update booking status
        await prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: 'CANCELLED',
                endDate: new Date()
            }
        })

        // Free up the unit
        await prisma.unit.update({
            where: { id: booking.unitId },
            data: { status: 'AVAILABLE' }
        })

        revalidatePath('/dashboard')
        revalidatePath('/units')
        return { success: true }
    } catch (error) {
        console.error('Failed to cancel booking:', error)
        return { success: false, error: 'Failed to cancel booking' }
    }
}

export async function submitServiceRequest(formData: FormData) {
    // Simulate API call / Email send
    await new Promise(resolve => setTimeout(resolve, 1000))

    const type = formData.get('type')
    const details = formData.get('details')
    const date = formData.get('date')

    console.log('Service Request Received:', { type, details, date, user: SIMULATED_USER_EMAIL })

    return { success: true }
}

export async function updatePaymentMethod(formData: FormData) {
    // Simulate Secure Payment Update
    await new Promise(resolve => setTimeout(resolve, 1500))

    const last4 = formData.get('cardNumber')?.toString().slice(-4)

    console.log('Payment Method Updated:', { last4, user: SIMULATED_USER_EMAIL })

    revalidatePath('/dashboard/billing')
    return { success: true }
}
