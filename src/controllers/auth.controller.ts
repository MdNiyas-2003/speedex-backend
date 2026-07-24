import { Request, Response } from "express";
import { signupService } from "../services/auth.service";
import { loginService } from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await signupService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};