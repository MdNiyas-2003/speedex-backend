"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarService = exports.updateCarService = exports.getCarByIdService = exports.getAllCarsService = exports.createCarService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
// Create Car
const createCarService = async (body, file) => {
    let imageUrl = null;
    let imagePublicId = null;
    if (file) {
        const result = await new Promise((resolve, reject) => {
            cloudinary_1.default.uploader
                .upload_stream({
                folder: "speedex/cars",
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .end(file.buffer);
        });
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
    }
    return client_1.default.car.create({
        data: {
            ...body,
            imageUrl,
            imagePublicId,
        },
    });
};
exports.createCarService = createCarService;
// Get All Cars
const getAllCarsService = async (query) => {
    const { page = "1", limit = "10", search, category, available, minPrice, maxPrice, } = query;
    const where = {};
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
    const total = await client_1.default.car.count({
        where,
    });
    const cars = await client_1.default.car.findMany({
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
exports.getAllCarsService = getAllCarsService;
// Get Car By Id
const getCarByIdService = async (carId) => {
    const car = await client_1.default.car.findUnique({
        where: {
            id: carId,
        },
    });
    if (!car) {
        throw new Error("Car not found");
    }
    return car;
};
exports.getCarByIdService = getCarByIdService;
// Update Car
const updateCarService = async (carId, body, file) => {
    const car = await client_1.default.car.findUnique({
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
            await cloudinary_1.default.uploader.destroy(car.imagePublicId);
        }
        const result = await new Promise((resolve, reject) => {
            cloudinary_1.default.uploader
                .upload_stream({
                folder: "speedex/cars",
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .end(file.buffer);
        });
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
    }
    return client_1.default.car.update({
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
exports.updateCarService = updateCarService;
// Delete Car
const deleteCarService = async (carId) => {
    const car = await client_1.default.car.findUnique({
        where: {
            id: carId,
        },
    });
    if (!car) {
        throw new Error("Car not found");
    }
    // Delete image from Cloudinary
    if (car.imagePublicId) {
        await cloudinary_1.default.uploader.destroy(car.imagePublicId);
    }
    // Delete car from database
    await client_1.default.car.delete({
        where: {
            id: carId,
        },
    });
};
exports.deleteCarService = deleteCarService;
