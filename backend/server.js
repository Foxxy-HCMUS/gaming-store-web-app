const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// const path = __dirname + '/app/views/';

const app = express();

// app.use(express.static(path));


// Cái này bị lỗi, không nhận được origin
// var corsOptions = {
//   origin: "https://localhost:8081"
// };

// app.use(cors(corsOptions));
app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);

// // ``` SIgn in SIgn up 
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { User, Session } = require("./app/models");

// Sign up


// set routes 
// require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);

// // Sign in
// app.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // const email = req.body.email;
//     // const password = req.body.password;
//     const user = await User.findOne({ where: { email } });
//     if (!user) throw new Error('User not found');
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) throw new Error('Invalid password');
//     const token = jwt.sign({ userId: user.id }, 'secret-key');
//     await Session.create({ token, userId: user.id });
//     res.json({ token });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Synced db.");
  initial();
}).catch((err => {
    console.log("Failed to synced db: " + err.message);
  }));

  
// app.get('/', function (req,res) {
//   res.sendFile(path + "index.html");
// });

function initial() {
  Role.create({
    id: 1, 
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3, 
    name: "admin"
  });
  
}


// app.post("/api/auth/signup", async (req, res) => {
//   console.log("anything");
//   try {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await db.user.create({ email, password: hashedPassword });
//     res.status(201).json({ user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });






