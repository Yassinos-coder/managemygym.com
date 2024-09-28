class UserObject {
    constructor(
        firstname = "",
        lastname = "",
        email = "",
        password = "",
        userRole = "",
        phoneNumber = "",
        ownerGymId = null,
        paymentMethodId = "",
        billingAddress = {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
        },
        paymentHistory = [],
        isVerified = false,
        twoFactorAuthEnabled = false,
        subscriptionType = "free",
        subscriptionStartDate = null,
        subscriptionEndDate = null
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.phoneNumber = phoneNumber;
        this.ownerGymId = ownerGymId;
        this.paymentMethodId = paymentMethodId;
        this.billingAddress = billingAddress;
        this.paymentHistory = paymentHistory;
        this.isVerified = isVerified;
        this.twoFactorAuthEnabled = twoFactorAuthEnabled;
        this.subscriptionType = subscriptionType;
        this.subscriptionStartDate = subscriptionStartDate;
        this.subscriptionEndDate = subscriptionEndDate;
    }
}

export default UserObject;
