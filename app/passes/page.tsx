"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Check,
  Star,
  Crown,
  GraduationCap,
  Users,
  ArrowRight,
  Shield,
  Sparkles,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

interface PassType {
  id: "student" | "faculty" | "guest" | "vip";
  name: string;
  price: number;
  icon: any;
  color: string;
  gradient: string;
  features: string[];
  popular?: boolean;
}

const passTypes: PassType[] = [
  {
    id: "student",
    name: "Student Pass",
    price: 299,
    icon: GraduationCap,
    color: "text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Access to all events",
      "Food court coupons (₹100)",
      "IGIMS Fest T-shirt",
      "Entry to DJ Night",
      "Certificate of participation",
    ],
  },
  {
    id: "faculty",
    name: "Faculty Pass",
    price: 499,
    icon: Shield,
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Access to all events",
      "Reserved seating",
      "Refreshments included",
      "Faculty lounge access",
      "Certificate + memento",
      "Parking pass",
    ],
  },
  {
    id: "guest",
    name: "Guest Pass",
    price: 699,
    icon: Users,
    color: "text-orange-400",
    gradient: "from-orange-500 to-amber-500",
    features: [
      "Access to all events",
      "Food court coupons (₹200)",
      "Event merchandise bag",
      "Entry to DJ Night",
      "Photo booth access",
      "Certificate of attendance",
    ],
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: 1999,
    icon: Crown,
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "Front row seats all events",
      "Backstage / artist meet access",
      "VIP lounge with refreshments",
      "Premium swag kit",
      "Food court coupons (₹500)",
      "Priority entry - no queues",
      "Exclusive after-party access",
      "Personalized badge",
    ],
  },
];

export default function PassesPage() {
  const [selectedPass, setSelectedPass] = useState<PassType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
  });

  const handlePassSelect = (pass: PassType) => {
    setSelectedPass(pass);
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPass) return;

    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create order from backend (server-side, secret key never exposed)
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPass.price,
          passType: selectedPass.id,
          name: formData.name,
          email: formData.email,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "IGIMS Fest 2026",
        description: `${selectedPass.name} - IGIMS Fest 2026`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Step 3: Verify payment on backend
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                college: formData.college,
                passType: selectedPass.id,
                amount: selectedPass.price,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment successful! Ticket generated! 🎉");
              // Redirect to my-tickets page
              window.location.href = `/my-tickets?email=${encodeURIComponent(formData.email)}`;
            } else {
              toast.error("Payment verification failed. Contact support.");
            }
          } catch (err) {
            toast.error("Error verifying payment. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0ea5e9",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      {/* Header */}
      <section className="section-padding pt-8 pb-12">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Get Your <span className="text-gradient">Pass</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-dark-400 max-w-xl mx-auto"
          >
            Secure your spot at Bihar&apos;s biggest medical college festival. Choose the pass that suits you.
          </motion.p>
        </div>
      </section>

      {/* Pass Cards */}
      <div className="container-custom mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {passTypes.map((pass, i) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedPass?.id === pass.id
                  ? "border-primary-500/70 shadow-lg shadow-primary-500/20 scale-[1.02]"
                  : "hover:border-white/20 hover:scale-[1.01]"
              } ${pass.popular ? "ring-1 ring-primary-500/30" : ""}`}
              onClick={() => handlePassSelect(pass)}
            >
              {pass.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-[10px] font-bold rounded-bl-xl">
                  MOST POPULAR
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pass.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <pass.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">{pass.name}</h3>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-bold text-gradient">₹{pass.price}</span>
                <span className="text-sm text-dark-500">/person</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {pass.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-dark-300">
                    <Check className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  selectedPass?.id === pass.id
                    ? `bg-gradient-to-r ${pass.gradient} text-white shadow-lg`
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {selectedPass?.id === pass.id ? "Selected ✓" : "Select Pass"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      {showForm && selectedPass && (
        <motion.div
          id="booking-form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-custom max-w-2xl"
        >
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedPass.gradient} flex items-center justify-center`}>
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Complete Your Booking
                </h2>
                <p className="text-sm text-dark-400">
                  {selectedPass.name} - ₹{selectedPass.price}
                </p>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">
                  College / Institution
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                  placeholder="e.g., IGIMS Patna"
                />
              </div>

              {/* Order Summary */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-dark-400">Pass Type</span>
                  <span className="text-sm text-white font-medium">{selectedPass.name}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-dark-400">Quantity</span>
                  <span className="text-sm text-white font-medium">1</span>
                </div>
                <div className="border-t border-white/5 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Total Amount</span>
                  <span className="text-lg font-bold text-gradient">₹{selectedPass.price}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Pay ₹{selectedPass.price} & Get Ticket
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-dark-500 mt-3">
                🔒 Secured by Razorpay. Your payment information is encrypted.
              </p>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
