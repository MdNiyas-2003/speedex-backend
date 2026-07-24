"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const router = (0, express_1.Router)();
// Public
router.get("/", car_controller_1.getAllCars);
router.get("/:id", car_controller_1.getCarById);
// Admin
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("admin"), upload_middleware_1.default.single("image"), car_controller_1.createCar);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("admin"), upload_middleware_1.default.single("image"), car_controller_1.updateCar);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("admin"), car_controller_1.deleteCar);
exports.default = router;
