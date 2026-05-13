import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Ticket from "@/lib/models/Ticket";

// POST - Verify and mark ticket as used (single-use QR)
export async function POST(req: NextRequest) {
  try {
    const { ticketId, verifiedBy } = await req.json();

    if (!ticketId) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 }
      );
    }

    await connectToDb();

    const ticket = await Ticket.findOne({ ticketId });

    if (!ticket) {
      return NextResponse.json(
        {
          valid: false,
          error: "Ticket not found. Invalid QR code.",
        },
        { status: 404 }
      );
    }

    // Check if ticket is already used (SINGLE-USE enforcement)
    if (ticket.isUsed) {
      return NextResponse.json(
        {
          valid: false,
          error: "This ticket has already been used!",
          usedAt: ticket.usedAt,
          verifiedBy: ticket.verifiedBy,
          ticket: {
            ticketId: ticket.ticketId,
            name: ticket.name,
            passType: ticket.passType,
          },
        },
        { status: 400 }
      );
    }

    // Mark ticket as used
    ticket.isUsed = true;
    ticket.usedAt = new Date();
    ticket.verifiedBy = verifiedBy || "admin";
    await ticket.save();

    return NextResponse.json({
      valid: true,
      message: "Ticket verified successfully! Entry granted.",
      ticket: {
        ticketId: ticket.ticketId,
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        passType: ticket.passType,
        college: ticket.college,
        amount: ticket.amount,
        createdAt: ticket.createdAt,
        usedAt: ticket.usedAt,
      },
    });
  } catch (error: any) {
    console.error("Error verifying ticket:", error);
    return NextResponse.json(
      { error: "Failed to verify ticket" },
      { status: 500 }
    );
  }
}
