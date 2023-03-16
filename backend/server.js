const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");  

const app = express();

var corsOptions = {
  origin: "https://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// require("./app/routes/tutorial.routes")(app);
require("./app/routes/user-session.routes")(app);

// ``` SIgn in SIgn up 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Session } = require("./app/models");

// Sign up
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign in
app.post("/signin", async (req, res) => {
  try {
    // const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');
    const token = jwt.sign({ userId: user.id }, 'secret-key');
    await Session.create({ token, userId: user.id });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Synced db.");
})
  .catch((err => {
    console.log("Failed to synced db: " + err.message);
  }));




