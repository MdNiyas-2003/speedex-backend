"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const getDashboardStats = async (req, res) => {
    try {
        const stats = await (0, dashboard_service_1.getDashboardStatsService)();
        return res.status(200).json({
            success: true,
            data: stats,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getDashboardStats = getDashboardStats;
