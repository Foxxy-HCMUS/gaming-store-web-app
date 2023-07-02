module.exports = app => {
    const { authJwt } = require("../middlewares");

    const order = require("../controllers/order.controller.js");

    const router = require("express").Router();

    router.post("/",  order.makeOrder);

    router.get("/:userId",  order.getOrders);

    app.use('/order', router);

}