# Node.js/TypeScript Project - API Server 🚀

## Overview 📝
This project is a RESTful API built with Node.js and TypeScript, designed for various English language learning tools. The API offers several routes related to word finding, comprehension assessment, authentication, and wordlist management. It supports CORS for frontend integration and uses Passport for authentication. 🔑

## Features ✨
- **Word Finder**: Helps users search for words. 🔍
- **Comprehension Assessment**: Provides tools for assessing comprehension. 🧠
- **Authentication**: Allows user login and registration with authentication middleware. 🔐
- **Wordlist Management**: Handles user-specific wordlists. 📚
- **Error Handling**: Includes custom error handler middleware for consistent error responses. ⚠️

## Technologies 🛠️
- Node.js 🟢
- TypeScript 🅾️
- Express.js 🌐
- Passport.js (Authentication) 🔑
- CORS (Cross-Origin Resource Sharing) 🌍
- Custom Middleware for error handling and authentication ⚙️
- Zod for validation
- API routes for word finder, comprehension assessment, and wordlist management 📡

## Setup ⚙️

### Prerequisites 🧰
- Node.js (v16 or later) 🌱
- npm or yarn 📦
- TypeScript 📝

### Installation ⚡
1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/english-tools-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd english-tools-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Compile TypeScript files:

   ```bash
   npm run build
   ```

5. Start the server:

   ```bash
   npm start
   ```

### Environment Variables 🌍
You may need to set the following environment variables for configuration:
- `PORT`: Port number for the server to run on.
- `API_PREFIX`: Prefix for all API routes (e.g., `/api`).
- `CORS_ORIGINS`: Allowed origins for CORS requests.
- `PASSPORT_SECRET`: Secret key for Passport authentication.

Example `.env` file:

```env
PORT=2530
API_PREFIX=/api/v1
CORS_ORIGINS=https://yourfrontend.com
PASSPORT_SECRET=your_secret_key
```

## API Endpoints 📡

### Root 🌱
- **GET** `/`
  - Returns a simple message indicating that the API server is running. ✔️

### Word Finder 🔍
- **GET** `/api/v1/word-finder`
  - Endpoint for finding words.
  - Requires authentication 🔐.

### Comprehension Assessment 🧠
- **GET** `/api/v1/comprehension-assessment`
  - Endpoint for starting a comprehension assessment. 📝

### Authentication 🔑
- **POST** `/api/v1/auth/login`
  - Endpoint for user login. 🔑
- **POST** `/api/v1/auth/register`
  - Endpoint for user registration. ✍️

### Wordlist 📚
- **GET** `/api/v1/wordlist`
  - Endpoint for accessing user-specific wordlists.
  - Requires authentication 🔐.

## Error Handling ⚠️
The application uses custom error handling middleware to catch errors and respond with a consistent format.

### Example Error Response 💥:
```json
{
  "status": "error",
  "message": "This service is unavailable",
  "code": 404
}
```

## Testing 🧪
For testing, you can use tools like Postman or Insomnia to test the various routes. Ensure that you include authentication tokens for protected routes like `/word-finder` and `/wordlist`. 🛠️

## License 📜
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 📃

## Acknowledgments 🙏
- **Express.js** for the web framework 🌐
- **Passport.js** for authentication 🔑
- **TypeScript** for static typing and better maintainability 📝
