const db = require('mongoose');

const UserSchema = new db.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    ownerGymId: {
        type: db.Types.ObjectId,
    },
    paymentMethodId: {
        type: String,
    },
    billingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,

    },
    paymentHistory: [{
        transactionId: String,
        amount: Number,
        date: Date,
        status: String,

    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    twoFactorAuthEnabled: {
        type: Boolean,
        default: false
    },
    subscriptionType: {
        type: String,
        enum: ['free', 'basic', 'premium']
    },
    subscriptionStartDate: {
        type: Date,
    },
    subscriptionEndDate: {
        type: Date,
    }
});

const UserModel = db.model('User', UserSchema);
module.exports = UserModel;
