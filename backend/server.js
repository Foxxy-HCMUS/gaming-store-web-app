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
require("./app/routes/order.routes")(app);

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
const { TRUE } = require("sass");
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
    logo: 
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-ic1-400x400-82b90aa9a275.png?h=270&quality=medium&resize=1&w=480",
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
      "Partial controller support",
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
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-04-02-24-22-1920x1080-e44528f4fa16.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-05-02-24-22-1920x1080-4dd0bff6a6c0.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-06-02-24-22-1920x1080-b5a2e4e8e86e.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-07-02-24-22-1920x1080-9da0619a7040.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-08-02-24-22-1920x1080-a81f23e8519f.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-09-02-24-22-1920x1080-59e698ae2482.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-10-02-24-22-1920x1080-428a4e04c6e0.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-11-02-24-22-1920x1080-7e8b54fe2fbd.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-12-02-24-22-1920x1080-2f5ec063c844.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-13-02-24-22-1920x1080-dd4dcc601c17.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-14-02-24-22-1920x1080-810476afc100.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-15-02-24-22-1920x1080-16b1ecf631c4.jpg",
      "https://cdn2.unrealengine.com/egs-cyberpunk2077-cdprojektred-g1a-03-1920x1080-c25ac94167df.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/extras/ABOUT_THE_GAME_EN.png?t=1686834071",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/extras/NGU_CREATE_YOUR_OWN_CYBERPUNK_EN.png?t=1686834071",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/extras/NGU_EXPLORE_THE_CITY_OF_FUTURE_EN.png?t=1686834071",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/extras/NGU_BUILD_YOUR_LEGEND_EN.png?t=1686834071",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/extras/NGU_EQUIPPED_WITH_IMPROVEMENTS_EN.png?t=1686834071",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/extras/NGU_INCLUDES_FREE_ADDITIONAL_CONTENT_EN.png?t=1686834071",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10",
            "Processor": "Intel Core i5-3570K or AMD FX-8310",
            "Memory" : "8 GB RAM",
            "Storage": "70 GB",
            "DirectX": "Version 12",
            "Graphics": "NVIDIA GeForce GTX 970 or AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "Windows 10 x64bit",
            "Processor": "Intel Core i7-4790 or AMD Ryzen 3 3200G",
            "Memory" : "12 GB RAM",
            "Storage": "100 GB",
            "DirectX": "Version 12 Ultimate",
            "Graphics": "NVIDIA GeForce GTX 1060 or AMD Radeon R9 Fury"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.14",
            "Processor": "Apple A13",
            "Memory" : "8 GB RAM",
            "Storage": "70 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "MacOS 11",
            "Processor": "Apple A16",
            "Memory" : "12 GB RAM",
            "Storage": "70 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon R9 Fury"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English", "French", "German", "Italian", "Spanish - Spain", "Japanese", "Polish", "Portuguese - Brazil", "Chinese - Simplified", "Korean", "Russian"],
        "Text": ["Spanish - Latin America", "Thai", "Czech", "Hungarian", "Chinese - Traditional", "Arabic", "Turkish", "English", "Italian", "Spanish - Spain", "Japanese",
                "Portuguese - Brazil", "Chinese - Simplified", "French", "German", "Korean", "Polish", "Russian"]
      }
    },
  });

  Game.create({
    id: 2,
    title: "Red Dead Redemption 2",
    description:
      "Red Dead Redemption 2 is an epic tale of life in America's unforgiving heartland. The game's vast and atmospheric world also provides the foundation for a brand new online multiplayer experience.",
    thumbnails:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    cardImage:
      "https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic%20Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=480&quality=medium&resize=1&w=360",
    cardTagline: "America, 1899. The end of the wild west era has begun.",
    logo: 
      "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_IC1-625x625-38ae1bca6b89370d01ac3ed3a17daf7dd004f9f5.png?h=270&quality=medium&resize=1&w=480",
    mainPrice: 59.99,
    discountPercentage: 0,
    discountedPrice: 59.99,
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2019-11-05",
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
      "Red Dead Redemption 2 is an epic tale of life in America's unforgiving heartland. The game's vast and atmospheric world will also provide the foundation for a brand new online multiplayer experience.",
    gameFeatures: [
      "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores",
      "Includes Red Dead Online",
      "With all new graphical and technical enhancements for deeper immersion",
    ],
    heroImages: [
      "https://cdn2.unrealengine.com/egs-cyhttps://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_G1A_00-1920x1080-308f101576da37225c889173094f373f2afc56c1.jpgberpunk2077-cdprojektred-g1a-04-02-24-22-1920x1080-e44528f4fa16.jpg",
    ],
    images: [
      "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_G1A_01-1920x1080-8a72c86b8fed73f57311d0d1ba456e6964f0aaa2.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_G1A_02-1920x1080-4b6978a5abd9d179eda514bc8853c8ffcdacd690.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_G1A_04-1920x1080-3e2c5e1e843eac593d1957ea22ef5f128c34b995.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_G1A_03-1920x1080-efec0a8683b70a14f5de2d281caad6267a85de44.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_G1A_05-1920x1080-6bafd36e86592a47e8aacb6899690653d6c2428d.jpg?h=720&quality=medium&resize=1&w=1280",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10 (v1803)",
            "Processor": "Intel Core i5-2500K or AMD FX-6300",
            "Memory" : "8 GB RAM",
            "Storage": "150 GB",
            "DirectX": "Compatible",
            "Graphics": "NVIDIA GeForce GTX 770 2GB or AMD Radeon R9 280 3GB"
          },
          "Recommended": {
            "OS": "Windows 10 (v1803)",
            "Processor": "Intel Core i7-4770K or AMD Ryzen 5 1500x",
            "Memory" : "12 GB RAM",
            "Storage": "150 GB",
            "DirectX": "Compatible",
            "Graphics": "NVIDIA GeForce GTX 1060 6GB or AMD Radeon RX 480 4GB"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.12",
            "Processor": "Apple A12",
            "Memory" : "8 GB RAM",
            "Storage": "150 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "MacOS 12",
            "Processor": "Apple A16",
            "Memory" : "12 GB RAM",
            "Storage": "150 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon R9 Fury"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English"],
        "Text": ["English", "Simplified Chinese", "Traditional Chinese", "Portuguese (Brazilian)", "French", "German", "Italian", "Japanese", "Korean", "Polish", 
                "Russian", "Portuguese", "Spanish (Spain)", "Spanish (LATAM)"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/hades-logo-launch-messaging-2000x647-983740753.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/egs-hades-supergiantgames-g1a-01-1920x1080-010078133.jpg",
    ],
    images: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_c0fed447426b69981cf1721756acf75369801b31.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_2a9e3f9ad4d29d900b890d56361be5b1634225a0.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_34e6660705cfe47d2b2f95189c37f7cb77f75ca6.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_68300459a8c3daacb2ec687adcdbf4442fcc4f47.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_8e07e477fa7ff2f88c8984bc89b9652a655da0e9.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_5e52844b891b54608eb51a850d6b53313eeed0f7.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_bcb499a0dd001f4101823f99ec5094d2872ba6ee.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_abb2427810a4e91cc600f37c3630b912d4e0191b.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_217b70678a2eea71a974fba1a4cd8baa660581bb.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_e0622b5a57521b76182d7e7e1ae47ee440edcf90.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_8a9f0953e8a014bd3df2789c2835cb787cd3764d.1920x1080.jpg",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 7 SP1",
            "Processor": "Dual Core 2.4 GHz",
            "Memory" : "4 GB RAM",
            "Storage": "15 GB",
            "DirectX": "DirectX 10",
            "Graphics": "1GB VRAM"
          },
          "Recommended": {
            "OS": "Windows 7 SP1",
            "Processor": "Dual Core 3.4 GHz",
            "Memory" : "8 GB RAM",
            "Storage": "20 GB",
            "DirectX": "DirectX 10",
            "Graphics": "2GB VRAM"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.12",
            "Processor": "Dual Core 2.4 GHz",
            "Memory" : "4 GB RAM",
            "Storage": "15 GB",
            "Metal": "Version 2",
            "Graphics": "Intel HD 5000"
          },
          "Recommended": {
            "OS": "MacOS 10.14",
            "Processor": "Quad Core 3.0 GHz",
            "Memory" : "8 GB RAM",
            "Storage": "20 GB",
            "Metal": "Version 2.2",
            "Graphics": "Intel UHD 630"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English"],
        "Text": ["English", "Simplified Chinese", "French", "German", "Italian", "Korean", "Polish", "Russian", "Portuguese - Brazil", "Spanish - Spain"]
      }
    },
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
            "OS": "Windows 10 x32bit",
            "Processor": "Intel i3-4330",
            "Memory" : "1 GB RAM",
            "Storage": "250 MB",
            "DirectX": "Version 10",
            "Graphics": "Intel HD Graphic 4600"
          },
          "Recommended": {
            "OS": "Windows 10 x64bit",
            "Processor": "Intel i3-4330",
            "Memory" : "4 GB RAM",
            "Storage": "250 MB",
            "DirectX": "Version 10",
            "Graphics": "NVIDIA GTX 650"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.10",
            "Processor": "Intel i3-4330",
            "Memory" : "1 GB RAM",
            "Storage": "250 MB",
            "Metal": "None",
            "Graphics": "AMD Radeon R5 330"
          },
          "Recommended": {
            "OS": "Mac0S 10.13",
            "Processor": "Intel i3-4330",
            "Memory" : "4 GB RAM",
            "Storage": "250 MB",
            "Metal": "None",
            "Graphics": "AMD Radeon RX 470"
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
    logo: 
      "https://upload.wikimedia.org/wikipedia/commons/d/df/Portal_logo.png?20140808151854",
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
      "Editing Tools: Portal 2 editing tools will be included.",
    ],
    heroImages: [
      "https://cdn.akamai.steamstatic.com/steam/apps/400/0000002583.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/0000002588.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/0000002585.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/ss_25aa95176ac6319fad955b31554451f3ea61f1e8.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/0000002584.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/ss_3164c436ce7708dcf0f46bb4569e7f7b83ccb01e.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/ss_5d9a2b799aaaa6f8992128c126e68b7e8d718715.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/0000002587.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/ss_15c08be59046abbd785ab8e7e8857ba8633f292b.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/0000002586.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/400/0000002582.1920x1080.jpg",
    ],
    images: [
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_801/b_white/f_auto/q_auto/ncom/en_US/games/switch/b/bridge-constructor-portal-switch/hero",
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.25/c_scale,w_600/ncom/en_US/games/switch/b/bridge-constructor-portal-switch/screenshot-gallery/screenshot01",
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.25/c_scale,w_600/ncom/en_US/games/switch/b/bridge-constructor-portal-switch/screenshot-gallery/screenshot02",
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.25/c_scale,w_600/ncom/en_US/games/switch/b/bridge-constructor-portal-switch/screenshot-gallery/screenshot03",
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.25/c_scale,w_600/ncom/en_US/games/switch/b/bridge-constructor-portal-switch/screenshot-gallery/screenshot04",
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.25/c_scale,w_600/ncom/en_US/games/switch/b/bridge-constructor-portal-switch/screenshot-gallery/screenshot05",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 7 (32/64-bit)/Vista/XP",
            "Processor": "Dual Core 1.7 GHz",
            "Memory" : "512 MB RAM",
            "Storage": "5 GB",
            "DirectX": "Version 8.1",
            "Graphics": "NVIDIA GeForce 8"
          },
          "Recommended": {
            "OS": "Windows 7 (32/64-bit)/Vista/XP",
            "Processor": "Pentium 4 3 GHz",
            "Memory" : "1 GB RAM",
            "Storage": "7 GB",
            "DirectX": "Version 9",
            "Graphics": "NVIDIA GeForce 600"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.4",
            "Processor": "Dual Core 2.4 GHz",
            "Memory" : "512 GB RAM",
            "Storage": "5 GB",
            "Metal": "None",
            "Graphics": "NVIDIA GeForce 8"
          },
          "Recommended": {
            "OS": "MacOS 10.10",
            "Processor": "Quad Core 3.0 GHz",
            "Memory" : "1 GB RAM",
            "Storage": "7 GB",
            "Metal": "None",
            "Graphics": "NVIDIA GeForce 600"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English", "French", "German", "Russian", "Spanish - Spain", "Traditional Chinese"],
        "Text": ["English", "French", "German", "Russian", "Danish", "Dutch", "Italian", "Japanese", "Portuguese - Brazil", "Spanish - Latin America", "Spanish - Spain",
                "Korean", "Norwegian", "Polish", "Portuguese - Portugal", "Simplified Chinese", "Swedish", "Traditional Chinese", "Bulgarian", "Czech", "Greek", 
                "Finnish", "Hungarian", "Romanian", "Spanish - Latin America", "Thai", "Turkish", "Ukrainian"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-ic1-400x400-10a8bec2a659.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-02-1920x1080-a767e6a24f42.jpg",
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-03-1920x1080-baa35c31391a.jpg",
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-04-1920x1080-35cfcbcf0851.jpg",
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-05-1920x1080-74e4df3b0d0b.jpg",
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-06-1920x1080-369cad296949.jpg",
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-07-1920x1080-818d2460b157.jpg",
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-07-1920x1080-818d2460b157.jpg",
      "https://cdn2.unrealengine.com/egs-ittakestwo-hazelight-g1a-08-1920x1080-b07b55f27940.jpg",
    ],
    images: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1426210/ss_3e59753eefaba9a7704a18e902b48e8d38e95e0b.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1426210/ss_6e987a0678b013bfd0073a9ac4703e1f04ca4dea.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1426210/ss_fdac523e3ea4d2f32a44449bb8c224857563bd7d.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1426210/ss_4a62bc8fa398fc5b2094a6225dc5ecff9485f824.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1426210/ss_d7a931229cbf1cc25975bb5860cbde5b9bbc826a.1920x1080.jpg",  
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 8.1 64-bit or Windows 10 64-bit",
            "Processor": "Intel Core i3-2100T or AMD FX 6100",
            "Memory" : "8 GB RAM",
            "Storage": "50 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 660 or AMD R7 260x"
          },
          "Recommended": {
            "OS": "Windows 8.1 64-bit or Windows 10 64-bit",
            "Processor": "Intel Core i5 3570K or AMD Ryzen 3 1300x",
            "Memory" : "16 GB RAM",
            "Storage": "50 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 980 or AMD R9 290X"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.12",
            "Processor": "Apple A12",
            "Memory" : "8 GB RAM",
            "Storage": "70 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "MacOS 11",
            "Processor": "Apple A16",
            "Memory" : "12 GB RAM",
            "Storage": "70 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon R9 Fury"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English"],
        "Text": ["English", "Italian", "Spanish - Spain", "Japanese", "Chinese - Simplified", "Chinese - Traditional", "French", "German", "Korean", "Polish", 
                "Portuguese - Brazil", "Russian"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/24br-s24-egs-launcher-logo-350x100-350x100-b63249f937d9.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/en-25br-zerobuild-egs-2560x1440-2560x1440-311ccfe1ea74.jpg",
      "https://cdn2.unrealengine.com/01-cinematicstill011-3840x2160-3840x2160-ae28976210fc.png",
      "https://cdn2.unrealengine.com/02-still002-3840x2160-3840x2160-1150a4a5bc46.png",
      "https://cdn2.unrealengine.com/03-still005-3840x2160-3840x2160-8c30fdfe476e.png",
      "https://cdn2.unrealengine.com/04-gameplaystill002-3840x2160-3840x2160-d9cd59f646ee.png",
      "https://cdn2.unrealengine.com/05-cinematicstill003-3840x2160-3840x2160-97121fdfb6d2.png",
      "https://cdn2.unrealengine.com/06-gameplaystill007-3840x2160-3840x2160-0a9808f757e3.png",
      "https://cdn2.unrealengine.com/07-still008-3840x2160-3840x2160-c341eaedb5cd.png",
      "https://cdn2.unrealengine.com/08-still009-3840x2160-3840x2160-0e7bf12b041e.png",
      "https://cdn2.unrealengine.com/09-gameplaystill005-3840x2160-3840x2160-73197225a730.png",
      "https://cdn2.unrealengine.com/10-cinematicstill001-3840x2160-3840x2160-9bbd8b2e2cef.png",
    ],
    images: [
      "https://cdn2.unrealengine.com/01-25br-s25-egs-launcher-pdp-2560x1440-2560x1440-92db8752f5af.jpg",
      "https://cdn2.unrealengine.com/cltm-evergreen-1920x1080-b267506a89c5.jpg",
      "https://cdn2.unrealengine.com/en-subs-evergreen-egs-landscape-2560x1440-cbc67935cffd.jpg",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10 64-bit",
            "Processor": "Core i3-3225 3.3 GHz",
            "Memory" : "8 GB RAM",
            "Storage": "50 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GTX 960 or AMD R9 280 or equivalent DX11 GPU"
          },
          "Recommended": {
            "OS": "Windows 10 64-bit",
            "Processor": "Core i5-7300U 3.5 GHz",
            "Memory" : "8 GB RAM",
            "Storage": "50 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GTX 960 or AMD R9 280 or equivalent DX11 GPU"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.12",
            "Processor": "Apple A12",
            "Memory" : "8 GB RAM",
            "Storage": "50 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon R7 430"
          },
          "Recommended": {
            "OS": "MacOS 12",
            "Processor": "Apple M1",
            "Memory" : "12 GB RAM",
            "Storage": "50 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon RX 5700"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English"],
        "Text": ["English", "Italian", "Spanish - Spain", "Japanese", "French", "German", "Korean", "Polish", "Portuguese - Brazil", "Russian", "Turkish", "Arabic"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/egs-jurassicworldevolution2-frontierdevelopments-ic1-400x400-6fc3fcc8273b.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_f22feb0cee0172cd3b9d1b6c845b90d911ee8858.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_efde72180f48c4b722b04ac7c0b13ee46b45bdf0.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_96527037800b404246c4e508062c925eabae20a6.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_e2043f89661bf4da80628e6ab1e97b0a67f1c7ed.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_07e3315833ed65b2c968214c617e6bbbea514654.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_7e846b4fd5cb5a3346db12a87e856fab284f92ce.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_c78eddae3abebf2fadcf02dd72219e1bb9041406.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_3be69eee1e346576e21cfec3ea0dcdac73ac534c.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_30300bd64f04746dbfdd9de44ae3e209aaae0510.1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1244460/ss_ea9e6dac291587e61650a11791cd0a493be635cb.1920x1080.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/extras/Main_capsule_616x353.png?t=1686217929",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/extras/JWE2_An_Original_Jurassic_World_Story_616x180.jpg?t=1686217929",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1244460/extras/JWE2_Create_Your_Own_Jurassic_World_616x180.jpg?t=1686217929",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10 64bit (v1809)",
            "Processor": "Intel i5-4590 or AMD FX 8370",
            "Memory" : "8 GB RAM",
            "Storage": "14 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 1050Ti or AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "Windows 10 64bit (v1809)",
            "Processor": "Intel i7-5775C or AMD Ryzen 5 1500X",
            "Memory" : "12 GB RAM",
            "Storage": "14 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 1070 or AMD RX 570"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.13",
            "Processor": "Apple A11",
            "Memory" : "8 GB RAM",
            "Storage": "14 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 540"
          },
          "Recommended": {
            "OS": "MacOS 11",
            "Processor": "Apple A16",
            "Memory" : "12 GB RAM",
            "Storage": "14 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon RX 5700"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English", "French", "Italian", "German", "Spanish - Spain", "Japanese", "Chinese - Simplified", "Portuguese - Brazil", "Russian", 
                "Spanish - Latin America"],
        "Text": ["English", "French", "Italian", "German", "Spanish - Spain", "Japanese", "Chinese - Simplified", "Chinese - Traditional", "Korean", 
                "Polish", "Portuguese - Brazil", "Russian", "Spanish - Latin America"]
      }
    },
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
    logo:
      "https://cdn2.unrealengine.com/egs-genshinimpact-mihoyolimited-ic1-400x400-0a1ff1b6cf40.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/egs-genshinimpactsumerudebut-cognospherepteltd-g1a-01-1920x1080-f8aadc1c45d6.jpg",
      "https://cdn2.unrealengine.com/egs-genshinimpactsumerudebut-cognospherepteltd-g1a-02-1920x1080-180b2d3f292f.jpg",
      "https://cdn2.unrealengine.com/egs-genshinimpactsumerudebut-cognospherepteltd-g1a-03-1920x1080-9a87794f1890.jpg",
      "https://cdn2.unrealengine.com/egs-genshinimpactsumerudebut-cognospherepteltd-g1a-04-1920x1080-0f614884f850.jpg",

    ],
    images: [
      "https://cdn2.unrealengine.com/en-1-1920x1080-28aaa8b26eeb.jpg?h=720&quality=medium&resize=1&w=1280",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 7 SP1 64-bit, Windows 8.1 64-bit or Windows 10 64-bit",
            "Processor": "Intel Core i5 or equivalent",
            "Memory" : "8 GB RAM",
            "Storage": "30 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GT 1030"
          },
          "Recommended": {
            "OS": "Windows 7 SP1 64-bit, Windows 8.1 64-bit or Windows 10 64-bit",
            "Processor": "Intel Core i7 or equivalent",
            "Memory" : "16 GB RAM",
            "Storage": "30 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 1060 6GB"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.10",
            "Processor": "Apple A12",
            "Memory" : "8 GB RAM",
            "Storage": "30 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon R5 430"
          },
          "Recommended": {
            "OS": "MacOS 11",
            "Processor": "Apple A16",
            "Memory" : "16 GB RAM",
            "Storage": "30 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon RX 6600"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["Chinese - Simplified", "English", "Korean", "Japanese"],
        "Text": ["Chinese - Simplified", "Chinese - Traditional", "English", "French", "German", "Italian", "Japanese", "Korean", "Portuguese", "Portuguese - Brazil", 
                "Russian", "Spanish - Spain", "Spanish - Latin America", "Thai", "Turkish", "Vietnamese"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-ic1-400x400-39ecddf1cc77.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-01-1920x1080-8869fa6cdc96.jpg",
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-02-1920x1080-1295749a2ef4.jpg",
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-03-1920x1080-24c8f2997f41.jpg",
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-04-1920x1080-a76e68321990.jpg",
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-05-1920x1080-ac4ebacf1833.jpg",
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-06-1920x1080-888a74f299d6.jpg",
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-07-1920x1080-7dce3a5550fc.jpg",
      "https://cdn2.unrealengine.com/egs-thewitcher3wildhuntcompleteedition-cdprojektred-g1a-08-1920x1080-c0c3c14a519f.jpg",
    ],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/extras/ABOUT_600x225_EN.png?t=1675178392",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/extras/Updated_600x255__EN.png?t=1675178392",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/extras/Monster_Slayer_600x255_EN.png?t=1675178392",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/extras/Open_World_600x255_EN.png?t=1675178392",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/extras/Child_of_Prophercy_600x255_EN.png?t=1675178392",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 7 64-bit, Windows 8 (8.1) 64-bit",
            "Processor": "Intel CPU Core i5-2500K 3.3GHz or AMD A10-5800K APU",
            "Memory" : "6 GB RAM",
            "Storage": "50 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GPU GeForce GTX 660 or AMD GPU Radeon HD 7870"
          },
          "Recommended": {
            "OS": "Windows 10/11 64-bit",
            "Processor": "Intel CPU Core i5 7400 or Ryzen 5 1600",
            "Memory" : "8 GB RAM",
            "Storage": "50 GB",
            "DirectX": "DirectX 12",
            "Graphics": "NVIDIA GeForce GTX 1070 or AMD Radeon RX 480"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.10",
            "Processor": "Apple A11",
            "Memory" : "6 GB RAM",
            "Storage": "50 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "MacOS 12",
            "Processor": "Apple A16",
            "Memory" : "8 GB RAM",
            "Storage": "50 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon R9 Fury"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English", "French", "German", "Japanese", "Polish", "Russian", "Portuguese - Brazil", "Korean", "Chinese - Simplified"],
        "Text": ["English", "Italian", "Spanish - Spain", "Japanese", "Chinese - Simplified", "Chinese - Traditional", "French", "German", "Korean", "Polish", 
                "Portuguese - Brazil", "Russian", "Arabic", "Czech", "Hungarian", "Turkish"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-ic1-400x196-9cbd3690d951.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-g1a-00-1920x1080-957ca6fac0ba.jpg",
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-g1a-01-1920x1080-c99de7f0e62a.jpg",
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-g1a-02-1920x1080-7dfc077c83c5.jpg",
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-g1a-03-1920x1080-2ffa36ebc853.jpg",
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-g1a-04-1920x1080-3bd55876a639.jpg",

    ],
    images: [
      "https://cdn2.unrealengine.com/egs-deadisland2-deepsilverdambusterstudios-g2-00-new-1280x720-9dba1270b33f.jpg",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10",
            "Processor": "AMD Ryzen 5 5600X or Intel Core i9-9900k",
            "Memory" : "10 GB RAM",
            "Storage": "70 GB",
            "DirectX": "DirectX 12",
            "Graphics": "AMD Radeon R9 390X or NVIDIA GeForce GTX 1060"
          },
          "Recommended": {
            "OS": "Windows 8.1 64-bit or Windows 10 64-bit",
            "Processor": "Intel Core i5 3570K or AMD Ryzen 3 1300x",
            "Memory" : "10 GB RAM",
            "Storage": "70 GB",
            "DirectX": "DirectX 12",
            "Graphics": "AMD Radeon RX 6800 XT or NVIDIA GeForce RTX 2070 Super"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.13",
            "Processor": "Apple A13",
            "Memory" : "10 GB RAM",
            "Storage": "70 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "MacOS 11",
            "Processor": "Apple A16",
            "Memory" : "12 GB RAM",
            "Storage": "70 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon VII"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English"],
        "Text": ["English", "Italian", "Spanish - Spain", "Japanese", "Chinese - Simplified", "Chinese - Traditional", "French", "German", "Korean", "Polish", 
                "Portuguese - Brazil", "Russian", "Spanish - Latin America", "Czech"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/egs-honkaistarrail-cognospherepteltd-ic1-400x400-5bf16a894da6.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/02-1920x1080-7ad449440d26.jpg",
      "https://cdn2.unrealengine.com/03-1920x1080-e0f03eae3972.jpg",
      "https://cdn2.unrealengine.com/04-1920x1080-342c74b44434.jpg",
      "https://cdn2.unrealengine.com/05-1920x1080-c1b4f3c0fa51.jpg",

    ],
    images: [
      "https://i.rada.vn/data/image/2021/10/09/Honkai-Star-Rail-700.jpg",
      "https://i.rada.vn/data/image/2021/10/09/Honkai-Star-Rail-1.jpg",
      "https://i.rada.vn/data/image/2021/10/09/Honkai-Star-Rail-2.jpg",
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/honkai-star-rail-tinh-nang-moi-genshin-impact-3.jpg",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 7 SP1 64-bit",
            "Processor": "Intel Core i5 Processor",
            "Memory" : "8 GB RAM",
            "Storage": "20 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 650"
          },
          "Recommended": {
            "OS": "Windows 7 SP1 64-bit",
            "Processor": "Intel Core i5 Processor",
            "Memory" : "8 GB RAM",
            "Storage": "20 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 1060"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.10",
            "Processor": "Apple A12",
            "Memory" : "8 GB RAM",
            "Storage": "20 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 470"
          },
          "Recommended": {
            "OS": "MacOS 10.15",
            "Processor": "Apple A15",
            "Memory" : "12 GB RAM",
            "Storage": "20 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon R9 Fury"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English", "Chinese - Simplified", "Japanese", "Korean"],
        "Text": ["English", "Chinese - Simplified", "Chinese - Traditional", "French", "German", "Japanese", "Korean", "Portuguese - Brazil", "Russian", "Spainish - Spain",
                "Thai", "Vietnamese"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-ic1-400x400-136aa5dbda57.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-03-1920x1080-57e3bf015c47.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-04-1920x1080-07fad387e751.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-05-1920x1080-ebafd122b9b2.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-06-1920x1080-da1fbe283c59.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-07-1920x1080-656cc3020208.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-08-1920x1080-6655a79dc572.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-09-1920x1080-978a9f277596.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-10-1920x1080-847c206f3ec4.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-11-1920x1080-ce9bf26b4437.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-12-1920x1080-a3b2ce6b3be8.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-13-1920x1080-f5e2358012ab.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-15-1920x1080-a23a5ca4073c.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-16-1920x1080-82cfce796fb4.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-17-1920x1080-18cf56f35d69.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-18-1920x1080-e023489fc43d.jpg",
      "https://cdn2.unrealengine.com/egs-crimebossrockaycity-ingamestudios-g1a-19-1920x1080-9bf11a54b9cf.jpg",
    ],
    images: [
      "https://visitrockaycity.com/wp-content/uploads/2023/03/Crime-Boss_Launch_01-scaled.jpg",
      "https://visitrockaycity.com/wp-content/uploads/2023/03/Crime-Boss_Launch_02-1-scaled.jpg",
      "https://visitrockaycity.com/wp-content/uploads/2023/03/Crime-Boss_Launch_03-scaled.jpg",
      "https://visitrockaycity.com/wp-content/uploads/2023/03/Crime-Boss_Launch_04-1-scaled.jpg",
      "https://visitrockaycity.com/wp-content/uploads/2023/03/Crime-Boss_Launch_05-scaled.jpg",
      "https://visitrockaycity.com/wp-content/uploads/2023/03/Crime-Boss_Launch_06-scaled.jpg",
      "https://visitrockaycity.com/wp-content/uploads/2023/03/Crime-Boss_Launch_11-scaled.jpg",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10",
            "Processor": "Intel Core i7-4790 or AMD Ryzen 5 1600",
            "Memory" : "16 GB RAM",
            "Storage": "90 GB",
            "DirectX": "DirectX 12",
            "Graphics": "NVIDIA GeForce GTX 1650 or AMD Radeon RX 570"
          },
          "Recommended": {
            "OS": "Windows 10 ",
            "Processor": "Intel Core i5-10600K or AMD Ryzen 5 3600XT",
            "Memory" : "16 GB RAM",
            "Storage": "90 GB",
            "DirectX": "DirectX 12",
            "Graphics": "NVIDIA GeForce GTX 1070, AMD Radeon RX Vega 56 or Intel Arc A770"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.13",
            "Processor": "Apple A13",
            "Memory" : "16 GB RAM",
            "Storage": "90 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon RX 570"
          },
          "Recommended": {
            "OS": "MacOS 12",
            "Processor": "Apple M1",
            "Memory" : "16 GB RAM",
            "Storage": "90 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon RX 5500"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English"],
        "Text": ["English", "French", "Italian", "German", "Spanish - Spain", "Portuguese - Brazil", "Chinese - Simplified", "Chinese - Traditional", "Japanese", 
                "Korean", "Russian"]
      }
    },
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
    logo: 
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivorstandardedition-respawnentertainment-ic1-400x400-9ff568e5738d.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g1a-03-1920x1080-3198394f10eb.jpg",
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g1a-04-1920x1080-541c462eff64.jpg",
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g1a-05-1920x1080-077601862943.jpg",
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g1a-07-1920x1080-3e1960ae4dad.jpg",
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g1a-09-1920x1080-087bc0c542bf.jpg",
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g1a-10-1920x1080-46cf87d5d4fe.jpg",
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g1a-11-1920x1080-cfec950139fa.jpg",
    ],
    images: [
      "https://cdn2.unrealengine.com/egs-starwarsjedisurvivor-respawnentertainment-g2-00-900x2254-63377af0466c.jpg",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10 64-bit",
            "Processor": "Intel Core i7-7700 or AMD Ryzen 5 1400",
            "Memory" : "8 GB RAM",
            "Storage": "155 GB",
            "DirectX": "DirectX 12",
            "Graphics": "NVIDIA GeForce GTX 1070 or AMD Radeon RX 580"
          },
          "Recommended": {
            "OS": "Windows 10 64-bit",
            "Processor": "Intel Core i5 11600K or AMD Ryzen 5 5600X",
            "Memory" : "16 GB RAM",
            "Storage": "155 GB",
            "DirectX": "DirectX 12",
            "Graphics": "NVIDIA GeForce RTX2070 or AMD RX 6700 XT"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.10",
            "Processor": "Apple A13",
            "Memory" : "8 GB RAM",
            "Storage": "155 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 580"
          },
          "Recommended": {
            "OS": "MacOS 12",
            "Processor": "Apple M1",
            "Memory" : "16 GB RAM",
            "Storage": "155 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon RX 6700"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English", "Italian", "French", "German", "Spanish - Spain", "Spanish - Latin America", "Polish", "Japanese", "Portuguese - Brazil"],
        "Text": ["English", "French", "Italian", "German", "Spanish - Latin America", "Spanish - Spain", "Portuguese - Brazil", "Polish", "Japanese", "Korean", 
                "Chinese - Simplified", "Chinese - Traditional"]
      }
    },
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
    logo:
      "https://cdn2.unrealengine.com/egst-logo-400x400-400x400-b6a3541c815c.png?h=270&quality=medium&resize=1&w=480",
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
      "https://cdn2.unrealengine.com/1-cpu4618-tsr-new-screenshot-jorn-village-01-1920x1080-1920x1080-f4e40073b4c9.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/2-cpu4618-tsr-new-screenshot-faction-units-1920x1080-1920x1080-1f58cf7b1d33.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/3-cpu4618-tsr-new-screenshot-landmark-03-1920x1080-1920x1080-4fa2b5aedd67.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/4-cpu4618-tsr-new-screenshot-engineers-landmark-03-v02-1920x1080-1920x1080-4406ca213383.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/5-cpu4618-tsr-new-screenshot-army-battle-02-1920x1080-1920x1080-451bb3e2309f.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/6-cpu4618-tsr-new-screenshot-siege-units-elari-v02-1920x1080-1920x1080-2124be88d386.jpg?h=720&quality=medium&resize=1&w=1280",
    ],
    images: [
      "https://cdn2.unrealengine.com/7-cpu4618-tsr-new-screenshot-maru-village-02-v02-1920x1080-1920x1080-053864d61012.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/8-cpu4618-tsr-new-screenshot-landmark-01-1920x1080-1920x1080-29b0e18fe145.jpg?h=720&quality=medium&resize=1&w=1280",
      "https://cdn2.unrealengine.com/tsr-comparative-grid-1920x1080-gb-1920x1080-7e7ebc647554.jpg?h=720&quality=medium&resize=1&w=1280",
    ],
    specifications: {
      "Configurations": {
        "Windows": {
          "Minimum": {
            "OS": "Windows 10 (x64 bit only)",
            "Processor": "Intel i3-6100 or AMD Ryzen 3 1200",
            "Memory" : "8 GB RAM",
            "Storage": "150 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 950 or AMD Radeon 550"
          },
          "Recommended": {
            "OS": "Windows 10 (x64 bit only)",
            "Processor": "Intel Core i5 3570K or AMD Ryzen 3 1300x",
            "Memory" : "8 GB RAM",
            "Storage": "150 GB",
            "DirectX": "DirectX 11",
            "Graphics": "NVIDIA GeForce GTX 970 or AMD RX 470"
          },
        },
        
        "Macbook": {
          "Minimum": {
            "OS": "MacOS 10.12",
            "Processor": "Apple A12",
            "Memory" : "8 GB RAM",
            "Storage": "150 GB",
            "Metal": "Version 2.2",
            "Graphics": "AMD Radeon RX 480"
          },
          "Recommended": {
            "OS": "MacOS 11",
            "Processor": "Apple A16",
            "Memory" : "8 GB RAM",
            "Storage": "150 GB",
            "Metal": "Version 3",
            "Graphics": "AMD Radeon R9 Fury"
          },
        },
      },
      "Login": true,
      "Languages Supported":{
        "Audio": ["English", "French", "German"],
        "Text": ["English", "French", "Italian", "German", "Spanish", "Czech", "Polish", "Russian", "Portuguese (Brazilian)", "Japanese", "Korean", "Traditional Chinese", 
                "Simplified Chinese"]
      }
    },
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
