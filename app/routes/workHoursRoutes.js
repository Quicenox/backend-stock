const { Router } = require('express');
const workHoursCtrl = require('../controllers/workHoursController');

const router = new Router();
router.post('/',workHoursCtrl.toStock);

module.exports = router;