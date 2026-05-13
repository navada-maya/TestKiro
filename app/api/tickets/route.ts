import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Ticket from "@/lib/models/Ticket";

// GET tickets by email (for My Tickets page)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connectToDb();

    const tickets = await Ticket.find({ email: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .select("-razorpaySignature");

    return NextResponse.json({ tickets });
  } catch (error: any) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
