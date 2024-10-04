const db = require('mongoose');

const GymSchema = new db.Schema({
    gymName: {
        type: String,
        required: true,
    },
    gymLocation: {
        type: String,
        required: true,
    },
    gymOwnerId: {
        type: db.Types.ObjectId,
        required: true,
    },
    gymMembers: {
        type: JSON,
        required: false
    },
    gymSubscriptionPlans: {
        type: JSON,
        required: true
    },
    gymEmployeeList: {
        type: JSON,
        required: false
    }
});

const GymModel = db.model('Gyms', GymSchema);
module.exports = GymModel;
