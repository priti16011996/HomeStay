# 🏡 HomeStay

A modern full-stack accommodation listing platform built with **Node.js, Express.js, MongoDB, EJS, Bootstrap, Cloudinary, and Geoapify Maps**. HomeStay allows users to discover unique stays, create and manage property listings, upload images, explore locations through interactive maps, and share their experiences through reviews and ratings.

---

## 📖 Overview

HomeStay is a property listing and discovery platform inspired by modern accommodation marketplaces. Users can browse properties, search listings by location, view detailed property information, explore properties on an interactive map, and leave reviews for places they have visited.

The application focuses on providing a seamless user experience while demonstrating full-stack web development concepts including authentication, CRUD operations, image management, geolocation services, and responsive design.

---

## ✨ Features

### 👤 Authentication & Authorization

* User Registration & Login
* Secure Password Hashing with bcrypt
* JWT-Based Authentication
* Protected Routes
* Role-Based Access Control (RBAC)
* User Session Management

### 🏠 Listing Management

* Create New Property Listings
* Edit Existing Listings
* Delete Listings
* View Detailed Listing Information
* Manage Personal Listings
* Upload Property Images

### 🔍 Search & Discovery

* Browse All Listings
* Search Properties by Title
* Search Properties by Location
* Responsive Listing Cards
* Detailed Property Pages

### ⭐ Reviews & Ratings

* Add Reviews to Listings
* Rate Properties
* View Community Feedback
* Review Management

### 🗺️ Maps & Location Services

* Geoapify Maps Integration
* Interactive Property Locations
* Geocoding Support
* Enhanced Location Discovery

### ☁️ Cloud Storage

* Cloudinary Image Uploads
* Optimized Image Delivery
* Secure Media Storage
* Cloud-Based Image Management

### 🛡️ Security

* Authentication Middleware
* Authorization Checks
* Input Validation
* Secure Environment Variables
* Protected API Endpoints

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS (Embedded JavaScript Templates)
* Font Awesome 4

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication & Security

* JWT (JSON Web Tokens)
* bcrypt.js
* Cookie Parser

### Cloud & External Services

* Cloudinary (Image Storage & Optimization)
* Geoapify Maps API (Maps & Geolocation)

### Deployment

* Render
* MongoDB Atlas

---

## 📂 Project Structure

```text
HomeStay/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   ├── reviews/
│   └── users/
│
├── routes/
├── controllers/
├── models/
├── middlewares/
├── utils/
├── config/
│
├── app.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/priti16011996/HomeStay
cd HomeStay
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEOAPIFY_API_KEY=your_geoapify_api_key
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Start Production Server

```bash
npm start
```

---

## 🌐 Application Routes

### Authentication

| Method | Route   | Description       |
| ------ | ------- | ----------------- |
| GET    | /signup | Signup Page       |
| POST   | /signup | Register User     |
| GET    | /login  | Login Page        |
| POST   | /login  | Authenticate User |
| GET    | /logout | Logout User       |

### Listings

| Method | Route              | Description         |
| ------ | ------------------ | ------------------- |
| GET    | /listings          | View All Listings   |
| GET    | /listings/new      | Create Listing Page |
| POST   | /listings          | Create Listing      |
| GET    | /listings/:id      | Listing Details     |
| GET    | /listings/:id/edit | Edit Listing Page   |
| PUT    | /listings/:id      | Update Listing      |
| DELETE | /listings/:id      | Delete Listing      |

### Reviews

| Method | Route                           | Description   |
| ------ | ------------------------------- | ------------- |
| POST   | /listings/:id/reviews           | Add Review    |
| DELETE | /listings/:id/reviews/:reviewId | Delete Review |

---

## 🗄️ Database Models

### User

```javascript
{
  username: String,
  email: String,
  password: String
}
```

### Listing

```javascript
{
  title: String,
  description: String,
  image: String,
  price: Number,
  location: String,
  country: String,
  owner: ObjectId,
  createdAt: Date
}
```

### Review

```javascript
{
  comment: String,
  rating: Number,
  author: ObjectId,
  listing: ObjectId,
  createdAt: Date
}
```

---

## 🚀 Key Highlights

* Full-Stack MVC Architecture
* Server-Side Rendering with EJS
* RESTful Routing
* JWT Authentication
* CRUD Operations
* Cloudinary Image Management
* Geoapify Maps Integration
* Review & Rating System
* Responsive UI with Bootstrap
* MongoDB Atlas Database
* Render Deployment

---

## ☁️ Deployment

### Render Deployment

```bash
git push origin main
```

The application is deployed on Render with MongoDB Atlas as the cloud database and Cloudinary for image storage.

---

## 📈 Future Enhancements

* Advanced Search Filters
* Property Categories
* Wishlist Functionality
* User Profiles
* Recently Viewed Listings
* Email Notifications
* Admin Dashboard
* Property Availability Tracking
* Social Login Integration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🌍 Live Demo

deployed Render URL here:

```
[https://your-homestay-app.onrender.com](https://homestay-chgo.onrender.com/)
```

---

## 📸 Project Screenshots

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/4aa055e5-1149-41bb-8612-bcfe2dd89ce0" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b15b7977-3e69-4fd2-b8e1-c901de241f70" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c24586d1-2620-4ad5-8b9c-9ad5b339f5d9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/564c5d4d-3d38-4cae-98dd-42d07fff1d72" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6f3af198-ecb4-47b3-9dd0-b00bc215c0c2" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0d03cc48-852b-4404-98a0-30606d608e19" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4d6fe2ef-8b1f-4d82-8d78-904b173f2da3" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4dc8c9c8-f643-462c-abbf-a9c2f11b809a" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cbb61b13-f456-4197-a040-94ad8fdc2f16" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d365d2c9-4a03-4619-a617-b18287c15e08" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/74f2f442-e5ca-42c2-800d-596b47ad0f5d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dce98466-5c83-432b-a222-8949ec103d42" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e346fad1-88ff-4e66-8f89-096bf2a96cd7" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/531fe330-2852-4afe-8a84-5a603dd09f7f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8953ad19-b401-4f7f-b905-a4531e676020" />

---

## 👨‍💻 Author

**Priti Maurya**

* Full Stack Developer
* MERN Stack Enthusiast
* Backend & Cloud Computing Learner

If you found this project useful, consider giving it a ⭐ on GitHub.
