const productController = require('../controllers/productController');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.get('/', productController.getProducts);
router.post('/', productController.postProduct);
router.put('/:id', authorization, productController.updateProduct);
router.delete('/:id', authorization, productController.deleteProduct);

module.exports = router;