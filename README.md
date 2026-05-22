# StudySphere

StudySphere is a modern full-stack study room booking platform built for students and library users who need quiet, organized, and comfortable spaces for studying. Users can explore available study rooms, check detailed information, book rooms for specific time slots, and manage their bookings easily through a clean and responsive interface.

The platform also allows room owners to add and manage their own study room listings. StudySphere focuses on smooth user experience, secure authentication, booking conflict prevention, and a modern recruiter-friendly UI design.

---

# Live Website

https://your-live-link.vercel.app

---

# Client Repository

https://github.com/your-username/client-side-link

---

# Server Repository

https://github.com/your-username/server-side-link

---

# Main Features

- Secure authentication system with JWT protection
- Google login and email/password authentication
- Private routes for authenticated users
- Add, update, and delete study room listings
- Room booking system with real-time cost calculation
- Booking conflict detection to prevent double booking
- Dynamic search and filter functionality
- Amenities filtering system
- Personalized My Listings dashboard
- Personalized My Bookings dashboard
- Booking cancellation feature
- Responsive design for mobile, tablet, and desktop
- Modern and unique UI design
- Dynamic loading spinner and toast notifications
- Latest rooms section using MongoDB sort and limit
- Dynamic browser page titles

---

# Technologies Used

## Frontend
- Next.js
- React.js
- Tailwind CSS
- Hero UI
- React Hot Toast
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB
- jose-cjs

---

# Authentication Features

- JWT token verification
- Protected private routes
- Google authentication
- Persistent user session
- Secure authorization system

---

# Pages Included

- Home Page
- Rooms Page
- Room Details Page
- Add Room Page
- My Listings Page
- My Bookings Page
- Login Page
- Register Page
- Update Room Page
- Custom 404 Page

---

# Search & Filter Features

Users can:

- Search rooms by room name
- Filter rooms by amenities
- Filter rooms by hourly price range

---

# Booking Features

- Book rooms with date and time selection
- Automatic total cost calculation
- Prevent overlapping bookings
- Booking confirmation system
- Booking cancellation functionality

---

# Environment Variables

Sensitive information is secured using `.env` files.

Example:

```env
MONGO_URI=your_mongodb_uri
CLIENT_URL=your_client_url
NEXT_PUBLIC_SERVER_URL=your_server_url