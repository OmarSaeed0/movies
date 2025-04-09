const express=require("express");
const tourContraller = require('../controllers/tourcontroller');

const router = express.Router();

router
.route('/')
.get(tourContraller.getAllTours)
.post(tourContraller.createTour);

router
.route('/:id')
.get(tourContraller.getTour)
.patch(tourContraller.updateTour)
.delete(tourContraller.deleteTour);

module.exports = router;