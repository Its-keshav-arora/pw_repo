import WebSocket, { WebSocketServer } from "ws";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Create WebSocket server
const wss = new WebSocketServer({ port: 8000 });
const clients = new Set();

function broadcast(data) {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
}

async function askBytemonk(prompt) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 250,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    return data.content?.[0]?.text || "Bytemonk couldn’t think of a reply 😅";
  } catch (err) {
    console.error("❌ Claude API Error:", err);
    return "Bytemonk had a problem connecting to the AI service.";
  }
}

wss.on("connection", (ws) => {
  console.log("✅ New client connected");
  clients.add(ws);

  ws.send(JSON.stringify({ type: "info", content: "Welcome to the chat!" }));
  ws.send(JSON.stringify({ type: "info", content: "You can ask @Bytemonk anything 🤖" }));

  ws.on("message", async (message) => {
    try {
      const msg = JSON.parse(message);
      console.log(`📩 ${msg.user}: ${msg.content}`);

      broadcast({
        type: "chat",
        user: msg.user,
        content: msg.content,
        timestamp: new Date().toLocaleTimeString(),
      });

      if (msg.content.toLowerCase().includes("@bytemonk")) {
        const query = msg.content.replace(/@bytemonk/gi, "").trim();

        broadcast({
          type: "ai",
          user: "Bytemonk 🤖",
          content: "Thinking... 💭",
          timestamp: new Date().toLocaleTimeString(),
        });

        const aiResponse = await askBytemonk(query || "Hello!");
        console.log("🤖 Bytemonk response:", aiResponse);

        // Send AI reply to everyone
        broadcast({
          type: "ai",
          user: "Bytemonk 🤖",
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
    clients.delete(ws);
  });
});

console.log("🚀 Chat + Bytemonk AI running on ws://127.0.0.1:8000");
