# Web3 Trading Task Dashboard

A high-performance Web3-themed dashboard built with React (Vite) and Node.js/Express.

## Features
- **JWT Authentication**: Secure Signup/Login with password hashing.
- **Glassmorphism Web3 UI**: Modern dark theme with Bootstrap 5 (CDN) and custom CSS.
- **Signal CRUD**: Create, Read, Delete trading signals protected by authentication.
- **Real-time Filtering**: Client-side filtering of signals.

## Tech Stack
- **Frontend**: React.js, Vite, Bootstrap 5 (CDN)
- **Backend**: Node.js, Express, MongoDB (Mongoose)

## Setup
1. **Backend**:
    ```bash
    cd backend
    npm install
    # Create .env with MONGO_URI, JWT_SECRET, PORT
    node server.js
    ```
2. **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Note on Scalability
To scale this application for production, consider the following improvements:

1.  **Database Caching with Redis**:
    - Implement Redis to cache frequently accessed data such as the "Signals" list or User Profiles. This significantly reduces database load and improves response times for read-heavy operations.

2.  **Containerization with Docker**:
    - Dockerize both the Backend and Frontend services. Using `docker-compose` ensures consistent environments across development and production, simplifying deployment and orchestration (e.g., via Kubernetes).

3.  **Security Enhancements**:
    - Switch JWT storage from `localStorage` to **HttpOnly Cookies**. This mitigates XSS attacks by preventing client-side scripts from accessing the token.
    - Implement Rate Limiting to prevent brute-force attacks on Auth endpoints.

4.  **Load Balancing**:
    - Run multiple instances of the Node.js API behind a load balancer (like Nginx) to handle increased traffic.
