src/
├── config
│   ├── cloudinary.js
│   ├── db.js
│   ├── env.js
│   ├── logger.js
│   └── seed.js
├── middlewares
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── rateLimit.middleware.js
│   ├── role.middleware.js
│   ├── upload.middleware.js
│   └── validate.js
├── modules
│   ├── admin
│   │   ├── admin.controller.js
│   │   ├── admin.routes.js
│   │   └── admin.service.js
│   ├── auth
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   ├── auth.service.js
│   │   └── auth.validation.js
│   ├── captain
│   │   ├── captain.controller.js
│   │   ├── captain.model.js
│   │   ├── captain.routes.js
│   │   └── captain.service.js
│   ├── fare
│   │   ├── fare.controller.js
│   │   └── fare.routes.js
│   ├── passenger
│   │   ├── passenger.controller.js
│   │   └── passenger.routes.js
│   ├── review
│   │   ├── review.controller.js
│   │   ├── review.model.js
│   │   ├── review.routes.js
│   │   └── review.service.js
│   ├── seed
│   │   ├── seed.controller.js
│   │   └── seed.routes.js
│   ├── trip
│   │   ├── trip.controller.js
│   │   ├── trip.model.js
│   │   ├── trip.routes.js
│   │   └── trip.service.js
│   ├── user
│   │   └── user.model.js
│   └── vehicle
│       └── vehicle.model.js
├── socket
│   └── index.js
├── uploads
│   └── documents
│       ├── file-1777404156543-194042827.jpg
│       ├── file-1777404164033-384804339.jpg
│       ├── file-1777405041356-865213937.jpg
│       ├── file-1777405045737-935511150.jpg
│       └── file-1777405049556-252046162.jpg
├── utils
│   ├── code.util.js
│   ├── distance.util.js
│   ├── fare.util.js
│   ├── jwt.util.js
│   ├── mock.util.js
│   ├── otp.util.js
│   └── response.util.js
├── app.js
└── server.js