const db = require('mongoose');

const GymSchema = new db.Schema({
    gymName: {
        type: String,
        required: true,
    },
    gymOwnerId: {
        type: db.Types.ObjectId,
        required: true,
    },
    gymMembers: {
        type: JSON,
        required: true
    },
    gymSubscriptionPlans: {
        type: JSON,
        required: true
    }
});

const GymModel = db.model('Gyms', GymSchema);
module.exports = GymModel;
