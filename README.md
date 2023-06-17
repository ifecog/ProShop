# ProShop
The ProShop Ecommerce Application is built using React for the front-end, Django for the back-end, and PostgreSQL for the database. This full-stack application allows users to browse products, add them to a shopping cart, and complete transactions securely. It also includes features like user authentication, order management, and product reviews.

Certainly! Here's a revised README for the ProShop project, considering the usage of PostgreSQL on AWS RDS, S3 Buckets, Django Rest Framework, React, and React Redux:

```
# ProShop

ProShop is a full-stack e-commerce platform built using Django, Django Rest Framework, React, and React Redux. It provides a feature-rich online shopping experience with product listings, cart functionality, user authentication, and secure payment integration. The project also utilizes PostgreSQL as the database on AWS RDS and S3 Buckets for storing media files.

## Features

- Browse and search for products
- View detailed product information and customer reviews
- Add products to the cart and proceed to checkout
- User registration and authentication
- Secure payment processing with PayPal integration
- Order history and profile management

## Technologies Used

- Django
- Django Rest Framework
- PostgreSQL (on AWS RDS)
- React
- React Redux
- AWS S3 Buckets

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL database (on AWS RDS)
- AWS S3 Bucket

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ifecog/ProShop.git
   ```

2. Set up the backend:

   ```bash
   cd ProShop/backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Set up the frontend:

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. Access the application at `http://localhost:3000` in your browser.

## Configuration

- Configure the PostgreSQL database connection in the `settings.py` file in the backend directory.
- Configure the AWS S3 Bucket details in the project's settings and ensure appropriate AWS credentials are set.

## Usage

- Visit the home page to browse the available products.
- Register an account or log in to access additional features such as adding products to the cart and completing purchases.
- Proceed to the checkout page to enter shipping and payment details.
- As an admin, you can manage products, users, and orders through the admin interface.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to modify the content according to the specific details and requirements of your ProShop project.
