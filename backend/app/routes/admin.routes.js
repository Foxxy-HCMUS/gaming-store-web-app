module.exports = app => {
    const { authJwt } = require("../middlewares");
    const controller = require("../controllers/admin.controller");
    var router = require("express").Router();

    
    router.get("/all", controller.allAccess);

    router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    router.get("/admin/profile", [authJwt.verifyToken], controller.fetchAdmin);

    router.put("/user/update", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

    router.delete("/user/remove", [authJwt.verifyToken, authJwt.isAdmin], controller.removeUser);
    
    router.post("/user/username-availability", controller.checkUsernameAvailability);

    router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    router.get("/admin/fetch-user",[authJwt.verifyToken, authJwt.isAdmin], controller.fetchAllUser);

    router.get("/admin/findall-userroles",[authJwt.verifyToken, authJwt.isAdmin], controller.findAllUserRoles);

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('', router);
};