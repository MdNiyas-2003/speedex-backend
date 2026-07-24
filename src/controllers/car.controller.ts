import { Request, Response } from "express";
import {
  createCarService,
  getAllCarsService,
  getCarByIdService,
  updateCarService,
  deleteCarService,
} from "../services/car.service";

// Create Car
export const createCar = async (
  req: Request,
  res: Response
) => {
  try {
    const car = await createCarService(req.body, req.file);

    return res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Cars
export const getAllCars = async (
  req: Request,
  res: Response
) => {
  try {
    const cars = await getAllCarsService(req.query);

    return res.status(200).json({
      success: true,
      data: cars,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Car By Id
export const getCarById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const car = await getCarByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Car
export const updateCar = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const car = await updateCarService(
      req.params.id,
      req.body,
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: car,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Car
export const deleteCar = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    await deleteCarService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};