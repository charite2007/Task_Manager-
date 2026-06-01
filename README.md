# 📝 Task Manager Application

A full-stack task management application built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Edit existing tasks with modal interface
- ✅ Responsive design for all devices
- ✅ Dark theme with orange accents
- ✅ Real-time database synchronization
- ✅ Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **React DOM** - DOM rendering

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📦 Project Structure

```
Task_Manager-/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── EditModal.jsx
│   │   ├── api/
│   │   │   └── task.api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── task.controller.js
│   │   ├── models/
│   │   │   └── task.models.js
│   │   ├── routes/
│   │   │   └── task.routes.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── app.js
│   │   └── server.js
│   ├── render.yaml
│   ├── .env (not included - create locally)
│   └── package.json
└── README.md
```

## 🏃 Local Development

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Git

### Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5001" > .env
echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority" >> .env
echo "NODE_ENV=development" >> .env

# Start server
npm start
```

Backend will run on `http://localhost:5001`

### Setup Frontend

```bash
# Navigate to frontend (in another terminal)
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "VITE_API_URL=http://localhost:5001/api/task" > .env.local

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Production Deployment

### Deploy Backend to Render

1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create new Web Service:
   - Name: `task-manager-backend`
   - Runtime: Node
   - Build: `npm install`
   - Start: `npm start`
   - Plan: Free
4. Add environment variables:
   - `PORT`: 5001
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `NODE_ENV`: production
5. Deploy

### Deploy Frontend to Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Configure project:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build: `npm run build`
   - Output: `dist`
4. Add environment variables:
   - `VITE_API_URL`: Your Render backend URL
5. Deploy

### Update CORS (Important!)

Update `backend/src/app.js` with your Vercel URL:

```javascript
app.use(
  cors({
    origin: "https://your-app.vercel.app",
    credentials: true,
  }),
);
```

## 📝 API Endpoints

### Base URL

- **Local**: `http://localhost:5001/api/task`
- **Production**: `https://your-backend.onrender.com/api/task`

### Endpoints

- `GET /` - Get all tasks
- `POST /create` - Create new task
- `PUT /:id` - Update task
- `DELETE /:id` - Delete task

## 🎨 Styling Features

- Dark theme with gradient backgrounds
- Orange accent colors
- Responsive grid layout
- Smooth animations and transitions
- Touch-friendly button sizes
- Accessibility features (focus indicators, reduced motion support)

## 🔐 Environment Variables

### Backend (.env)

```
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
NODE_ENV=development
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:5001/api/task
```

## 🐛 Troubleshooting

### Tasks not saving?

- Check backend is running (`npm start` in backend folder)
- Verify MongoDB connection string in .env
- Check browser console for CORS errors

### Backend not connecting to MongoDB?

- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
- Ensure .env file exists with proper credentials

### Frontend won't load?

- Verify Vite is running (`npm run dev`)
- Check VITE_API_URL in .env.local
- Clear browser cache and restart dev server

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

Created as a learning project for full-stack web development.

## 🤝 Contributing

Feel free to fork and submit pull requests!

---

**Happy Task Managing!** 🚀
