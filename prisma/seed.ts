import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const units = [
    { name: 'A-101', size: '5x5', price: 50.0, type: 'Standard', status: 'AVAILABLE' },
    { name: 'A-102', size: '5x5', price: 50.0, type: 'Standard', status: 'OCCUPIED' },
    { name: 'B-101', size: '10x10', price: 120.0, type: 'Climate Controlled', status: 'AVAILABLE' },
    { name: 'B-102', size: '10x10', price: 120.0, type: 'Climate Controlled', status: 'AVAILABLE' },
    { name: 'C-201', size: '10x20', price: 200.0, type: 'Drive-up', status: 'AVAILABLE' },
  ]

  for (const u of units) {
    await prisma.unit.create({
      data: u
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
