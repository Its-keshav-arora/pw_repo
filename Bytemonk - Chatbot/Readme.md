# 💬 Bytemonk AI Chat App

### A Real-time WebSocket Chat Application with an Integrated AI Assistant 🤖  
Built using **Node.js**, **WebSockets**, and **Anthropic Claude API**.  
This project allows multiple users to chat together in real-time —  
and when someone mentions **@Bytemonk**, the message is sent to Claude AI,  
which responds intelligently and broadcasts the answer to everyone.

---

## 🚀 Features

✅ Real-time chat using WebSockets  
✅ Multi-user support (open in multiple tabs to test)  
✅ Integrated AI assistant `@Bytemonk` powered by Anthropic Claude  
✅ Beautiful modern UI with gradients, glassmorphism, and animations  
✅ Typing + auto-scroll effects  
✅ Pure vanilla JavaScript — no frontend framework  

---

## 🏗️ Project Structure
bytemonk-chat/
│
├── server.js # WebSocket + AI backend (Node.js)
├── index.html # Fancy animated chat frontend
├── .env # Environment variables (API key)
├── package.json # Node dependencies
└── README.md # This documentation


---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [Anthropic API Key](https://console.anthropic.com/)
- Any modern web browser (Chrome, Edge, Firefox, Brave)

---

## 🛠️ Installation & Setup

### 1️⃣ Clone or create the folder
```bash
mkdir bytemonk-chat
cd bytemonk-chat
```

2️⃣ Initialize Node project
```bash
npm init -y
```

3️⃣ Install required dependencies
```bash
npm install ws node-fetch dotenv
```

4️⃣ Create .env file
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```
⚠️ Don’t share this key publicly — it’s private to your Anthropic account.

4️⃣ Run this project 

```bash
node app.js
```

