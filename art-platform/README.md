Art Platform — minimal scaffold

Project structure (scaffolded):

art-platform/
├── index.html
├── style.css
├── app.js
├── firebase-config.js
├── pages/
│   ├── marketplace.html
│   ├── learn.html
│   ├── services.html
│   ├── community.html
│   ├── profile.html
│   ├── upload.html
│   ├── course-upload.html
│   ├── service-create.html
│   └── checkout.html
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.svg
│   │   └── icons/
│   │       └── sample-icon.svg
│   └── fonts/
│       └── README.md
├── js/
│   ├── auth.js
│   ├── marketplace.js
│   ├── upload.js
│   ├── cart.js
│   ├── courses.js
│   └── services.js
└── README.md

Getting started
- Open `index.html` in your browser, or run a local static server.

Quick local server (PowerShell):

# from project root
python -m http.server 8000; Start-Process "http://localhost:8000"

Notes
- Replace `firebase-config.js` placeholders with your Firebase project's credentials.
- Add real images in `assets/images` and web fonts in `assets/fonts`.
