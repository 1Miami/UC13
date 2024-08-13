import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient()

async function main()  {
    let motorista: Prisma.motoristaDeleteArgs
  
    const deleteMotorista = await prisma.motorista.deleteMany({where: {cnh: {lt:123456789}}})
}

main()