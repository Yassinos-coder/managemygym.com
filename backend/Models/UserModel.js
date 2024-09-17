const db = require('mongoose');

const UserSchema = new db.Schema({
    userEmail: {
        type: String,
        required: true
    },
    hashedPassword: {
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
        required: false
    },
    paymentMethodId: {
        type: String,
        required: false
    },
    billingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        required: false

    },
    paymentHistory: [{
        transactionId: String,
        amount: Number,
        date: Date,
        status: String,
        required: false

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
        required: false,
        enum: ['free', 'basic', 'premium']
    },
    subscriptionStartDate: {
        type: Date,
        required: false
    },
    subscriptionEndDate: {
        type: Date,
        required: false
    }
});

const UserModel = db.model('User', UserSchema);
module.exports = UserModel;
