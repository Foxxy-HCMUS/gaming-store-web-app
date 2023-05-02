module.exports = app => {
    const { verifySignUp }= require("../middlewares");
    const controller = require("../controllers/auth.controller.js");

    const router = require("express").Router();

    router.post("/signup", 
        [
            verifySignUp.checkDuplicateUsernameOrEmail, 
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    router.post("/signin", controller.signin);

    router.post("/refreshtoken", controller.refreshToken);

    app.use("/api/auth", router);
};