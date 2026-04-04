import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,   // max connections
  queueLimit: 0
});

// Optional check
db.getConnection()
  .then(() => console.log("✅ DB Connected (Pool)"))
  .catch((err) => console.error("❌ DB Connection Error:", err));