class GymObject {
    constructor(
        gymName = "",
        gymOwnerId = "",
        gymLocation = "",
        gymMembers = {},
        gymEmployees = {},
        gymSubscriptionPlans = {}
    ) {
        this.gymName = gymName
        this.gymOwnerId = gymOwnerId
        this.gymLocation = gymLocation
        this.gymMembers = gymMembers
        this.gymEmployees = gymEmployees
        this.gymSubscriptionPlans = gymSubscriptionPlans

    }
}
export default GymObject