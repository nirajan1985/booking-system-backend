const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.User = require("./user.js")(sequelize, Sequelize);
db.Room = require("./room.js")(sequelize, Sequelize);
db.Booking = require("./booking.js")(sequelize, Sequelize);

// Define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
