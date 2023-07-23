const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings');

router.post('/', bookingsController.create);
router.get('/', bookingsController.getAll);
router.get('/:id', bookingsController.getById);
router.put('/:id', bookingsController.update);
router.delete('/:id', bookingsController.delete);

module.exports = router;