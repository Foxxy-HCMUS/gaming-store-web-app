const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// const path = __dirname + "/app/views/";

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
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:8081"); // only allow requests from this origin 
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/game.routes")(app);

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
//     if (!user) throw new Error("User not found");
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) throw new Error("Invalid password");
//     const token = jwt.sign({ userId: user.id }, "secret-key");
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
const Game = db.game;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Synced db.");
  initial();
}).catch((err => {
    console.log("Failed to synced db: " + err.message);
  }));

  
// app.get("/", function (req,res) {
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
  
  // ================== initial for 5 games: 
  Game.create({
    id: 1,
    title: "Cyberpunk 2077",
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
    thumbnails: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    cardImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg",
    cardTagline: "Night City changes everybody",
    mainPrice: 59.99,
    discountPercentage: 0,
    discountedPrice: 59.99,
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    releaseDate: "2020-12-10",
    platform: ["Windows", "PlayStation", "Xbox"],
    genres: ["RPG"],
    features: ["Single-player", "Steam Achievements", "Full controller support", "In-App Purchases"],
    tags: ["Cyberpunk", "Open World", "RPG", "Futuristic", "Sci-fi"],
    aboutGame: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
    gameFeatures: ["PLAY AS A MERCENARY OUTLAW", "LIVE IN THE CITY OF THE FUTURE", "STEAL THE IMPLANT THAT GRANTS ETERNAL LIFE"],
    heroImages: ["https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg"],
    images: ["https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg"]
  });

  Game.create({
    id: 2,
    title: "Red Dead Redemption 2",
    description: "Red Dead Redemption 2 is an epic tale of life in America’s unforgiving heartland. The game\"s vast and atmospheric world also provides the foundation for a brand new online multiplayer experience.",
    thumbnails: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    cardImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg",
    cardTagline: "America, 1899. The end of the wild west era has begun.",
    mainPrice: 59.99,
    discountPercentage: 33,
    discountedPrice: 40.19,
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2019-12-05",
    platform: ["Windows"],
    genres: ["Action", "Adventure"],
    features: ["Single-player", "Multi-player", "Online Multi-Player", "Steam Achievements", "Full controller support", "Steam Cloud"],
    tags: ["Open World", "Western", "Action", "Adventure", "Story Rich"],
    aboutGame: "Red Dead Redemption 2 is an epic tale of life in America’s unforgiving heartland. The game\"s vast and atmospheric world will also provide the foundation for a brand new online multiplayer experience.",
    gameFeatures: ["Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores", "Includes Red Dead Online", "With all new graphical and technical enhancements for deeper immersion"],
    heroImages: ["https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg"],
    images: ["https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg"]
  });

  Game.create({ 
    id: 3, 
    title: "Minecraft", 
    description: "A sandbox video game where you can create and explore infinite worlds of your own.", 
    thumbnails: "https://cdn.cloudflare.steamstatic.com/steam/apps/47890/header.jpg", 
    cardImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/47890/capsule_616x353.jpg", 
    cardTagline: "Build anything you can imagine with unlimited resources in Creative mode, or go on grand expeditions in Survival, journeying across mysterious lands and into the depths of your own infinite worlds.", 
    mainPrice: 26.95, 
    discountPercentage: 0, 
    discountedPrice: 26.95, 
    developer: "Mojang Studios", 
    publisher: "Mojang Studios", 
    releaseDate: "2011-11-18", 
    platform: ["Windows", "Mac OS X", "Linux"], 
    genres: ["Adventure", "Simulation"], 
    features: ["Single-player", "Multi-player", "Online Multi-Player", "Local Multi-Player", "Co-op", "Online Co-op", "Local Co-op", "Cross-Platform Multiplayer", "Steam Achievements", "Steam Cloud", "Full controller support"], 
    tags: ["Sandbox", "Open World", "Building", "Survival"], 
    aboutGame: "Minecraft is a game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles. Play in Creative mode with unlimited resources or mine deep into the world in Survival mode, crafting weapons and armor to fend off the dangerous mobs.", 
    gameFeatures: ["Create and explore infinite worlds of your own.", "Discover new biomes, structures, and creatures.", "Craft unique items and weapons with different materials and enchantments.", "Play with friends online or on a local network.", "Customize your game with mods, skins, texture packs, and more."], 
    heroImages: ["https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_4f4f0c8a8b6c9a6d7f3e3c9b7a6e9f2c0d2e2a1b.1920x1080.jpg","https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_4d4f5e8c8b1a6a7d6f2e2c8b6a6e9f2c0d2e2a1b.1920x1080.jpg","https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_3f3f4c8a8b5a9a6d7e3e3c9b7a6e9f2c0d2e2a1b.1920x1080.jpg","https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_2f2f3c8a8b4a9a6d6e3e3c9b7a6e9f2c0d2e2a1b.1920x1080.jpg","https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_1f1f2c8a8b3a9a6d5e3e3c9b7a6e9f2c0d2e2a1b.1920x1080.jpg"],
    images: ["https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_4f4f0c8a8b6c9a6d7f3e3c9b7a6e9f2c0d2e2a1b.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_4d4f5e8c8b1a6a7d6f2e2c8b6a6e9f2c0d2e2a1b.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/47890/ss_3f3f4c8a8b5a9a6d7e3e3c9b7a6e9f2c0d2e2a1b.600x338.jpg"]
  })

  Game.create({
    id: 4,
    title: "Among Us",
    description: "An online and local party game of teamwork and betrayal for 4-15 players...in space!",
    thumbnails: "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
    cardImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/capsule_616x353.jpg",
    cardTagline: "Play with 4-15 players online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!",
    mainPrice: 4.99,
    discountPercentage: 0,
    discountedPrice: 4.99,
    developer: "Innersloth",
    publisher: "Innersloth",
    releaseDate: "2018-11-16",
    platform: ["Windows"],
    genres: ["Casual"],
    features: ["Online Multi-Player", "Local Multi-Player", "Online Co-op", "Local Co-op", "Cross-Platform Multiplayer", "Steam Achievements", "Full controller support", "In-App Purchases"],
    tags: ["Multiplayer", "Social Deduction", "Space", "Casual"],
    aboutGame: "Play with 4-15 players online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone! Originally created as a party game, we recommend playing with friends at a LAN party or online using voice chat. Enjoy cross-platform play between Android, iOS and PC.",
    gameFeatures: ["Win by completing tasks to prepare the ship or ejecting all Impostors.", "React quickly to undo the Impostor\"s sabotages.", "Check the Admin map and Security cameras to keep tabs on other Crewmates.", "Report any dead bodies immediately to start discussion of who the suspected Impostor is.", "Call emergency meetings to discuss suspicious behavior.", "Vote to eliminate the most suspicious Crewmate."],
    heroImages: ["https://cdn.cloudflare.steamstatic.com/steam/apps/945360/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg"],
    images: ["https://cdn.cloudflare.steamstatic.com/steam/apps/945360/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg"]
  });

  Game.create({
    id: 5,
    title: "Portal",
    description: "Portal™ is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.",
    thumbnails: "https://cdn.cloudflare.steamstatic.com/steam/apps/400/header.jpg",
    cardImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/400/capsule_616x353.jpg",
    cardTagline: "The cake is a lie.",
    mainPrice: 9.99,
    discountPercentage: 0,
    discountedPrice: 9.99,
    developer: "Valve",
    publisher: "Valve",
    releaseDate: "2007-10-10",
    platform: ["Windows", "Mac", "Linux"],
    genres: ["Action"],
    features: ["Single-player", "Steam Achievements", "Steam Trading Cards", "Captions available", "Commentary available", "Includes Source SDK"],
    tags: ["Puzzle", "First-Person", "Sci-fi", "Comedy"],
    aboutGame: "Portal™ is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay. The game is designed to change the way players approach, manipulate, and surmise the possibilities in a given environment; similar to how Half-Life® 2\"s Gravity Gun innovated new ways to leverage an object in any given situation.",
    gameFeatures: ["The game\"s two-player cooperative mode features its own entirely separate campaign with a unique story, test chambers, and two new player characters.", "Advanced physics: Allows for the creation of a whole new range of interesting challenges, producing a much larger but not harder game.", "Original music.", "Massive sequel: The original Portal was named 2007\"s Game of the Year by over 30 publications worldwide.", ".Editing Tools: Portal 2 editing tools will be included."],
    heroImages: ["https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg"],
    images: ["https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg", "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg"]
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






