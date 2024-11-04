# Node.js API Project - Daily Assignment

This project is a Node.js API developed to manage jokes, users, and products, transitioning from in-memory storage to JSON files, and ultimately to MongoDB for persistence. The project explores key concepts in modularization, middleware, and database integration.

## Project Structure

```
BASIC-NODE-JS-SHALEV396
│
├── V1/
├── V2/
├── V3/
│   ├── db_(model)/
│   │   ├── json/               # JSON data files
│   │   │   ├── jokes.json
│   │   │   ├── products.json
│   │   │   └── users.json
│   │   ├── mongoDB/            # MongoDB models
│   │   │   ├── joke.js
│   │   │   ├── product.js
│   │   │   └── user.js
│   ├── middleware/
│   │   ├── logger.js           # Custom logging middleware
│   │   └── validator.js        # Middleware for request validation
│   ├── routes_(controller)/
│   │   ├── jokesRoute.js       # Routes for jokes
│   │   ├── productsRoute.js    # Routes for products
│   │   └── usersRoute.js       # Routes for users
│   ├── utils/
│   │   └── util.js             # Utility functions
│   ├── .env                    # Environment variables
│   ├── app.js                  # Main application file
│   ├── logs.txt                # Log file
│   ├── package.json            # Project dependencies
│   └── README.md               # Project documentation
```

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd BASIC-NODE-JS-SHALEV396/V3
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file and add the MongoDB connection string:
     ```plaintext
     MONGODB_ULI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
     ```

4. **Run the server**:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:3006`.

## API Endpoints

### Jokes

- **GET** `/api/jokes` - Retrieve all jokes
- **GET** `/api/jokes/:id` - Retrieve a joke by ID
- **POST** `/api/jokes` - Add a new joke
- **PUT** `/api/jokes/:id` - Update a joke by ID
- **DELETE** `/api/jokes/:id` - Delete a joke by ID

### Users

- **GET** `/api/users` - Retrieve all users
- **GET** `/api/users/:id` - Retrieve a user by ID
- **POST** `/api/users` - Add a new user
- **PUT** `/api/users/:id` - Update a user by ID
- **DELETE** `/api/users/:id` - Delete a user by ID

### Products

- **GET** `/api/products` - Retrieve all products
- **GET** `/api/products/:id` - Retrieve a product by ID
- **POST** `/api/products` - Add a new product
- **PUT** `/api/products/:id` - Update a product by ID
- **DELETE** `/api/products/:id` - Delete a product by ID

## Middleware

- **Logger Middleware** (`logger.js`): Logs each request to `logs.txt`, including the timestamp, HTTP method, and URL.
- **Validation Middleware** (`validator.js`): Validates the request body for `POST`, `PATCH`, and `DELETE` methods across jokes, users, and products.

## Database Integration

The project initially used in-memory arrays and JSON files to store data. It now utilizes MongoDB with Mongoose for data persistence.

### MongoDB Models

- **Joke** (`joke.js`): Stores jokes with `setup`, `punchline`, and `createdAt`.
- **User** (`user.js`): Stores users with `name`, `email`, `password`, and `createdAt`.
- **Product** (`product.js`): Stores products with `name`, `description`, `price`, `inStock`, and `createdAt`.

## Utility Functions

Located in `utils/util.js`, these functions help manage data operations:

- `getRandomItem(arr)`: Selects a random item from an array.
- `loadData(file)`: Loads data from a JSON file.
- `saveData(file, data)`: Saves data to a JSON file.

## Testing

### Using Postman

1. **GET Requests**: Test retrieval of all items and specific items by ID.
2. **POST Requests**: Test addition of new jokes, users, and products with required fields.
3. **PUT Requests**: Test updating specific items by ID.
4. **DELETE Requests**: Test deletion of items by ID.

### Error Handling

The error-handling middleware provides structured responses for client (4xx) and server (5xx) errors, ensuring standardized API responses.

## Logging

Request logs are stored in `logs.txt`, providing details about incoming requests for debugging and auditing purposes.

---

This README provides a structured overview of the project, from setup to API documentation, testing, and error handling, helping you understand and utilize the API effectively.
