import { db } from "../config/db.js";

// GET all students
export const getStudents = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM student");
    res.json(rows);
  } catch (err) {
    console.error("GET Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE student
export const createStudent = async (req, res) => {
  const { name, email } = req.body;

  try {
    const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
    const [result] = await db.execute(sql, [name, email]);

    res.json({
      success: true,
      insertedId: result.insertId,
    });
  } catch (err) {
    console.error("CREATE Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE student
export const updateStudent = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    const sql = "UPDATE student SET name=?, email=? WHERE id=?";
    const [result] = await db.execute(sql, [name, email, id]);

    res.json({
      success: true,
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error("UPDATE Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = "DELETE FROM student WHERE id=?";
    const [result] = await db.execute(sql, [id]);

    res.json({
      success: true,
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error("DELETE Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};