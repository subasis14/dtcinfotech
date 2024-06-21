const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4200;

app.use(bodyParser.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

let userData = [];

app.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email  and password are required" });
  }
  userData.push({ username, email, password });
  res.status(201).json({ message: "User data stored successfully" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = userData.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  res.status(200).json({ message: "Login successful" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
