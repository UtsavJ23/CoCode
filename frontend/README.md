Here's the updated README file for your project:

---

# CoCode

CoCode is a real-time collaborative code editor built using React, Node.js, Express, Socket.io, and MongoDB. This application allows multiple users to share and edit code simultaneously across different devices without the need for user authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Real-Time Collaboration**: Multiple users can join a shared room and edit code simultaneously.
- **No Authentication Required**: Share the same URL across multiple devices to view and edit code.
- **Code Persistence**: Code is stored in a MongoDB database and persists even after all users disconnect.
- **Smooth and Responsive UI**: Aesthetic dark-themed UI with a spacey, dreamy feel using Tailwind CSS.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express, Socket.io, MongoDB

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/CoCode.git
    cd CoCode
    ```

2. **Install dependencies** for both frontend and backend:
    ```bash
    # Navigate to the backend directory
    cd cocode-backend
    npm install
    
    # Navigate to the frontend directory
    cd ../cocode-frontend
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the `cocode-backend` directory.
    - Add the following variables:

    ```bash
    PORT=5000
    MONGO_URI=<>
    CORS_ORIGIN=http://localhost:5173
    ```

4. **Start the backend server**:
    ```bash
    cd cocode-backend
    npm start
    ```

5. **Start the frontend server**:
    ```bash
    cd ../cocode-frontend
    npm start
    ```

6. **Open your browser** and navigate to `http://localhost:5173` to start using CoCode.

## Environment Variables

- **PORT**: The port on which the backend server runs (default: `5000`).
- **MONGO_URI**: The MongoDB connection URI string.
- **CORS_ORIGIN**: The URL allowed for CORS (e.g., `http://localhost:5173`).

## Usage

1. **Open CoCode**: Access the frontend by navigating to `http://localhost:5173` in your web browser.
2. **Edit and Share Code**: Start editing code in the editor, and it will be shared in real-time with anyone accessing the same URL.
3. **Persistent Code**: The code you edit is saved in a MongoDB database and will persist even if all users disconnect.

## Contributing

If you want to contribute to CoCode, please fork the repository and create a pull request. You can also open issues for any bugs or feature requests.

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, feel free to contact the project maintainer at [utsav23jha@gmail.com].

---

This README should provide clear and comprehensive guidance for anyone setting up and using the CoCode project.