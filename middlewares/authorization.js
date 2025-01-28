const { Product } = require('../models');
const authorization =  async(req, res, next) => {
    // console.log(req.user);
    
    try {
        const {id} = req.params;
        // console.log(id);
        const product = await Product.findByPk(id);
        // console.log(product);
        
        if(!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        };
        if(product.userId !== req.user.id) {
            return res.status(401).json({
                message: 'You are not authorized'
            });
        };
        next();
       
    } catch (error) {
        console.log(error);
        
    }
};
module.exports = authorization;