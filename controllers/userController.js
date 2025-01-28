const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");
class userController {
  static async register(req, res) {
    // res.send('register');
    try {
      const { username, email, password } = req.body;
      // console.log(username, email, password);
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
    }
  };
    static async login(req, res) {
        // res.send('login');
        try {
            const { email, password } = req.body;
            // console.log(email, password);
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const user = await User.findOne({
                where: {
                    email,
                },
            });
            // console.log(user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            };
            const validPassword = comparePassword(password, user.password);
            // console.log(validPassword);
            
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            };
            const accessToken = signToken({
                id: user.id,
                email: user.email,
            });
            res.status(200).json({
                message: 'Login success',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message:error.errors[0].message });
            }
        }
    };
}
module.exports = userController;
