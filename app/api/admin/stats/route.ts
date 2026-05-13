import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Ticket from "@/lib/models/Ticket";

export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    const totalTickets = await Ticket.countDocuments();
    const usedTickets = await Ticket.countDocuments({ isUsed: true });
    const unusedTickets = await Ticket.countDocuments({ isUsed: false });

    // Revenue calculation
    const revenueResult = await Ticket.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Pass type breakdown
    const passBreakdown = await Ticket.aggregate([
      {
        $group: {
          _id: "$passType",
          count: { $sum: 1 },
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    // Recent tickets (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentTickets = await Ticket.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Daily sales for chart (last 7 days)
    const dailySales = await Ticket.aggregate([
      {
        $match: { createdAt: { $gte: sevenDaysAgo } },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      totalTickets,
      usedTickets,
      unusedTickets,
      totalRevenue,
      recentTickets,
      passBreakdown,
      dailySales,
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
