const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: "localhost", // Update with your MySQL host
  user: "root",      // Update with your MySQL username
  password: "19_Anu2004", // Update with your MySQL password
  database: "docs",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// API Routes
app.get("/documents/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM documents WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).send("Document not found");
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/documents", async (req, res) => {
  try {
    const [result] = await pool.query("INSERT INTO documents (content) VALUES ('')");
    const newDocument = { id: result.insertId, content: "" };
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Socket.IO for Real-Time Collaboration
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-document", async (docId) => {
    socket.join(docId);
    try {
      const [rows] = await pool.query("SELECT content FROM documents WHERE id = ?", [docId]);
      if (rows.length > 0) {
        socket.emit("load-document", rows[0].content);
      }
    } catch (err) {
      console.error(err);
    }

    socket.on("send-changes", (changes) => {
      socket.to(docId).emit("receive-changes", changes);
    });

    socket.on("save-document", async (content) => {
      try {
        await pool.query("UPDATE documents SET content = ? WHERE id = ?", [content, docId]);
      } catch (err) {
        console.error(err);
      }
    });
  });

  socket.on("disconnect", () => console.log("A user disconnected"));
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
