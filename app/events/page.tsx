"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Trophy,
  Gamepad2,
  Sparkles,
  Star,
  Zap,
  Calendar,
  MapPin,
  Clock,
  Users,
} from "lucide-react";

type Category = "all" | "cultural" | "music" | "dance" | "sports" | "gaming" | "competitions";

interface EventItem {
  id: number;
  name: string;
  category: Category;
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  prizes: string;
  image: string;
}

const categories: { id: Category; label: string; icon: any; color: string }[] = [
  { id: "all", label: "All Events", icon: Sparkles, color: "from-white/20 to-white/5" },
  { id: "cultural", label: "Cultural", icon: Star, color: "from-blue-500 to-cyan-500" },
  { id: "music", label: "Music", icon: Music, color: "from-purple-500 to-pink-500" },
  { id: "dance", label: "Dance", icon: Sparkles, color: "from-yellow-500 to-orange-500" },
  { id: "sports", label: "Sports", icon: Trophy, color: "from-green-500 to-emerald-500" },
  { id: "gaming", label: "Gaming", icon: Gamepad2, color: "from-orange-500 to-red-500" },
  { id: "competitions", label: "Competitions", icon: Zap, color: "from-indigo-500 to-purple-500" },
];

const events: EventItem[] = [
  {
    id: 1,
    name: "Battle of Bands",
    category: "music",
    description: "Form your band and rock the stage! Original compositions and covers both welcome. Show IGIMS what you've got!",
    date: "March 15, 2026",
    time: "6:00 PM",
    venue: "Main Auditorium",
    teamSize: "3-6 members",
    prizes: "₹50,000 + Trophies",
    image: "🎸",
  },
  {
    id: 2,
    name: "Solo Singing",
    category: "music",
    description: "Showcase your vocal talent in this solo singing competition. Any genre, any language. Let your voice be heard!",
    date: "March 15, 2026",
    time: "3:00 PM",
    venue: "Seminar Hall",
    teamSize: "Individual",
    prizes: "₹15,000 + Trophy",
    image: "🎤",
  },
  {
    id: 3,
    name: "Classical Dance",
    category: "dance",
    description: "Express the beauty of Indian classical dance forms. Bharatanatyam, Kathak, Odissi - all forms welcome.",
    date: "March 16, 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    teamSize: "Individual / Duo",
    prizes: "₹20,000 + Trophy",
    image: "💃",
  },
  {
    id: 4,
    name: "Street Dance Crew Battle",
    category: "dance",
    description: "Hip-hop, breaking, popping, locking - bring your crew and battle it out on the dance floor!",
    date: "March 16, 2026",
    time: "4:00 PM",
    venue: "Open Air Theatre",
    teamSize: "4-8 members",
    prizes: "₹40,000 + Trophy",
    image: "🕺",
  },
  {
    id: 5,
    name: "Cricket Tournament",
    category: "sports",
    description: "T10 format cricket tournament. Form your college team and compete for the IGIMS Fest Champions Cup.",
    date: "March 15-16, 2026",
    time: "8:00 AM",
    venue: "Sports Ground",
    teamSize: "11 players + 4 subs",
    prizes: "₹75,000 + Cup",
    image: "🏏",
  },
  {
    id: 6,
    name: "Badminton Championship",
    category: "sports",
    description: "Singles and doubles categories. Show your smashes and drops in this intense badminton championship.",
    date: "March 15, 2026",
    time: "9:00 AM",
    venue: "Indoor Sports Complex",
    teamSize: "Individual / Duo",
    prizes: "₹15,000 + Medals",
    image: "🏸",
  },
  {
    id: 7,
    name: "Valorant Tournament",
    category: "gaming",
    description: "5v5 tactical shooter tournament. Assemble your team and fight for glory on the virtual battleground!",
    date: "March 15-16, 2026",
    time: "10:00 AM",
    venue: "Computer Lab",
    teamSize: "5 players",
    prizes: "₹30,000 + Peripherals",
    image: "🎮",
  },
  {
    id: 8,
    name: "BGMI Championship",
    category: "gaming",
    description: "Battle Grounds Mobile India squad tournament. Drop in, loot up, and be the last squad standing!",
    date: "March 16, 2026",
    time: "2:00 PM",
    venue: "Seminar Hall B",
    teamSize: "4 players",
    prizes: "₹25,000 + Prizes",
    image: "📱",
  },
  {
    id: 9,
    name: "Nukkad Natak",
    category: "cultural",
    description: "Street play competition on social themes. Spread awareness while entertaining the audience.",
    date: "March 15, 2026",
    time: "11:00 AM",
    venue: "Open Air Theatre",
    teamSize: "8-15 members",
    prizes: "₹25,000 + Trophy",
    image: "🎭",
  },
  {
    id: 10,
    name: "Photography Contest",
    category: "cultural",
    description: "Capture the essence of the fest through your lens. Theme-based and open category both available.",
    date: "March 15-17, 2026",
    time: "All Day",
    venue: "Campus Wide",
    teamSize: "Individual",
    prizes: "₹10,000 + Camera Gear",
    image: "📸",
  },
  {
    id: 11,
    name: "Medical Quiz Bowl",
    category: "competitions",
    description: "Test your medical knowledge in this intense quiz competition. From anatomy to pharmacology, prove you're the best!",
    date: "March 16, 2026",
    time: "11:00 AM",
    venue: "Lecture Hall 1",
    teamSize: "Team of 3",
    prizes: "₹20,000 + Books",
    image: "🧠",
  },
  {
    id: 12,
    name: "Debate Championship",
    category: "competitions",
    description: "Parliamentary-style debate on healthcare and social issues. Argue your way to victory!",
    date: "March 17, 2026",
    time: "10:00 AM",
    venue: "Conference Hall",
    teamSize: "Team of 2",
    prizes: "₹15,000 + Trophy",
    image: "🗣️",
  },
  {
    id: 13,
    name: "Fashion Show",
    category: "cultural",
    description: "Walk the ramp with style! Themed rounds including ethnic wear, western, and fusion categories.",
    date: "March 17, 2026",
    time: "5:00 PM",
    venue: "Main Auditorium",
    teamSize: "8-12 members",
    prizes: "₹35,000 + Crown",
    image: "👗",
  },
  {
    id: 14,
    name: "Stand-up Comedy",
    category: "cultural",
    description: "Got jokes? Make the audience roar with laughter in this open-mic style stand-up competition.",
    date: "March 16, 2026",
    time: "7:00 PM",
    venue: "Seminar Hall",
    teamSize: "Individual",
    prizes: "₹12,000 + Trophy",
    image: "😂",
  },
  {
    id: 15,
    name: "Hackathon - MedTech",
    category: "competitions",
    description: "24-hour hackathon focused on healthcare technology solutions. Build something that matters!",
    date: "March 15-16, 2026",
    time: "Starts 10:00 AM",
    venue: "Innovation Lab",
    teamSize: "2-4 members",
    prizes: "₹50,000 + Internships",
    image: "💻",
  },
  {
    id: 16,
    name: "Chess Tournament",
    category: "sports",
    description: "Classic rapid chess tournament with Swiss format. Checkmate your way to the championship!",
    date: "March 15, 2026",
    time: "2:00 PM",
    venue: "Recreation Hall",
    teamSize: "Individual",
    prizes: "₹10,000 + Trophy",
    image: "♟️",
  },
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((e) => e.category === activeCategory);

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
            Our <span className="text-gradient">Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-dark-400 max-w-xl mx-auto"
          >
            50+ events across 6 categories. Something for everyone!
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container-custom mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary-500/20 text-primary-300 border border-primary-500/50 shadow-lg shadow-primary-500/10"
                  : "glass text-dark-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="container-custom">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 hover-glow group cursor-pointer"
              >
                {/* Event Emoji & Category */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{event.image}</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-dark-300 capitalize">
                    {event.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                  {event.name}
                </h3>
                <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-dark-400">
                    <Calendar className="w-3.5 h-3.5 text-primary-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dark-400">
                    <Clock className="w-3.5 h-3.5 text-primary-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dark-400">
                    <MapPin className="w-3.5 h-3.5 text-primary-500" />
                    {event.venue}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dark-400">
                    <Users className="w-3.5 h-3.5 text-primary-500" />
                    {event.teamSize}
                  </div>
                </div>

                {/* Prize */}
                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-400">
                      {event.prizes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-dark-400 text-lg">No events in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
