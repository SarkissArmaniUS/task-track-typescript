# 📝 Full-Stack Task Manager App

A full-stack Task Manager application built with modern technologies including **Next.js**, **React**, **TypeScript**, **TailwindCSS**, **Express.js**, and **MongoDB**. The app includes user authentication (JWT), protected routes, and basic task CRUD functionality.

---

## 🚀 Features

- 🔐 User authentication with JWT (Signup & Login)
- 🧠 Auth state managed with React Context API
- 🛡 Protected dashboard route (middleware-based)
- ✅ Create / Read / Delete tasks
- 🧩 Clean modular folder structure
- 💅 Styled with TailwindCSS
- 🔧 Written in TypeScript (frontend and backend)
- ⚡ Fast development setup with `nodemon` and `ts-node`

---

## 📁 Project Structure

### Client (`/client`)

### Server (`/server`)



---

## 🛠 Tech Stack

**Frontend:**
- Next.js 15
- React 19
- TailwindCSS 4
- TypeScript

**Backend:**
- Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- TypeScript

---

## 🧪 Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/task-manager-app.git


# Client
cd client
npm install

# Server
cd ../server
npm install

# Create .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=your_localhost

# In one terminal (client)
cd client
npm run dev

# In another terminal (server)
cd server
npm run dev

