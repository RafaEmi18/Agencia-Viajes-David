import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seedImages = async () => {
  try {
    // Lista de imágenes aleatorias
    const sampleImages = [
      "https://source.unsplash.com/800x600/?beach,resort",
      "https://source.unsplash.com/800x600/?hotel,room",
      "https://source.unsplash.com/800x600/?luxury,hotel",
      "https://source.unsplash.com/800x600/?vacation,hotel",
      "https://source.unsplash.com/800x600/?pool,resort",
      "https://source.unsplash.com/800x600/?resort,sea",
    ];

    // Obtener todos los hoteles existentes
    const hotels = await prisma.hotel.findMany();

    // Asignar imagen aleatoria a cada hotel
    for (const hotel of hotels) {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      await prisma.hotel.update({
        where: { id: hotel.id },
        data: { imageUrl: randomImage },
      });
    }

    console.log("✅ Imágenes asignadas correctamente a los hoteles.");
  } catch (error) {
    console.error("❌ Error al hacer seed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedImages();
