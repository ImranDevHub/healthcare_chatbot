# Testing the Refactored Authentication Flow

This guide provides instructions on how to run and test the new authentication system.

## Prerequisites

- Bun installed on your machine.
- Firebase project with Email/Password, Google, and Anonymous sign-in methods enabled.
- `firebase-admin.json` service account key file in `packages/server/`.

## 1. Running the Backend

1.  Navigate to the server directory:
    ```sh
    cd packages/server
    ```
2.  Install dependencies:
    ```sh
    bun install
    ```
3.  Start the development server:
    ```sh
    bun run dev
    ```
    The server will be running at `http://localhost:3000`.

## 2. Running the Frontend

1.  Navigate to the client directory:
    ```sh
    cd packages/client
    ```
2.  Install dependencies:
    ```sh
    bun install
    ```
3.  Start the development server:
    ```sh
    bun run dev
    ```
    The frontend will be running at `http://localhost:5174` (or another port if 5173 is in use).

## 3. Testing the Authentication Flows

Open your browser and navigate to the frontend URL.

### a. Email/Password Signup and Login

1.  Click the "Sign Up" button and create a new account.
2.  You should be redirected to the chatbot page.
3.  Log out.
4.  Click the "Login" button and log in with the newly created account.
5.  You should be redirected to the chatbot page.

### b. Google Login

1.  Click the "Login" button.
2.  Click the "Sign in with Google" button.
3.  Complete the Google authentication flow.
4.  You should be redirected to the chatbot page.

### c. Guest Login

1.  Click the "Login" button.
2.  Click the "Sign in as Guest" button.
3.  You should be redirected to the chatbot page.

### d. Protected Route

1.  Once logged in (with any method), you can test the protected route.
2.  You can use a tool like Postman or `curl` to make a GET request to `http://localhost:3000/auth/protected`.
3.  Make sure to include the `Authorization: Bearer <ID_TOKEN>` header. You can get the ID token from the browser's local storage or by inspecting the network requests.
4.  You should receive a `200 OK` response with a welcome message.

This completes the refactoring and testing guide. The application is now ready for further development.
