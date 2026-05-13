# IGIMS Fest 2026 - Ticket & Pass Management System

A premium, full-stack ticket/pass selling website for **IGIMS Fest 2026** (Indira Gandhi Institute of Medical Sciences Annual Cultural Festival). Built with Next.js 14, Razorpay payments, QR-based ticket verification, and MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=flat-square&logo=mongodb)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)

---

## Features

### User-Facing
- **Premium Homepage** - Dark modern theme with smooth animations, event timeline, pass preview
- **Events Page** - 50+ events across 6 categories (Cultural, Music, Dance, Sports, Gaming, Competitions)
- **Pass Purchase** - 4 pass types (Student ₹299, Faculty ₹499, Guest ₹699, VIP ₹1999)
- **Secure Payments** - Razorpay integration with server-side order creation & signature verification
- **QR Ticket Generation** - Unique ticket ID + QR code generated after successful payment
- **My Tickets** - View purchased tickets with QR codes by email lookup

### Admin Panel
- **Dashboard Overview** - Total tickets, revenue, pass breakdown, weekly stats
- **Ticket Management** - Search, filter, and view all bookings
- **QR Verification** - Verify tickets by ID, single-use enforcement (entry tracking)
- **Secure Login** - Environment-based admin credentials

### Security
- Razorpay secret key **never exposed** to frontend
- Order creation happens **server-side only**
- Payment signature verified on backend using HMAC SHA256
- QR codes are **single-use** - marked as used after verification
- Admin panel protected by login

### Technical
- Next.js 14 App Router
- TypeScript throughout
- MongoDB with Mongoose ODM
- Framer Motion animations
- Tailwind CSS with custom dark theme
- Fully mobile responsive
- Glass morphism UI components

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── create-order/       # Razorpay order creation (server-side)
│   │   ├── verify-payment/     # Payment verification + ticket generation
│   │   ├── verify-ticket/      # QR/Ticket verification (single-use)
│   │   ├── tickets/            # Fetch tickets by email
│   │   └── admin/
│   │       ├── login/          # Admin authentication
│   │       ├── tickets/        # Admin ticket listing
│   │       └── stats/          # Dashboard statistics
│   ├── events/                 # Events listing page
│   ├── passes/                 # Pass purchase page
│   ├── my-tickets/             # View purchased tickets
│   ├── admin/                  # Admin dashboard
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── Footer.tsx          # Footer
│   └── admin/
│       └── AdminDashboard.tsx  # Admin dashboard component
├── lib/
│   ├── db.ts                   # MongoDB connection
│   ├── utils.ts                # Utility functions
│   └── models/
│       ├── Ticket.ts           # Ticket schema
│       ├── Event.ts            # Event schema
│       └── Admin.ts            # Admin schema
├── .env.example                # Environment variables template
├── tailwind.config.ts          # Tailwind configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## Setup Guide

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn**
- **MongoDB** (Atlas cloud or local instance)
- **Razorpay** account (test mode works for development)

### 1. Clone the Repository

```bash
git clone https://github.com/navada-maya/TestKiro.git
cd TestKiro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# MongoDB Connection
# Get from: https://cloud.mongodb.com (create free cluster)
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/igims-fest-2026

# Razorpay Keys
# Get from: https://dashboard.razorpay.com/app/keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@igims.edu
ADMIN_PASSWORD=your_secure_password_here
```

### 4. Razorpay Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up / Log in
3. Navigate to **Settings > API Keys**
4. Generate **Test Mode** keys
5. Copy `Key ID` → `NEXT_PUBLIC_RAZORPAY_KEY_ID`
6. Copy `Key Secret` → `RAZORPAY_KEY_SECRET`

> **Important:** The Key Secret is ONLY used server-side. It is never exposed to the browser.

### 5. MongoDB Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use `0.0.0.0/0` for development)
5. Get connection string → `MONGODB_URL`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Admin Access

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) and login with:
- Email: whatever you set as `ADMIN_EMAIL` in `.env`
- Password: whatever you set as `ADMIN_PASSWORD` in `.env`

---

## Payment Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Frontend  │     │   Backend    │     │  Razorpay   │
│  (Browser)  │     │  (API Route) │     │   Server    │
└──────┬──────┘     └──────┬───────┘     └──────┬──────┘
       │                    │                     │
       │  1. Select Pass    │                     │
       │  & Fill Form       │                     │
       │                    │                     │
       │  2. POST /api/     │                     │
       │  create-order ────►│  3. Create Order    │
       │                    │────────────────────►│
       │                    │◄────────────────────│
       │◄──── Order ID ─────│  4. Order Created   │
       │                    │                     │
       │  5. Open Razorpay  │                     │
       │  Checkout Modal ──────────────────────►  │
       │                    │                     │
       │◄─── 6. Payment ────────────────────────  │
       │     Complete       │                     │
       │                    │                     │
       │  7. POST /api/     │                     │
       │  verify-payment ──►│  8. Verify          │
       │                    │  Signature (HMAC)   │
       │                    │                     │
       │                    │  9. Generate Ticket  │
       │                    │  + QR Code          │
       │                    │                     │
       │◄── 10. Ticket ─────│  11. Save to DB     │
       │    + QR Code       │                     │
       │                    │                     │
       │  12. Redirect to   │                     │
       │  /my-tickets       │                     │
       └────────────────────┴─────────────────────┘
```

---

## QR Verification Flow

1. Attendee shows QR code at entry gate
2. Admin scans QR → extracts ticket ID
3. Admin enters ticket ID in verification panel
4. Backend checks:
   - Does ticket exist? → If no, reject
   - Is ticket already used? → If yes, reject (single-use)
   - If valid → Mark as used, record timestamp, grant entry

---

## Pass Types & Pricing

| Pass Type | Price | Includes |
|-----------|-------|----------|
| Student | ₹299 | All events, food coupons, swag kit, DJ night |
| Faculty | ₹499 | All events, reserved seating, refreshments, parking |
| Guest | ₹699 | All events, food coupons, merchandise, DJ night |
| VIP | ₹1,999 | Front row, backstage access, VIP lounge, premium swag, after-party |

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel Dashboard → Settings → Environment Variables.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | Full-stack React framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database |
| Razorpay | Payment gateway |
| QRCode (node) | QR generation |
| Framer Motion | Animations |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| React Hot Toast | Notifications |

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

**IGIMS Fest 2026 Tech Team**
- Website: [igims.edu](https://igims.edu)
- Email: fest@igims.edu
- Location: IGIMS, Patna, Bihar, India
