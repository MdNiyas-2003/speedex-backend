"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.signupService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupService = async (data) => {
    const existingUser = await client_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const user = await client_1.default.user.create({
        data: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            role: data.role ?? "customer",
        },
    });
    return user;
};
exports.signupService = signupService;
const loginService = async (data) => {
    const user = await client_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt_1.default.compare(data.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        token,
        user,
    };
};
exports.loginService = loginService;
