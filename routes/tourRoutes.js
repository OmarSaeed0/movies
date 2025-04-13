const express=require("express");
const tourContraller = require('../controllers/tourcontroller');
const authContraller = require('../controllers/authcontrallerjs');


const router = express.Router();

router.post('/signup',authContraller.signup)

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