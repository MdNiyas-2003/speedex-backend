"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getAllCars = exports.createCar = void 0;
const car_service_1 = require("../services/car.service");
// Create Car
const createCar = async (req, res) => {
    try {
        const car = await (0, car_service_1.createCarService)(req.body, req.file);
        return res.status(201).json({
            success: true,
            message: "Car created successfully",
            data: car,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createCar = createCar;
// Get All Cars
const getAllCars = async (req, res) => {
    try {
        const cars = await (0, car_service_1.getAllCarsService)(req.query);
        return res.status(200).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllCars = getAllCars;
// Get Car By Id
const getCarById = async (req, res) => {
    try {
        const car = await (0, car_service_1.getCarByIdService)(req.params.id);
        return res.status(200).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getCarById = getCarById;
// Update Car
const updateCar = async (req, res) => {
    try {
        const car = await (0, car_service_1.updateCarService)(req.params.id, req.body, req.file);
        return res.status(200).json({
            success: true,
            message: "Car updated successfully",
            data: car,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateCar = updateCar;
// Delete Car
const deleteCar = async (req, res) => {
    try {
        await (0, car_service_1.deleteCarService)(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Car deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteCar = deleteCar;
