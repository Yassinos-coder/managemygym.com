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
    gymSubscriptionPlans: [{
        planName: String,
        planPrice: String,
    }],
    gymEmployeeList: [{
        employeeName: String,
        employeeRole: String,
    }, { timestamps: true }],
});

const GymModel = db.model('Gyms', GymSchema);
module.exports = GymModel;
