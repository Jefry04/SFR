const router = require('express').Router();
const bookingController = require ('../controllers/booking.controller');
const { userAuth } = require('../middlewares/userAuth.middleware');

router.route('/:fieldId').post(userAuth, bookingController.create);
router.route('/:fieldId').get(bookingController.filter);
router.route('/user/:bookingId').get(userAuth, bookingController.getBookingById);

router.route('/prueba/:bookingId').delete(userAuth, bookingController.destroy);

router.route('/').get( bookingController.list);

module.exports = router;
