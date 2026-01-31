const express = require('express');
const {
    transportQuote, transportBook,
    insuranceQuote, insuranceActivate
} = require('../controllers/supportController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(protect);

router.post('/transport/quote', transportQuote);
router.post('/transport/book', transportBook);
router.post('/insurance/quote', insuranceQuote);
router.post('/insurance/activate', insuranceActivate);

module.exports = router;
