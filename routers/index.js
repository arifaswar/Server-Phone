const router = require('express').Router();
const userRouter = require('./users');
const productRouter = require('./products');
const authentication = require('../middlewares/authentication');

router.use(userRouter);

router.use(authentication);
router.use('/products', productRouter);

module.exports = router;