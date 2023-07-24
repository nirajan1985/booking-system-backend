const db = require("../models");
const Booking = db.Booking;

/**
 * Creates a booking based on the provided request body.
 *
 * @param {Object} req - The request object containing the request body.
 * @param {Object} res - The response object used to send the response.
 * @return {Object} The created booking object.
 */
exports.create = (req, res) => {
  const { startTime, endTime, userId, roomId, bookingTitle } = req.body;

  // Validate request
  if (!startTime || !endTime || !userId || !roomId || !bookingTitle) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Check if User and Room exist
  Promise.all([db.User.findByPk(userId), db.Room.findByPk(roomId)])
    .then(([user, room]) => {
      if (!user || !room) {
        res.status(400).send({
          message: "User or Room not found!",
        });
        return;
      }

      // Check if there's already a booking in the specified time range for the same room
      return Booking.findOne({
        where: {
          roomId: roomId,
          startTime: {
            [db.Sequelize.Op.lt]: new Date(endTime),
          },
          endTime: {
            [db.Sequelize.Op.gt]: new Date(startTime),
          },
        },
      });
    })
    .then((existingBooking) => {
      if (existingBooking) {
        res.status(400).send({
          message: "The room is already booked for the specified time range.",
        });
        return;
      }

      // Create a booking
      const booking = {
        startTime: startTime,
        endTime: endTime,
        userId: userId,
        roomId: roomId,
        bookingTitle: bookingTitle,
      };

      // Save Booking in the database
      return Booking.create(booking);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Booking.",
      });
    });
};

/**
 * Retrieves all bookings from the database and sends a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The response object.
 */
exports.getAll = (req, res) => {
  Booking.findAll({})
    .then((bookings) => {
      res.status(200).json({
        success: true,
        data: bookings,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

/**
 * Retrieves a booking by its ID and sends the corresponding data as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The JSON response containing the booking data or an error message.
 */
exports.getById = (req, res) => {
  const id = req.params.id;

  Booking.findByPk(id)
    .then((booking) => {
      if (booking) {
        res.status(200).json({
          success: true,
          data: booking,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

/**
 * Updates a booking based on the provided ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to the updated booking.
 */
exports.update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Booking.findByPk(id)
    .then((booking) => {
      if (booking) {
        return booking.update(updatedData); // Update the booking
      } else {
        res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }
    })
    .then((updatedBooking) => {
      res.status(200).json({
        success: true,
        data: updatedBooking,
        message: "Booking updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};
/**
 * Deletes a booking.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to the deleted booking or an error.
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  Booking.findByPk(id)
    .then((booking) => {
      if (booking) {
        return booking.destroy(); // Delete the booking
      } else {
        res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Booking deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};
