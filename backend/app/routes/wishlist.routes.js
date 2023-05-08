module.exports = app => {
    const controller = require("../controllers/wishlist.controller");
    var router = require("express").Router();

    
    router.get("", controller.getWishlist);

    router.post("", controller.addToWishlist);

    router.delete("/:id", controller.deleteFromWishlist);

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use('/wishlist', router);
};