import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import QRCode from "qrcode";
import { connectToDb } from "@/lib/db";
import Ticket from "@/lib/models/Ticket";
import { generateTicketId } from "@/lib/utils";

function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET as string;
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      name,
      email,
      phone,
      college,
      passType,
      amount,
    } = await req.json();

    // Validate required fields
    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !name ||
      !email ||
      !phone ||
      !passType ||
      !amount
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify payment signature on backend (CRITICAL SECURITY STEP)
    const isValid = verifyRazorpaySignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDb();

    // Check if ticket already exists for this order (prevent duplicates)
    const existingTicket = await Ticket.findOne({ razorpayOrderId });
    if (existingTicket) {
      return NextResponse.json({
        success: true,
        ticket: existingTicket,
        message: "Ticket already generated for this payment",
      });
    }

    // Generate unique ticket ID
    const ticketId = generateTicketId();

    // Generate QR code containing ticket verification data
    const qrData = JSON.stringify({
      ticketId,
      name,
      passType,
      email,
      timestamp: Date.now(),
    });

    const qrCode = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: "#0ea5e9",
        light: "#0f172a",
      },
    });

    // Save ticket to database
    const ticket = await Ticket.create({
      ticketId,
      name,
      email,
      phone,
      college: college || "",
      passType,
      amount,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      qrCode,
      isUsed: false,
    });

    return NextResponse.json({
      success: true,
      ticket: {
        ticketId: ticket.ticketId,
        name: ticket.name,
        email: ticket.email,
        passType: ticket.passType,
        amount: ticket.amount,
        qrCode: ticket.qrCode,
        createdAt: ticket.createdAt,
      },
      message: "Payment verified and ticket generated successfully!",
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
