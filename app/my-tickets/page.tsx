"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Ticket,
  Search,
  QrCode,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface TicketData {
  _id: string;
  ticketId: string;
  name: string;
  email: string;
  phone: string;
  college?: string;
  passType: string;
  amount: number;
  qrCode: string;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
}

export default function MyTicketsPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      fetchTickets(emailParam);
    }
  }, [searchParams]);

  const fetchTickets = async (emailToSearch?: string) => {
    const searchEmail = emailToSearch || email;
    if (!searchEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/tickets?email=${encodeURIComponent(searchEmail)}`);
      const data = await res.json();

      if (res.ok) {
        setTickets(data.tickets);
        if (data.tickets.length === 0) {
          toast.error("No tickets found for this email");
        }
      } else {
        toast.error(data.error || "Failed to fetch tickets");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTickets();
  };

  const getPassColor = (type: string) => {
    switch (type) {
      case "student": return "from-blue-500 to-cyan-500";
      case "faculty": return "from-green-500 to-emerald-500";
      case "guest": return "from-orange-500 to-amber-500";
      case "vip": return "from-purple-500 to-pink-500";
      default: return "from-primary-500 to-accent-500";
    }
  };

  const getPassLabel = (type: string) => {
    switch (type) {
      case "student": return "STUDENT PASS";
      case "faculty": return "FACULTY PASS";
      case "guest": return "GUEST PASS";
      case "vip": return "VIP PASS";
      default: return "PASS";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="section-padding pt-8 pb-12">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            My <span className="text-gradient">Tickets</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-dark-400 max-w-xl mx-auto"
          >
            Enter your email to view your purchased tickets and QR codes
          </motion.p>
        </div>
      </section>

      {/* Search Form */}
      <div className="container-custom max-w-xl mb-12">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>
      </div>

      {/* Tickets Display */}
      <div className="container-custom">
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto mb-4" />
            <p className="text-dark-400">Fetching your tickets...</p>
          </div>
        )}

        {!loading && searched && tickets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <XCircle className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Tickets Found</h3>
            <p className="text-dark-400 mb-6">
              We couldn&apos;t find any tickets for this email address.
            </p>
            <a
              href="/passes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30 transition-all"
            >
              <Ticket className="w-5 h-5" />
              Get Your Pass Now
            </a>
          </motion.div>
        )}

        {!loading && tickets.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tickets.map((ticket, i) => (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden"
              >
                {/* Ticket Header */}
                <div className={`bg-gradient-to-r ${getPassColor(ticket.passType)} p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-xs font-medium">IGIMS FEST 2026</p>
                      <h3 className="text-white font-bold text-lg">
                        {getPassLabel(ticket.passType)}
                      </h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.isUsed
                        ? "bg-red-500/30 text-red-200 border border-red-400/30"
                        : "bg-white/20 text-white border border-white/30"
                    }`}>
                      {ticket.isUsed ? "USED" : "VALID"}
                    </div>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-5">
                  {/* QR Code */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-dark-900 rounded-xl border border-white/5">
                      {ticket.qrCode && (
                        <img
                          src={ticket.qrCode}
                          alt="Ticket QR Code"
                          className="w-40 h-40"
                        />
                      )}
                    </div>
                  </div>

                  {/* Ticket ID */}
                  <div className="text-center mb-4">
                    <p className="text-xs text-dark-500 mb-1">Ticket ID</p>
                    <p className="text-sm font-mono font-bold text-primary-300 bg-primary-500/10 px-3 py-1.5 rounded-lg inline-block">
                      {ticket.ticketId}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-dark-500" />
                      <span className="text-dark-300">{ticket.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-dark-500" />
                      <span className="text-dark-300">{ticket.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-dark-500" />
                      <span className="text-dark-300">{ticket.phone}</span>
                    </div>
                    {ticket.college && (
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-dark-500" />
                        <span className="text-dark-300">{ticket.college}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-dark-500" />
                      <span className="text-dark-300">
                        Purchased: {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  {ticket.isUsed && (
                    <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-300">
                          Used on {new Date(ticket.usedAt!).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}

                  {!ticket.isUsed && (
                    <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300">
                          Valid for entry • Show QR at gate
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dashed separator */}
                <div className="border-t border-dashed border-white/10 mx-5" />

                {/* Footer */}
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs text-dark-500">March 15-17, 2026 • IGIMS Patna</span>
                  <span className="text-sm font-bold text-gradient">₹{ticket.amount}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
