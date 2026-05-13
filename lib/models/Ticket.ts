import mongoose, { Schema, models, model } from "mongoose";

export interface ITicket {
  _id?: string;
  ticketId: string;
  name: string;
  email: string;
  phone: string;
  college?: string;
  passType: "student" | "faculty" | "guest" | "vip";
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  qrCode: string;
  isUsed: boolean;
  usedAt?: Date;
  verifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: String,
      trim: true,
    },
    passType: {
      type: String,
      required: true,
      enum: ["student", "faculty", "guest", "vip"],
    },
    amount: {
      type: Number,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    razorpaySignature: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      default: null,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
      default: null,
    },
    verifiedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = models.Ticket || model<ITicket>("Ticket", TicketSchema);

export default Ticket;
