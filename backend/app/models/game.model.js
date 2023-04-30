module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
        type: Sequelize.JSON       
      },
      genres: {
        type: Sequelize.JSON
      },
      features: {
        type: Sequelize.JSON
      },
      tags: {
        type: Sequelize.JSON
      },
      aboutGame: {
        type: Sequelize.TEXT  
      },
      gameFeatures: {
        type: Sequelize.JSON
      },
      heroImages: {
        type: Sequelize.JSON
      },
      images: {
        type: Sequelize.JSON
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
        type: Sequelize.JSON
      }
    });
  
    return Game;
};