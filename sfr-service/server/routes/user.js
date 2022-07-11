const router = require ("express").Router();
const userController = require("../controllers/user.controller");
const { userAuth } = require('../middlewares/userAuth.middleware');

router.route("/profile").get(userAuth, userController.show);

module.exports = router;