"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_service_2 = require("../services/auth.service");
const signup = async (req, res) => {
    try {
        const user = await (0, auth_service_1.signupService)(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const result = await (0, auth_service_2.loginService)(req.body);
        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
exports.login = login;
