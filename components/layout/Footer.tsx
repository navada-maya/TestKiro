import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-950/80 backdrop-blur-xl">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">IGIMS Fest 2026</h3>
                <p className="text-xs text-dark-400">The Grand Medical College Festival</p>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed max-w-md">
              Indira Gandhi Institute of Medical Sciences presents its annual cultural extravaganza.
              Three days of music, dance, sports, gaming, and unforgettable memories.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-dark-400 hover:text-primary-400 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-dark-400 hover:text-primary-400 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-dark-400 hover:text-primary-400 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/events" className="block text-sm text-dark-400 hover:text-primary-400 transition-colors">
                Events
              </Link>
              <Link href="/passes" className="block text-sm text-dark-400 hover:text-primary-400 transition-colors">
                Get Passes
              </Link>
              <Link href="/my-tickets" className="block text-sm text-dark-400 hover:text-primary-400 transition-colors">
                My Tickets
              </Link>
              <Link href="/admin" className="block text-sm text-dark-400 hover:text-primary-400 transition-colors">
                Admin
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-dark-400">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span>IGIMS, Patna, Bihar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-400">
                <Mail className="w-4 h-4 text-primary-500" />
                <span>fest@igims.edu</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-400">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            &copy; 2026 IGIMS Fest. All rights reserved.
          </p>
          <p className="text-xs text-dark-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" /> by IGIMS Tech Team
          </p>
        </div>
      </div>
    </footer>
  );
}
