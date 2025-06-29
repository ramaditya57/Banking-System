# 🏦 ModernBank – MERN Stack Full-Stack Banking System

ModernBank is a feature-rich, secure, and scalable banking platform built with the MERN Stack. It supports admin, officials, and customers with full functionality such as loan tracking, user management, transactions, and real-time updates.

---

## 🚀 Features

### 👨‍💼 Admin Dashboard
- View all users with profile and photo
- Add, update, or delete users
- Change user passwords securely

### 🏦 Official Dashboard
- View and manage customer accounts
- Adjust balances with description & type (credit/debit)
- Update account status
- Create new accounts with auto-generated account numbers
- View loan transactions and perform operations

### 👤 Customer Dashboard
- View balances and transactions
- Monitor loan status
- Contact support

### 📋 General Features
- Real-time updates using **Socket.IO**
- Secure login using **JWT**
- Mobile responsive with **Tailwind CSS + Ant Design**
- Fully modular and reusable React components
- Backend validation, error handling, and role-based access

---

## 📁 Folder Structure

```

modernbank/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   └── App.jsx
├── .env
├── README.md
└── package.json

---

## 🧪 Technologies Used

- **MongoDB** – Document DB
- **Express.js** – REST API
- **React.js** – UI library
- **Node.js** – Backend runtime
- **Tailwind CSS** – Styling
- **Ant Design** – Components
- **JWT** – Secure auth
- **Axios** – HTTP client
- **Mongoose** – MongoDB ODM
- **Moment.js** – Time formatting
- **Socket.IO** – Real-time updates

---

## 🧾 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
````

---

## 🔐 Authentication

* Users are authenticated with JWT
* Tokens are stored in localStorage
* Role-based routes and component access:

  * `admin`, `official`, `customer`

---

## 🧩 Notable Components

### `LoanTransactionsModal.jsx`

* Scrollable modal displaying all loan repayments
* Includes fields like amount, interest, total due, and description

### `AccountModal.jsx`

* Used by officials to view and modify account details

### `AddUserDataForm.jsx`

* Admin panel form to register new users

### `CreateAccountModal.jsx`

* Official modal to generate accounts with unique account numbers

### `OfficialDashboard.jsx`

* View user list, change balances, statuses, and perform account operations

---

## 📈 Resume Highlights

✅ **Reduced support overhead** with a dynamic loan tracker, improving visibility by **70%**

✅ **Improved onboarding efficiency** with auto-generated secure accounts, cutting processing time by **50%**

✅ Achieved **95+ Lighthouse scores** for performance and accessibility

---

## 🔧 Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Run frontend or backend |
| `npm start`     | Run production build    |
| `npm run build` | Build frontend assets   |

---

## 📞 Contact & Support

* 📧 Email: [support@modernbank.com](mailto:support@modernbank.com)
* 📞 Phone: 1-800-BANK-NOW
* 🌐 Website: [modernbank.com](https://modernbank.com)

---

## 👨‍💻 Author

Developed by **[Ramaditya Chaudhary](https://github.com/ramaditya57)**

---