"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Music,
  Trophy,
  Gamepad2,
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Clock,
  Ticket,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const eventCategories = [
  { icon: Music, label: "Music Night", color: "from-purple-500 to-pink-500" },
  { icon: Sparkles, label: "Cultural", color: "from-blue-500 to-cyan-500" },
  { icon: Trophy, label: "Sports", color: "from-green-500 to-emerald-500" },
  { icon: Gamepad2, label: "Gaming", color: "from-orange-500 to-red-500" },
  { icon: Star, label: "Dance", color: "from-yellow-500 to-orange-500" },
  { icon: Zap, label: "Competitions", color: "from-indigo-500 to-purple-500" },
];

const passes = [
  { type: "Student Pass", price: "₹299", features: ["All events access", "Food coupons", "Swag kit"] },
  { type: "VIP Pass", price: "₹1,999", features: ["Front row seats", "Backstage access", "VIP lounge", "Premium swag"] },
  { type: "Faculty Pass", price: "₹499", features: ["All events access", "Reserved seating", "Refreshments"] },
  { type: "Guest Pass", price: "₹699", features: ["All events access", "Food coupons", "Event merchandise"] },
];

const timeline = [
  { day: "Day 1 - March 15", events: ["Inauguration Ceremony", "Battle of Bands", "Art Exhibition", "Gaming Tournament (Qualifiers)"] },
  { day: "Day 2 - March 16", events: ["Dance Competition", "Sports Finals", "Stand-up Comedy Night", "DJ Night"] },
  { day: "Day 3 - March 17", events: ["Cultural Showcase", "Fashion Show", "Pro Night - Celebrity Performance", "Closing Ceremony & Awards"] },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/15 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-float" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-dark-200">Registrations Open Now</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4">
              <span className="text-white">IGIMS</span>
              <br />
              <span className="text-gradient">FEST 2026</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-4"
            >
              The Grand Medical College Festival of Indira Gandhi Institute of Medical Sciences
            </motion.p>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 text-dark-400"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-400" />
                <span className="text-sm">March 15-17, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm">IGIMS Campus, Patna</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-400" />
                <span className="text-sm">5000+ Participants</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/passes"
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                Get Your Pass
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="px-8 py-4 rounded-xl glass border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Explore Events
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-dark-500 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Categories Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              What Awaits <span className="text-gradient">You</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-dark-400 max-w-xl mx-auto">
              Three days packed with incredible events across multiple categories
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {eventCategories.map((cat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center cursor-pointer hover-glow"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm font-medium text-dark-200">{cat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="container-custom relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Event <span className="text-gradient">Timeline</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-dark-400 max-w-xl mx-auto">
              Three electrifying days of non-stop entertainment and competitions
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {timeline.map((day, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 hover-glow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{day.day}</h3>
                </div>
                <ul className="space-y-2">
                  {day.events.map((event, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-dark-300">
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {event}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Passes Preview Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="container-custom relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Choose Your <span className="text-gradient">Pass</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-dark-400 max-w-xl mx-auto">
              Select the perfect pass for your festival experience
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {passes.map((pass, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`glass-card p-6 relative overflow-hidden ${
                  i === 1 ? "border-primary-500/50 shadow-lg shadow-primary-500/10" : ""
                }`}
              >
                {i === 1 && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-[10px] font-medium border border-primary-500/30">
                    POPULAR
                  </div>
                )}
                <h3 className="font-semibold text-white mb-1">{pass.type}</h3>
                <p className="text-2xl font-bold text-gradient mb-4">{pass.price}</p>
                <ul className="space-y-2 mb-6">
                  {pass.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-dark-300">
                      <Star className="w-3 h-3 text-primary-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/passes"
                  className="block w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-center text-sm font-medium text-white hover:bg-primary-500/20 hover:border-primary-500/50 transition-all"
                >
                  Get Pass
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="glass-card p-8 md:p-12 rounded-3xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "50+", label: "Events" },
                { value: "5000+", label: "Expected Attendees" },
                { value: "₹5L+", label: "Prize Pool" },
                { value: "3", label: "Days of Fun" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-dark-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-8 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Don&apos;t Miss Out!
              </h2>
              <p className="text-primary-100/80 max-w-lg mx-auto mb-8 text-lg">
                Limited passes available. Grab yours before they sell out and be part of the biggest medical college fest in Bihar.
              </p>
              <Link
                href="/passes"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-dark-900 font-semibold text-lg hover:bg-dark-100 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <Ticket className="w-5 h-5" />
                Book Your Pass Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
