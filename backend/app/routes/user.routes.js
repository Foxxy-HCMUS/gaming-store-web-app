module.exports = app => {
    const { authJwt } = require("../middlewares");
    const controller = require("../controllers/user-session.controller");
    var router = require("express").Router();

    
    router.get("/all", controller.allAccess);

    router.get("/user", [authJwt.verifyToken], controller.userBoard);

    router.post("/user/username-availability", controller.checkUsernameAvailability);

    router.get("/mod", [authJwt.verifyToken], controller.moderatorBoard);

    router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('/', router);
};