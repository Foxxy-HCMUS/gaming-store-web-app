// module.exports = app => {
//     const { authJwt } = require("../middlewares");
//     const controller = require("../controllers/user-session.controller");
//     var router = require("express").Router();

    
//     router.get("/all", controller.allAccess);

//     router.get("/user", [authJwt.verifyToken], controller.userBoard);

//     router.get("/user/profile", [authJwt.verifyToken], controller.fetchUser);

//     router.put("/user/update", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

//     router.delete("/user/remove", [authJwt.verifyToken, authJwt.isAdmin], controller.removeUser);
    
//     router.post("/user/username-availability", controller.checkUsernameAvailability);

//     router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

//     router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

//     router.get("/admin/fetch-user",[authJwt.verifyToken, authJwt.isAdmin], controller.fetchAllUser);

//     router.get("/admin/findall-userroles",[authJwt.verifyToken, authJwt.isAdmin], controller.findAllUserRoles);

//     // router.get("/admin/findall-only-user",[authJwt.verifyToken, authJwt.isAdmin], controller.findUserWithRoles);

//     router.get("/wishlist", [authJwt.verifyToken], controller.getWishlist);

//     router.post("/wishlist", [authJwt.verifyToken], controller.addToWishlist);

//     router.delete("/wishlist", [authJwt.verifyToken], controller.removeFromWishlist);

//     router.post("/cart", [authJwt.verifyToken], controller.addToCart);

//     router.delete("/cart", [authJwt.verifyToken], controller.removeFromCart);

//     router.post("/wallet", [authJwt.verifyToken], controller.SubtractWallet);

//     // router.delete("/cart", [authJwt.verifyToken], controller.addToCart);


//     app.use(function (req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.use('', router);
// };

module.exports = app => {
    const { authJwt } = require("../middlewares");
    const controller = require("../controllers/user-session.controller");
    var router = require("express").Router();

    
    router.get("/all", controller.allAccess);

    router.get("/user", [authJwt.verifyToken], controller.userBoard);

    router.get("/user/profile", [authJwt.verifyToken], controller.fetchUser);

    // router.put("/user/update", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

    // router.delete("/user/remove", [authJwt.verifyToken, authJwt.isAdmin], controller.removeUser);
    
    router.post("/user/username-availability", controller.checkUsernameAvailability);

    // router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

    // router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    // router.get("/admin/fetch-user",[authJwt.verifyToken, authJwt.isAdmin], controller.fetchAllUser);

    // router.get("/admin/findall-userroles",[authJwt.verifyToken, authJwt.isAdmin], controller.findAllUserRoles);

    // router.get("/admin/findall-only-user",[authJwt.verifyToken, authJwt.isAdmin], controller.findUserWithRoles);

    router.get("/wishlist", [authJwt.verifyToken], controller.getWishlist);

    router.post("/wishlist", [authJwt.verifyToken], controller.addToWishlist);

    router.delete("/wishlist", [authJwt.verifyToken], controller.removeFromWishlist);

    router.post("/cart", [authJwt.verifyToken], controller.addToCart);

    router.delete("/cart", [authJwt.verifyToken], controller.removeFromCart);

    router.post("/wallet", [authJwt.verifyToken], controller.SubtractWallet);

    // router.delete("/cart", [authJwt.verifyToken], controller.addToCart);


    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('', router);
};