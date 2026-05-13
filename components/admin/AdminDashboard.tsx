"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Users,
  DollarSign,
  CheckCircle2,
  XCircle,
  Search,
  QrCode,
  LogOut,
  BarChart3,
  List,
  ScanLine,
  Loader2,
  RefreshCw,
  Calendar,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";

interface Stats {
  totalTickets: number;
  usedTickets: number;
  unusedTickets: number;
  totalRevenue: number;
  recentTickets: number;
  passBreakdown: { _id: string; count: number; revenue: number }[];
  dailySales: { _id: string; count: number; revenue: number }[];
}

interface TicketItem {
  _id: string;
  ticketId: string;
  name: string;
  email: string;
  phone: string;
  college?: string;
  passType: string;
  amount: number;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
}

type Tab = "overview" | "tickets" | "verify";

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPass, setFilterPass] = useState("all");
  const [filterUsed, setFilterUsed] = useState("");
  const [verifyTicketId, setVerifyTicketId] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === "tickets") {
      fetchTickets();
    }
  }, [activeTab, filterPass, filterUsed]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      toast.error("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    setTicketsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (filterPass !== "all") params.set("passType", filterPass);
      if (filterUsed) params.set("isUsed", filterUsed);

      const res = await fetch(`/api/admin/tickets?${params.toString()}`);
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (error) {
      toast.error("Failed to fetch tickets");
    } finally {
      setTicketsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyTicketId.trim()) {
      toast.error("Enter a ticket ID");
      return;
    }

    setVerifyLoading(true);
    setVerifyResult(null);

    try {
      const res = await fetch("/api/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: verifyTicketId.trim(), verifiedBy: "admin" }),
      });

      const data = await res.json();
      setVerifyResult(data);

      if (data.valid) {
        toast.success("Ticket verified! Entry granted. ✅");
      } else {
        toast.error(data.error || "Verification failed");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: BarChart3 },
    { id: "tickets" as Tab, label: "Tickets", icon: List },
    { id: "verify" as Tab, label: "Verify QR", icon: ScanLine },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-sm text-dark-400 mt-1">IGIMS Fest 2026 Management Panel</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-dark-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary-500/20 text-primary-300 border border-primary-500/50"
                  : "glass text-dark-400 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
              </div>
            ) : stats ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-primary-400" />
                      </div>
                      <span className="text-sm text-dark-400">Total Tickets</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.totalTickets}</p>
                  </div>

                  <div className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-sm text-dark-400">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      ₹{stats.totalRevenue.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-sm text-dark-400">Verified</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.usedTickets}</p>
                  </div>

                  <div className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-orange-400" />
                      </div>
                      <span className="text-sm text-dark-400">Pending Entry</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.unusedTickets}</p>
                  </div>
                </div>

                {/* Pass Breakdown */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Pass Type Breakdown</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.passBreakdown.map((item) => (
                      <div
                        key={item._id}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <p className="text-sm text-dark-400 capitalize mb-1">{item._id} Pass</p>
                        <p className="text-xl font-bold text-white">{item.count}</p>
                        <p className="text-xs text-dark-500">₹{item.revenue.toLocaleString("en-IN")} revenue</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Last 7 Days</h3>
                    <button
                      onClick={fetchStats}
                      className="p-2 rounded-lg hover:bg-white/5 text-dark-400 hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-3xl font-bold text-gradient">{stats.recentTickets}</p>
                  <p className="text-sm text-dark-400">tickets sold this week</p>
                </div>
              </>
            ) : (
              <p className="text-dark-400 text-center py-8">No data available</p>
            )}
          </motion.div>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="text"
                  placeholder="Search by name, email, ticket ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchTickets()}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <select
                value={filterPass}
                onChange={(e) => setFilterPass(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-dark-300 text-sm focus:outline-none focus:border-primary-500/50"
              >
                <option value="all">All Passes</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="guest">Guest</option>
                <option value="vip">VIP</option>
              </select>
              <select
                value={filterUsed}
                onChange={(e) => setFilterUsed(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-dark-300 text-sm focus:outline-none focus:border-primary-500/50"
              >
                <option value="">All Status</option>
                <option value="false">Unused</option>
                <option value="true">Used</option>
              </select>
              <button
                onClick={fetchTickets}
                className="px-4 py-2.5 rounded-xl bg-primary-500/20 text-primary-300 border border-primary-500/30 text-sm font-medium hover:bg-primary-500/30 transition-all"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Tickets Table */}
            {ticketsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
              </div>
            ) : (
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left p-4 text-dark-400 font-medium">Ticket ID</th>
                        <th className="text-left p-4 text-dark-400 font-medium">Name</th>
                        <th className="text-left p-4 text-dark-400 font-medium hidden md:table-cell">Email</th>
                        <th className="text-left p-4 text-dark-400 font-medium">Pass</th>
                        <th className="text-left p-4 text-dark-400 font-medium">Amount</th>
                        <th className="text-left p-4 text-dark-400 font-medium">Status</th>
                        <th className="text-left p-4 text-dark-400 font-medium hidden lg:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr
                          key={ticket._id}
                          className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="p-4 font-mono text-xs text-primary-300">
                            {ticket.ticketId}
                          </td>
                          <td className="p-4 text-white">{ticket.name}</td>
                          <td className="p-4 text-dark-400 hidden md:table-cell">{ticket.email}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-white/5 text-dark-300">
                              {ticket.passType}
                            </span>
                          </td>
                          <td className="p-4 text-white font-medium">₹{ticket.amount}</td>
                          <td className="p-4">
                            {ticket.isUsed ? (
                              <span className="flex items-center gap-1 text-red-400 text-xs">
                                <XCircle className="w-3.5 h-3.5" /> Used
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-green-400 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-dark-500 text-xs hidden lg:table-cell">
                            {new Date(ticket.createdAt).toLocaleDateString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {tickets.length === 0 && (
                  <div className="text-center py-12 text-dark-400">
                    No tickets found
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Verify Tab */}
        {activeTab === "verify" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto"
          >
            <div className="glass-card p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Verify Ticket</h2>
                <p className="text-sm text-dark-400">
                  Scan QR code or enter ticket ID to verify entry
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1.5">
                    Ticket ID
                  </label>
                  <input
                    type="text"
                    value={verifyTicketId}
                    onChange={(e) => setVerifyTicketId(e.target.value)}
                    placeholder="e.g., IGIMS-XXXXX-XXXX"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifyLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {verifyLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ScanLine className="w-5 h-5" />
                      Verify & Grant Entry
                    </>
                  )}
                </button>
              </form>

              {/* Verification Result */}
              {verifyResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-5 rounded-xl border ${
                    verifyResult.valid
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {verifyResult.valid ? (
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-400" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        verifyResult.valid ? "text-green-300" : "text-red-300"
                      }`}>
                        {verifyResult.valid ? "Entry Granted!" : "Entry Denied!"}
                      </p>
                      <p className="text-xs text-dark-400">
                        {verifyResult.message || verifyResult.error}
                      </p>
                    </div>
                  </div>

                  {verifyResult.ticket && (
                    <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
                      <p className="text-sm text-dark-300">
                        <span className="text-dark-500">Name:</span> {verifyResult.ticket.name}
                      </p>
                      <p className="text-sm text-dark-300">
                        <span className="text-dark-500">Pass:</span>{" "}
                        <span className="capitalize">{verifyResult.ticket.passType}</span>
                      </p>
                      {verifyResult.ticket.email && (
                        <p className="text-sm text-dark-300">
                          <span className="text-dark-500">Email:</span> {verifyResult.ticket.email}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
