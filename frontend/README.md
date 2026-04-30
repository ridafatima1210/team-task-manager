# Team Task Manager 🚀

Full-stack MERN app with role-based access, project management, tasks, and a glassmorphism UI.

## 🧰 Tech Stack
- **Backend:** Node.js, Express, MongoDB, JWT
- **Frontend:** React (Vite), Axios, React Router
- **Styling:** Glassmorphism CSS

## 🏃 Setup & Run

### 1. Clone & install
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure `.env` files
Already provided. Update `MONGO_URI` if using Atlas.

### 3. Run MongoDB
Either locally (`mongod`) or use MongoDB Atlas connection string.

### 4. Start Backend
```bash
cd backend
npm run dev
```
Runs at `http://localhost:5000`

### 5. Start Frontend
```bash
cd frontend
npm run dev
```
Runs at `http://localhost:5173`

## 👥 Roles
- **Admin:** Create/edit/delete projects & tasks, assign users
- **Member:** View projects they belong to, update task status

## ✨ Features
- JWT Authentication (signup/login)
- Role-based access control
- Project CRUD + team members
- Task CRUD with status, priority, due date
- Dashboard (total, pending, in-progress, completed, overdue)
- Glassmorphism UI