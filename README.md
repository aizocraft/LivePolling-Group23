# 🗳 LivePolling - Group23
A real-time polling app for conducting interactive live polls. 

## 🚀 Features
- 🔄 **Real-time Polling** with WebSockets
- 📊 **Dynamic Results Update**
- 🎨 **Modern UI with Responsive Design**
- 🔐 **Voting System**
- 🌍 **Deployed Backend & Frontend**

---

## 🌍 Live URLs

    Frontend (Vercel) → https://live-polling-group23-npc5.vercel.app/
    Backend (Render) → https://livepolling-group23.onrender.com

## 📂 Project Structure
```bash
LivePolling-Group23/
│── client/           # Frontend (Vite + React)
│   ├── src/          # React components & pages
│   ├── public/       # Static assets
│   ├── .env          # Frontend environment variables
│   ├── package.json  # Frontend dependencies
│   ├── vite.config.js # Vite configuration
│   └── dist/         # Production build (ignored in Git)
│
│── server/           # Backend (Node.js + Express)
│   ├── src/          # API routes & controllers
│   ├── config/       # Database & environment config
│   ├── .env          # Backend environment variables
│   ├── package.json  # Backend dependencies
│   └── server.js     # Main server file
│
│── README.md         # Project documentation
```

## 🛠️ Technologies Used
### Frontend (Vite + React)

   - Vite ⚡️ (Fast bundler)
   - React.js 🖥️ (Component-based UI)
   - Axios 🔗 (API communication)

### Backend (Node.js + Express)

    Node.js 🚀 (Server-side runtime)
    Express.js ⚡ (Fast API framework)
    MongoDB  🗃️ (Database)

## 💡 Environment Variables

Create a .env file inside both client/ and server/ directories.
Backend (.env)
```bash
PORT=5000
DATABASE_URL=your_database_url
```
Frontend (.env)
```bash
VITE_API_URL=https://your-backend.onrender.com
```

## ⚙️ Installation & Setup
#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aizocraft/LivePolling-Group23.git
cd LivePolling-Group23
```
#### 2️⃣ Set Up Backend (Server - Node.js)
```bash
cd server
npm install
npm start
```
#### 3️⃣ Set Up Frontend (Client - Vite + React)
```bash
cd client
npm install
npm run dev  
```
