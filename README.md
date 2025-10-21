# 🌍 Wanderlust

A full-stack travel and hospitality platform for discovering, booking, and reviewing hotels, restaurants, and tourist destinations. Built with Express.js, EJS, MongoDB, and Bootstrap, Wanderlust connects travelers with amazing places while allowing property owners to list their establishments.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-black?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-wanderlust-E94560?style=flat-square)](https://wanderlust-yfvr.onrender.com/listing)

**🔗 Live Site:** [https://wanderlust-yfvr.onrender.com/listing](https://wanderlust-yfvr.onrender.com/listing)

---

## 📸 Screenshots

![Listings](./public/wl01.png)
*Browse all available hotels, restaurants, and tourist destinations*

![Listing Detail](./public/wl02.png)
*Detailed view with reviews, map location, and booking options*

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

---

## ✨ Features

### 🏨 Listing Management
- Browse hotels, restaurants, and tourist destinations
- Detailed listing pages with images, descriptions, and pricing
- Add your own listings (hotels, restaurants, attractions)
- Edit and delete your listings
- Category-based organization
- Image upload with multiple photos per listing

### ⭐ Reviews & Ratings
- User review system with star ratings
- Write detailed reviews for listings
- View all reviews for each property
- Review moderation and management
- Average rating calculation

### 🗺️ Interactive Map View
- Integrated map view for all listings
- Location-based search and discovery
- Geographic visualization of properties
- Pin markers for each listing
- Interactive navigation

### 🔍 Advanced Search & Filters
- Filter by location, price range, and category
- Search by name or description
- Sort by price, rating, or date added
- Multiple filter combinations
- Real-time search results

### 📞 Contact & Booking
- Direct contact with property owners
- Booking inquiry system
- Contact dealer information
- Communication tools

### 👤 User Management
- User registration and authentication
- User profiles
- Manage your own listings
- Review history
- Personalized dashboard

### 🎨 UI/UX Features
- Responsive design with Bootstrap 5
- Mobile-friendly interface
- Clean and intuitive navigation
- Image galleries
- Loading states and animations
- Form validation

---

## 🛠 Tech Stack

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) 16+
- **Framework:** [Express.js](https://expressjs.com/) 4.18+
- **Template Engine:** [EJS](https://ejs.co/)
- **Database:** [MongoDB](https://www.mongodb.com/) 6.0+
- **ODM:** [Mongoose](https://mongoosejs.com/)

### Frontend
- **CSS Framework:** [Bootstrap 5.3+](https://getbootstrap.com/)
- **Icons:** Font Awesome / Bootstrap Icons
- **Template Engine:** EJS (Embedded JavaScript)

### Authentication & Security
- **Authentication:** Passport.js
- **Session Management:** Express Session
- **Password Hashing:** bcrypt
- **Security:** Helmet.js, express-validator

### File Upload & Storage
- **File Upload:** Multer
- **Cloud Storage:** Cloudinary (optional)

### Maps & Geolocation
- **Maps API:** Mapbox / Google Maps
- **Geocoding:** Mapbox Geocoding API

### Development Tools
- **Environment Variables:** dotenv
- **Logging:** Morgan
- **Debugging:** nodemon

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** 16.0 or later
- **MongoDB** 6.0 or later (local or Atlas)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Setup

Create a `.env` file in the root directory with the following variables:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/wanderlust
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wanderlust

# Session Secret
SESSION_SECRET=your-super-secret-session-key-here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Map API Configuration
MAPBOX_TOKEN=your-mapbox-token
# Or for Google Maps:
# GOOGLE_MAPS_API_KEY=your-google-maps-key

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@wanderlust.com

# App Configuration
APP_NAME=Wanderlust
APP_URL=http://localhost:3000

# Security
COOKIE_SECRET=your-cookie-secret
```

---

## 📜 Available Scripts

### Development

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Clear database
npm run db:clear
```

### Database Management

```bash
# Seed the database
node seeds/index.js

# Drop and reseed
npm run db:reset
```

---

## 📁 Project Structure

```
wanderlust/
├── models/                       # Mongoose models
│   ├── listing.js                # Listing model
│   ├── review.js                 # Review model
│   └── user.js                   # User model
├── routes/                       # Express routes
│   ├── listings.js               # Listing routes
│   ├── reviews.js                # Review routes
│   └── users.js                  # User routes
├── controllers/                  # Route controllers
│   ├── listings.js               # Listing controller
│   ├── reviews.js                # Review controller
│   └── users.js                  # User controller
├── views/                        # EJS templates
│   ├── layouts/                  # Layout templates
│   │   ├── boilerplate.ejs       # Main layout
│   │   └── navbar.ejs            # Navigation bar
│   ├── listings/                 # Listing views
│   │   ├── index.ejs             # All listings
│   │   ├── show.ejs              # Single listing
│   │   ├── new.ejs               # Create listing
│   │   └── edit.ejs              # Edit listing
│   ├── users/                    # User views
│   │   ├── login.ejs             # Login page
│   │   └── signup.ejs            # Signup page
│   ├── reviews/                  # Review views
│   └── error.ejs                 # Error page
├── public/                       # Static files
│   ├── css/                      # Custom CSS
│   ├── js/                       # Client-side JS
│   │   ├── map.js                # Map functionality
│   │   └── script.js             # General scripts
│   └── images/                   # Static images
├── middleware/                   # Custom middleware
│   ├── auth.js                   # Authentication middleware
│   └── validation.js             # Validation middleware
├── utils/                        # Utility functions
│   ├── catchAsync.js             # Async error handler
│   ├── ExpressError.js           # Custom error class
│   └── geocoding.js              # Geocoding utilities
├── seeds/                        # Database seeders
│   └── index.js                  # Seed script
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── app.js                        # Express app setup
├── server.js                     # Server entry point
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🌐 API Endpoints

### Listings

```
GET     /listings              # Get all listings
GET     /listings/new          # Show create listing form
POST    /listings              # Create new listing
GET     /listings/:id          # Get single listing
GET     /listings/:id/edit     # Show edit listing form
PUT     /listings/:id          # Update listing
DELETE  /listings/:id          # Delete listing
```

### Reviews

```
POST    /listings/:id/reviews  # Create review for listing
DELETE  /listings/:id/reviews/:reviewId  # Delete review
```

### Users

```
GET     /register              # Show signup form
POST    /register              # Register new user
GET     /login                 # Show login form
POST    /login                 # Login user
GET     /logout                # Logout user
```

---

## 🗄️ Database Schema

### Listing Schema

```javascript
{
  title: String,
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  category: String,
  geometry: {
    type: String,
    coordinates: [Number]
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema

```javascript
{
  rating: Number,
  comment: String,
  author: {
    type: ObjectId,
    ref: 'User'
  },
  listing: {
    type: ObjectId,
    ref: 'Listing'
  },
  createdAt: Date
}
```

### User Schema

```javascript
{
  username: String,
  email: String,
  password: String,
  listings: [{
    type: ObjectId,
    ref: 'Listing'
  }],
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }],
  createdAt: Date
}
```

---

## 🚢 Deployment

### Deploy on Render

1. **Push your code to GitHub**

2. **Create a new Web Service on Render**
   - Go to [render.com](https://render.com/)
   - Connect your GitHub repository
   - Choose "Web Service"

3. **Configure the service**
   ```
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add environment variables**
   - Add all variables from your `.env` file
   - Use MongoDB Atlas for production database

5. **Deploy**
   - Click "Create Web Service"
   - Your app will be live at `your-app-name.onrender.com`

### Deploy on Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create wanderlust-app

# Set environment variables
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set SESSION_SECRET=your-session-secret
heroku config:set CLOUDINARY_CLOUD_NAME=your-cloud-name
# ... add all other variables

# Deploy
git push heroku main
```

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (or allow all: 0.0.0.0/0)
5. Get connection string
6. Update `MONGODB_URI` in your environment variables

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

Need help? Here's how to get support:

- 🌐 **Live Demo:** [https://wanderlust-yfvr.onrender.com/listing](https://wanderlust-yfvr.onrender.com/listing)
- 📧 **Email:** jafrihusain000@gmail.com
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/HusainAbbasJafari/WanderLust/issues)
- 📚 **Documentation:** Check this README

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast web framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Bootstrap](https://getbootstrap.com/) - UI framework
- [EJS](https://ejs.co/) - Template engine
- [Mapbox](https://www.mapbox.com/) - Maps and geolocation
- [Cloudinary](https://cloudinary.com/) - Image hosting

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![Contributions](https://img.shields.io/badge/contributions-welcome-orange?style=flat-square)

---

<div align="center">
  <p>Made with ❤️ for travelers around the world</p>
  <p>© 2025 Wanderlust. Happy Travels! ✈️🌍</p>
</div>
