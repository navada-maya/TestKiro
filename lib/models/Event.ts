import mongoose, { Schema, models, model } from "mongoose";

export interface IEvent {
  _id?: string;
  name: string;
  category: "cultural" | "music" | "dance" | "sports" | "gaming" | "competitions";
  description: string;
  date: string;
  time: string;
  venue: string;
  image?: string;
  rules?: string[];
  teamSize?: string;
  registrationFee?: number;
  prizes?: string[];
  coordinator?: string;
  coordinatorPhone?: string;
  isActive: boolean;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["cultural", "music", "dance", "sports", "gaming", "competitions"],
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rules: [{ type: String }],
    teamSize: {
      type: String,
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    prizes: [{ type: String }],
    coordinator: {
      type: String,
    },
    coordinatorPhone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
