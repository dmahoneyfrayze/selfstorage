'use server'

import { revalidatePath } from 'next/cache'

// Simulated User ID for now
const SIMULATED_USER_EMAIL = 'john.doe@example.com'

// Mock Data
const MOCK_BOOKINGS = [
    {
        id: 'mock-booking-1',
        unitId: 'unit-1',
        customerEmail: SIMULATED_USER_EMAIL,
        status: 'CONFIRMED',
        startDate: new Date('2024-01-01'),
        endDate: null,
        createdAt: new Date('2024-01-01'),
        unit: {
            id: 'unit-1',
            name: 'A-100',
            size: '5x10',
            price: 50.00,
            status: 'OCCUPIED',
            type: 'Standard',
            description: 'Small unit suitable for boxes.'
        }
    },
    {
        id: 'mock-booking-2',
        unitId: 'unit-3',
        customerEmail: SIMULATED_USER_EMAIL,
        status: 'PENDING',
        startDate: new Date(),
        endDate: null,
        createdAt: new Date(),
        unit: {
            id: 'unit-3',
            name: 'B-205',
            size: '10x20',
            price: 180.00,
            status: 'PENDING',
            type: 'Climate Controlled',
            description: 'Large unit, climate controlled.'
        }
    }
]

const MOCK_UNITS = [
    {
        id: 'unit-2',
        name: 'A-102',
        size: '10x10',
        price: 100.00,
        status: 'AVAILABLE',
        type: 'Standard',
        description: 'Medium standard unit.'
    },
    {
        id: 'unit-4',
        name: 'C-305',
        size: '20x20',
        price: 300.00,
        status: 'AVAILABLE',
        type: 'Drive-Up',
        description: 'Huge drive-up unit.'
    },
    {
        id: 'unit-5',
        name: 'D-401',
        size: '5x5',
        price: 45.00,
        status: 'AVAILABLE',
        type: 'Locker',
        description: 'Small locker.'
    }
]

// ----------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------

export async function getUserBookings() {
    // Return static mock bookings
    return MOCK_BOOKINGS
}

export async function getAvailableUnits() {
    // Return static mock units
    return MOCK_UNITS
}

export async function bookUnit(unitId: string) {
    try {
        console.log('Mock Booking Created for Unit:', unitId)
        // Simulate success
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
        console.log('Mock Booking Cancelled:', bookingId)
        // Simulate success
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

    console.log('Service Request Received (MOCK):', { type, details, date, user: SIMULATED_USER_EMAIL })

    return { success: true }
}

export async function updatePaymentMethod(formData: FormData) {
    // Simulate Secure Payment Update
    await new Promise(resolve => setTimeout(resolve, 1500))

    const last4 = formData.get('cardNumber')?.toString().slice(-4)

    console.log('Payment Method Updated (MOCK):', { last4, user: SIMULATED_USER_EMAIL })

    revalidatePath('/dashboard/billing')
    return { success: true }
}

export async function joinWaitlist(formData: FormData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const email = formData.get('email')
    console.log('Waitlist Join (MOCK):', { email })

    return { success: true, message: "You've been added to the waitlist!" }
}
