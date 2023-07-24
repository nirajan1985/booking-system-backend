const db = require("../models");
const Room = db.rooms;

exports.create = (req, res) => {
  const room = {
    name: req.body.name,
    capacity: req.body.capacity,
  };

  Room.create(room)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Room.",
      });
    });
};

exports.getAll = (req, res) => {
  Room.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting all rooms.",
      });
    });
};

exports.getById = (req, res) => {
  // Implement getting a single room by id
};

exports.update = (req, res) => {
  // Implement room update
};

exports.delete = (req, res) => {
  // Implement room deletion
};
