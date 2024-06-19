# Motor Insurance API

This is a NestJS API for Zurich  that provides pricing queries and administrative functionalities for products and prices. The API connects to a PostgreSQL database and uses role-based access control to secure certain endpoints.

## Features

- Get product pricing based on product code and location
- Admin functionalities to create, update, and delete products
- Role-based access control for admin endpoints
- Swagger documentation for API endpoints

## Prerequisites

- Node.js and npm
- PostgreSQL

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/api-motor-insurance-test.git
cd api-motor-insurance-test
npm install
```

Create a .env file in the root directory :
```
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=your_server_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=MOTOR_INSURANCE_WEBSITE
```
Run the Application
```
npm run start
```


## API Documentation
Swagger documentation is available at http://localhost:3000/api.

# Endpoints:
- GET /product - Get product pricing based on product code and location (accessible by all users)
- POST /product - Create a new product (admin access only)
- PUT /product - Update an existing product (admin access only)
- DELETE /product - Delete a product (admin access only)

# Usage
Example Requests:

Get Product
```
curl --location --request GET 'http://localhost:3000/product?productCode=1000&location=West%20Malaysia'
```

Create a Product
```
curl --location --request POST 'http://localhost:3000/product' \
--header 'Content-Type: application/json' \
--header 'user-role: admin' \
--data-raw '{
    "productCode": "3000",
    "description": "Hatchback",
    "location": "West Malaysia",
    "price": 200
}'
```

Update Product
```
curl --location --request PUT 'http://localhost:3000/product?productCode=1000' \
--header 'Content-Type: application/json' \
--header 'user-role: admin' \
--data-raw '{
    "location": "West Malaysia",
    "price": 350
}'
```

Delete Product
```
curl --location --request DELETE 'http://localhost:3000/product?productCode=3000' \
--header 'user-role: admin'
```
