import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener destinos' });
  }
};

export const getTransportsByDestination = async (req, res) => {
  const { id } = req.params;
  try {
    const transports = await prisma.transportOption.findMany({
      where: { destinationId: id }
    });
    res.status(200).json(transports);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener transportes' });
  }
};

export const getHotelsByDestination = async (req, res) => {
  const { id } = req.params;
  try {
    const hotels = await prisma.hotel.findMany({
      where: { destinationId: id }
    });
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener hoteles' });
  }
};

export const getHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: hotel.destinationId },
    });

    res.status(200).json({ hotel, destination });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener hotel' });
  }
};

export const createBooking = async (req, res) => {
  const { destinationId, hotelId, transportId, checkIn, checkOut, guests } = req.body;
  const userId = req.userId; // ✅ viene del token

  try {
    const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
    const transport = await prisma.transportOption.findUnique({ where: { id: transportId } });

    if (!hotel || !transport) {
      return res.status(400).json({ message: 'Hotel o transporte inválido' });
    }

    const noches = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalCost = (hotel.costPerNight * noches) + transport.cost;

    const booking = await prisma.booking.create({
      data: {
        userId,
        destinationId,
        hotelId,
        transportId,
        totalCost,
      },
    });

    res.status(201).json({ message: 'Reserva creada', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
};


