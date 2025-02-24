// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000; // คุณสามารถเปลี่ยนเป็นพอร์ตอื่นได้

const path = require("path");

// ให้ Express ใช้ไฟล์จาก frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


// เปิดใช้งาน CORS
app.use(cors());

// เพื่อให้ Express สามารถอ่านข้อมูล JSON ใน request body
app.use(express.json());

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // แก้ให้ตรงกับ username ของคุณ
  password: '',// แก้ให้ตรงกับ password ของคุณ
  database: 'crud_db'  // ชื่อฐานข้อมูล (ดูขั้นตอนสร้างด้านล่าง)
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// ---------------------------------------------------
// ส่วนของ CRUD (Create, Read, Update, Delete)
// ---------------------------------------------------

// 1) CREATE: เพิ่มข้อมูลใหม่
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // ส่งข้อมูลกลับเพื่อยืนยัน
    res.json({
      id: results.insertId,
      name,
      description
    });
  });
});

// 2) READ: อ่านข้อมูลทั้งหมด
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 3) UPDATE: แก้ไขข้อมูลตาม id
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [name, description, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item updated successfully' });
  });
});

// 4) DELETE: ลบข้อมูลตาม id
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// ---------------------------------------------------
// เริ่มรันเซิร์ฟเวอร์
// ---------------------------------------------------
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to My CRUD API 🚀");
});
