# Angular E-Commerce

A full e-commerce single-page application built with **Angular 11** and **Angular Material**, with a customer storefront and a protected admin area. It consumes a REST API (Node.js, `http://localhost:3000`) using JWT authentication.

![Angular](https://img.shields.io/badge/Angular-11-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4-3178C6?logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-11-757575?logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-6-B7178C?logo=reactivex&logoColor=white)

## Features

**Storefront**
- Browse products and categories (PCs, laptops, accessories, PlayStations, headphones…) with client-side filtering
- Product and category detail pages
- Shopping cart with add-to-cart from anywhere in the app
- Checkout and order history with order status tracking (processed → shipped → delivered)
- Multiple payment methods (Visa, Mastercard, PayPal, cash on delivery, purchase order) and invoices
- User profile with profile-image upload
- Contact form

**Admin dashboard** (lazy-loaded module)
- Dashboard overview
- Manage categories, orders and users

**Architecture**
- JWT auth with an HTTP **token interceptor** and a global **error interceptor**
- **Route guards** for users and admins
- **Route resolvers** to load data before navigation (products, categories, cart, orders, profile, users)
- Dedicated error pages: 404, resource not found, application error
- Feature modules: `admin`, `shared/material`, `shared/ngx`, `shared/files`

## Project Structure

```
src/app/
├── admin/            # Lazy-loaded admin module (dashboard, categories, orders, users)
├── components/       # Storefront pages (home, products, categories, cart, orders, profile, auth)
├── services/         # API services + auth/token/error interceptors
├── resolvers/        # Route data resolvers
├── guards/           # User & admin auth guards
├── models/ enums/    # Typed domain models (Product, Order, Cart, Invoice, Payment…)
├── pipes/            # Product filter pipe
└── shared/           # Reusable components, Material & ngx-bootstrap modules, error pages
```

## Getting Started

**Prerequisites:** Node.js 12–14 and Angular CLI 11

```bash
git clone https://github.com/mostfaswaisi93/ng-ecommerce.git
cd ng-ecommerce
npm install
npm start          # http://localhost:4200
```

The app expects the backend API to be running on `http://localhost:3000`.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Run the dev server |
| `npm run build` | Production build |
| `npm test` | Unit tests (Karma + Jasmine) |
| `npm run lint` | Lint the project |

## Author

**Mustafa T. Al-Swaisi** · [LinkedIn](https://www.linkedin.com/in/mostfaswaisi93/) · [GitHub](https://github.com/mostfaswaisi93)
