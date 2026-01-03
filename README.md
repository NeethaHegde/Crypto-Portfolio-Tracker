# Crypto Portfolio Tracker

A premium Web3-themed dashboard to track cryptocurrency investments, built with React (Vite) and Node.js/Express.

![Portfolio Tracker Logo](frontend/public/logo.png)

## Features
- **Secure Authentication**: JWT-based Signup/Login with bcrypt password hashing.
- **Portfolio Management**:
    - **Add Assets**: Track coins by Name, Amount, and Buy Price.
    - **Real-time Valuation**: Automatically calculates total portfolio value.
    - **Visual Analytics**: Interactive Doughnut chart (Chart.js) showing asset distribution.
    - **CRUD Operations**: Full Create, Read, Update, Delete functionality for assets.
- **Modern UI/UX**:
    - **Web3 Aesthetics**: Dark mode, glassmorphism cards, and gradients.
    - **Interactive Feedback**: Toast notifications (`react-hot-toast`) for user actions.
    - **Responsive Design**: Fully mobile-responsive using Bootstrap 5.

## Tech Stack
- **Frontend**: React.js, Vite, Bootstrap 5 (CDN), Chart.js, React Hot Toast.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT.
- **Tools**: Git, Axios, Helmet (Security).

## Setup
1.  **Backend**:
    ```bash
    cd backend
    npm install
    # Create .env with MONGO_URI, JWT_SECRET, PORT
    node server.js
    ```
2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Note on Scalability
To scale this application for production, consider the following improvements:

1.  **Database Caching with Redis**:
    - Implement Redis to cache frequently accessed data such as the "Assets" list. This significantly reduces database load and improves response times for read-heavy operations.

2.  **Containerization with Docker**:
    - Dockerize both the Backend and Frontend services. Using `docker-compose` ensures consistent environments across development and production, simplifying deployment and orchestration.

3.  **Security Enhancements**:
    - Switch JWT storage from `localStorage` to **HttpOnly Cookies**. This mitigates XSS attacks by preventing client-side scripts from accessing the token.
    - Implement Rate Limiting to prevent brute-force attacks on Auth endpoints.

4.  **Real-Time Data**:
    - Integrate a third-party API (like CoinGecko) to fetch live crypto prices instead of manual entry.
