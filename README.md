# 🎯 Team Task Manager

A full-stack **Team Task Management Application** built using the **MERN stack**.
TaskFlow helps teams efficiently manage projects, assign tasks, track progress, and collaborate — all with a modern glassmorphism UI.

---

## 🚀 Live Demo

* 🌐 **Frontend:** https://team-task-manager.vercel.app
* ⚙️ **Backend:** https://team-task-manager-production-dca6.up.railway.app

---

## ✨ Features

### 🔐 Authentication

* Secure Signup & Login (JWT based)
* Persistent user sessions
* Token-based authorization

### 📊 Dashboard

* Overview of all tasks
* Task statistics:

  * Total
  * Pending
  * In Progress
  * Completed
  * Overdue

### 📁 Project Management

* Create and manage projects
* Organize tasks within projects

### ✅ Task Management

* Create, update, and delete tasks
* Assign tasks to team members
* Set priority levels (Low / Medium / High)
* Track status (Pending / In Progress / Completed)
* Add due dates

### 👥 Team Collaboration

* Multi-user support
* Assign tasks across users
* Shared visibility

### 🎨 UI/UX

* Glassmorphism design
* Responsive layout
* Clean and modern interface

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* Axios
* CSS (Glass UI)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* Bcrypt.js

### Deployment

* Frontend → Vercel
* Backend → Railway

---

## 📂 Folder Structure

```
team-task-manager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   ├── .env
│   └── vercel.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/ridafatima1210/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```
npm run dev
```

---

## 🌐 Deployment

### Backend (Railway)

* Connect GitHub repository
* Set root directory to `backend`
* Add environment variables
* Deploy

### Frontend (Vercel)

* Import GitHub repository
* Set root directory to `frontend`
* Add environment variable:

```
VITE_API_URL=https://team-task-manager-production-dca6.up.railway.app/api
```

* Deploy

---

## 🚀 Future Enhancements

* 📧 Forgot Password (Email Integration)
* 🔔 Notifications System
* 📊 Advanced Analytics Dashboard
* 👥 Role-Based Access Control
* 📱 Improved Mobile Responsiveness

---

## 👩‍💻 Author

**Rida Fatima**
GitHub: https://github.com/ridafatima1210

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---
