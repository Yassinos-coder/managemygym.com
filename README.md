# ManageMyGym.com

**ManageMyGym.com** is a web application designed to help gym owners manage their clientele, subscriptions, and other business activities in one place. Say goodbye to Excel sheets! This platform streamlines everything with a user-friendly web interface and offers a secure, scalable solution to manage all gym operations.

## Features

- **Client Management**: Track gym members, their details, and active subscriptions easily.
- **Subscription Management**: Keep records of membership durations, automatic renewals, and expired subscriptions.
- **Payment Integration**: Gym owners can subscribe to use the service for a monthly fee of $20-$25. Payments will be handled through a global payment gateway.
- **Reports and Analytics**: Generate reports on subscription trends, new members, and income analytics.
- **Secure & Scalable**: The app will ensure data security and can scale with the growth of the business.

## Tech Stack

This app will be built using the **MERN** (MongoDB, Express, React, Node.js) stack, leveraging modern technologies for both the front-end and back-end.

- **Frontend**:

  - React.js
  - React Router
  - Redux (for state management)
  - UI Libraries: Bootstrap, React Icons

- **Backend**:

  - Node.js with Express
  - MongoDB with Mongoose
  - Helmet for securing HTTP headers
  - Bcrypt for password hashing
  - JSON Web Token (JWT) for authentication
  - Dotenv for environment variable management

- **Hosting**:

  - Hosted on a Linux VPS for reliability and flexibility in scaling.
  - Nginx or Apache will be used for web server hosting.

- **Payment Gateway**:
  - Integrating a payment gateway to handle worldwide transactions. The gym owners will be charged a monthly subscription fee ($20-$25) to use the app.

## Future Development

- **UI/UX Design**: Still in the early stages of design.
- **Multi-Language Support**: To cater to gym owners worldwide, future versions will include multi-language options.
- **Additional Integrations**: Plans for integrating with CRM systems, automated marketing tools, and third-party fitness apps.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/managemygym.git
   ```

2. Navigate to the project directory:

   ```bash
   cd managemygym
   ```

3. Install the dependencies for both frontend and backend:

   Frontend:

   ```bash
   yarn install
   ```

   Backend:

   ```bash
   cd backend
   yarn install
   ```

4. Run the development server:

   Frontend:

   ```bash
   yarn start
   ```

   Backend:

   ```bash
   yarn dev
   ```

5. Configure the `.env` file for your backend API:
   ```
   MONGODB_URI=your_mongo_db_uri
   JWT_SECRET=your_jwt_secret
   PAYMENT_GATEWAY_API_KEY=your_payment_gateway_key
   ```

## License

This project is proprietary and strictly for personal, non-commercial use only. Unauthorized commercial use of this project or its derivatives is prohibited. Any violation of this policy may result in legal action.
