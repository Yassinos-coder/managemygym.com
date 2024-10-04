const { Router } = require('express');
const gymAPIRouter = Router();
const {verifyToken} = require('../utils/JwtAuth');
const GymModel = require('../Models/GymModel');
const { EncryptData } = require('../utils/DataEncrypter');

gymAPIRouter.get('/api/v1/GetGymData/:uuid', verifyToken, async (req, res) => {
    let uuid = req.params.uuid;
    try {
        let GymData = await GymModel.findOne({ gymOwnerId: uuid });
        if (!GymData) {
            return res.status(404).json({
                status: 'FAILED',
                error: 'NO_GYM_FOUND'
            });
        }
        const encryptedData = EncryptData(GymData.toObject());
        res.status(200).json({
            GymData: encryptedData,
            status: 'SUCCESS',
        });
    } catch (err) {
        console.log(`Error in GetGymData ${err.message}`);
        res.status(500).json({
            error: err.message
        });
        throw err;
    }
});

gymAPIRouter.post('/api/v1/AddGym', verifyToken, async (req, res) => {
    let newGym = req.body;
    try {
        const AddNewGym = new GymModel(newGym);
        const isSaved = await AddNewGym.save();
        let encryptedData = EncryptData(isSaved.toObject());
        res.status(200).json({
            GymData: encryptedData,
            message: 'SUCCESS'
        });
    } catch (err) {
        console.error(`Error in AddGym ${err.message}`);
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = gymAPIRouter;
