const db = require("../models");
// const Game = db.game;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");

exports.makeOrder = async (req, res) => {
  const { userId, games } = req.body;
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // lấy game từ db
    const gameIds = games.map((game) => game.id);
    const dbGames = await db.game.findAll({
      where: { id: { [Op.in]: gameIds } },
    });

    const existingOrderGame = await db.order_games.findOne({
        where: { gameId: { [Op.in]: gameIds } },
        include: [{ model: db.order, where: { userId } }],
    });
    if (existingOrderGame) {
        return res.status(400).send({ message: "User already bought this game" });
    }
    
    // tính tổng tiền
    console.log(dbGames)
    const orderTotal = dbGames.reduce(
      (total, game) =>
        total +
        dbGames.find((g) => g.id === game.id).discountedPrice, 0
    );
    
    if (orderTotal > user.wallet) {
        return res
          .status(400)
          .send({ message: "Insufficient funds in wallet" });
      }

    const order = await db.order.create({
      userId,
      orderDate: new Date(),
      orderStatus: "success",
      orderTotal,
      orderPayment: { method: "cash" },
    });

    await db.user.update(
        { wallet: user.wallet - orderTotal },
        { where: { id: userId } }
      );

    const orderGames = await Promise.all(
      games.map(async (game) => {
        const dbGame = dbGames.find((g) => g.id === game.id);
        if (!dbGame) {
          return null;
        }
        return { orderId: order.id, gameId: dbGame.id };
      })
    );
    await db.order_games.bulkCreate(
      orderGames.filter((og) => og !== null)
    );
    res.send({ message: "Order created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
  }
};

exports.getOrders = async (req, res) => {
    const { userId } = req.params;
    console.log(req.params);
    try {
        const orders = await db.order.findAll({
        where: { userId },
        include: [
            {
            model: db.order_games,
            include: [{ model: db.game }],
            },
        ],
        });
        res.send(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred" });
    }
}
