import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: "admin" | "customer";
}

export const signupService = async (data: SignupData) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
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

interface LoginData {
  email: string;
  password: string;
}

export const loginService = async (data: LoginData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user,
  };
};