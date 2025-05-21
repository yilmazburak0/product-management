## E-Commerce Product Management System

This is a **frontend-only React application** for managing products in an e-commerce platform. It allows users to add, edit, delete, and view products in a simple interface with Material UI styling. The app includes a fake login system

---

## Features

-  Mock authentication with localStorage  
-  Product listing in responsive MUI table  
-  Add/Edit products with a modal form
-  Delete products with confirmation dialog  
-  Form validation with inline error display  
-  Responsive design for desktop and mobile  
-  State management with React hooks only  
-  Global CSS variables for consistent styling  

---

##  Screenshot

![App Screenshot](/src/assets/screenshot-main.png)

---

##  Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yilmazburak0/product-management.git
cd product-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm start
```

The app will run at `http://localhost:3000`.

---

## Login Credentials

Use the following mock credentials to log in:

```
Username: admin
Password: 123456
```

You can modify users in `src/utils/mockUsers.ts`.

---

## Development Notes

- All product actions are handled using React `useState`.
- No backend is connected – You can extend the app by integrating an API, adding routing, or converting it to use context or state libraries.