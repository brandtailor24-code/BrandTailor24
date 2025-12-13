# Brand Tailore 🧵✨

A premium web application for custom tailoring services. Manage orders, track measurements, and provide seamless customer experience with an elegant dark green and gold theme.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [API Endpoints](#-api-endpoints)
- [Available Scripts](#-available-scripts)

---

## ✨ Features

### For Customers
- 🏠 **Landing Page** - Premium design showcasing services
- 📝 **Multi-step Booking** - Easy order placement with fabric selection and add-ons
- 📍 **Order Tracking** - Real-time status updates using Order ID or phone number
- 💬 **Contact Form** - Direct communication with the tailoring team
- ⭐ **Reviews Section** - View customer testimonials

### For Tailors/Admin
- 📊 **Dashboard** - Comprehensive order management interface
- 🔄 **Status Updates** - Update order progress in real-time
- 👥 **Tailor Assignment** - Assign orders to specific tailors
- 📏 **Measurements View** - Access detailed customer measurements
- 📈 **Statistics** - View order counts and status distribution

### Design Highlights
- 🎨 Premium dark green (#0f392b) and gold (#d4af37) color scheme
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🌙 Glass-morphism effects
- 🎯 Intuitive user experience

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18.2 with TypeScript
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM 6.20

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18
- **Database**: LowDB (JSON-based)
- **CORS**: Enabled for frontend communication

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)

To verify your installation:
```bash
node --version
npm --version
```

---

## 🚀 Installation

### 1. Clone or Download the Project
```bash
# If using Git
git clone <repository-url>
cd "Brand tailor"

# Or download and extract the ZIP file
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

This will install:
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `lowdb` - JSON database
- `nodemon` - Development auto-reload (dev dependency)

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

This will install:
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `vite` - Build tool
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-router-dom` - Routing

---

## 🎯 Running the Application

You need to run **both** the backend and frontend simultaneously.

### Option 1: Using Two Terminals (Recommended)

#### Terminal 1 - Start Backend
```bash
cd backend
npm start
```
✅ Backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend will run on `http://localhost:5173`

### Option 2: Using Development Mode

#### Backend with Auto-reload
```bash
cd backend
npm run dev
```
This uses `nodemon` for automatic restart on file changes.

#### Frontend Development Server
```bash
cd frontend
npm run dev
```
Vite provides hot module replacement (HMR) for instant updates.

---

## 📁 Project Structure

```
Brand tailor/
├── backend/
│   ├── server.js           # Express server setup
│   ├── db.json            # JSON database (auto-created)
│   ├── package.json       # Backend dependencies
│   └── node_modules/      # Backend packages
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx           # Application entry point
│   │   ├── App.tsx            # Main app component with routing
│   │   ├── index.css          # Global styles
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   └── Hero.tsx
│   │   └── pages/             # Page components
│   │       ├── LandingPage.tsx
│   │       ├── Booking.tsx
│   │       ├── Services.tsx
│   │       ├── TailorDashboard.tsx
│   │       ├── CustomerPortal.tsx
│   │       ├── Contact.tsx
│   │       ├── About.tsx
│   │       ├── Reviews.tsx
│   │       └── ... (other pages)
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── tsconfig.json      # TypeScript configuration
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── node_modules/      # Frontend packages
│
└── README.md              # This file
```

---

## 📖 Usage Guide

### For Customers

1. **Browse Services**
   - Visit `http://localhost:5173`
   - Explore Men's, Women's, and Wedding packages

2. **Place an Order**
   - Click "Book Now" or navigate to `/book`
   - Follow the 5-step booking process:
     - Step 1: Select service category and type
     - Step 2: Choose fabric option (own/buy)
     - Step 3: Add customization options
     - Step 4: Enter delivery details
     - Step 5: Select payment method and confirm

3. **Track Your Order**
   - Navigate to `/track`
   - Enter your Order ID or phone number
   - View real-time status updates

### For Tailors/Admin

1. **Access Dashboard**
   - Navigate to `/tailor`
   - View all orders in the system

2. **Manage Orders**
   - Click on any order to view details
   - Update order status (Received → In Progress → Ready → Completed)
   - Assign orders to specific tailors
   - View customer measurements and instructions

3. **Switch Views**
   - Toggle between "Admin View" (all orders) and "Tailor View" (active orders only)

---

## 🔌 API Endpoints

### Orders
- `GET /api/orders` - Fetch all orders
- `GET /api/orders/:id` - Fetch specific order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status

### Services
- `GET /api/services` - Fetch all services

### Reviews
- `GET /api/reviews` - Fetch all reviews

### Contact
- `POST /api/contact` - Submit contact form

---

## 📜 Available Scripts

### Backend Scripts
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run type-check # Check TypeScript types
npm run lint       # Run ESLint
```

---

## 🎨 Color Palette

- **Primary Green**: `#0f392b` - Headers, buttons, accents
- **Gold**: `#d4af37` - Highlights, progress bars, premium elements
- **Background**: `#f8f9fa` - Light gray background
- **White**: `#ffffff` - Cards, containers
- **Text**: `#333333` - Primary text

---

## 🐛 Troubleshooting

### Port Already in Use
If you see "Port 5000 already in use":
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Not Connecting to Backend
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in `backend/server.js`
- Verify API URLs in frontend code point to `http://localhost:5000`

### TypeScript Errors
```bash
cd frontend
npm run type-check
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Notes

- **Database**: Uses `db.json` for data storage (automatically created on first run)
- **TypeScript**: Frontend is fully typed for better development experience
- **Hot Reload**: Both frontend and backend support auto-reload during development
- **Production Build**: Run `npm run build` in frontend folder for optimized production bundle

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Brand Tailore Team**

For support or inquiries, please contact us through the application's contact form.

---

**Happy Tailoring! 🧵✨**
