import mysql from "mysql2/promise";  // use promise version so you can await
import express from 'express';
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // include needed methods
    credentials: true
}));



const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// GET all students
app.get("/", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM student");
        res.json(rows);
    } catch (err) {
        console.error("Error in GET /:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// CREATE new student
app.post('/create', async (req, res) => {
    const { name, email } = req.body;
    try {
        const sql = "INSERT INTO student (`name`, `email`) VALUES (?, ?)";
        const [result] = await db.execute(sql, [name, email]);
        res.json({ success: true, insertedId: result.insertId });
    } catch (err) {
        console.error("Error in POST /create:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// UPDATE student by id
app.put('/update/:id', async (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
    try {
        const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?";
        const [result] = await db.execute(sql, [name, email, id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error("Error in PUT /update/:id:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE student by id
app.delete('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "DELETE FROM student WHERE id = ?";
        const [result] = await db.execute(sql, [id]);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error("Error in DELETE /student/:id:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.listen(process.env.PORT, () => {
    console.log('Backend listening on port ' + process.env.PORT);
});