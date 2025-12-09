# Art Platform — Architecture Classification

## Frontend (Client-Side)
Client-side presentation and interaction layer running in the browser.

**HTML Pages:**
- `index.html` — Homepage, hero, navigation
- `pages/login.html` — User login form
- `pages/register.html` — User registration form
- `pages/marketplace.html` — Art listings display
- `pages/learn.html` — Courses & tutorials
- `pages/services.html` — Commission services
- `pages/community.html` — Artists network
- `pages/profile.html` — User profile management
- `pages/upload.html` — Art upload form
- `pages/course-upload.html` — Course upload form
- `pages/service-create.html` — Service creation form
- `pages/checkout.html` — Payment & order summary

**CSS:**
- `style.css` — All styles (global, auth, layout)

**JavaScript (Client Logic):**
- `app.js` — Main bootstrap
- `js/auth.js` — Authentication (login, register)
- `js/marketplace.js` — Art listings fetching & display
- `js/upload.js` — File upload handlers
- `js/cart.js` — Shopping cart state & logic
- `js/courses.js` — Course fetching & management
- `js/services.js` — Service booking logic

**Assets:**
- `assets/images/` — Images, icons, logos
- `assets/fonts/` — Web fonts

---

## Backend (Server-Side & API)
*Currently Placeholder — Will be implemented using Firebase or Node.js/Express*

**Firebase Services (Backend-as-a-Service):**
- `Firebase Authentication` — User sign-up, login, session management
- `Firestore Database` — Store user profiles, artworks, courses, services
- `Firebase Storage` — Store uploaded art files, course materials
- `Cloud Functions` — Server-side business logic (payments, notifications)

**Alternative Backend (if implementing custom):**
- API endpoints for auth, marketplace, uploads, payments
- Role-based access control
- Request validation & sanitization

---

## Database
Data persistence layer (Firebase or custom DB).

**Firestore Collections:**
- `users` — User profiles, roles, preferences
- `artworks` — Art listings (title, price, images, artist ID)
- `courses` — Course metadata, content, instructors
- `services` — Commission services, pricing, availability
- `cart` — User shopping carts
- `orders` — Purchase history & receipts
- `reviews` — Art & service reviews, ratings

**Firebase Storage:**
- `/artworks/{userId}/{artId}/` — Art files
- `/courses/{courseId}/` — Course materials
- `/profiles/{userId}/` — Profile pictures

---

## Data Flow

1. **User Registration/Login** → Frontend form → Firebase Auth → User session
2. **Browse Marketplace** → Frontend → Firebase Firestore → Display listings
3. **Upload Art** → Frontend form + file → Firebase Storage + Firestore
4. **Shopping Cart** → Frontend state (local) + Backend persistence
5. **Checkout** → Frontend form → Payment API (Stripe) → Backend → Update orders DB

---

## Dependencies to Install
```json
{
  "firebase": "^10.0.0",
  "stripe": "^12.0.0" (for payments),
  "express": "^4.18.0" (if custom backend)
}
```

## Next Steps
1. Configure Firebase SDK in `firebase-config.js`
2. Implement real auth in `js/auth.js` using Firebase
3. Implement database queries in marketplace/courses/services modules
4. Add payment processing (Stripe) to checkout
5. Deploy backend (Firebase or custom Node.js server)
