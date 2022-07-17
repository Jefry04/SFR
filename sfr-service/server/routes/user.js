const router = require ("express").Router();
const userController = require("../controllers/user.controller");
const { userAuth } = require('../middlewares/userAuth.middleware');

router.route("/profile").get(userAuth, userController.show);
router.route('/profile/fields').get(userAuth, userController.getFieldByUserId)

module.exports = router;