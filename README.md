# 🏡 HomeStay

A modern full-stack property listing platform built with **Node.js, Express.js, MongoDB, React.js, and Cloudinary**. HomeStay allows users to discover, list, and manage rental properties with secure authentication, image uploads, booking inquiries, and role-based access control.

---

## 📖 Overview

HomeStay is designed to simplify property discovery and management. Travelers can browse accommodations, view detailed property information, and connect with hosts, while property owners can create and manage listings through an intuitive dashboard.

---

## ✨ Features

### 👤 Authentication & Authorization

* User Registration & Login
* Secure Password Hashing with bcrypt
* JWT-Based Authentication
* Protected Routes
* Role-Based Access Control (RBAC)
* User Profile Management

### 🏠 Property Management

* Create Property Listings
* Update Property Details
* Delete Listings
* Upload Property Images
* View Property Information
* Manage Listed Properties

### 🔍 Search & Discovery

* Browse Available Properties
* Search Listings by Title or Location
* Filter Properties
* Property Detail Pages

### 📩 Booking & Inquiries

* Send Booking Requests
* Contact Property Owners
* Manage Property Inquiries

### ☁️ Cloud Storage

* Cloudinary Image Uploads
* Optimized Image Delivery
* Secure Media Management

### 🛡️ Security

* Authentication Middleware
* Authorization Checks
* Input Validation
* Environment Variable Protection
* Secure API Endpoints

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Bootstrap / Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Cloud Services

* Cloudinary

### Authentication

* JWT (JSON Web Tokens)
* bcrypt.js

### Deployment

* AWS Elastic Beanstalk
* MongoDB Atlas

---

## 📂 Project Structure

```text
HomeStay/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
│
├── uploads/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd HomeStay
```

### 2. Install Dependencies

Backend

```bash
npm install
```

Frontend

```bash
cd client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start Development Server

Backend

```bash
npm run dev
```

Frontend

```bash
cd client
npm start
```

### 5. Build Production Version

```bash
npm run build
```

---

## 🌐 API Routes

### Authentication

| Method | Route              | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |
| GET    | /api/auth/profile  | User Profile  |

### Properties

| Method | Route               | Description          |
| ------ | ------------------- | -------------------- |
| GET    | /api/properties     | Get All Listings     |
| GET    | /api/properties/:id | Get Property Details |
| POST   | /api/properties     | Create Property      |
| PUT    | /api/properties/:id | Update Property      |
| DELETE | /api/properties/:id | Delete Property      |

### Bookings

| Method | Route         | Description            |
| ------ | ------------- | ---------------------- |
| POST   | /api/bookings | Create Booking Request |
| GET    | /api/bookings | Get User Bookings      |

---

## 🗄️ Database Models

### User

```javascript
{
  fullName: String,
  email: String,
  password: String,
  role: String,
  profileImage: String
}
```

### Property

```javascript
{
  title: String,
  description: String,
  location: String,
  price: Number,
  images: [String],
  amenities: [String],
  createdBy: ObjectId,
  createdAt: Date
}
```

### Booking

```javascript
{
  propertyId: ObjectId,
  userId: ObjectId,
  checkInDate: Date,
  checkOutDate: Date,
  status: String
}
```

---

## ☁️ AWS Elastic Beanstalk Deployment

```bash
eb init
eb create
eb deploy
```

---

## 🚀 Future Enhancements

* Property Reviews & Ratings
* Wishlist Functionality
* Google Maps Integration
* Real-Time Notifications
* Online Payments (Stripe/Razorpay)
* Admin Dashboard
* Property Availability Calendar
* Email Verification
* Multi-Image Gallery
* CI/CD with GitHub Actions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🌍 Live Demo

Add your deployed application URL here.

```text
https://your-homestay-app-url.com
```

---

## 📸 Project Screenshots

Add screenshots of:

* Home Page
* Property Listings
* Property Details Page
* User Dashboard
* Create Listing Page
* Booking Page
* Mobile Responsive View

---

## 👨‍💻 Author

**Priti Maurya**

* Full Stack Developer (MERN)
* AWS Cloud Enthusiast
* Backend & System Design Learner

If you found this project useful, consider giving it a ⭐ on GitHub.
