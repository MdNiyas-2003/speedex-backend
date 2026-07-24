import prisma from "../prisma/client";
import cloudinary from "../config/cloudinary";

// Create Car
export const createCarService = async (
  body: any,
  file?: Express.Multer.File
) => {
  let imageUrl: string | null = null;
  let imagePublicId: string |null = null;

  if (file) {
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "speedex/cars",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(file.buffer);
    });

    imageUrl = result.secure_url;
    imagePublicId = result.public_id;
  }

  return prisma.car.create({
    data: {
      ...body,
      imageUrl,
      imagePublicId,
    },
  });
};

// Get All Cars
export const getAllCarsService = async (query: any) => {
  const {
    page = "1",
    limit = "10",
    search,
    category,
    available,
    minPrice,
    maxPrice,
  } = query;

  const where: any = {};

  // Search by Brand or Model
  if (search) {
    where.OR = [
      {
        brand: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        model: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Category
  if (category) {
    where.category = category;
  }

  // Availability
  if (available !== undefined) {
    where.available = available === "true";
  }

  // Price Filter
  if (minPrice || maxPrice) {
    where.pricePerDay = {};

    if (minPrice)
      where.pricePerDay.gte = Number(minPrice);

    if (maxPrice)
      where.pricePerDay.lte = Number(maxPrice);
  }

  const total = await prisma.car.count({
    where,
  });

  const cars = await prisma.car.findMany({
    where,

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),

    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    total,

    page: Number(page),

    limit: Number(limit),

    totalPages: Math.ceil(total / Number(limit)),

    cars,
  };
};
// Get Car By Id
export const getCarByIdService = async (carId: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });

  if (!car) {
    throw new Error("Car not found");
  }

  return car;
};
// Update Car
export const updateCarService = async (
  carId: string,
  body: any,
  file?: Express.Multer.File
) => {
  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });

  if (!car) {
    throw new Error("Car not found");
  }

  let imageUrl = car.imageUrl;
  let imagePublicId = car.imagePublicId;

  if (file) {
    if (car.imagePublicId) {
      await cloudinary.uploader.destroy(car.imagePublicId);
    }

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "speedex/cars",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(file.buffer);
    });

    imageUrl = result.secure_url;
    imagePublicId = result.public_id;
  }

  return prisma.car.update({
    where: {
      id: carId,
    },
    data: {
      ...body,
      imageUrl,
      imagePublicId,
    },
  });
};

// Delete Car
export const deleteCarService = async (carId: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });

  if (!car) {
    throw new Error("Car not found");
  }

  // Delete image from Cloudinary
  if (car.imagePublicId) {
    await cloudinary.uploader.destroy(car.imagePublicId);
  }

  // Delete car from database
  await prisma.car.delete({
    where: {
      id: carId,
    },
  });
};