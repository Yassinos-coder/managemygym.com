const db = require('mongoose');

const UserActivityLogSchema = new db.Schema({
    userId: {
        type: db.Types.ObjectId,
        required: true,
    },
    lastKnownIpAddress: {
        type: String,
        required: true
    },
    lastConnectionLocation: {
        type: String,
        required: true
    },
    lastConnectionLocation: {
        type: String,
        required: true
    },
    lastDeviceConnectedFrom: {
        type: String,
        required: true
    }
});

const UserActivityLogModel = db.model('UserActivityLog', UserActivityLogSchema);
module.exports = UserActivityLogModel;
