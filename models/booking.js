/**
 * Associates the Booking model with other models.
 *
 * @param {object} models - The models object containing the User and Room models.
 * @return {void} This function does not return anything.
 */
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Booking.belongsTo(models.Room, { foreignKey: "roomId", as: "room" });
  };

  return Booking;
};
