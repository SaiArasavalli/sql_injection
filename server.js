const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: "app_user",
  host: "localhost",
  database: "app_database",
  password: "app_password",
  port: 5432,
});

app.use(express.json());
app.use(express.static("public"));

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    /*
    _______PARAMETERIZED QUERY_______
    const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    const result = await pool.query(query, [username, password]);
    
    */
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const result = await pool.query(query);
    console.log(query);
    console.table(result.rows);

    if (result.rows.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.log("Error executing SQL query: ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
