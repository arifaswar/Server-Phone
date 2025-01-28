const { Product, User } = require('../models');
class productController {
  static async getProducts(req, res) {
    try {
        const products = await Product.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password']
                }
            }
        });
        res.status(200).json({
            message: 'Success get All products',
            data: products
        });
    } catch (error) {
        console.log(error);
    }
  }
  static async postProduct(req, res) {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const userId = req.user.id;
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            categoryId,
            userId
        });
        res.status(201).json({
            message: 'Success create product',
            data: product
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message
            });
        }
    }
  };

  static async updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, stock, categoryId } = req.body;
        if (!name || !description || !price || !stock || !categoryId) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const userId = req.user.id;
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        await product.update({
            name,
            description,
            price,
            stock,
            categoryId,
            userId
        });
        res.status(200).json({
            message: 'Success update product',
            data: product
        });

    } catch (error) {
        console.log(error);
    }
  };
  static async deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        await product.destroy();
        res.status(200).json({
            message: 'Success delete product'
        });
    } catch (error) {
        console.log(error);
    }
  }
};

module.exports = productController;