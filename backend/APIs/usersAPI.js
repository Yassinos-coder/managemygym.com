const Router = require('express');
const userApiRouter = Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const UserModel = require('../Models/UserModel');
const saltRounds = 10;
const { signToken, verifyToken } = require('../utils/JwtAuth')

// User creates account with input validation
userApiRouter.post(
    '/api/v1/newUser',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array(),
                status: 'ERROR'
            });
        }

        let newUser = req.body;
        console.log(newUser)
        try {
            const doesUserExist = await UserModel.findOne({ email: newUser.email });
            if (doesUserExist) {
                return res.status(400).json({
                    message: 'USER_EXISTS',
                    status: 'ERROR'
                });
            }

            const hashedPassword = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(saltRounds));
            newUser.password = hashedPassword;

            const user = new UserModel(newUser);
            await user.save();

            res.status(201).json({
                userData: user,
                message: 'USER_CREATED',
                status: 'SUCCESS'
            });

        } catch (err) {
            console.error(`Error in newUser => ${err.message}`);
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message,
                status: 'ERROR'
            });
        }
    }
);

// User login
userApiRouter.post(
    '/api/v1/login',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array(),
                status: 'ERROR'
            });
        }

        let loginData = req.body;

        try {
            // Find the user by email
            let userDataFromDB = await UserModel.findOne({ email: loginData.email });
            if (!userDataFromDB) {
                return res.status(404).json({
                    message: 'User not found',
                    status: 'ERROR'
                });
            }

            // Compare password
            let passwordMatch = bcrypt.compareSync(loginData.password, userDataFromDB.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'Invalid credentials',
                    status: 'ERROR'
                });
            }
            let token = signToken(userDataFromDB)
            // Sign JWT token and send response
            userDataFromDB.password = null
            res.status(200).json({
                userData: userDataFromDB,
                token: token,
                message: 'ACCESS_GRANTED',
                status: 'SUCCESS'
            });

        } catch (err) {
            console.error(`Error in login => ${err.message}`);
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message,
                status: 'ERROR'
            });
        }
    }
);

module.exports = userApiRouter;
