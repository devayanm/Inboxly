# 📬 Inboxly – Open Source Messenger Platform

**Inboxly** is a standalone, real-time messenger platform designed for teams and products that need a fully integratable communications inbox — at both the **API level** and **code level**. Build a hosted messaging service or embed Inboxly directly into your app for seamless messaging experiences.

> ⭐ Star this repository to support the project and attract contributors!

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/devayanm/Inboxly?style=social)](https://github.com/devayanm/Inboxly/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/devayanm/Inboxly?style=social)](https://github.com/devayanm/Inboxly/network/members)
[![GitHub issues](https://img.shields.io/github/issues/devayanm/Inboxly)](https://github.com/devayanm/Inboxly/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/devayanm/Inboxly)](https://github.com/devayanm/Inboxly/pulls)

---
[![OSCI-Project-Banner.png](https://i.postimg.cc/76mJvBmF/OSCI-Project-Banner.png)](https://postimg.cc/8JfzMb84)

## 🎯 Vision

Inboxly provides a modern, secure, and extensible messaging inbox that supports direct messages, group chats, threading, message search, and attachments — all while being self-hostable and easy to integrate into existing codebases.

---

## 🔑 Core Features

### Messaging
- 1:1 direct messages and group chats
- Threaded replies and message reactions
- Typing & presence indicators
- Read receipts and delivery status
- Message edit & delete
- Rich text, markdown, and code snippets

### Attachments & Media
- File and image uploads with previews
- Attachment storage via local disk or S3-compatible stores
- Link preview & attachments metadata

### Real-time & Offline
- Real-time via Socket.IO / WebSockets
- Offline message queueing & local caching
- Sync across devices

### Security & Moderation
- Endpoints protected via JWT auth
- Role-based access and admin controls
- Content moderation tooling (filters, reports)

### Integration & Extensibility
- REST & GraphQL APIs for all operations
- SDKs/hooks for direct code-level embedding (Node.js/React examples)
- Plugin system for adding features (e.g., bots, automations)
- Webhooks for external integrations (CRM, notifications)

### Admin & Analytics
- Admin panel (user and conversation management)
- Basic analytics (message volume, active users)
- Export and backup utilities

---

## 🧰 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React + Vite                      |
| Styling   | Tailwind CSS                      |
| Backend   | Node.js + Express                 |
| Database  | MongoDB                           |
| Real-time | Socket.IO                          |
| Auth      | JWT + RBAC                        |
| Storage   | Local / S3-compatible             |
| Hosting   | Render / Vercel / DigitalOcean    |

---

## 🗂 Project Structure (suggested)

```
/inboxly
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── server.js
├── frontend/
│   ├── assets/
│   ├── components/
│   |   ├── Footer.jsx
│   |   ├── Navbar.jsx
|   |   └── Profile.jsx
│   ├── context/
|   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Auth.jsx
│   │   ├── Landing.jsx
│   │   └── Welcome.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── sdk/                     # Example SDKs for embedding (Node, React)
├── scripts/                 # Migration & backup scripts
├── plugins/                 # Optional plugin modules
├── .env.example
└── README.md
```

---

## 🚀 Getting Started (Developer)

1. Clone repo
```bash
git clone https://github.com/YOUR_USERNAME/inboxly.git
cd inboxly
```

2. Install
```bash
npm install
# or
yarn install
```

3. Configure
```bash
cp .env.example .env
# add MONGODB_URI, JWT_SECRET, STORAGE_PROVIDER, etc.
```

4. Run
```bash
# backend
cd backend && npm run dev
# frontend
cd frontend && npm run dev
```

Open `http://localhost:3000` (or configured port) to view the app.

---

## 🤝 Contribution Guide (short)

- Fork → branch (`feat/` / `fix/`) → commit → PR
- Use Conventional Commits
- Add tests for backend logic where applicable
- Keep PRs focused and documented

Full contribution docs available in `CONTRIBUTING.md`.

---

## 🔐 Environment Variables (.env.example)
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `STORAGE_PROVIDER` (local/s3)
- `S3_BUCKET` (if using S3)
- `S3_REGION`

---

## 📄 License
MIT License — free for open-source and commercial use.
