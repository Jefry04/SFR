const router = require('express').Router();
const fieldController = require('../controllers/field.controller');
const { userAuth } = require('../middlewares/userAuth.middleware');

router.route('/').post(userAuth, fieldController.create);
router.route('/').get(fieldController.list);
router.route('/:fieldId').get(fieldController.show);
router.route('/:fieldId').delete(userAuth, fieldController.destroy);

module.exports = router;