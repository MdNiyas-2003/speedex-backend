import { Request, Response } from "express";
import { getDashboardStatsService } from "../services/dashboard.service";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await getDashboardStatsService();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};