const { verifyToken } = require("../helper/jwt");
const {User} = require('../models');
const authentication = async (req, res, next) => {
    // console.log(req.headers.authorization);
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return res.status(401).json({
                message: 'Please login first'
            });
        }
        const token = bearerToken.split(' ')[1];

        const decoded = verifyToken(token);
        const user = await User.findOne({
            where: {
                id: decoded.id
            }
        });
        if (!user) {
            return res.status(401).json({
                message: 'Please login first'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        
    }
    
}
module.exports = authentication;