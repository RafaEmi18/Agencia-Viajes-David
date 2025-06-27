import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cancun = await prisma.destination.create({
    data: {
      name: 'Cancún',
      region: 'playa',
    },
  });

  const losCabos = await prisma.destination.create({
    data: {
      name: 'Los Cabos',
      region: 'playa',
    },
  });

  await prisma.transportOption.createMany({
    data: [
      // Cancún
      { type: 'avion', cost: 3500, hasTransfer: false, durationHours: 2.5, destinationId: cancun.id },
      { type: 'autobus', cost: 1800, hasTransfer: false, durationHours: 30, destinationId: cancun.id },
      { type: 'tren', cost: 2200, hasTransfer: false, durationHours: 28, destinationId: cancun.id },
      { type: 'ferry', cost: 2500, hasTransfer: false, durationHours: 36, destinationId: cancun.id },
      // Los Cabos
      { type: 'avion', cost: 4200, hasTransfer: false, durationHours: 3, destinationId: losCabos.id },
      { type: 'autobus', cost: 2100, hasTransfer: true, durationHours: 36, destinationId: losCabos.id },
      { type: 'tren', cost: 2800, hasTransfer: true, durationHours: 34, destinationId: losCabos.id },
      { type: 'ferry', cost: 2700, hasTransfer: false, durationHours: 40, destinationId: losCabos.id },
    ],
  });

  await prisma.hotel.createMany({
    data: [
      // Cancún
      { name: 'The Ritz-Carlton Cancun', category: 'Gran turismo', costPerNight: 6000, destinationId: cancun.id },
      { name: 'NIZUC Resort & Spa', category: '5 estrellas', costPerNight: 5200, destinationId: cancun.id },
      { name: 'Hotel Boutique Casa Blanca', category: 'Boutique', costPerNight: 2800, destinationId: cancun.id },
      { name: 'Hotel NYX Cancun', category: '4 estrellas', costPerNight: 3500, destinationId: cancun.id },
      { name: 'Suites Malecon Cancun', category: '3 estrellas', costPerNight: 1900, destinationId: cancun.id },
      // Los Cabos
      { name: 'Waldorf Astoria Los Cabos', category: 'Gran turismo', costPerNight: 7200, destinationId: losCabos.id },
      { name: 'Esperanza, Auberge Resorts', category: '5 estrellas', costPerNight: 6500, destinationId: losCabos.id },
      { name: 'Casa Natalia Boutique Hotel', category: 'Boutique', costPerNight: 3200, destinationId: losCabos.id },
      { name: 'Hotel Tesoro Los Cabos', category: '4 estrellas', costPerNight: 4000, destinationId: losCabos.id },
      { name: 'City Express Plus Cabo San Lucas', category: '3 estrellas', costPerNight: 2100, destinationId: losCabos.id },
    ],
  });

  console.log('✅ Datos cargados correctamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
