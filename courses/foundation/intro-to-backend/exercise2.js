import express from "express";
import knex from "knex";

const app = express();
const port = 3000;

// This connects to the database stored in the file mentioned below
const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite3",
  },
  useNullAsDefault: true,  // Omit warning in console
});

app.get("/", (req, res) => {
  res.send("Hello from exercise 2!");
});

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});


app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await knexInstance("users").where({ id }).first();
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/search", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Please provide a name query parameter" });
  }

  const users = await knexInstance("users")
    .where("first_name", "like", `%${name}%`);
  
  res.json(users);
});




// TODO implement more routes here

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});