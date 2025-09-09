# 👕 Essentials – Shirts & Pants Selling Platform

Essentials is a simple e-commerce platform where users can browse, search, and purchase **shirts and pants**.  
It includes authentication, product management, order tracking, and secure payments with **Razorpay**.

---

## 🚀 Features

### 🏠 Pages

- **Home Page** – Overview of the store, featured products, and navigation.
- **Shirts Page** – Browse all available shirts.
- **Pants Page** – Browse all available pants.
- **Products Page** – Display all products (shirts & pants).
- **Product Details Page** – View individual product details, price, and purchase option.
- **Orders Page** – List of all user orders.
- **Track Order Page** – Track the status of placed orders.

### 🔐 Authentication

- **Sign Up** – Register with **Name** and **Phone Number**.
- **Sign In** – Login using **Phone Number**.

### 💳 Payments

- Integrated with **Razorpay Payment Gateway** for secure and seamless checkout.

---

## 🛠️ Tech Stack

- **Frontend:** React.js / Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment:** Razorpay

---

## 📂 Project Structure

```bash
essentials/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── types/
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
└── readme.md
```

## 📄 Example server `.env` File

Below is a sample `.env` configuration for the backend server.  
Update the values as per your environment and credentials.

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/essentials

# JWT Authentication
JWT_SECRET=your_jwt_secret

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_DIR_NAME=Essentials

# Razorpay (for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🏁 Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/kumar964050/Essentials.git
cd essentials
```

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server` directory and add the required variables as shown below.

### 4. Run the application

#### Start Backend

```bash
npm run dev
```

#### Start Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

---

## 📡 API Endpoints

### Authentication

- `POST /api/auth/signup` – Register a new user.
- `POST /api/auth/signin` – Login with phone number.

### Products

- `GET /api/products` – Get all products (shirts & pants).
- `GET /api/products/:id` – Get product details by ID.
- `POST /api/products` – Add a new product (admin only).
- `PUT /api/products/:id` – Update product details (admin only).
- `DELETE /api/products/:id` – Delete a product (admin only).

### Orders

- `POST /api/orders` – Place a new order.
- `GET /api/orders` – Get all orders for the logged-in user.
- `GET /api/orders/:id` – Get order details by ID.
- `PUT /api/orders/:id/track` – Update order tracking status.

### Payments

- `POST /api/payments/create-order` – Initiate a Razorpay payment order.
- `POST /api/payments/verify` – Verify payment after checkout.

---

## 🌐 Frontend Access Pages

Essentials provides the following main pages for users:

- **Home:** `/`  
   Entry point with featured products and navigation.

- **Shirts:** `/shirts`  
   Browse all available shirts.

- **Pants:** `/pants`  
   Browse all available pants.

- **Products:** `/products`  
   View all products (shirts & pants).

- **Product Details:** `/products/:id`  
   See details, price, and purchase options for a specific product.

- **Orders:** `/orders`  
   View your order history.

- **Track Order:** `/orders/:id/track`  
   Track the status of a specific order.

Authentication pages:

- **Sign Up:** `/signup`  
   Register a new account.

- **Sign In:** `/signin`  
   Login to your account.
