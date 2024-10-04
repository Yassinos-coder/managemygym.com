class GymObject {
    constructor(
        gymName = "",
        gymOwnerId = "",
        gymLocation = "",
        gymMembers = {},
        gymEmployeeList = {},
        gymSubscriptionPlans = {}
    ) {
        this.gymName = gymName
        this.gymOwnerId = gymOwnerId
        this.gymLocation = gymLocation
        this.gymMembers = gymMembers
        this.gymEmployeeList = gymEmployeeList
        this.gymSubscriptionPlans = gymSubscriptionPlans

    }
}
export default GymObject