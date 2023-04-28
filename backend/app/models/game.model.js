module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      thumbnails: {
        type: Sequelize.STRING
      },
      cardImage: {
        type: Sequelize.STRING
      },
      cardTagline: {
        type: Sequelize.STRING
      },
      mainPrice: {
        type: Sequelize.FLOAT
      },
      discountPercentage: {
        type: Sequelize.FLOAT
      },
      discountedPrice: {
        type: Sequelize.FLOAT
      },
      developer: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      features: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      aboutGame: {
        type: Sequelize.STRING
      },
      gameFeatures: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      heroImages: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      criticRecommend: {
        type: Sequelize.FLOAT
      },
      topCriticAverage: {
        type: Sequelize.FLOAT
      },
      openCriticrating: {
        type: Sequelize.STRING
      },
      reviews: {
        type: Sequelize.JSONB
      }
    });
  
    return Game;
};