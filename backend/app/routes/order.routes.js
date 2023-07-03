module.exports = app => {
    const { authJwt } = require("../middlewares");

    const order = require("../controllers/order.controller.js");

    const router = require("express").Router();

    router.post("/", [authJwt.verifyToken],  order.makeOrder);

    router.get("/", [authJwt.verifyToken],  order.getOrders);

    app.use('/order', router);

}