import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import crypto from "crypto";

// Simple password hashing (for demo - in production use bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDb();

    // Check against environment admin credentials first
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({
        success: true,
        admin: { email, name: "Admin", role: "admin" },
        token: hashPassword(`${email}:${Date.now()}`),
      });
    }

    // Check database for admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const hashedInput = hashPassword(password);
    if (hashedInput !== admin.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: { email: admin.email, name: admin.name, role: admin.role },
      token: hashPassword(`${admin.email}:${Date.now()}`),
    });
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
