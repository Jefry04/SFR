const router = require ("express").Router();
const userController = require("../controllers/user.controller");
const { userAuth } = require('../middlewares/userAuth.middleware');

router.route("/profile").get(userAuth, userController.show);
router.route('/profile/fields').get(userAuth, userController.getFieldByUserId)
router.route('/profile/bookings').get(userAuth, userController.getUserBookings)

module.exports = router;