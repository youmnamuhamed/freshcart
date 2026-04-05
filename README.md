# 🛒 FreshCart – E-Commerce Web App

A modern, fully responsive **E-Commerce web application** built using **Next.js** and **TypeScript**, providing a complete online shopping experience with authentication, cart management, wishlist, and online payment integration.

---

## 🚀 Live Demo

🔗 https://freshcart-vert.vercel.app/

---


## ✨ Features

### 🔐 Authentication
- User Registration & Login
- Forgot Password & Reset Password
- Change Password
- JWT-based authentication
- Protected routes

---

### 🛍️ Product Management
- Browse all products
- Product details page
- Categories page
- Brands page
- Search functionality

---

### 🛒 Cart & Wishlist
- Add / Remove products from cart
- Add / Remove products from wishlist
- Real-time updates using Redux

---

### 💳 Checkout & Orders
- Cash on Delivery
- Online Payment
- Place orders
- Orders history page

---

### 👤 User Profile
- View and manage user data
- Secure account management

---

### ⚙️ Additional Features
- Fully responsive design (Mobile / Tablet / Desktop)
- Error handling and validation
- Toast notifications
- Loading states for better UX
- Reusable components and scalable architecture

---

## 🧰 Tech Stack

### ⚛️ Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- CSS

### 🧠 State Management
- Redux Toolkit
- React Redux

### 📡 Data Fetching
- TanStack React Query
- Axios

### 📝 Forms & Validation
- React Hook Form
- Yup
- Zod

### 🎨 UI & UX Libraries
- Font Awesome
- Swiper
- React Image Gallery
- React Toastify
- SweetAlert2

### 🔐 Authentication
- JWT Decode

---

## 📁 Project Structure
src/
│── app/
│ ├── (authentication)/
│ ├── (platform)/
│ ├── layout.tsx
│ ├── page.tsx
│ └── not-found.tsx
│
│── Components/ # Shared reusable UI components
│── Configurations/ # App configurations
│── Constants/ # Static values & constants
│── assets/ # Images, icons, static files
│
│── features/ # Feature-based architecture
│ ├── Authentication/
│ │ ├── Components/
│ │ ├── Hooks/
│ │ ├── Schemas/
│ │ ├── Screens/
│ │ ├── server/
│ │ ├── Store/
│ │ ├── Types/
│ │ └── Utils/
│ │
│ ├── Products/
│ ├── Cart/
│ ├── Categories/
│ ├── Brands/
│ ├── CheckOut/
│ ├── orders/
│ ├── Profile/
│ └── Home/



---

## 🧠 Architecture

This project follows a **feature-based architecture**, where each feature is isolated into its own module containing:

- Components
- Hooks
- API logic
- State management
- Types & utilities

This approach improves:
- Scalability
- Maintainability
- Code organization

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/youmnamuhamed/freshcart.git
2️⃣ Navigate to the project cd freshcart
3️⃣ Install dependencies npm install
4️⃣ Run the development server npm run dev
5️⃣ Open in browser http://localhost:3000


🎯 Project Purpose
This project was developed as a practice task during my Front-End Diploma, focusing on: Building real-world applications Applying modern frontend architecture Improving performance and scalability
🚀 Future Improvements Admin dashboard Product reviews & ratings Advanced filtering Performance optimization
👩‍💻 Author Youmna Muhammed Frontend Developer
💼 LinkedIn: https://www.linkedin.com/
💻 GitHub: https://github.com/youmnamuhamed
