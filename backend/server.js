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
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
    initial();
  })
  .catch((err) => {
    console.log("Failed to synced db: " + err.message);
  });

// app.get("/", function (req,res) {
//   res.sendFile(path + "index.html");
// });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  // ================== initial for 5 games:
  Game.create({
    id: 1,
    title: "Cyberpunk 2077",
    description:
      "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
    thumbnails:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    cardImage:
      "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S2_03_1200x1600-b1847981214ac013383111fc457eb9c5?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Night City changes everybody",
    mainPrice: 59.99,
    discountPercentage: 0,
    discountedPrice: 59.99,
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    releaseDate: "2020-12-10",
    platform: ["Windows", "PlayStation", "Xbox"],
    genres: ["RPG"],
    features: [
      "Single-player",
      "Steam Achievements",
      "Full controller support",
      "In-App Purchases",
    ],
    tags: ["Cyberpunk", "Open World", "RPG", "Futuristic", "Sci-fi"],
    aboutGame:
      "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
    gameFeatures: [
      "PLAY AS A MERCENARY OUTLAW",
      "LIVE IN THE CITY OF THE FUTURE",
      "STEAL THE IMPLANT THAT GRANTS ETERNAL LIFE",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
    ],
  });

  Game.create({
    id: 2,
    title: "Red Dead Redemption 2",
    description:
      'Red Dead Redemption 2 is an epic tale of life in America’s unforgiving heartland. The game"s vast and atmospheric world also provides the foundation for a brand new online multiplayer experience.',
    thumbnails:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    cardImage:
      "https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic%20Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=480&quality=medium&resize=1&w=360",
    cardTagline: "America, 1899. The end of the wild west era has begun.",
    mainPrice: 59.99,
    discountPercentage: 33,
    discountedPrice: 40.19,
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2019-12-05",
    platform: ["Windows"],
    genres: ["Action", "Adventure"],
    features: [
      "Single-player",
      "Multi-player",
      "Online Multi-Player",
      "Steam Achievements",
      "Full controller support",
      "Steam Cloud",
    ],
    tags: ["Open World", "Western", "Action", "Adventure", "Story Rich"],
    aboutGame:
      'Red Dead Redemption 2 is an epic tale of life in America’s unforgiving heartland. The game"s vast and atmospheric world will also provide the foundation for a brand new online multiplayer experience.',
    gameFeatures: [
      "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores",
      "Includes Red Dead Online",
      "With all new graphical and technical enhancements for deeper immersion",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
    ],
  });

  Game.create({
    id: 3,
    title: "Hades",
    description:
      "Hades is an action-packed roguelike game developed and published by Supergiant Games. The game is set in the underworld of Greek mythology, where the player takes on the role of Zagreus, son of Hades. The objective is to fight your way through the various levels of the underworld, battling a variety of monsters and bosses. The game features a unique progression system, where the player can upgrade their abilities and weapons as they progress through the game. With its engaging story, fast-paced combat, and beautiful art style, Hades has received critical acclaim and numerous awards.",
    thumbnails:
      "https://cdn2.unrealengine.com/hades-eventcover-01-800x450-983740629.png?h=270&quality=medium&resize=1&w=480",
    cardImage:
      "https://cdn1.epicgames.com/min/offer/1200x1600-1200x1600-e92fa6b99bb20c9edee19c361b8853b9.jpg?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Escape the underworld and defy the gods",
    mainPrice: 24.99,
    discountPercentage: 0,
    discountedPrice: 24.99,
    developer: "Supergiant Games",
    publisher: "Supergiant Games",
    releaseDate: "2020-09-17",
    platform: [
      "PC",
      "Nintendo Switch",
      "PlayStation 4",
      "PlayStation 5",
      "Xbox One",
      "Xbox Series X/S",
    ],
    genres: ["Action", "Roguelike", "Indie"],
    features: [
      "Single-player",
      "Fast-paced combat",
      "Upgradeable abilities and weapons",
    ],
    tags: ["Greek mythology", "Beautiful art style", "Critically acclaimed"],
    aboutGame:
      "Hades is an action-packed roguelike game set in the underworld of Greek mythology. The player takes on the role of Zagreus, son of Hades, as he battles his way through the various levels of the underworld. The game features fast-paced combat, upgradeable abilities and weapons, and a unique progression system that keeps the gameplay fresh and exciting. With its engaging story, beautiful art style, and critically acclaimed gameplay, Hades is a must-play for fans of action and roguelike games.",
    gameFeatures: [
      "Action-packed gameplay: Battle your way through the underworld of Greek mythology, fighting a variety of monsters and bosses.",
      "Upgradeable abilities and weapons: Upgrade your character's abilities and weapons as you progress through the game.",
      "Unique progression system: The game features a unique progression system that keeps the gameplay fresh and exciting.",
      "Fast-paced combat: The combat in Hades is fast-paced and exhilarating, with a variety of weapons and abilities to choose from.",
      "Engaging story: Follow the story of Zagreus, son of Hades, as he battles his way through the underworld.",
      "Beautiful art style: The game features a beautiful art style inspired by Greek mythology.",
      "Critically acclaimed: Hades has received critical acclaim and numerous awards since its release in 2020.",
      "Single-player: The game is a single-player experience.",
    ],
    heroImages: [
      "https://cdn.vox-cdn.com/thumbor/2aFzFz4lGjWQ4ri8lN3SRvZpGfQ=/0x0:1920x1080/920x613/filters:focal(811x299:1111x599):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67332773/Hades_Keyart.0.png",
      "https://cdn.vox-cdn.com/thumbor/8QzRZl6fS0-9FbM5R5hH1yDwJrQ=/0x0:1920x1080/920x613/filters:focal(892x245:1228x581):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67332774/gameplay_screenshot_16.0.png",
      "https://cdn.vox-cdn.com/thumbor/4OaR9n0V5QnZMf3Tg3YmVW-D5i4=/0x0:1920x1080/920x613/filters:focal(858x205:1194x541):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67332775/gameplay_screenshot_15.0.png",
    ],
    images: [
      "https://cdn.vox-cdn.com/thumbor/2aFzFz4lGjWQ4ri8lN3SRvZpGfQ=/0x0:1920x1080/920x613/filters:focal(811x299:1111x599):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67332773/Hades_Keyart.0.png",
      "https://cdn.vox-cdn.com/thumbor/8QzRZl6fS0-9FbM5R5hH1yDwJrQ=/0x0:1920x1080/920x613/filters:focal(892x245:1228x581):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67332774/gameplay_screenshot_16.0.png",
      "https://cdn.vox-cdn.com/thumbor/4OaR9n0V5QnZMf3Tg3YmVW-D5i4=/0x0:1920x1080/920x613/filters:focal(858x205:1194x541):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67332775/gameplay_screenshot_15.0.png",
    ],
  });

  Game.create({
    id: 4,
    title: "Among Us",
    description:
      "An online and local party game of teamwork and betrayal for 4-15 players...in space!",
    thumbnails:
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g1a-00-1920x1080-3c552a5212ff.jpg",
    cardImage:
      "https://cdn1.epicgames.com/salesEvent/salesEvent/amogusportrait_1200x1600-66ad0e4d363e1c92f9f8aae67a96dd31?h=480&quality=medium&resize=1&w=360",
    cardTagline:
      "Play with 4-15 players online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!",
    logo: 
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-ic1-400x400-78897c653ffe.png?h=270&quality=medium&resize=1&w=480",
    mainPrice: 4.99,
    discountPercentage: 0,
    discountedPrice: 4.99,
    developer: "Innersloth",
    publisher: "Innersloth",
    releaseDate: "2018-11-13",
    platform: ["Windows", "Macbooks"],
    genres: ["Casual"],
    features: [
      "Online Multi-Player",
      "Local Multi-Player",
      "Online Co-op",
      "Local Co-op",
      "Cross-Platform Multiplayer",
      "Steam Achievements",
      "Full controller support",
      "In-App Purchases",
    ],
    tags: ["Multiplayer", "Social Deduction", "Space", "Casual"],
    aboutGame:
      "Play with 4-15 players online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone! Originally created as a party game, we recommend playing with friends at a LAN party or online using voice chat. Enjoy cross-platform play between Android, iOS and PC.",
    gameFeatures: [
      "Win by completing tasks to prepare the ship or ejecting all Impostors.",
      'React quickly to undo the Impostor"s sabotages.',
      "Check the Admin map and Security cameras to keep tabs on other Crewmates.",
      "Report any dead bodies immediately to start discussion of who the suspected Impostor is.",
      "Call emergency meetings to discuss suspicious behavior.",
      "Vote to eliminate the most suspicious Crewmate.",
    ],
    heroImages: [
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g1a-00-1920x1080-3c552a5212ff.jpg",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g1a-02-1920x1080-0729ec4e1291.jpg",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g1a-03-1920x1080-2b74d07d4ea1.jpg",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-00-1920x1080-fb38dc819940.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-01-1920x1080-76030aaebf7c.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-02-1920x1080-caa3acd91a4a.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-03-1920x1080-738e4ef8ea93.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-04-1920x1080-af409ccadf66.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-04-1920x1080-af409ccadf66.jpg?h=720&quality=medium&resize=1&w=1280",
    ],
    images: [
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-00-1920x1080-fb38dc819940.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-01-1920x1080-76030aaebf7c.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-02-1920x1080-caa3acd91a4a.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-03-1920x1080-738e4ef8ea93.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-04-1920x1080-af409ccadf66.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/egs-amongus-innersloth-g2-04-1920x1080-af409ccadf66.jpg?h=720&quality=medium&resize=1&w=1280",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Window 10 x 32bit",
            "Processor": "Intel i3-4330",
            "Memory" : "1 GB RAM",
            "Storage": "250 MB",
            "DirectX": "Version 10",
            "Graphics": "Intel HD Graphic 4600"
          },
          "Recommended": {
            "OS": "Window 10 x 64bit",
            "Processor": "Intel i3-4330",
            "Memory" : "4 GB RAM",
            "Storage": "250 MB",
            "DirectX": "Version 10",
            "Graphics": "Nvidia GTX 650"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "Macbook 10 x 32bit",
            "Processor": "Intel i3-4330",
            "Memory" : "1 GB RAM",
            "Storage": "250 MB",
            "DirectX": "Version 10",
            "Graphics": "Intel HD Graphic 4600"
          },
          "Recommended": {
            "OS": "Macbook 10 x 64bit",
            "Processor": "Intel i3-4330",
            "Memory" : "4 GB RAM",
            "Storage": "250 MB",
            "DirectX": "Version 10",
            "Graphics": "Nvidia GTX 650"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English"],
        "Text": ["English", "Portuguese - Brazil", "Spanish - Latin America", "Spanish - Spain", "Korean", "Russian"]
      }
    },
  });

  Game.create({
    id: 5,
    title: "Portal",
    description:
      "Portal™ is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.",
    thumbnails:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/header.jpg",
    cardImage:
      "https://cdn1.epicgames.com/spt-assets/ecde8d9287eb4ceb9ce8d222c6881c60/destructure-among-debris-de7y9.png?h=480&quality=medium&resize=1&w=360",
    cardTagline: "The cake is a lie.",
    mainPrice: 9.99,
    discountPercentage: 0,
    discountedPrice: 9.99,
    developer: "Valve",
    publisher: "Valve",
    releaseDate: "2007-10-10",
    platform: ["Windows", "Mac", "Linux"],
    genres: ["Action"],
    features: [
      "Single-player",
      "Steam Achievements",
      "Steam Trading Cards",
      "Captions available",
      "Commentary available",
      "Includes Source SDK",
    ],
    tags: ["Puzzle", "First-Person", "Sci-fi", "Comedy"],
    aboutGame:
      'Portal™ is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay. The game is designed to change the way players approach, manipulate, and surmise the possibilities in a given environment; similar to how Half-Life® 2"s Gravity Gun innovated new ways to leverage an object in any given situation.',
    gameFeatures: [
      'The game"s two-player cooperative mode features its own entirely separate campaign with a unique story, test chambers, and two new player characters.',
      "Advanced physics: Allows for the creation of a whole new range of interesting challenges, producing a much larger but not harder game.",
      "Original music.",
      'Massive sequel: The original Portal was named 2007"s Game of the Year by over 30 publications worldwide.',
      ".Editing Tools: Portal 2 editing tools will be included.",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
    ],
  });

  Game.create({
    id: 6,
    title: "It Takes Two",
    description:
      "Embark on the craziest journey of your life in It Takes Two, a genre-bending platform adventure created purely for co-op. Invite a friend to join for free with Friend’s Pass and work together across a huge variety of gleefully disruptive gameplay challenges.",
    thumbnails:
      "https://variety.com/wp-content/uploads/2022/01/It-Takes-Two-e1643647274115.jpg?w=1024",
    cardImage:
      "https://cdn1.epicgames.com/offer/8ae7b3c0f490471b967ce26cc2f6e0e6/EGS_ItTakesTwo_Hazelight_S2_1200x1600-5c82de2d2e21a841dd06ec27e082777e_1200x1600-5c82de2d2e21a841dd06ec27e082777e?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Pure co-op perfection",
    mainPrice: 39.99,
    discountPercentage: 50,
    discountedPrice: 19.99,
    developer: "Hazelight",
    publisher: "Electronic Arts",
    releaseDate: "2021-03-26",
    platform: ["Windows", "PlayStation", "Xbox"],
    genres: ["Action", "Adventure"],
    features: [
      "Online Co-op",
      "Local Co-op",
      "Steam Achievements",
      "Full controller support",
    ],
    tags: ["Co-op", "Adventure", "Platformer", "Comedy", "Split Screen"],
    aboutGame:
      "Embark on the craziest journey of your life in It Takes Two, a genre-bending platform adventure created purely for co-op. Invite a friend to join for free with Friend’s Pass and work together across a huge variety of gleefully disruptive gameplay challenges. Play as the clashing couple Cody and May, two humans turned into dolls by a magic spell. Together, trapped in a fantastical world where the unpredictable hides around every corner, they are reluctantly challenged with saving their fractured relationship.",
    gameFeatures: [
      "PURE CO-OP PERFECTION",
      "GLEEFULLY DISRUPTIVE GAMEPLAY",
      "A UNIVERSAL TALE OF RELATIONSHIPS",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
    ],
  });

  Game.create({
    id: 7,
    title: "Fortnite",
    description:
      "Fortnite is a free-to-play Battle Royale game developed by Epic Games. Jump into the action with the Solo, Duo, or Squad mode and be the last one standing. Build your own structures and use your creativity to outwit your opponents. With constant updates, new weapons, and special events, Fortnite is always fresh and exciting.",
    thumbnails:
      "https://cdn2.unrealengine.com/en-24br-zerobuild-egs-landscape-2560x1440-2560x1440-ca0c0d6529a4.jpg",
    cardImage:
      "https://cdn1.epicgames.com/offer/fn/24BR_Nocturnal_EGS_Launcher_Blade_1200x1600_1200x1600-9407c2e8f7ea1de7a00bf29bf58ef35a?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Jump in and be the last one standing",
    mainPrice: 0,
    discountPercentage: 0,
    discountedPrice: 0,
    developer: "Epic Games",
    publisher: "Epic Games",
    releaseDate: "2017-07-25",
    platform: [
      "Windows",
      "Mac",
      "PlayStation 4",
      "PlayStation 5",
      "Xbox One",
      "Xbox Series X/S",
      "Nintendo Switch",
      "iOS",
      "Android",
    ],
    genres: ["Battle Royale", "Action", "Survival"],
    features: [
      "Multiplayer",
      "Cross-platform play",
      "In-game purchases",
      "In-game voice chat",
      "Ranked matchmaking",
      "Free-to-play",
    ],
    tags: ["Shooter", "Cartoon", "Multiplayer"],
    aboutGame:
      "Fortnite is a free-to-play Battle Royale game developed by Epic Games. Jump into the action with the Solo, Duo, or Squad mode and be the last one standing. Build your own structures and use your creativity to outwit your opponents. With constant updates, new weapons, and special events, Fortnite is always fresh and exciting. The game is designed to be accessible to players of all skill levels, with a simple but effective gameplay loop that keeps you coming back for more.",
    gameFeatures: [
      "Massive Battle Royale map: With over 100 players per match, Fortnite offers a huge, sprawling map to explore and conquer.",
      "Creative mode: Build your own structures and design your own levels with Fortnite's creative mode.",
      "Constant updates: With new weapons, skins, and events added regularly, Fortnite is always fresh and exciting.",
      "Cross-platform play: Play with friends on different platforms, including PC, consoles, and mobile.",
      "Competitive play: Join ranked matches and compete against other players for rewards and recognition.",
      "Free-to-play: Fortnite is completely free to download and play, with optional in-game purchases available.",
    ],
    heroImages: [
      "https://cdn2.unrealengine.com/fortnite-battle-royale/2021-07/BR03_SocialThumbnail-1920x1080-1920x1080-4e96f6b7f4e3.jpg",
      "https://img.republicworld.com/republic-prod/stories/promolarge/xxhdpi/jzciwv7y6j7uqphc_1632662874.jpeg?tr=w-812,h-464",
      "https://cdn1.epicgames.com/ue/product/Screenshot/Featured-1200x700-199a5e7f1f6d214d6d3a5e2f5e86914a.jpg?resize=1&w=500",
    ],
    images: [
      "https://images.gamewatcherstatic.com/image/file/0/00/12018/Fortnite-Screenshot-4.jpg",
      "https://i.pinimg.com/originals/9b/47/2e/9b472ecf57f4a900e6d7c1d6d4b6f7e6.jpg",
      "https://i.pinimg.com/originals/96/42/42/964242b8e1d3de5d320a4b0f5a8ea2c3.jpg",
    ],
  });

  Game.create({
    id: 8,
    title: "Jurassic World Evolution 2",
    description:
      "Jurassic World Evolution 2 is the much-anticipated sequel to Frontier’s highly successful Jurassic World Evolution, building upon the groundbreaking and immersive 2018 management simulation. It introduces a compelling, new narrative campaign set after the events of Jurassic World: Fallen Kingdom, incredible new features, and awe-inspiring new dinosaurs brought to life with captivating realism.",
    thumbnails:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/header.jpg",
    cardImage:
      "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_JurassicWorldEvolution2_FrontierDevelopments_S6_1200x1600-56055d1e93c502852ccc0f9578094e5d?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Life finds a way",
    mainPrice: 59.99,
    discountPercentage: 75,
    discountedPrice: 14.99,
    developer: "Frontier Developments",
    publisher: "Frontier Developments",
    releaseDate: "2021-11-09",
    platform: ["Windows", "PlayStation", "Xbox"],
    genres: ["Simulation", "Strategy"],
    features: [
      "Single-player",
      "Steam Achievements",
      "Full controller support",
    ],
    tags: ["Dinosaurs", "Simulation", "Strategy", "Management", "Building"],
    aboutGame:
      "Jurassic World Evolution 2 is the much-anticipated sequel to Frontier’s highly successful Jurassic World Evolution, building upon the groundbreaking and immersive 2018 management simulation. It introduces a compelling, new narrative campaign set after the events of Jurassic World: Fallen Kingdom, incredible new features, and awe-inspiring new dinosaurs brought to life with captivating realism. Together with expanded construction and more customisation options, the result is an even bigger, better and authentic Jurassic World game.",
    gameFeatures: [
      "AN ORIGINAL JURASSIC STORY",
      "CREATE YOUR OWN JURASSIC WORLD",
      "MORE DINOSAURS THAN EVER BEFORE",
      "A NEW ERA OF BIOENGINEERING",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/ss_1a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.600x338.jpg",
    ],
  });

  Game.create({
    id: 9,
    title: "Genshin Impact",
    description:
      'Genshin Impact is a free-to-play open-world action RPG that brings players to the visually stunning world of Teyvat. The player takes on the role of the mysterious "Traveler", who sets off on a journey to discover the fate of their lost sibling and unveils the mysterious secrets of Teyvat along the way.',
    thumbnails:
      "https://cdn2.unrealengine.com/en-3-6update-1920x1080-cff2ac310eda.jpg",
    cardImage:
      "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GenshinImpact_miHoYoLimited_S2_1200x1600-c12cdcc2cac330df2185aa58c508e820?h=480&quality=medium&resize=1&w=360",
    cardTagline: "A world all your own",
    mainPrice: 0,
    discountPercentage: 0,
    discountedPrice: 0,
    developer: "miHoYo",
    publisher: "miHoYo",
    releaseDate: "2020-09-28",
    platform: ["Windows", "PlayStation", "Nintendo Switch", "Android", "iOS"],
    genres: ["Action", "Adventure", "RPG"],
    features: [
      "Single-player",
      "Online Co-op",
      "Cross-Platform Multiplayer",
      "In-App Purchases",
    ],
    tags: ["Open World", "Anime", "RPG", "Action", "Adventure"],
    aboutGame:
      'Genshin Impact is a free-to-play open-world action RPG that brings players to the visually stunning world of Teyvat. The player takes on the role of the mysterious "Traveler", who sets off on a journey to discover the fate of their lost sibling and unveils the mysterious secrets of Teyvat along the way. Currently, players will be able to explore both Mondstadt and Liyue Harbor, two of the seven major cities in Teyvat, each with their own unique cultures, stories, and vast surrounding landscapes, and offering a diversity of creatures, monsters, secrets, and hidden treasures for players to discover. Further cities, stories, characters, and seasonal events will be released as the game progresses.',
    gameFeatures: [
      "MASSIVE OPEN WORLD - Climb any mountain, swim across any river, and glide over the world below, taking in the jaw-dropping scenery each step of the way.",
      "ELEMENTAL COMBAT SYSTEM - Harness the seven elements to unleash elemental reactions. Anemo, Electro, Hydro, Pyro, Cryo, Dendro, and Geo interact in all sorts of ways, and Vision wielders have the power to turn this to their advantage.",
      "BEAUTIFUL VISUALS - Feast your eyes on the world around you, with a stunning art style, real-time rendering, and finely tuned character animations delivering you a truly immersive visual experience.",
      "SOOTHING SOUNDTRACK - Let the beautiful sounds of Teyvat draw you in as you explore this expansive world. Performed by the London Philharmonic Orchestra, the soundtrack changes seamlessly with the time and gameplay to match the mood.",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1366540/ss_9f4a3c6b8f3a2c8f2c1d4f6b9a9b4e8d7c6e5d2a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1366540/ss_3a9b3c8f7d1b2c1e2f4d5f1e9a6b4e8d7c6e5d2a.1920x1080.jpg",
    ],
    images: [
      "https://cdn2.unrealengine.com/en-3-6update-1920x1080-cff2ac310eda.jpg?h=270&quality=medium&resize=1&w=480",
      "https://cdn2.unrealengine.com/egs-genshinimpactsumerudebut-cognospherepteltd-g1a-01-1920x1080-f8aadc1c45d6.jpg?h=270&quality=medium&resize=1&w=480",
      "https://cdn2.unrealengine.com/egs-genshinimpactsumerudebut-cognospherepteltd-g1a-02-1920x1080-180b2d3f292f.jpg?h=270&quality=medium&resize=1&w=480",
    ],
  });

  Game.create({
    id: 10,
    title: "The Witcher 3: Wild Hunt",
    description:
      "The Witcher 3: Wild Hunt is a story-driven, open world adventure set in a dark fantasy universe. You are Geralt of Rivia, a professional monster hunter, tasked with finding a child of prophecy in a vast world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
    thumbnails:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    cardImage:
      "https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S2_1200x1600-53a8fb2c0201cd8aea410f2a049aba3f?h=480&quality=medium&resize=1&w=360",
    cardTagline: "The ultimate role-playing game",
    mainPrice: 39.99,
    discountPercentage: 80,
    discountedPrice: 7.99,
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    releaseDate: "2015-05-18",
    platform: ["Windows", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["Action", "RPG"],
    features: [
      "Single-player",
      "Steam Achievements",
      "Steam Trading Cards",
      "Steam Cloud",
      "Full controller support",
      "Steam Workshop",
    ],
    tags: ["Open World", "RPG", "Story Rich", "Atmospheric", "Mature"],
    aboutGame:
      "The Witcher 3: Wild Hunt is a story-driven, open world adventure set in a dark fantasy universe. You are Geralt of Rivia, a professional monster hunter, tasked with finding a child of prophecy in a vast world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore. Play as a highly trained monster slayer for hire. Trained from early childhood and mutated to gain superhuman skills, strength and reflexes, witchers are a distrusted counterbalance to the monster-infested world in which they live. Gruesomely destroy foes as a professional monster hunter armed with a range of upgradeable weapons, mutating potions and combat magic. Hunt down a wide range of exotic monsters — from savage beasts prowling the mountain passes, to cunning supernatural predators lurking in the shadows of densely populated towns. Invest your rewards to upgrade your weaponry and buy custom armour, or spend them away in horse races, card games, fist fighting, and other pleasures the night brings.",
    gameFeatures: [
      "Explore a gigantic open world with a dynamic weather system and day/night cycle.",
      "Experience an epic story with over 150 hours of gameplay.",
      "Make choices that go beyond good and evil and face their far-reaching consequences.",
      "Use the crossbow to bring down monsters just out of reach, and employ real world physics as your weapon — smash foes into walls and use the environment to your advantage.",
      "Engage in exhilarating combat that combines real-time action with strategic planning.",
      "Customize your skills and gear according to your preferred style of play.",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_2f0c8b4a1a8f6e0c0c9a7f9b6d1e8b1a4f4a7d0c.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_2b2d5e6f1f8b5c6a9f7d3d9a3c8e3e2c5d7b4e6a.1920x1080.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_7d5e6f1b8c1f4b9c7a2d5b2f8e9a6c5d6b4a3d2c.1920x1080.jpg",
    ],
  });

  Game.create({
    id: 11,
    title: "Dead Island 2",
    description:
      "Dead Island 2 is an action role-playing survival horror video game developed by Dambuster Studios and published by Deep Silver. The game takes place in an open world environment and features cooperative multiplayer.",
    thumbnails:
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-g1a-01-1920x1080-c99de7f0e62a.jpg",
    cardImage:
      "https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Welcome to the zombie apocalypse",
    mainPrice: 59.99,
    discountPercentage: 0,
    discountedPrice: 59.99,
    developer: "Dambuster Studios",
    publisher: "Deep Silver",
    releaseDate: "2023-04-21",
    platform: ["Windows", "PlayStation", "Xbox"],
    genres: ["Action", "RPG", "Survival Horror"],
    features: [
      "Single-player",
      "Multiplayer",
      "Co-op",
      "Steam Achievements",
      "Full controller support",
    ],
    tags: ["Zombies", "Open World", "Action", "RPG", "Survival Horror"],
    aboutGame:
      "Dead Island 2 is an action role-playing survival horror video game developed by Dambuster Studios and published by Deep Silver. The game takes place in an open world environment and features cooperative multiplayer.",
    gameFeatures: [
      "Explore a massive open world",
      "Fight for survival against hordes of zombies",
      "Join forces with other players in co-op multiplayer",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/383150/ss_7d5a25d6b",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/383150/ss_7d5a25d6b",
    ],
  });

  Game.create({
    id: 12,
    title: "Honkai: Star Rail",
    description:
      "Honkai: Star Rail is an action role-playing game developed by miHoYo. In the game, players control a group of Valkyries as they battle against the Honkai and explore a vast open world.",
    thumbnails: "https://cdn2.unrealengine.com/01-1920x1080-e138e4b3b2d6.jpg",
    cardImage:
      "https://cdn1.epicgames.com/offer/a2dcbb9e34204bda9da8415f97b3f4ea/EPIC1200x1600-EN_1200x1600-655b26e317c90057d360900063f9be22?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Embark on an epic adventure",
    mainPrice: 59.99,
    discountPercentage: 0,
    discountedPrice: 59.99,
    developer: "miHoYo",
    publisher: "miHoYo",
    releaseDate: "2023-04-25",
    platform: ["Windows"],
    genres: ["Action", "RPG"],
    features: [
      "Single-player",
      "Multiplayer",
      "Co-op",
      "Steam Achievements",
      "Full controller support",
    ],
    tags: ["Action", "RPG", "Open World"],
    aboutGame:
      "Honkai: Star Rail is an action role-playing game developed by miHoYo. In the game, players control a group of Valkyries as they battle against the Honkai and explore a vast open world.",
    gameFeatures: [
      "Explore a vast open world",
      "Fight against the Honkai with a group of powerful Valkyries",
      "Join forces with other players in co-op multiplayer",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1284410/ss_7d5a25d6b",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1284410/ss_7d5a25d6b",
    ],
  });

  Game.create({
    id: 13,
    title: "Crime Boss: Rockay City",
    description:
      "Crime Boss: Rockay City is an action-adventure game developed and published by Rockstar Games. In the game, players control a character who must rise through the ranks of the criminal underworld to become the ultimate crime boss.",
    thumbnails:
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-07-1920x1080-656cc3020208.jpg",
    cardImage:
      "https://cdn1.epicgames.com/offer/af0ea01162704696bebf8633a52a7a6d/EGS_CrimeBossRockayCity_INGAMESTUDIOS_S2_1200x1600-589327a4d212fe00efed9cbf7fd5841e_1200x1600-589327a4d212fe00efed9cbf7fd5841e?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Become the ultimate crime boss",
    mainPrice: 39.99,
    discountPercentage: 0,
    discountedPrice: 39.99,
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2023-04-28",
    platform: ["Windows", "PlayStation", "Xbox"],
    genres: ["Action", "Adventure"],
    features: [
      "Single-player",
      "Multiplayer",
      "Steam Achievements",
      "Full controller support",
    ],
    tags: ["Action", "Adventure", "Open World", "Crime"],
    aboutGame:
      "Crime Boss: Rockay City is an action-adventure game developed and published by Rockstar Games. In the game, players control a character who must rise through the ranks of the criminal underworld to become the ultimate crime boss.",
    gameFeatures: [
      "Explore a vast open world",
      "Rise through the ranks of the criminal underworld",
      "Join forces with other players in multiplayer",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/ss_7d5a25d6b",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/ss_7d5a25d6b",
    ],
  });

  Game.create({
    id: 14,
    title: "STAR WARS Jedi: Survivor™",
    description:
      "STAR WARS Jedi: Survivor™ is an action-adventure game developed by Respawn Entertainment and published by Electronic Arts. In the game, players control a Jedi Padawan who must complete his training and rebuild the Jedi Order.",
    thumbnails:
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivorstandardedition-respawnentertainment-g1a-04-1920x1080-113398136c5d.jpg",
    cardImage:
      "https://cdn1.epicgames.com/offer/5a2ea5980ac147c195775039195a3081/EGS_STARWARSJediSurvivorStandardEdition_RespawnEntertainment_S2_1200x1600-fd090aecb23a065b29ea101939798edd?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Become a Jedi",
    mainPrice: 69.99,
    discountPercentage: 0,
    discountedPrice: 69.99,
    developer: "Respawn Entertainment",
    publisher: "Electronic Arts",
    releaseDate: "2023-04-28",
    platform: ["Windows", "PlayStation", "Xbox"],
    genres: ["Action", "Adventure"],
    features: [
      "Single-player",
      "Steam Achievements",
      "Full controller support",
    ],
    tags: ["Action", "Adventure", "Star Wars"],
    aboutGame:
      "STAR WARS Jedi: Survivor™ is an action-adventure game developed by Respawn Entertainment and published by Electronic Arts. In the game, players control a Jedi Padawan who must complete his training and rebuild the Jedi Order.",
    gameFeatures: [
      "Explore a galaxy far, far away",
      "Complete your training and become a Jedi",
      "Rebuild the Jedi Order",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1172380/ss_7d5a25d6b",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1172380/ss_7d5a25d6b",
    ],
  });

  Game.create({
    id: 15,
    title: "The Settlers®: New Allies",
    description:
      "The Settlers®: New Allies is a real-time strategy game developed by Blue Byte and published by Ubisoft. In the game, players must build and manage a medieval settlement while competing against other players for resources and territory.",
    thumbnails:
      "https://cdn2.unrealengine.com/egst-edition-thumbnail-1920x1080-1920x1080-e15fd8a2889d.jpg?h=270&quality=medium&resize=1&w=480",
    cardImage:
      "https://cdn1.epicgames.com/offer/84f45b7676af47d9adecd3b636466f89/EGST_StorePortrait_1200x1600_1200x1600-adc3de9f03faba15cc9ef7e5762ad96d?h=480&quality=medium&resize=1&w=360",
    cardTagline: "Build your kingdom",
    mainPrice: 59.99,
    discountPercentage: 25,
    discountedPrice: 44.99,
    developer: "Blue Byte",
    publisher: "Ubisoft",
    releaseDate: "2023-04-28",
    platform: ["Windows"],
    genres: ["Strategy"],
    features: [
      "Single-player",
      "Multiplayer",
      "Steam Achievements",
      "Full controller support",
    ],
    tags: ["Strategy", "Real-Time", "Medieval", "City Builder"],
    aboutGame:
      "The Settlers®: New Allies is a real-time strategy game developed by Blue Byte and published by Ubisoft. In the game, players must build and manage a medieval settlement while competing against other players for resources and territory.",
    gameFeatures: [
      "Build and manage a medieval settlement",
      "Compete against other players for resources and territory",
      "Experience a rich and detailed world",
    ],
    heroImages: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1394460/ss_7d5a25d6b",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1394460/ss_7d5a25d6b",
    ],
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
