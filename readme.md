# 🚀 DevCollab – Connect. Collaborate. Code.

DevCollab is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The platform allows developers to discover and connect with like-minded coders based on their tech stack, interests, experience level, and availability. Think of it as "Tinder for developers", where users swipe to find potential coding partners for collaboration, hackathons, open-source projects, or study groups.

---

## 🧱 Tech Stack

| Tech        | Role                  |
| ----------- | --------------------- |
| **Node.js** | Backend runtime       |
| **Express** | REST API              |
| **MongoDB** | Database              |
| **JWT**     | Auth Token Management |

---

## 📡 API Reference

### 🔐 **Auth Routes**

**Base Path:** `/api/auth`

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| POST   | `/signup` | Register a new user     |
| POST   | `/login`  | Login and get JWT token |
| POST   | `/logout` | Logout the user         |

---

### 👤 **Profile Routes**

**Base Path:** `/api/profile`

| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| GET    | `/view`     | View current user's profile    |
| PATCH  | `/edit`     | Edit profile info (bio, stack) |
| PATCH  | `/password` | Update account password        |

---

### 🔗 **Connection Request Routes**

**Base Path:** `/api/request`

| Method | Endpoint                     | Description                                  |
| ------ | ---------------------------- | -------------------------------------------- |
| POST   | `/send/:status/:toUserId`    | Send a connection request (`accept/decline`) |
| POST   | `/review/:status/:requestId` | Review an incoming request                   |

---

### 🧑‍💻 **User Routes**

**Base Path:** `/api/user`

| Method | Endpoint       | Description                         |
| ------ | -------------- | ----------------------------------- |
| GET    | `/request`     | Get all pending connection requests |
| GET    | `/connections` | View all accepted connections       |
| GET    | `/feed`        | Browse developer feed for matching  |

---

## 🛠️ Setup Instructions

1. git clone https://github.com/priyansh-ankre97/DeveCollabe.git
2. npm install
3. npm run dev
