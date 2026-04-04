# 📘 CRUD Project (Student Management System)

This is a full-stack CRUD (Create, Read, Update, Delete) application built using React (Frontend) and Node.js + Express + MySQL (Backend).

It allows users to manage student data with basic operations like adding, viewing, updating, and deleting records.

---

## 🚀 Features

- ➕ Add new student  
- 📋 View all students  
- ✏️ Update student details  
- ❌ Delete student  
- 🔗 REST API integration  
- 💾 MySQL database connectivity  

---

## 🛠️ Tech Stack

### Frontend
- React  
- Axios  
- Bootstrap  
- React Router DOM  

### Backend
- Node.js  
- Express.js  
- MySQL  
- dotenv  
- cors  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

Run the following:
```bash
git clone https://github.com/vaishnavinimkarde/crud-project.git
cd crud-project
```

### 2️⃣ Install Backend Dependencies

Run the following:
```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

Run the following:

```bash
cd ../frontend
npm install
```


### 4️⃣ Setup Environment Variables (Backend)

Create a `.env` file inside the backend folder and add:

```env
PORT=8081
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crud
```


### 5️⃣ Setup Database

Run the following in MySQL:

```sql
CREATE DATABASE crud;

USE crud;

CREATE TABLE student (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
```

### 6️⃣ Run Backend Server

Run the following:

```bash
cd backend
npm start
```

### 7️⃣ Run Frontend

Run the following:

```bash
cd ../frontend
npm start
```
