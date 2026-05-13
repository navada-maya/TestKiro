import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Ticket from "@/lib/models/Ticket";

// GET all tickets (admin dashboard)
export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const passType = searchParams.get("passType");
    const isUsed = searchParams.get("isUsed");
    const search = searchParams.get("search");

    // Build query
    const query: any = {};
    if (passType && passType !== "all") query.passType = passType;
    if (isUsed === "true") query.isUsed = true;
    if (isUsed === "false") query.isUsed = false;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { ticketId: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Ticket.countDocuments(query);
    const tickets = await Ticket.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-razorpaySignature -qrCode");

    return NextResponse.json({
      tickets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching admin tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
