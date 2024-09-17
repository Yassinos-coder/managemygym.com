const Router = require('express');
const userApiRouter = Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const UserModel = require('../Models/UserModel');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

// User creates account with input validation
userApiRouter.post(
    '/api/v1/newUser',
    [
        // Validate the email
        body('userEmail').isEmail().withMessage('Invalid email format'),
        // Validate the password length
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation failed:', errors.array()); // Log validation errors for debugging
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array(),
                status: 'ERROR'
            });
        }

        let newUser = req.body;

        try {


            // Check if the user already exists
            const doesUserExist = await UserModel.findOne({ userEmail: newUser.userEmail });
            if (doesUserExist) {
                return res.status(400).json({
                    message: 'USER_EXISTS',
                    status: 'ERROR'
                });
            }

            // Hash the user's password
            const hashedPassword = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(saltRounds));
            newUser.password = hashedPassword

            // Create a new user object
            const user = new UserModel(newUser);

            // Save the new user to the database
            await user.save();

            // Send success response
            res.status(201).json({
                message: 'USER_CREATED',
                status: 'SUCCESS'
            });

        } catch (err) {
            console.error(`Error in newUser => ${err.message}`); // Detailed error logging
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message,
                status: 'ERROR'
            });
        }
    }
);

userApiRouter.post('/api/v1/login', [
    body('userEmail').isEmail().withMessage('Invalid email format'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation failed:', errors.array()); // Log validation errors for debugging
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array(),
            status: 'ERROR'
        });
    }

    let loginData = req.body;
    try {
        let userDataFromDB = await UserModel.findOne({ userEmail: loginData.userEmail });
        if (userDataFromDB) {
            let result = bcrypt.compareSync(loginData.password, userDataFromDB.hashedPassword);
            if (result) {
                // Only include necessary user info in the token payload
                const tokenPayload = { userId: userDataFromDB._id };
                const tokenKey = jwt.sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: '72h' }); // Set token expiration as needed

                res.status(200).json({
                    userData: userDataFromDB,
                    token: tokenKey,
                    message: 'ACCESS_GRANTED',
                    status: 'SUCCESS'
                });
            } else {
                res.status(401).json({
                    message: 'Invalid credentials',
                    status: 'ERROR'
                });
            }
        } else {
            res.status(404).json({
                message: 'User not found',
                status: 'ERROR'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
            status: 'ERROR'
        });
    }
});


module.exports = userApiRouter;
