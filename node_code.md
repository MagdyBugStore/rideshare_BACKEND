## File: `.env.example`

```text
1 NODE_ENV=development
2 PORT=3000
3 
4 MONGO_URI=mongodb://localhost:27017/meshwari
5 
6 JWT_SECRET=your_super_secret_key_change_me
7 JWT_REFRESH_SECRET=your_refresh_secret_change_me
8 JWT_EXPIRES_IN=30d
9 JWT_REFRESH_EXPIRES_IN=60d
10 
11 TWILIO_ACCOUNT_SID=your_twilio_sid
12 TWILIO_AUTH_TOKEN=your_twilio_token
13 TWILIO_PHONE=+1234567890
14 
15 GOOGLE_CLIENT_ID=your_google_client_id
16 GOOGLE_MAPS_API_KEY=your_google_maps_api_key
17 
18 # Optional: for later features
19 CLOUDINARY_URL=cloudinary://...
20 
21 CLOUDINARY_CLOUD_NAME=your_cloud_name
22 CLOUDINARY_API_KEY=your_api_key
23 CLOUDINARY_API_SECRET=your_api_secret
```

## File: `package.json`

```json
1 {
2   "name": "meshwari-backend",
3   "version": "1.0.0",
4   "description": "تاكس بدر - backend with Node.js, Express, MongoDB",
5   "keywords": [],
6   "license": "ISC",
7   "author": "",
8   "type": "commonjs",
9   "main": "src/server.js",
10   "scripts": {
11     "start": "node src/server.js",
12     "dev": "nodemon src/server.js"
13   },
14   "dependencies": {
15     "bcryptjs": "^2.4.3",
16     "cors": "^2.8.5",
17     "dotenv": "^16.3.1",
18     "express": "^4.18.2",
19     "express-rate-limit": "^8.3.2",
20     "firebase-admin": "^12.7.0",
21     "google-auth-library": "^9.1.0",
22     "helmet": "^7.1.0",
23     "joi": "^17.11.0",
24     "jsonwebtoken": "^9.0.2",
25     "mongoose": "^8.0.0",
26     "morgan": "^1.10.0",
27     "multer": "^2.1.1",
28     "multer-storage-cloudinary": "^4.0.0",
29     "socket.io": "^4.8.3",
30     "socket.io-client": "^4.8.3",
31     "twilio": "^4.19.0",
32     "winston": "^3.19.0"
33   },
34   "devDependencies": {
35     "nodemon": "^3.0.1"
36   }
37 }
```

## File: `postman_collection.json`

```json
1 {
2     "info": {
3         "name": "Meshwari Admin APIs",
4         "description": "مجموعة APIs لوحة تحكم الأدمن - بدون مصادقة حالياً",
5         "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
6     },
7     "variable": [
8         {
9             "key": "baseUrl",
10             "value": "http://localhost:3000/api",
11             "type": "string"
12         },
13         {
14             "key": "userId",
15             "value": "",
16             "type": "string"
17         },
18         {
19             "key": "captainId",
20             "value": "",
21             "type": "string"
22         },
23         {
24             "key": "tripId",
25             "value": "",
26             "type": "string"
27         }
28     ],
29     "item": [
30         {
31             "name": "Users",
32             "item": [
33                 {
34                     "name": "Get All Users",
35                     "request": {
36                         "method": "GET",
37                         "header": [],
38                         "url": {
39                             "raw": "{{baseUrl}}/admin/users",
40                             "host": [
41                                 "{{baseUrl}}"
42                             ],
43                             "path": [
44                                 "admin",
45                                 "users"
46                             ]
47                         }
48                     }
49                 },
50                 {
51                     "name": "Update User",
52                     "request": {
53                         "method": "PATCH",
54                         "header": [
55                             {
56                                 "key": "Content-Type",
57                                 "value": "application/json"
58                             }
59                         ],
60                         "body": {
61                             "mode": "raw",
62                             "raw": "{\n  \"name\": \"الاسم الجديد\",\n  \"email\": \"newemail@example.com\",\n  \"phone\": \"01012345678\",\n  \"role\": \"captain\",\n  \"isActive\": true\n}"
63                         },
64                         "url": {
65                             "raw": "{{baseUrl}}/admin/users/{{userId}}",
66                             "host": [
67                                 "{{baseUrl}}"
68                             ],
69                             "path": [
70                                 "admin",
71                                 "users",
72                                 "{{userId}}"
73                             ]
74                         }
75                     }
76                 },
77                 {
78                     "name": "Delete User",
79                     "request": {
80                         "method": "DELETE",
81                         "header": [],
82                         "url": {
83                             "raw": "{{baseUrl}}/admin/users/{{userId}}",
84                             "host": [
85                                 "{{baseUrl}}"
86                             ],
87                             "path": [
88                                 "admin",
89                                 "users",
90                                 "{{userId}}"
91                             ]
92                         }
93                     }
94                 }
95             ]
96         },
97         {
98             "name": "Captains",
99             "item": [
100                 {
101                     "name": "Get All Captains",
102                     "request": {
103                         "method": "GET",
104                         "header": [],
105                         "url": {
106                             "raw": "{{baseUrl}}/admin/captains",
107                             "host": [
108                                 "{{baseUrl}}"
109                             ],
110                             "path": [
111                                 "admin",
112                                 "captains"
113                             ]
114                         }
115                     }
116                 },
117                 {
118                     "name": "Create Captain",
119                     "request": {
120                         "method": "POST",
121                         "header": [
122                             {
123                                 "key": "Content-Type",
124                                 "value": "application/json"
125                             }
126                         ],
127                         "body": {
128                             "mode": "raw",
129                             "raw": "{\n  \"userId\": \"{{userId}}\",\n  \"vehicleType\": \"car\",\n  \"vehicleModel\": \"تويوتا كورولا\",\n  \"plateNumber\": \"أ ب ج 1234\",\n  \"vehicleColor\": \"أبيض\",\n  \"status\": \"approved\"\n}"
130                         },
131                         "url": {
132                             "raw": "{{baseUrl}}/admin/captains",
133                             "host": [
134                                 "{{baseUrl}}"
135                             ],
136                             "path": [
137                                 "admin",
138                                 "captains"
139                             ]
140                         }
141                     }
142                 },
143                 {
144                     "name": "Update Captain",
145                     "request": {
146                         "method": "PATCH",
147                         "header": [
148                             {
149                                 "key": "Content-Type",
150                                 "value": "application/json"
151                             }
152                         ],
153                         "body": {
154                             "mode": "raw",
155                             "raw": "{\n  \"vehicleType\": \"motorcycle\",\n  \"vehicleModel\": \"هوندا سي بي 500\",\n  \"plateNumber\": \"د هـ و 5678\",\n  \"vehicleColor\": \"أسود\",\n  \"status\": \"approved\",\n  \"isOnline\": true,\n  \"rating\": 4.8\n}"
156                         },
157                         "url": {
158                             "raw": "{{baseUrl}}/admin/captains/{{captainId}}",
159                             "host": [
160                                 "{{baseUrl}}"
161                             ],
162                             "path": [
163                                 "admin",
164                                 "captains",
165                                 "{{captainId}}"
166                             ]
167                         }
168                     }
169                 },
170                 {
171                     "name": "Delete Captain",
172                     "request": {
173                         "method": "DELETE",
174                         "header": [],
175                         "url": {
176                             "raw": "{{baseUrl}}/admin/captains/{{captainId}}",
177                             "host": [
178                                 "{{baseUrl}}"
179                             ],
180                             "path": [
181                                 "admin",
182                                 "captains",
183                                 "{{captainId}}"
184                             ]
185                         }
186                     }
187                 },
188                 {
189                     "name": "Get Pending Captains",
190                     "request": {
191                         "method": "GET",
192                         "header": [],
193                         "url": {
194                             "raw": "{{baseUrl}}/admin/captains/pending",
195                             "host": [
196                                 "{{baseUrl}}"
197                             ],
198                             "path": [
199                                 "admin",
200                                 "captains",
201                                 "pending"
202                             ]
203                         }
204                     }
205                 },
206                 {
207                     "name": "Approve Captain",
208                     "request": {
209                         "method": "PATCH",
210                         "header": [],
211                         "url": {
212                             "raw": "{{baseUrl}}/admin/captains/{{captainId}}/approve",
213                             "host": [
214                                 "{{baseUrl}}"
215                             ],
216                             "path": [
217                                 "admin",
218                                 "captains",
219                                 "{{captainId}}",
220                                 "approve"
221                             ]
222                         }
223                     }
224                 },
225                 {
226                     "name": "Reject Captain",
227                     "request": {
228                         "method": "PATCH",
229                         "header": [
230                             {
231                                 "key": "Content-Type",
232                                 "value": "application/json"
233                             }
234                         ],
235                         "body": {
236                             "mode": "raw",
237                             "raw": "{\n  \"reason\": \"المستندات غير مكتملة\"\n}"
238                         },
239                         "url": {
240                             "raw": "{{baseUrl}}/admin/captains/{{captainId}}/reject",
241                             "host": [
242                                 "{{baseUrl}}"
243                             ],
244                             "path": [
245                                 "admin",
246                                 "captains",
247                                 "{{captainId}}",
248                                 "reject"
249                             ]
250                         }
251                     }
252                 },
253                 {
254                     "name": "Approve Captain by Code (قديم)",
255                     "request": {
256                         "method": "POST",
257                         "header": [
258                             {
259                                 "key": "Content-Type",
260                                 "value": "application/json"
261                             }
262                         ],
263                         "body": {
264                             "mode": "raw",
265                             "raw": "{\n  \"code\": \"WAS-ZJA0H3\",\n  \"action\": \"approve\"\n}"
266                         },
267                         "url": {
268                             "raw": "{{baseUrl}}/admin/captain/approve-by-code",
269                             "host": [
270                                 "{{baseUrl}}"
271                             ],
272                             "path": [
273                                 "admin",
274                                 "captain",
275                                 "approve-by-code"
276                             ]
277                         }
278                     }
279                 }
280             ]
281         },
282         {
283             "name": "Trips",
284             "item": [
285                 {
286                     "name": "Get Live Trips",
287                     "request": {
288                         "method": "GET",
289                         "header": [],
290                         "url": {
291                             "raw": "{{baseUrl}}/admin/trips/live",
292                             "host": [
293                                 "{{baseUrl}}"
294                             ],
295                             "path": [
296                                 "admin",
297                                 "trips",
298                                 "live"
299                             ]
300                         }
301                     }
302                 },
303                 {
304                     "name": "Create Trip",
305                     "request": {
306                         "method": "POST",
307                         "header": [
308                             {
309                                 "key": "Content-Type",
310                                 "value": "application/json"
311                             }
312                         ],
313                         "body": {
314                             "mode": "raw",
315                             "raw": "{\n  \"passengerId\": \"{{userId}}\",\n  \"captainId\": \"{{captainId}}\",\n  \"startLocation\": {\n    \"lat\": 30.0444,\n    \"lng\": 31.2357,\n    \"address\": \"ميدان التحرير، القاهرة\"\n  },\n  \"distanceKm\": 5.2,\n  \"totalFare\": 40\n}"
316                         },
317                         "url": {
318                             "raw": "{{baseUrl}}/admin/trips",
319                             "host": [
320                                 "{{baseUrl}}"
321                             ],
322                             "path": [
323                                 "admin",
324                                 "trips"
325                             ]
326                         }
327                     }
328                 },
329                 {
330                     "name": "Delete Trip",
331                     "request": {
332                         "method": "DELETE",
333                         "header": [],
334                         "url": {
335                             "raw": "{{baseUrl}}/admin/trips/{{tripId}}",
336                             "host": [
337                                 "{{baseUrl}}"
338                             ],
339                             "path": [
340                                 "admin",
341                                 "trips",
342                                 "{{tripId}}"
343                             ]
344                         }
345                     }
346                 }
347             ]
348         }
349     ]
350 }
```

## File: `src\app.js`

```javascript
1 const express = require('express');
2 const cors = require('cors');
3 const helmet = require('helmet');
4 const morgan = require('morgan');
5 const errorHandler = require('./middlewares/error.middleware');
6 
7 // Routes
8 const authRoutes      = require('./modules/auth/auth.routes');
9 const captainRoutes   = require('./modules/captain/captain.routes');
10 const tripRoutes      = require('./modules/trip/trip.routes');
11 const reviewRoutes    = require('./modules/review/review.routes');
12 const adminRoutes     = require('./modules/admin/admin.routes');
13 const passengerRoutes = require('./modules/passenger/passenger.routes');
14 const fareRoutes         = require('./modules/fare/fare.routes');
15 const notificationRoutes = require('./modules/notification/notification.routes');
16 const placesRoutes       = require('./modules/places/places.routes');
17 const routesRoutes       = require('./modules/routes/routes.routes');
18 const seedRoutes         = require('./modules/seed/seed.routes');
19 
20 const app = express();
21 
22 // ── Global middlewares ────────────────────────────────────────────────
23 app.use(helmet());
24 app.use(cors({
25   origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
26   credentials: true,
27 }));
28 app.use(express.json());
29 app.use(morgan('dev'));
30 
31 // ── Routes ────────────────────────────────────────────────────────────
32 app.use('/api/auth',          authRoutes);
33 app.use('/api/captain',       captainRoutes);
34 app.use('/api/trips',         tripRoutes);
35 app.use('/api/reviews',       reviewRoutes);
36 app.use('/api/admin',         adminRoutes);
37 app.use('/api/passenger',     passengerRoutes);
38 app.use('/api/fares',         fareRoutes);
39 app.use('/api/notifications', notificationRoutes);
40 app.use('/api/places',        placesRoutes);
41 app.use('/api/routes',        routesRoutes);
42 app.use('/api/seed',          seedRoutes);
43 
44 app.get('/health', (_req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));
45 
46 // ── Error handler (must be last) ──────────────────────────────────────
47 app.use(errorHandler);
48 
49 module.exports = app;
```

## File: `src\server.js`

```javascript
1 const app = require('./app');
2 const connectDB = require('./config/db');
3 const env = require('./config/env');
4 const { initSocket } = require('./socket');
5 const { initFirebase } = require('./config/firebase');
6 const os = require('os');
7 const { initializeDefaultFares } = require('./modules/fare/fare.controller');
8 
9 const getLocalExternalIP = () => {
10     const interfaces = os.networkInterfaces();
11     for (const name of Object.keys(interfaces)) {
12         for (const iface of interfaces[name]) {
13             if (iface.family === 'IPv4' && !iface.internal) {
14                 return iface.address;
15             }
16         }
17     }
18     return 'localhost';
19 };
20 
21 const startServer = async () => {
22     initFirebase();
23     await connectDB();
24     const server = app.listen(env.PORT, '0.0.0.0', () => {
25         const ip = getLocalExternalIP();
26         console.log(`🚀 Server running on:`);
27         console.log(`   🏠 Local:   http://localhost:${env.PORT}`);
28         console.log(`   🌐 Network: http://${ip}:${env.PORT}`);
29     });
30     initSocket(server);
31 };
32 
33 startServer();
```

## File: `src\config\cloudinary.js`

```javascript
1 const cloudinary = require('cloudinary').v2;
2 const env = require('./env');
3 
4 cloudinary.config({
5   cloud_name: env.CLOUDINARY_CLOUD_NAME,
6   api_key: env.CLOUDINARY_API_KEY,
7   api_secret: env.CLOUDINARY_API_SECRET,
8 });
9 
10 module.exports = cloudinary;
```

## File: `src\config\db.js`

```javascript
1 const mongoose = require('mongoose');
2 const env = require('./env');
3 
4 const connectDB = async () => {
5   try {
6     await mongoose.connect(env.MONGO_URI);
7     console.log('✅ MongoDB connected');
8   } catch (error) {
9     console.error('❌ MongoDB connection error:', error.message);
10     process.exit(1);
11   }
12 };
13 
14 module.exports = connectDB;
```

## File: `src\config\env.js`

```javascript
1 require('dotenv').config();
2 
3 const env = {
4   NODE_ENV: process.env.NODE_ENV || 'development',
5   PORT: parseInt(process.env.PORT, 10) || 3000,
6   MONGO_URI: process.env.MONGO_URI,
7   JWT_SECRET: process.env.JWT_SECRET,
8   JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
9   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
10   JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
11   TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
12   TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
13   TWILIO_PHONE: process.env.TWILIO_PHONE,
14   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
15   GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
16   SOCKET_CORS_ORIGIN: process.env.SOCKET_CORS_ORIGIN || '*',
17   CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
18   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
19   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
20   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
21 };
22 
23 // Validation
24 if (!env.JWT_SECRET || !env.JWT_REFRESH_SECRET) {
25   console.error('❌ Missing JWT secrets in .env');
26   process.exit(1);
27 }
28 
29 module.exports = env;
```

## File: `src\config\firebase.js`

```javascript
1 const admin = require('firebase-admin');
2 const logger = require('./logger');
3 
4 let _initialized = false;
5 
6 const initFirebase = () => {
7   if (_initialized) return;
8 
9   const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
10   if (!serviceAccountJson) {
11     logger.warn('[Firebase] FIREBASE_SERVICE_ACCOUNT_JSON not set — push notifications disabled');
12     return;
13   }
14 
15   try {
16     const serviceAccount = JSON.parse(serviceAccountJson);
17     admin.initializeApp({
18       credential: admin.credential.cert(serviceAccount),
19     });
20     _initialized = true;
21     logger.info('[Firebase] Admin SDK initialized');
22   } catch (err) {
23     logger.error('[Firebase] Failed to initialize Admin SDK', err);
24   }
25 };
26 
27 const getMessaging = () => {
28   if (!_initialized) return null;
29   return admin.messaging();
30 };
31 
32 module.exports = { initFirebase, getMessaging };
```

## File: `src\config\logger.js`

```javascript
1 const winston = require('winston');
2 
3 const logger = winston.createLogger({
4   level: 'info',
5   format: winston.format.combine(
6     winston.format.timestamp(),
7     winston.format.json()
8   ),
9   transports: [
10     new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
11     new winston.transports.File({ filename: 'logs/combined.log' }),
12   ],
13 });
14 
15 if (process.env.NODE_ENV !== 'production') {
16   logger.add(new winston.transports.Console({
17     format: winston.format.simple(),
18   }));
19 }
20 
21 module.exports = logger;
```

## File: `src\config\seed.js`

```javascript
1 // src/config/seed.js
2 const mongoose = require('mongoose');
3 const User = require('../modules/user/user.model');
4 const Captain = require('../modules/captain/captain.model');
5 
6 const seedTestCaptain = async () => {
7   try {
8     // تأكد من وجود مستخدم اختباري
9     let testUser = await User.findOne({ email: 'test@meshwari.com' });
10     if (!testUser) {
11       testUser = await User.create({
12         name: 'كابتن تجريبي',
13         email: 'test@meshwari.com',
14         role: 'captain',
15         googleId: 'test-google-id-' + Date.now(),
16       });
17     }
18 
19     let testCaptain = await Captain.findOne({ userId: testUser._id });
20     if (!testCaptain) {
21       testCaptain = await Captain.create({
22         userId: testUser._id,
23         vehicleType: 'car',
24         vehicleModel: 'تويوتا كورولا',
25         plateNumber: 'تجربة ' + Date.now().toString().slice(-5),
26         status: 'approved',
27         isOnline: true,
28         location: { type: 'Point', coordinates: [31.2357, 30.0444] },
29       });
30     } else {
31       // تأكد من أن الكابتن موافق عليه ومتصل
32       if (testCaptain.status !== 'approved') {
33         testCaptain.status = 'approved';
34         await testCaptain.save();
35       }
36       testCaptain.isOnline = true;
37       await testCaptain.save();
38     }
39     
40     // حفظ معرف الكابتن في متغير بيئة مؤقت لاستخدامه في mock
41     process.env.TEST_CAPTAIN_ID = testCaptain._id.toString();
42     
43     return testCaptain;
44   } catch (error) {
45     console.error('❌ Error seeding test captain:', error);
46   }
47 };
48 
49 module.exports = seedTestCaptain;
```

## File: `src\middlewares\auth.middleware.js`

```javascript
1 const { verifyAccessToken } = require('../utils/jwt.util');
2 const { sendError } = require('../utils/response.util');
3 
4 const authMiddleware = (req, res, next) => {
5   const authHeader = req.headers.authorization;
6   if (!authHeader || !authHeader.startsWith('Bearer ')) {
7     return sendError(res, 'No token provided', 401);
8   }
9 
10   const token = authHeader.split(' ')[1];
11   const decoded = verifyAccessToken(token);
12 
13   if (!decoded) {
14     return sendError(res, 'Invalid or expired token', 401);
15   }
16 
17   req.user = decoded; // { id, role }
18   next();
19 };
20 
21 module.exports = authMiddleware;
```

## File: `src\middlewares\error.middleware.js`

```javascript
1 const { sendError } = require('../utils/response.util');
2 
3 const errorHandler = (err, req, res, next) => {
4   console.error('❌ Error:', err.stack );
5 
6   // Mongoose duplicate key
7   if (err.code === 11000) {
8     return sendError(res, 'Duplicate field value', 400);
9   }
10 
11   // Mongoose validation
12   if (err.name === 'ValidationError') {
13     const errors = Object.values(err.errors).map(e => e.message);
14     return sendError(res, 'Validation error', 400, errors);
15   }
16 
17   sendError(res, err.message || 'Internal server error', err.status || 500);
18 };
19 
20 module.exports = errorHandler;
```

## File: `src\middlewares\rateLimit.middleware.js`

```javascript
1 const rateLimit = require('express-rate-limit');
2 
3 const otpLimiter = rateLimit({
4   windowMs: 1 * 60 * 1000, 
5   max: 3, 
6   message: { success: false, message: 'Too many OTP requests, try again later' },
7   standardHeaders: true,
8   legacyHeaders: false,
9 });
10 
11 module.exports = { otpLimiter };
```

## File: `src\middlewares\role.middleware.js`

```javascript
1 const { sendError } = require('../utils/response.util');
2 
3 const requireRole = (...allowedRoles) => {
4   return (req, res, next) => {
5     if (!req.user) {
6       return sendError(res, 'Unauthorized', 401);
7     }
8     if (!allowedRoles.includes(req.user.role)) {
9 
10       return sendError(res, 'Forbidden: insufficient permissions', 403);
11     }
12     next();
13   };
14 };
15 
16 module.exports = { requireRole };
```

## File: `src\middlewares\socketLogger.middleware.js`

```javascript
1 // src/middlewares/socketLogger.middleware.js
2 const logger = require('../config/logger');
3 const fs = require('fs');
4 const path = require('path');
5 
6 // إنشاء مجلد logs إذا لم يكن موجوداً
7 const logDir = path.join(__dirname, '../../logs');
8 if (!fs.existsSync(logDir)) {
9   fs.mkdirSync(logDir, { recursive: true });
10 }
11 
12 // ملف مخصص لسجلات السوكيت
13 const socketLogStream = fs.createWriteStream(
14   path.join(logDir, 'socket-events.log'),
15   { flags: 'a' }
16 );
17 
18 // تنسيق الوقت
19 const getTimestamp = () => new Date().toISOString();
20 
21 // كتابة السجل في الملف وفي console
22 const writeLog = (type, socketId, userId, event, data, direction) => {
23   const logEntry = {
24     timestamp: getTimestamp(),
25     type, // 'connection', 'disconnection', 'event'
26     socketId,
27     userId: userId || 'unknown',
28     event: event || null,
29     direction, // 'incoming' or 'outgoing'
30     data: data ? (typeof data === 'object' ? JSON.stringify(data) : String(data)) : null,
31   };
32   
33   const logString = JSON.stringify(logEntry) + '\n';
34   
35   // كتابة في الملف
36   socketLogStream.write(logString);
37   
38   // كتابة في console بتنسيق مقروء
39   if (direction === 'incoming') {
40     if (data && process.env.NODE_ENV !== 'production') {
41     }
42   } else if (direction === 'outgoing') {
43   } else if (type === 'connection') {
44   } else if (type === 'disconnection') {
45   }
46 };
47 
48 // إنشاء middleware لتسجيل الأحداث الواردة والصادرة
49 const createSocketLogger = (io) => {
50   return (socket, next) => {
51     
52     socket.once('connection', () => {
53       writeLog('connection', socket.id, socket.data?.userId, null, null);
54     });
55     
56     // حفظ الـ emit الأصلي لتسجيله
57     const originalEmit = socket.emit;
58     socket.emit = function(event, ...args) {
59     
60       writeLog(
61         'event',
62         socket.id,
63         socket.data?.userId,
64         event,
65         args[0],
66         'outgoing'
67       );
68       return originalEmit.apply(this, [event, ...args]);
69     };
70     
71     const originalOn = socket.on;
72     socket.on = function(event, listener) {
73       const wrappedListener = (...args) => {
74         writeLog(
75           'event',
76           socket.id,
77           socket.data?.userId,
78           event,
79           args[0],
80           'incoming'
81         );
82         return listener.apply(this, args);
83       };
84       return originalOn.call(this, event, wrappedListener);
85     };
86     
87     next();
88   };
89 };
90 
91 
92 const monitorIoEvents = (io) => {
93 
94   io.engine.on('connection', (socket) => {
95     const socketId = socket.id;
96     console.log(`🔌 [Engine.IO] New raw connection: ${socketId}`);
97   });
98   
99 
100   io.engine.on('connection_error', (err) => {
101     console.error(`❌ [Engine.IO] Connection error:`, err.message);
102     logger.error('[Socket] Engine.IO connection error', err);
103   });
104 };
105 
106 // بديل أبسط - تسجيل مباشر لكل شيء
107 const simpleSocketLogger = {
108   // تسجيل حدث واصل
109   logIncoming: (socketId, userId, event, data) => {
110     writeLog('event', socketId, userId, event, data, 'incoming');
111   },
112   
113   // تسجيل حدث صادر
114   logOutgoing: (socketId, userId, event, data) => {
115     writeLog('event', socketId, userId, event, data, 'outgoing');
116   },
117   
118   // تسجيل اتصال
119   logConnection: (socketId, userId) => {
120     writeLog('connection', socketId, userId, null, null, null);
121   },
122   
123   // تسجيل قطع الاتصال
124   logDisconnection: (socketId, userId, reason) => {
125     writeLog('disconnection', socketId, userId, null, reason, null);
126   },
127 };
128 
129 module.exports = {
130   createSocketLogger,
131   monitorIoEvents,
132   simpleSocketLogger,
133   writeLog,
134 };
```

## File: `src\middlewares\upload.middleware.js`

```javascript
1 const multer = require('multer');
2 const path = require('path');
3 const fs = require('fs');
4 
5 // الدليل المطلق للمشروع (حتى لا تتغير النسبية)
6 const uploadDirectory = path.join(__dirname, '..', 'uploads', 'documents');
7 
8 // إنشاء المجلد تلقائياً إن لم يكن موجوداً
9 if (!fs.existsSync(uploadDirectory)) {
10   fs.mkdirSync(uploadDirectory, { recursive: true });
11   console.log('📁 Created uploads/documents directory');
12 }
13 
14 const storage = multer.diskStorage({
15   destination: (req, file, cb) => {
16     cb(null, uploadDirectory);
17   },
18   filename: (req, file, cb) => {
19     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
20     const ext = path.extname(file.originalname);
21     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
22   },
23 });
24 
25 const fileFilter = (req, file, cb) => {
26   const allowed = /jpg|jpeg|png|pdf/;
27   const extname = allowed.test(path.extname(file.originalname).toLowerCase());
28   const mimetype = allowed.test(file.mimetype);
29   if (extname && mimetype) {
30     return cb(null, true);
31   }
32   cb(new Error('مسموح فقط بـ JPG, PNG, PDF'));
33 };
34 
35 const upload = multer({
36   storage,
37   limits: { fileSize: 5 * 1024 * 1024 },
38   fileFilter,
39 });
40 
41 // للرفع المتعدد (اختياري)
42 const uploadDocuments = upload.fields([
43   { name: 'nationalId', maxCount: 1 },
44   { name: 'driverLicense', maxCount: 1 },
45   { name: 'vehicleLicense', maxCount: 1 },
46 ]);
47 
48 // ✅ رفع مستند واحد مع معالجة الأخطاء
49 const uploadSingleDocument = (req, res, next) => {
50   const single = upload.single('file');
51   single(req, res, (err) => {
52     if (err) {
53       console.error('❌ Multer Error:', err.message);
54       return res.status(400).json({
55         success: false,
56         message: err.message,
57       });
58     }
59     if (!req.file) {
60       return res.status(400).json({
61         success: false,
62         message: 'لم يتم إرسال ملف بحقل "file"',
63       });
64     }
65     // تعديل المسار إلى الرابط العام
66     req.file.path = '/uploads/documents/' + req.file.filename;
67     next();
68   });
69 };
70 
71 module.exports = { uploadDocuments, uploadSingleDocument };
```

## File: `src\middlewares\validate.js`

```javascript
1 // src/middlewares/validate.js
2 const { sendError } = require('../utils/response.util');
3 
4 /**
5  * Middleware factory to validate request data against a Joi schema.
6  * @param {Joi.Schema} schema - Joi validation schema
7  * @param {string} property - Which part of the request to validate: 'body', 'query', 'params'. Default 'body'
8  * @returns {Function} Express middleware
9  */
10 const validate = (schema, property = 'body') => {
11   return (req, res, next) => {
12     const dataToValidate = req[property];
13     const { error, value } = schema.validate(dataToValidate, { abortEarly: false });
14     if (error) {
15       const errors = error.details.map(detail => detail.message);
16       return sendError(res, 'Validation error', 400, errors);
17     }
18     // Replace the original request data with validated (and possibly transformed) value
19     req[property] = value;
20     next();
21   };
22 };
23 
24 module.exports = { validate };
```

## File: `src\modules\admin\admin.controller.js`

```javascript
1 // src/modules/admin/admin.controller.js
2 const adminService = require('./admin.service');
3 const { sendSuccess, sendError } = require('../../utils/response.util');
4 const Captain = require('../captain/captain.model');
5 const User = require('../user/user.model');
6 const Trip = require('../trip/trip.model');
7 
8 // ---------- المستخدمون ----------
9 const getUsers = async (req, res, next) => {
10   try {
11     const users = await adminService.getAllUsers();
12     sendSuccess(res, users);
13   } catch (error) {
14     next(error);
15   }
16 };
17 
18 const updateUser = async (req, res, next) => {
19   try {
20     const { userId } = req.params;
21     const updatedUser = await adminService.updateUser(userId, req.body);
22     sendSuccess(res, updatedUser, 'تم تحديث المستخدم بنجاح');
23   } catch (error) {
24     next(error);
25   }
26 };
27 
28 const deleteUser = async (req, res, next) => {
29   try {
30     const { userId } = req.params;
31     const result = await adminService.deleteUser(userId);
32     sendSuccess(res, result);
33   } catch (error) {
34     next(error);
35   }
36 };
37 
38 // ---------- الكباتن (عام) ----------
39 const getAllCaptains = async (req, res, next) => {
40   try {
41     const captains = await adminService.getAllCaptains();
42     sendSuccess(res, captains);
43   } catch (error) {
44     next(error);
45   }
46 };
47 
48 const createCaptain = async (req, res, next) => {
49   try {
50     const captain = await adminService.createCaptain(req.body);
51     sendSuccess(res, captain, 'تم إنشاء الكابتن بنجاح', 201);
52   } catch (error) {
53     next(error);
54   }
55 };
56 
57 const updateCaptain = async (req, res, next) => {
58   try {
59     const { captainId } = req.params;
60     const captain = await adminService.updateCaptain(captainId, req.body);
61     sendSuccess(res, captain, 'تم تحديث الكابتن بنجاح');
62   } catch (error) {
63     next(error);
64   }
65 };
66 
67 const deleteCaptain = async (req, res, next) => {
68   try {
69     const { captainId } = req.params;
70     const result = await adminService.deleteCaptain(captainId);
71     sendSuccess(res, result);
72   } catch (error) {
73     next(error);
74   }
75 };
76 
77 // ---------- الكباتن المعلقون (موافقات) ----------
78 const getPendingCaptains = async (req, res, next) => {
79   try {
80     const captains = await adminService.getPendingCaptains();
81     sendSuccess(res, captains);
82   } catch (error) {
83     next(error);
84   }
85 };
86 
87 const approveCaptain = async (req, res, next) => {
88   try {
89     const { captainId } = req.params;
90     const captain = await adminService.approveCaptain(captainId);
91     sendSuccess(res, captain, 'تمت الموافقة على الكابتن');
92   } catch (error) {
93     next(error);
94   }
95 };
96 
97 const rejectCaptain = async (req, res, next) => {
98   try {
99     const { captainId } = req.params;
100     const { reason } = req.body;
101     const captain = await adminService.rejectCaptain(captainId, reason);
102     sendSuccess(res, captain, 'تم رفض الكابتن');
103   } catch (error) {
104     next(error);
105   }
106 };
107 
108 // ---------- الرحلات ----------
109 const getLiveTrips = async (req, res, next) => {
110   try {
111     const liveTrips = await Trip.find({ status: 'active' })
112       .populate('passengerId', 'name phone')
113       .populate('captainId', 'vehicleType vehicleModel plateNumber')
114       .sort({ startedAt: -1 });
115     sendSuccess(res, liveTrips);
116   } catch (error) {
117     next(error);
118   }
119 };
120 
121 const createTrip = async (req, res, next) => {
122   try {
123     const trip = await adminService.createTrip(req.body);
124     sendSuccess(res, trip, 'تم إنشاء الرحلة بنجاح', 201);
125   } catch (error) {
126     next(error);
127   }
128 };
129 
130 const deleteTrip = async (req, res, next) => {
131   try {
132     const { tripId } = req.params;
133     const result = await adminService.deleteTrip(tripId);
134     sendSuccess(res, result);
135   } catch (error) {
136     next(error);
137   }
138 };
139 
140 // ---------- دوال قديمة / خاصة ----------
141 const approveCaptainByCode = async (req, res, next) => {
142   try {
143     const { code, action } = req.body;
144     const captain = await Captain.findOne({ applicationCode: code });
145     if (!captain) return sendError(res, 'Invalid code', 404);
146     if (action === 'approve') {
147       captain.applicationStatus = 'approved';
148       captain.status = 'approved';
149       await captain.save();
150       await User.findByIdAndUpdate(captain.userId, { role: 'captain' });
151     } else if (action === 'reject') {
152       captain.applicationStatus = 'rejected';
153       await captain.save();
154     } else {
155       return sendError(res, 'Invalid action', 400);
156     }
157     sendSuccess(res, { status: captain.applicationStatus });
158   } catch (error) {
159     next(error);
160   }
161 };
162 
163 module.exports = {
164   getUsers,
165   updateUser,
166   deleteUser,
167   getAllCaptains,
168   createCaptain,
169   updateCaptain,
170   deleteCaptain,
171   getPendingCaptains,
172   approveCaptain,
173   rejectCaptain,
174   getLiveTrips,
175   createTrip,
176   deleteTrip,
177   approveCaptainByCode,
178 };
```

## File: `src\modules\admin\admin.routes.js`

```javascript
1 // src/modules/admin/admin.routes.js
2 const express = require('express');
3 const router = express.Router();
4 const controller = require('./admin.controller');
5 const socketLogsController = require('./socketLogs.controller');
6 
7 // ==================== المستخدمون ====================
8 // GET /api/admin/users - الحصول على جميع المستخدمين
9 router.get('/users', controller.getUsers);
10 
11 // PATCH /api/admin/users/:userId - تعديل مستخدم
12 router.patch('/users/:userId', controller.updateUser);
13 
14 // DELETE /api/admin/users/:userId - حذف مستخدم
15 router.delete('/users/:userId', controller.deleteUser);
16 
17 // ==================== الكباتن ====================
18 // GET /api/admin/captains - الحصول على جميع الكباتن
19 router.get('/captains', controller.getAllCaptains);
20 
21 // POST /api/admin/captains - إضافة كابتن جديد
22 router.post('/captains', controller.createCaptain);
23 
24 // PATCH /api/admin/captains/:captainId - تعديل كابتن
25 router.patch('/captains/:captainId', controller.updateCaptain);
26 
27 // DELETE /api/admin/captains/:captainId - حذف كابتن
28 router.delete('/captains/:captainId', controller.deleteCaptain);
29 
30 // GET /api/admin/captains/pending - الحصول على الكباتن المعلقين
31 router.get('/captains/pending', controller.getPendingCaptains);
32 
33 // PATCH /api/admin/captains/:captainId/approve - الموافقة على كابتن
34 router.patch('/captains/:captainId/approve', controller.approveCaptain);
35 
36 // PATCH /api/admin/captains/:captainId/reject - رفض كابتن
37 router.patch('/captains/:captainId/reject', controller.rejectCaptain);
38 
39 // ==================== الرحلات ====================
40 // GET /api/admin/trips/live - الحصول على الرحلات النشطة
41 router.get('/trips/live', controller.getLiveTrips);
42 
43 // POST /api/admin/trips - إنشاء رحلة
44 router.post('/trips', controller.createTrip);
45 
46 // DELETE /api/admin/trips/:tripId - حذف رحلة
47 router.delete('/trips/:tripId', controller.deleteTrip);
48 
49 // ==================== دوال قديمة للتوافق ====================
50 // POST /api/admin/captain/approve-by-code - موافقة أو رفض بكود التقديم
51 router.post('/captain/approve-by-code', controller.approveCaptainByCode);
52 
53 
54 // ==================== Socket Monitoring ====================
55 router.get('/socket-logs', socketLogsController.getSocketLogs);
56 router.get('/socket-stats', socketLogsController.getSocketStats);
57 router.delete('/socket-logs', socketLogsController.clearSocketLogs);
58 router.get('/connected-users', socketLogsController.getConnectedUsers);  
59 
60 
61 module.exports = router;
```

## File: `src\modules\admin\admin.service.js`

```javascript
1 const User = require('../user/user.model');
2 const Trip = require('../trip/trip.model');
3 const Captain = require('../captain/captain.model');
4 
5 // ========== إدارة المستخدمين ==========
6 const getAllUsers = async () => {
7   return await User.find({}).select('-refreshToken -otpCode -otpExpiresAt');
8 };
9 
10 const updateUser = async (userId, updateData) => {
11   const allowedUpdates = ['name', 'email', 'phone', 'role', 'isActive'];
12   const updates = {};
13   Object.keys(updateData).forEach(key => {
14     if (allowedUpdates.includes(key)) {
15       updates[key] = updateData[key];
16     }
17   });
18 
19   const user = await User.findByIdAndUpdate(
20     userId,
21     updates,
22     { new: true, runValidators: true }
23   ).select('-refreshToken -otpCode -otpExpiresAt');
24 
25   if (!user) throw new Error('المستخدم غير موجود');
26   return user;
27 };
28 
29 const deleteUser = async (userId) => {
30   const user = await User.findById(userId);
31   if (!user) throw new Error('المستخدم غير موجود');
32 
33   // إذا كان المستخدم كابتن، نحذف سجل الكابتن أولاً
34   if (user.role === 'captain') {
35     await Captain.deleteOne({ userId: user._id });
36   }
37 
38   // حذف رحلات المستخدم كراكب
39   await Trip.deleteMany({ passengerId: user._id });
40 
41   await user.deleteOne();
42   return { message: 'تم حذف المستخدم بنجاح' };
43 };
44 
45 // ========== إدارة الكباتن ==========
46 const getAllCaptains = async () => {
47   return await Captain.find({})
48     .populate('userId', 'name email phone avatar')
49     .sort({ createdAt: -1 });
50 };
51 
52 const createCaptain = async (captainData) => {
53   const { userId, vehicleType, vehicleModel, plateNumber, vehicleColor, status } = captainData;
54 
55   // التحقق من وجود المستخدم
56   const user = await User.findById(userId);
57   if (!user) throw new Error('المستخدم غير موجود');
58 
59   // التحقق من عدم وجود كابتن مسبق
60   const existing = await Captain.findOne({ userId });
61   if (existing) throw new Error('يوجد كابتن مسجل مسبقاً لهذا المستخدم');
62 
63   const captain = await Captain.create({
64     userId,
65     vehicleType,
66     vehicleModel,
67     plateNumber,
68     vehicleColor: vehicleColor || '',
69     status: status || 'pending_review',
70   });
71 
72   // إذا كان الكابتن موافق عليه، نحدث دور المستخدم
73   if (status === 'approved') {
74     await User.findByIdAndUpdate(userId, { role: 'captain' });
75   }
76 
77   return captain;
78 };
79 
80 const updateCaptain = async (captainId, updateData) => {
81   const allowedUpdates = [
82     'vehicleType',
83     'vehicleModel',
84     'plateNumber',
85     'vehicleColor',
86     'status',
87     'isOnline',
88     'location',
89     'rating',
90     'totalTrips'
91   ];
92   const updates = {};
93   Object.keys(updateData).forEach(key => {
94     if (allowedUpdates.includes(key)) {
95       updates[key] = updateData[key];
96     }
97   });
98 
99   const captain = await Captain.findByIdAndUpdate(
100     captainId,
101     updates,
102     { new: true, runValidators: true }
103   ).populate('userId', 'name email phone');
104 
105   if (!captain) throw new Error('الكابتن غير موجود');
106 
107   // إذا تم تغيير الحالة إلى approved، نحدث دور المستخدم
108   if (updateData.status === 'approved') {
109     await User.findByIdAndUpdate(captain.userId, { role: 'captain' });
110   }
111 
112   return captain;
113 };
114 
115 const deleteCaptain = async (captainId) => {
116   const captain = await Captain.findById(captainId);
117   if (!captain) throw new Error('الكابتن غير موجود');
118 
119   // حذف الرحلات المرتبطة بالكابتن
120   await Trip.deleteMany({ captainId: captain._id });
121 
122   await captain.deleteOne();
123   return { message: 'تم حذف الكابتن بنجاح' };
124 };
125 
126 // ========== الكباتن المعلقون ==========
127 const getPendingCaptains = async () => {
128   return await Captain.find({ status: 'pending_review' })
129     .populate('userId', 'name phone email')
130     .sort({ createdAt: -1 });
131 };
132 
133 const approveCaptain = async (captainId) => {
134   const captain = await Captain.findById(captainId);
135   if (!captain) throw new Error('الكابتن غير موجود');
136 
137   captain.status = 'approved';
138   captain.applicationStatus = 'approved';
139   captain.rejectionReason = null;
140   await captain.save();
141 
142   // تحديث دور المستخدم إلى 'captain'
143   await User.findByIdAndUpdate(captain.userId, { role: 'captain' });
144 
145   return captain;
146 };
147 
148 const rejectCaptain = async (captainId, reason) => {
149   const captain = await Captain.findById(captainId);
150   if (!captain) throw new Error('الكابتن غير موجود');
151 
152   captain.status = 'rejected';
153   captain.rejectionReason = reason || 'تم الرفض من قبل الإدارة';
154   await captain.save();
155 
156   return captain;
157 };
158 
159 // ========== إدارة الرحلات ==========
160 const createTrip = async (tripData) => {
161   const { passengerId, captainId, startLocation, distanceKm, totalFare } = tripData;
162 
163   const passenger = await User.findById(passengerId);
164   if (!passenger) throw new Error('الراكب غير موجود');
165 
166   const captain = await Captain.findById(captainId);
167   if (!captain) throw new Error('الكابتن غير موجود');
168 
169   const trip = await Trip.create({
170     passengerId,
171     captainId,
172     startLocation,
173     distanceKm: distanceKm || 0,
174     totalFare: totalFare || 0,
175     status: 'pending',
176   });
177 
178   return trip;
179 };
180 
181 const deleteTrip = async (tripId) => {
182   const trip = await Trip.findById(tripId);
183   if (!trip) throw new Error('الرحلة غير موجودة');
184   await trip.deleteOne();
185   return { message: 'تم حذف الرحلة بنجاح' };
186 };
187 
188 module.exports = {
189   getAllUsers,
190   updateUser,
191   deleteUser,
192   getAllCaptains,
193   createCaptain,
194   updateCaptain,
195   deleteCaptain,
196   getPendingCaptains,
197   approveCaptain,
198   rejectCaptain,
199   createTrip,
200   deleteTrip,
201 };
```

## File: `src\modules\admin\socketLogs.controller.js`

```javascript
1 // src/modules/admin/socketLogs.controller.js
2 const fs = require('fs');
3 const path = require('path');
4 const { sendSuccess, sendError } = require('../../utils/response.util');
5 
6 const logFilePath = path.join(__dirname, '../../../logs/socket-events.log');
7 
8 const getSocketLogs = async (req, res, next) => {
9   try {
10     const { limit = 100, type, event, userId, socketId } = req.query;
11     
12     if (!fs.existsSync(logFilePath)) {
13       return sendSuccess(res, { logs: [], message: 'No logs file found' });
14     }
15     
16     const content = fs.readFileSync(logFilePath, 'utf8');
17     const lines = content.trim().split('\n').filter(l => l.trim());
18     
19     let logs = lines.map(line => {
20       try {
21         return JSON.parse(line);
22       } catch (e) {
23         return { raw: line };
24       }
25     });
26     
27     // تطبيق الفلاتر
28     if (type) {
29       logs = logs.filter(l => l.type === type);
30     }
31     if (event) {
32       logs = logs.filter(l => l.event === event);
33     }
34     if (userId) {
35       logs = logs.filter(l => l.userId === userId);
36     }
37     if (socketId) {
38       logs = logs.filter(l => l.socketId === socketId);
39     }
40     
41     // ترتيب تنازلي (الأحدث أولاً)
42     logs = logs.reverse().slice(0, parseInt(limit));
43     
44     sendSuccess(res, {
45       logs,
46       total: logs.length,
47       filePath: logFilePath,
48     });
49   } catch (error) {
50     next(error);
51   }
52 };
53 
54 const getSocketStats = async (req, res, next) => {
55   try {
56     if (!fs.existsSync(logFilePath)) {
57       return sendSuccess(res, { stats: null, message: 'No logs file found' });
58     }
59     
60     const content = fs.readFileSync(logFilePath, 'utf8');
61     const lines = content.trim().split('\n').filter(l => l.trim());
62     
63     const stats = {
64       totalEvents: 0,
65       incomingEvents: 0,
66       outgoingEvents: 0,
67       connections: 0,
68       disconnections: 0,
69       uniqueUsers: new Set(),
70       eventsByType: {},
71     };
72     
73     lines.forEach(line => {
74       try {
75         const log = JSON.parse(line);
76         stats.totalEvents++;
77         
78         if (log.type === 'connection') {
79           stats.connections++;
80           if (log.userId) stats.uniqueUsers.add(log.userId);
81         } else if (log.type === 'disconnection') {
82           stats.disconnections++;
83         } else if (log.type === 'event') {
84           if (log.direction === 'incoming') stats.incomingEvents++;
85           if (log.direction === 'outgoing') stats.outgoingEvents++;
86           
87           if (log.event) {
88             stats.eventsByType[log.event] = (stats.eventsByType[log.event] || 0) + 1;
89           }
90         }
91       } catch (e) {}
92     });
93     
94     stats.uniqueUsers = stats.uniqueUsers.size;
95     
96     sendSuccess(res, stats);
97   } catch (error) {
98     next(error);
99   }
100 };
101 
102 const clearSocketLogs = async (req, res, next) => {
103   try {
104     if (fs.existsSync(logFilePath)) {
105       fs.writeFileSync(logFilePath, '');
106       sendSuccess(res, null, 'Socket logs cleared successfully');
107     } else {
108       sendSuccess(res, null, 'No logs file to clear');
109     }
110   } catch (error) {
111     next(error);
112   }
113 };
114 
115 const getConnectedUsers = async (req, res, next) => {
116   try {
117     const { getIo } = require('../../socket');
118     const io = getIo();
119     
120     // الحصول على جميع الغرف
121     const rooms = io.sockets.adapter.rooms;
122     
123     // عدد الركاب في غرفة passengers
124     const passengersRoom = rooms.get('passengers');
125     const passengersCount = passengersRoom?.size || 0;
126     
127     // الحصول على تفاصيل الركاب المتصلين
128     const passengers = [];
129     const captains = [];
130     const allSockets = await io.fetchSockets();
131     
132     for (const socket of allSockets) {
133       if (socket.data.role === 'passenger') {
134         passengers.push({
135           socketId: socket.id,
136           userId: socket.data.userId,
137           rooms: Array.from(socket.rooms),
138         });
139       } else if (socket.data.role === 'captain') {
140         captains.push({
141           socketId: socket.id,
142           userId: socket.data.userId,
143           rooms: Array.from(socket.rooms),
144         });
145       }
146     }
147     
148     sendSuccess(res, {
149       passengersCount,
150       passengers,
151       captainsCount: captains.length,
152       captains,
153       totalConnected: allSockets.length,
154       rooms: {
155         passengers: passengersCount,
156         allRooms: Array.from(rooms.keys()).filter(r => !r.startsWith('/#')).slice(0, 20),
157       }
158     });
159   } catch (error) {
160     next(error);
161   }
162 };
163 
164 module.exports = {
165   getSocketLogs,
166   getSocketStats,
167   clearSocketLogs,
168   getConnectedUsers,
169 };
```

## File: `src\modules\auth\auth.controller.js`

```javascript
1 const authService = require('./auth.service');
2 const userRepo = require('../user/user.repository');
3 const Captain = require('../captain/captain.model');
4 const { generateTokens } = require('../../utils/jwt.util');
5 const { generateApplicationCode } = require('../../utils/code.util');
6 const { sendSuccess, sendError } = require('../../utils/response.util');
7 const { uploadSingleDocument } = require('../../middlewares/upload.middleware');
8 
9 const wrap = (fn) => async (req, res, next) => {
10   try { await fn(req, res, next); } catch (err) { next(err); }
11 };
12 
13 const googleLogin = wrap(async (req, res) => {
14   const { idToken } = req.body;
15   if (!idToken) return sendError(res, 'idToken required', 400);
16   const result = await authService.loginWithGoogle(idToken);
17 
18   sendSuccess(res, {
19     user: result.user,
20     captain: result.captain,    
21     accessToken: result.accessToken,
22     refreshToken: result.refreshToken,
23   }, 'Google login successful');
24 });
25 
26 const verifyOtp = wrap(async (req, res) => {
27   const result = await authService.verifyOtpAndLogin(req.body.phone, req.body.code, req.body.name);
28   sendSuccess(res, {
29     user: result.user,
30     captain: result.captain,    
31     accessToken: result.accessToken,
32     refreshToken: result.refreshToken,
33   }, 'Login successful');
34 });
35 
36 const refreshToken = wrap(async (req, res) => {
37   const { refreshToken } = req.body;
38   if (!refreshToken) return sendError(res, 'Refresh token required', 400);
39   const result = await authService.refreshAccessToken(refreshToken);
40   sendSuccess(res, result, 'Token refreshed');
41 });
42 
43 const logout = wrap(async (req, res) => {
44   await authService.logout(req.user.id, req.body?.refreshToken);
45   sendSuccess(res, null, 'Logged out successfully');
46 });
47 
48 const getCurrentUser = wrap(async (req, res) => {
49   const user = await userRepo.findById(req.user.id);
50   if (!user) return sendError(res, 'User not found', 404);
51 
52   let captain = null;
53   if (user.role === 'captain') {
54     captain = await Captain.findOne({ userId: user._id }).select(
55       'status isOnline applicationStatus rejectionReason vehicleType vehicleModel plateNumber vehicleColor'
56     );
57   }
58 
59   sendSuccess(res, { user, captain });
60 });
61 
62 const updateUserRole = wrap(async (req, res) => {
63   const { role } = req.body;
64   if (!['passenger', 'captain'].includes(role)) {
65     return sendError(res, 'Invalid role', 400);
66   }
67 
68   const user = await userRepo.updateById(
69     req.user.id,
70     { role },
71     { runValidators: true, select: '-refreshToken -otpCode -otpExpiresAt' }
72   );
73   if (!user) return sendError(res, 'User not found', 404);
74 
75   let applicationCode = null;
76   if (role === 'captain') {
77     const existing = await Captain.findOne({ userId: user._id });
78     if (!existing) {
79       const code = generateApplicationCode();
80       await Captain.create({
81         userId: user._id,
82         applicationCode: code,
83         applicationStatus: 'pending_approval',
84         status: 'pending_review',
85       });
86       applicationCode = code;
87     }
88   }
89 
90   const tokens = generateTokens(user._id, user.role);
91   user.refreshToken = tokens.refreshToken;
92   await user.save();
93 
94   sendSuccess(res, {
95     user,
96     accessToken: tokens.accessToken,
97     refreshToken: tokens.refreshToken,
98     applicationCode,
99   }, 'Role updated');
100 });
101 
102 const updateProfile = wrap(async (req, res) => {
103   const { name, phone } = req.body;
104   const user = await userRepo.updateById(
105     req.user.id,
106     { $set: { name, phone } },
107     { select: '-refreshToken' }
108   );
109   sendSuccess(res, user, 'Profile updated');
110 });
111 
112 const uploadAvatar = (req, res, next) => {
113   uploadSingleDocument(req, res, async (err) => {
114     if (err) return sendError(res, err.message, 400);
115     if (!req.file) return sendError(res, 'No file uploaded', 400);
116     try {
117       const user = await userRepo.updateById(req.user.id, { avatar: req.file.path });
118       sendSuccess(res, { avatar: req.file.path }, 'Avatar updated');
119     } catch (e) {
120       next(e);
121     }
122   });
123 };
124 
125 const sendOtp = wrap(async (req, res) => {
126   const result = await authService.sendOtp(req.body.phone);
127   sendSuccess(res, result, 'OTP sent');
128 });
129 
130 
131 
132 module.exports = { googleLogin, sendOtp, verifyOtp, refreshToken, logout, getCurrentUser, updateUserRole, updateProfile, uploadAvatar };
```

## File: `src\modules\auth\auth.repository.js`

```javascript
1 const userRepo = require('../user/user.repository');
2 
3 const findByGoogleOrEmail = (googleId, email) =>
4   userRepo.findOne({ $or: [{ googleId }, { email }] });
5 
6 // MongoDB implicit array match: finds doc where refreshTokens array contains the value
7 const findByIdAndToken = (id, refreshToken) =>
8   userRepo.findOne({ _id: id, refreshTokens: refreshToken });
9 
10 const createUser = (data) => userRepo.create(data);
11 
12 const updateById = (id, update) => userRepo.updateById(id, update);
13 
14 const saveDoc = (doc) => doc.save();
15 
16 // Push a new refresh token; $slice: -5 keeps only the 5 most recent (FIFO eviction)
17 const addRefreshToken = (userId, refreshToken) =>
18   userRepo.updateById(userId, {
19     $push: { refreshTokens: { $each: [refreshToken], $slice: -5 } },
20   });
21 
22 // Remove a single device's token (logout from one device)
23 const removeRefreshToken = (userId, refreshToken) =>
24   userRepo.updateById(userId, { $pull: { refreshTokens: refreshToken } });
25 
26 // Revoke all devices (security logout / password change)
27 const clearAllRefreshTokens = (userId) =>
28   userRepo.updateById(userId, { $set: { refreshTokens: [] } });
29 
30 module.exports = {
31   findByGoogleOrEmail,
32   findByIdAndToken,
33   createUser,
34   updateById,
35   saveDoc,
36   addRefreshToken,
37   removeRefreshToken,
38   clearAllRefreshTokens,
39 };
```

## File: `src\modules\auth\auth.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./auth.controller');
4 const validation = require('./auth.validation');
5 const authMiddleware = require('../../middlewares/auth.middleware');
6 const { validate } = require('../../middlewares/validate');
7 const { otpLimiter } = require('../../middlewares/rateLimit.middleware');
8 
9 router.post('/google',       validate(validation.googleSchema),    controller.googleLogin);
10 router.post('/send-otp',    otpLimiter, validate(validation.sendOtpSchema),   controller.sendOtp);
11 router.post('/verify-otp',  validate(validation.verifyOtpSchema),  controller.verifyOtp);
12 router.post('/refresh-token', validate(validation.refreshSchema),  controller.refreshToken);
13 router.post('/logout',      authMiddleware,                        controller.logout);
14 router.post('/avatar',      authMiddleware,                        controller.uploadAvatar);
15 router.get('/me',           authMiddleware,                        controller.getCurrentUser);
16 router.patch('/me',         authMiddleware, validate(validation.profileUpdateSchema), controller.updateProfile);
17 router.patch('/role',       authMiddleware, validate(validation.updateRoleSchema),    controller.updateUserRole);
18 module.exports = router;
```

## File: `src\modules\auth\auth.service.js`

```javascript
1 const authRepo = require('./auth.repository');
2 const userRepo = require('../user/user.repository');
3 const { generateTokens, verifyRefreshToken } = require('../../utils/jwt.util');
4 const { generateOtp, hashOtp, verifyOtp } = require('../../utils/otp.util');
5 const env = require('../../config/env');
6 const logger = require('../../config/logger');
7 const Captain = require('../captain/captain.model');
8 
9 const OTP_TTL_SECONDS = 300; // 5 minutes
10 const OTP_MAX_ATTEMPTS = 5;
11 const OTP_LOCKOUT_MINUTES = 30;
12 
13 // ─────────────────────────────────────────────────────────────
14 // Google OAuth
15 // ─────────────────────────────────────────────────────────────
16 
17 const loginWithGoogle = async (idToken) => {
18   const payload = _decodeGoogleToken(idToken);
19   const { googleId, email, name, picture } = payload;
20 
21   let user = await authRepo.findByGoogleOrEmail(googleId, email);
22   if (!user) {
23     user = await authRepo.createUser({ googleId, email, name, avatar: picture, role: null });
24   } else {
25     if (!user.googleId) user.googleId = googleId;
26     if (!user.name && name) user.name = name;
27     if (!user.avatar && picture) user.avatar = picture;
28     await authRepo.saveDoc(user);
29   }
30 
31   // ✅ جلب بيانات الكابتن إذا كان المستخدم كابتن
32   let captain = null;
33   let captainId = null;
34   let captainStatus = null;
35   
36   if (user.role === 'captain') {
37     captain = await Captain.findOne({ userId: user._id }).select(
38       'status isOnline vehicleType vehicleModel plateNumber vehicleColor rating totalTrips'
39     );
40     if (captain) {
41       captainId = captain._id;
42       captainStatus = captain.status;
43     }
44   }
45 
46   const tokens = generateTokens(user._id, user.role);
47   await authRepo.addRefreshToken(user._id, tokens.refreshToken);
48 
49   // بناء كائن المستخدم مع الحقول الإضافية
50   const userObj = user.toObject();
51   delete userObj.refreshTokens;
52   delete userObj.otpCode;
53   delete userObj.otpExpiresAt;
54 
55   return {
56     user: {
57       ...userObj,
58       captainId,
59       captainStatus,
60     },
61     captain, // تفاصيل إضافية للكابتن (اختياري)
62     accessToken: tokens.accessToken,
63     refreshToken: tokens.refreshToken,
64   };
65 };
66 
67 // ─────────────────────────────────────────────────────────────
68 // OTP — Step 1: Send
69 // ─────────────────────────────────────────────────────────────
70 const sendOtp = async (phone) => {
71   let user = await userRepo.findOne({ phone });
72 
73   if (!user) {
74     user = await userRepo.create({ name: phone, phone, role: null });
75   }
76 
77   const otp = generateOtp();
78   user.otpCode = hashOtp(otp);
79   user.otpExpiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);
80   await authRepo.saveDoc(user);
81 
82   await _sendOtpViaSms(phone, otp);
83 
84   logger.info(`[Auth] OTP sent to ${phone}`);
85 
86   return {
87     message: 'OTP sent',
88     expiresIn: OTP_TTL_SECONDS,
89     ...(env.NODE_ENV !== 'production' && { devOtp: otp }),
90   };
91 };
92 
93 // ─────────────────────────────────────────────────────────────
94 // OTP — Step 2: Verify + Login
95 // ─────────────────────────────────────────────────────────────
96 const verifyOtpAndLogin = async (phone, code, name) => {
97   const user = await userRepo.findOne(
98     { phone },
99     '+otpCode +otpExpiresAt +otpAttempts +otpLockedUntil',
100   );
101   if (!user || !user.otpCode) throw new Error('OTP not found — request a new one');
102 
103   // Enforce lockout before anything else
104   if (user.otpLockedUntil && user.otpLockedUntil > new Date()) {
105     const remainingMin = Math.ceil((user.otpLockedUntil.getTime() - Date.now()) / 60000);
106     throw new Error(`LOCKED:${remainingMin}`);
107   }
108 
109   if (user.otpExpiresAt < new Date()) {
110     user.otpCode = undefined;
111     user.otpExpiresAt = undefined;
112     await authRepo.saveDoc(user);
113     throw new Error('OTP expired');
114   }
115 
116   if (!verifyOtp(code, user.otpCode)) {
117     user.otpAttempts = (user.otpAttempts || 0) + 1;
118     if (user.otpAttempts >= OTP_MAX_ATTEMPTS) {
119       user.otpLockedUntil = new Date(Date.now() + OTP_LOCKOUT_MINUTES * 60 * 1000);
120       user.otpAttempts = 0;
121       await authRepo.saveDoc(user);
122       throw new Error(`LOCKED:${OTP_LOCKOUT_MINUTES}`);
123     }
124     const remaining = OTP_MAX_ATTEMPTS - user.otpAttempts;
125     await authRepo.saveDoc(user);
126     throw new Error(`Invalid OTP — ${remaining} ${remaining === 1 ? 'محاولة' : 'محاولات'} متبقية`);
127   }
128 
129   // Success — clear OTP data and reset lockout state
130   user.otpCode = undefined;
131   user.otpExpiresAt = undefined;
132   user.otpAttempts = 0;
133   user.otpLockedUntil = undefined;
134 
135   if (name && (user.name === user.phone || !user.name)) {
136     user.name = name;
137   }
138 
139   await authRepo.saveDoc(user);
140 
141   logger.info(`[Auth] OTP verified for ${phone}`);
142   return _issueTokens(user);
143 };
144 
145 // ─────────────────────────────────────────────────────────────
146 // Refresh token (with rotation)
147 // ─────────────────────────────────────────────────────────────
148 const refreshAccessToken = async (token) => {
149   const decoded = verifyRefreshToken(token);
150   if (!decoded) throw new Error('Invalid refresh token');
151 
152   const user = await authRepo.findByIdAndToken(decoded.id, token);
153   if (!user) throw new Error('Refresh token not found or revoked');
154 
155   const { accessToken, refreshToken: newRefresh } = generateTokens(user._id, user.role);
156 
157   // Rotate: invalidate old token, register new one
158   await authRepo.removeRefreshToken(user._id, token);
159   await authRepo.addRefreshToken(user._id, newRefresh);
160 
161   return { accessToken, refreshToken: newRefresh };
162 };
163 
164 // ─────────────────────────────────────────────────────────────
165 // Logout — single device (specific token) or all devices
166 // ─────────────────────────────────────────────────────────────
167 const logout = async (userId, refreshToken) => {
168   if (refreshToken) {
169     await authRepo.removeRefreshToken(userId, refreshToken);
170   } else {
171     await authRepo.clearAllRefreshTokens(userId);
172   }
173 };
174 
175 // ─────────────────────────────────────────────────────────────
176 // Helpers
177 // ─────────────────────────────────────────────────────────────
178 async function _issueTokens(user) {
179   const { accessToken, refreshToken } = generateTokens(user._id, user.role);
180   await authRepo.addRefreshToken(user._id, refreshToken);
181   const safe = user.toObject();
182   delete safe.refreshTokens;
183   delete safe.otpCode;
184   delete safe.otpExpiresAt;
185   return { user: safe, accessToken, refreshToken };
186 }
187 
188 function _decodeGoogleToken(idToken) {
189   try {
190     const parts = idToken.split('.');
191     if (parts.length === 3) {
192       const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
193       if (payload?.sub) {
194         return {
195           googleId: payload.sub,
196           email: payload.email ?? null,
197           name: payload.name || payload.email?.split('@')[0] || 'مستخدم',
198           picture: payload.picture ?? null,
199         };
200       }
201     }
202   } catch (_) { }
203   return {
204     googleId: `dev_${Date.now()}`,
205     email: `dev_${Date.now()}@temp.com`,
206     name: 'مستخدم مؤقت',
207     picture: null,
208   };
209 }
210 
211 async function _sendOtpViaSms(phone, otp) {
212   if (env.NODE_ENV !== 'production') {
213     logger.info(`[Auth] DEV OTP for ${phone}: ${otp}`);
214     return;
215   }
216   try {
217     const twilio = require('twilio')(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
218     await twilio.messages.create({
219       body: `كود التحقق لتاكس بدر: ${otp} — صالح لمدة 5 دقائق`,
220       from: env.TWILIO_PHONE,
221       to: `+2${phone}`,
222     });
223   } catch (err) {
224     logger.error('[Auth] Twilio send failed', err);
225     throw new Error('Failed to send OTP — please try again');
226   }
227 }
228 
229 module.exports = { loginWithGoogle, sendOtp, verifyOtpAndLogin, refreshAccessToken, logout };
```

## File: `src\modules\auth\auth.validation.js`

```javascript
1 const Joi = require('joi');
2 
3 
4 const googleSchema = Joi.object({
5   idToken: Joi.string().required(),
6 });
7 
8 const refreshSchema = Joi.object({
9   refreshToken: Joi.string().required(),
10 });
11 const registerCaptainSchema = Joi.object({
12   vehicleType: Joi.string().valid('car', 'motorcycle', 'tukutuk', 'alt_tukutuk').required(),
13   vehicleModel: Joi.string().min(2).max(50).required(),
14   plateNumber: Joi.string().min(3).max(20).required(),
15 });
16 
17 const sendOtpSchema = Joi.object({
18   phone: Joi.string().pattern(/^01[0-9]{9}$/).required(),
19 });
20 
21 const verifyOtpSchema = Joi.object({
22   phone: Joi.string().pattern(/^01[0-9]{9}$/).required(),
23   code: Joi.string().length(6).required(),
24   name: Joi.string().min(2).max(50).optional(),
25 });
26 
27 const toggleOnlineSchema = Joi.object({
28   isOnline: Joi.boolean().required(),
29 });
30 const updateRoleSchema = Joi.object({
31   role: Joi.string().valid('passenger', 'captain').required(),
32 });
33 const profileUpdateSchema = Joi.object({
34   name: Joi.string().min(2),
35   phone: Joi.string().regex(/^01[0-9]{9}$/),
36 });
37 
38 module.exports = {
39   googleSchema,
40   sendOtpSchema,
41   verifyOtpSchema,
42   refreshSchema,
43   registerCaptainSchema,
44   toggleOnlineSchema,
45   updateRoleSchema,
46   profileUpdateSchema
47 };
```

## File: `src\modules\captain\captain.controller.js`

```javascript
1 const captainService = require('./captain.service');
2 const captainRepo = require('./captain.repository');
3 const { sendSuccess, sendError } = require('../../utils/response.util');
4 const { generateApplicationCode } = require('../../utils/code.util');
5 
6 const wrap = (fn) => async (req, res, next) => {
7   try { await fn(req, res, next); } catch (err) { next(err); }
8 };
9 
10 // ── Registration / profile ────────────────────────────────────────────
11 const applyCaptain = wrap(async (req, res) => {
12   const userId = req.user.id;
13   const { vehicleType, vehicleModel, plateNumber, vehicleColor } = req.body;
14 
15   let captain = await captainRepo.findByUserId(userId);
16 
17   if (!captain) {
18     const Captain = require('./captain.model');
19     const code = generateApplicationCode();
20     captain = await Captain.create({
21       userId,
22       applicationCode: code,
23       applicationStatus: 'pending_approval',
24       status: 'pending_review',
25       vehicleType: vehicleType || undefined,
26       vehicleModel: vehicleModel || undefined,
27       plateNumber: plateNumber || undefined,
28       vehicleColor: vehicleColor || undefined,
29     });
30     return sendSuccess(res, {
31       code: captain.applicationCode,
32       status: captain.applicationStatus
33     }, 'Captain application created', 201);
34   }
35 
36   if (vehicleType) captain.vehicleType = vehicleType;
37   if (vehicleModel) captain.vehicleModel = vehicleModel;
38   if (plateNumber) captain.plateNumber = plateNumber;
39   if (vehicleColor) captain.vehicleColor = vehicleColor;
40 
41   await captainRepo.saveDoc(captain);
42 
43   sendSuccess(res, {
44     code: captain.applicationCode,
45     status: captain.status,
46     vehicleInfoUpdated: true
47   }, 'Captain data updated');
48 });
49 
50 const checkApplicationStatus = wrap(async (req, res) => {
51   const captain = await captainRepo.findByUserId(req.user.id);
52   if (!captain) return sendError(res, 'No application found', 404);
53   sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus });
54 });
55 
56 const getStatus = wrap(async (req, res) => {
57   const status = await captainService.getCaptainStatus(req.user.id);
58   sendSuccess(res, status);
59 });
60 
61 // ── Availability ──────────────────────────────────────────────────────
62 const toggleOnline = wrap(async (req, res) => {
63   const { isOnline } = req.body;
64   const captain = await captainService.toggleOnline(req.user.id, isOnline);
65   sendSuccess(res, { isOnline: captain.isOnline });
66 });
67 
68 // ── Nearby captains (passenger-facing) ───────────────────────────────
69 const getNearbyDrivers = wrap(async (req, res) => {
70   const { lat, lng, radius } = req.query;
71   if (!lat || !lng) return sendError(res, 'lat and lng are required', 400);
72   const captains = await captainService.getNearbyDrivers(
73     parseFloat(lat),
74     parseFloat(lng),
75     radius ? parseFloat(radius) : 5
76   );
77   sendSuccess(res, captains);
78 });
79 
80 // ── Location (REST fallback) ──────────────────────────────────────────
81 const updateLocation = wrap(async (req, res) => {
82   const { lat, lng } = req.body;
83   await captainService.updateLocation(req.user.id, lat, lng);
84   sendSuccess(res, null, 'Location updated');
85 });
86 
87 // ── Documents ─────────────────────────────────────────────────────────
88 const uploadSingleDoc = wrap(async (req, res) => {
89   const { type } = req.params;
90   const allowed = ['nationalId', 'driverLicense', 'vehicleLicense', 'vehicleProxy'];
91   if (!allowed.includes(type)) return sendError(res, 'Invalid document type', 400);
92   if (!req.file) return sendError(res, 'No file uploaded', 400);
93 
94   await captainService.updateSingleDocument(req.user.id, type, req.file.path);
95   sendSuccess(res, { field: type, url: req.file.path }, 'Document uploaded');
96 });
97 
98 // ── Personal & vehicle info ───────────────────────────────────────────
99 const updatePersonal = wrap(async (req, res) => {
100   const captain = await captainService.updatePersonal(req.user.id, req.body);
101   sendSuccess(res, captain, 'Personal info updated');
102 });
103 
104 const updateVehicle = wrap(async (req, res) => {
105   const captain = await captainService.updateVehicle(req.user.id, req.body);
106   sendSuccess(res, captain, 'Vehicle info updated');
107 });
108 
109 // ── Admin actions ─────────────────────────────────────────────────────
110 const adminApprove = wrap(async (req, res) => {
111   const captain = await captainService.approveCaptain(req.params.id);
112   sendSuccess(res, captain, 'Captain approved');
113 });
114 
115 const adminReject = wrap(async (req, res) => {
116   const captain = await captainService.rejectCaptain(req.params.id, req.body.reason);
117   sendSuccess(res, captain, 'Captain rejected');
118 });
119 
120 module.exports = {
121   applyCaptain,
122   checkApplicationStatus,
123   getStatus,
124   toggleOnline,
125   getNearbyDrivers,
126   updateLocation,
127   uploadSingleDoc,
128   updatePersonal,
129   updateVehicle,
130   adminApprove,
131   adminReject,
132 };
```

## File: `src\modules\captain\captain.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const captainSchema = new mongoose.Schema(
4   {
5     userId: {
6       type: mongoose.Schema.Types.ObjectId,
7       ref: 'User',
8       required: true,
9       unique: true,
10     },
11     vehicleType: {
12       type: String,
13       enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'],
14     },
15     vehicleModel: String,
16     plateNumber: { type: String, unique: true, sparse: true },
17     vehicleColor: String,
18     documents: {
19       nationalId: String,
20       driverLicense: String,
21       vehicleLicense: String,
22       governorate: String,
23       address: String,
24       dateOfBirth: String,
25     },
26     status: {
27       type: String,
28       enum: ['pending_review', 'approved', 'rejected', 'banned'],
29       default: 'pending_review',
30     },
31     rejectionReason: String,
32     applicationCode: { type: String, unique: true, sparse: true },
33     applicationStatus: {
34       type: String,
35       enum: ['pending_approval', 'approved', 'rejected'],
36       default: 'pending_approval',
37     },
38 
39     // Availability & presence
40     isOnline: { type: Boolean, default: false },
41     isOnTrip: { type: Boolean, default: false },
42     socketId: { type: String },
43     lastActiveAt: { type: Date },
44 
45     // Location (GeoJSON)
46     location: {
47       type: { type: String, enum: ['Point'], default: 'Point' },
48       coordinates: { type: [Number], default: [0, 0] },
49     },
50     heading: { type: Number, default: 0 },
51     lastLocationAt: Date,
52 
53     // Stats
54     rating: { type: Number, min: 0, max: 5, default: 0 },
55     totalTrips: { type: Number, default: 0 },
56   },
57   { timestamps: true }
58 );
59 
60 captainSchema.index({ location: '2dsphere' });
61 
62 module.exports = mongoose.model('Captain', captainSchema);
```

## File: `src\modules\captain\captain.repository.js`

```javascript
1 const Captain = require('./captain.model');
2 
3 const findById = (id) => Captain.findById(id);
4 
5 const findByUserId = (userId) => Captain.findOne({ userId });
6 
7 const findByUserIdPopulated = (userId) =>
8   Captain.findOne({ userId }).populate('userId', 'name avatar');
9 
10 const findNearby = (lng, lat, radiusKm = 5, carType = null) => {
11   const filter = {
12     status: 'approved',
13     isOnline: true,
14     isOnTrip: false,
15     location: {
16       $near: {
17         $geometry: { type: 'Point', coordinates: [lng, lat] },
18         $maxDistance: radiusKm * 1000,
19       },
20     },
21   };
22   if (carType) filter.vehicleType = carType;
23 
24   return Captain.find(filter).populate('userId', 'name avatar phone').lean();
25 };
26 
27 const updateById = (id, update) =>
28   Captain.findByIdAndUpdate(id, update, { new: true });
29 
30 const updateByUserId = (userId, update) =>
31   Captain.findOneAndUpdate({ userId }, update, { new: true });
32 
33 const saveDoc = (doc) => doc.save();
34 
35 module.exports = {
36   findById,
37   findByUserId,
38   findByUserIdPopulated,
39   findNearby,
40   updateById,
41   updateByUserId,
42   saveDoc,
43 };
```

## File: `src\modules\captain\captain.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./captain.controller');
4 const authMiddleware = require('../../middlewares/auth.middleware');
5 const { requireRole } = require('../../middlewares/role.middleware');
6 const { validate } = require('../../middlewares/validate');
7 const { toggleOnlineSchema } = require('../auth/auth.validation');
8 const { uploadDocuments, uploadSingleDocument } = require('../../middlewares/upload.middleware');
9 
10 // ── Captain profile / application ─────────────────────────────────────
11 router.post('/apply',              authMiddleware, controller.applyCaptain);
12 router.get('/application/status',  authMiddleware, controller.checkApplicationStatus);
13 router.get('/status',              authMiddleware, controller.getStatus);
14 router.patch('/personal',          authMiddleware, controller.updatePersonal);
15 router.patch('/vehicle',           authMiddleware, controller.updateVehicle);
16 
17 // ── Documents ─────────────────────────────────────────────────────────
18 router.post('/documents/:type', authMiddleware, requireRole('captain'), uploadSingleDocument, controller.uploadSingleDoc);
19 router.post('/documents',       authMiddleware, requireRole('captain'), uploadDocuments,       controller.uploadSingleDoc);
20 
21 // ── Availability & location ───────────────────────────────────────────
22 router.patch('/online',   authMiddleware, requireRole('captain'), validate(toggleOnlineSchema), controller.toggleOnline);
23 router.post('/location',  authMiddleware, requireRole('captain'), controller.updateLocation);
24 
25 // ── Nearby (passenger-facing) ─────────────────────────────────────────
26 router.get('/nearby', authMiddleware, requireRole('passenger'), controller.getNearbyDrivers);
27 
28 // ── Admin actions ─────────────────────────────────────────────────────
29 router.patch('/:id/approve', authMiddleware, requireRole('admin'), controller.adminApprove);
30 router.patch('/:id/reject',  authMiddleware, requireRole('admin'), controller.adminReject);
31 
32 module.exports = router;
```

## File: `src\modules\captain\captain.service.js`

```javascript
1 const captainRepo = require('./captain.repository');
2 const userRepo = require('../user/user.repository');
3 const { generateApplicationCode } = require('../../utils/code.util');
4 
5 const registerCaptain = async (userId, data) => {
6   const existing = await captainRepo.findByUserId(userId);
7   if (existing) throw new Error('Captain already registered');
8   const Captain = require('./captain.model');
9   const captain = new Captain({
10     userId,
11     vehicleType: data.vehicleType,
12     vehicleModel: data.vehicleModel,
13     plateNumber: data.plateNumber,
14     status: 'pending_review',
15   });
16   return captainRepo.saveDoc(captain);
17 };
18 
19 const getCaptainStatus = async (userId) => {
20   const captain = await captainRepo.findByUserId(userId);
21   if (!captain) return { status: 'not_registered' };
22   return { status: captain.status, rejectionReason: captain.rejectionReason };
23 };
24 
25 const toggleOnline = async (userId, isOnline) => {
26   const captain = await captainRepo.findByUserId(userId);
27   if (!captain) { const e = new Error('Captain not found'); e.status = 404; throw e; }
28   if (captain.status !== 'approved') { const e = new Error('Captain not approved'); e.status = 403; throw e; }
29   return captainRepo.updateByUserId(userId, { isOnline });
30 };
31 
32 const getNearbyDrivers = async (lat, lng, radiusKm = 5) => {
33   const captains = await captainRepo.findNearby(lng, lat, radiusKm);
34   return captains.map(_formatCaptainForPassenger);
35 };
36 
37 const approveCaptain = async (captainId) => {
38   const captain = await captainRepo.findById(captainId);
39   if (!captain) throw new Error('Captain not found');
40   captain.status = 'approved';
41   captain.rejectionReason = null;
42   await captainRepo.saveDoc(captain);
43   await userRepo.updateById(captain.userId, { role: 'captain' });
44   return captain;
45 };
46 
47 const rejectCaptain = async (captainId, reason) => {
48   const captain = await captainRepo.findById(captainId);
49   if (!captain) throw new Error('Captain not found');
50   captain.status = 'rejected';
51   captain.rejectionReason = reason;
52   return captainRepo.saveDoc(captain);
53 };
54 
55 const updateLocation = async (userId, lat, lng) => {
56   const captain = await captainRepo.findByUserId(userId);
57   if (!captain) throw new Error('Captain not found');
58   return captainRepo.updateByUserId(userId, {
59     location: { type: 'Point', coordinates: [lng, lat] },
60     lastLocationAt: new Date(),
61   });
62 };
63 
64 const updatePersonal = async (userId, data) => {
65   const captain = await captainRepo.findByUserId(userId);
66   if (!captain) throw new Error('Captain not found');
67   const { nationalId, address, governorate, dateOfBirth } = data;
68   if (nationalId !== undefined) captain.documents.nationalId = nationalId;
69   if (address !== undefined) captain.documents.address = address;
70   if (governorate !== undefined) captain.documents.governorate = governorate;
71   if (dateOfBirth !== undefined) captain.documents.dateOfBirth = dateOfBirth;
72   return captainRepo.saveDoc(captain);
73 };
74 
75 const updateVehicle = async (userId, data) => {
76   const captain = await captainRepo.findByUserId(userId);
77   if (!captain) throw new Error('Captain not found');
78   const { vehicleType, vehicleModel, plateNumber, vehicleColor } = data;
79   if (vehicleType) captain.vehicleType = vehicleType;
80   if (vehicleModel) captain.vehicleModel = vehicleModel;
81   if (plateNumber) captain.plateNumber = plateNumber;
82   if (vehicleColor) captain.vehicleColor = vehicleColor;
83   return captainRepo.saveDoc(captain);
84 };
85 
86 const updateSingleDocument = async (userId, type, fileUrl) => {
87   const captain = await captainRepo.findByUserId(userId);
88   if (!captain) throw new Error('Captain not found');
89   captain.documents[type] = fileUrl;
90   return captainRepo.saveDoc(captain);
91 };
92 
93 // -------------------- helpers --------------------
94 function _formatCaptainForPassenger(c) {
95   return {
96     captainId: c._id.toString(),
97     name: c.userId?.name,
98     phone: c.userId?.phone || '',
99     avatar: c.userId?.avatar,
100     vehicleType: c.vehicleType,
101     vehicleModel: c.vehicleModel,
102     vehicleColor: c.vehicleColor || '',
103     plateNumber: c.plateNumber,
104     lat: c.location?.coordinates?.[1] ?? 0,
105     lng: c.location?.coordinates?.[0] ?? 0,
106     heading: c.heading ?? 0,
107     rating: c.rating ?? 0,
108     totalTrips: c.totalTrips ?? 0,
109   };
110 }
111 
112 module.exports = {
113   registerCaptain,
114   getCaptainStatus,
115   toggleOnline,
116   getNearbyDrivers,
117   approveCaptain,
118   rejectCaptain,
119   updateLocation,
120   updatePersonal,
121   updateVehicle,
122   updateSingleDocument,
123 };
```

## File: `src\modules\captain\captain.socket.js`

```javascript
1 // src/modules/captain/captain.socket.js
2 
3 const captainRepo = require('./captain.repository');
4 const logger = require('../../config/logger');
5 const { emitToPassengers } = require('../../socket');
6 const { haversineDistance } = require('../../utils/distance.util');
7 const tripService = require('../trip/trip.service');
8 
9 const LOCATION_THROTTLE_MS = 3000;
10 const DISCONNECT_GRACE_MS = 10000;
11 const ROUTE_REFRESH_THRESHOLD_KM = 0.3;
12 const TRIP_LOCATION_THROTTLE_MS = 3000; // throttle trip captainLastLocation DB writes
13 const _lastDbWrite = new Map();
14 const _lastTripWrite = new Map();
15 const _disconnectTimers = new Map();
16 const _lastRouteCalc = new Map(); // userId → { lat, lng }
17 
18 const register = (io, socket) => {
19   if (socket.data.role !== 'captain') return;
20 
21   const userId = socket.data.userId;
22   let captainId = null;
23   let captainLocation = null;
24 
25   socket.on('captain:go:online', async () => {
26     try {
27       const captain = await captainRepo.findByUserIdPopulated(userId);
28       if (!captain || captain.status !== 'approved') {
29         return socket.emit('error', { code: 'NOT_APPROVED', message: 'Captain not approved' });
30       }
31 
32       captain.isOnline = true;
33       captain.socketId = socket.id;
34       captain.lastActiveAt = new Date();
35       await captainRepo.saveDoc(captain);
36 
37       captainId = captain._id.toString();
38       socket.data.captainId = captainId;
39       captainLocation = captain.location?.coordinates
40         ? { lat: captain.location.coordinates[1], lng: captain.location.coordinates[0] }
41         : null;
42 
43       _emitToNearbyPassengers(io, captainLocation, 'captain:appear', _formatAppear(captain));
44 
45       socket.emit('captain:online:ack', { isOnline: true });
46       logger.info(`[Captain Socket] ${userId} went online`);
47     } catch (err) {
48       logger.error('[Captain Socket] captain:go:online error', err);
49     }
50   });
51 
52   socket.on('captain:location:update', async ({ lat, lng, heading = 0 }) => {
53     if (lat == null || lng == null) return;
54 
55     const cId = socket.data.captainId || captainId;
56     console.log(`📍 [CAPTAIN MOVING] captainId: ${cId} | lat: ${lat}, lng: ${lng}`);
57     if (!cId) return;
58 
59     captainLocation = { lat, lng };
60 
61     // Forward location to the active trip room so the passenger's map updates in real-time.
62     const activeTripId = socket.data.activeTripId;
63     if (activeTripId) {
64       io.to(`trip:${activeTripId}`).emit('trip:location:update', { lat, lng, heading });
65 
66       // Refresh the captain→pickup polyline every ~300 m so both screens show an updated route.
67       const lastCalc = _lastRouteCalc.get(userId);
68       const movedKm = lastCalc ? haversineDistance(lat, lng, lastCalc.lat, lastCalc.lng) : Infinity;
69       if (movedKm >= ROUTE_REFRESH_THRESHOLD_KM) {
70         _lastRouteCalc.set(userId, { lat, lng });
71         tripService.refreshRoute(activeTripId, lat, lng).catch((err) =>
72           logger.warn('[Captain Socket] route refresh failed:', err.message)
73         );
74       }
75 
76       // Persist captainLastLocation to the trip document (throttled)
77       const tripNow = Date.now();
78       if (tripNow - (_lastTripWrite.get(activeTripId) ?? 0) >= TRIP_LOCATION_THROTTLE_MS) {
79         _lastTripWrite.set(activeTripId, tripNow);
80         tripService.updateCaptainLocation(activeTripId, lat, lng, heading).catch((err) =>
81           logger.warn('[Captain Socket] captainLastLocation update failed:', err.message)
82         );
83       }
84     }
85 
86     // ✅ بث تحديث الموقع فقط للركاب القريبين
87     _emitToNearbyPassengers(io, captainLocation, 'captain:move', {
88       captainId: cId,
89       lat,
90       lng,
91       heading
92     });
93 
94     // تحديث قاعدة البيانات (مثل السابق)
95     const now = Date.now();
96     if (now - (_lastDbWrite.get(userId) ?? 0) < LOCATION_THROTTLE_MS) return;
97     _lastDbWrite.set(userId, now);
98 
99     captainRepo
100       .updateByUserId(userId, {
101         $set: {
102           location: { type: 'Point', coordinates: [lng, lat] },
103           heading,
104           lastLocationAt: new Date(),
105         },
106       })
107       .catch((err) => logger.error('[Captain Socket] location DB write error', err));
108   });
109 
110   // ── Explicit offline (captain taps "go offline" in the app) ────────────
111   socket.on('captain:go:offline', async () => {
112     logger.info(`[Captain Socket] captain:go:offline received for ${userId}`);
113     if (_disconnectTimers.has(userId)) {
114       clearTimeout(_disconnectTimers.get(userId));
115       _disconnectTimers.delete(userId);
116     }
117     await _setOffline(io, userId, socket.data.captainId || captainId, socket);
118   });
119 
120   // ── Auto-offline on disconnect ──────────────────────────────────────────
121   socket.on('disconnect', () => {
122     logger.info(`[Captain Socket] disconnect event fired for ${userId}`);
123     _lastRouteCalc.delete(userId);
124 
125     const timer = setTimeout(() => {
126       _disconnectTimers.delete(userId);
127       // ✅ تمرير captainId المخزن
128       _setOffline(io, userId, socket.data.captainId || captainId, socket);
129     }, DISCONNECT_GRACE_MS);
130     _disconnectTimers.set(userId, timer);
131   });
132 
133   if (_disconnectTimers.has(userId)) {
134     clearTimeout(_disconnectTimers.get(userId));
135     _disconnectTimers.delete(userId);
136     logger.info(`[Captain Socket] ${userId} reconnected — cancelled offline timer`);
137   }
138 };
139 
140 
141 
142 // ── Private ──────────────────────────────────────────────────────────
143 async function _setOffline(io, userId, captainId, socket) {
144   try {
145     logger.info(`[Captain Socket] _setOffline called for userId=${userId}, captainId=${captainId}`);
146 
147     // ✅ إذا لم يكن لدينا captainId نحاول جلبه من قاعدة البيانات
148     let finalCaptainId = captainId;
149     let captain = await captainRepo.findByUserId(userId);
150 
151     if (!captain) {
152       logger.warn(`[Captain Socket] No captain found for userId=${userId}`);
153       return;
154     }
155 
156     if (!finalCaptainId) {
157       finalCaptainId = captain._id.toString();
158     }
159 
160     if (!captain.isOnline) {
161       logger.info(`[Captain Socket] Captain ${userId} already offline`);
162       return;
163     }
164 
165     if (captain.socketId && captain.socketId !== socket.id) {
166       logger.info(`[Captain Socket] Socket mismatch for ${userId}: stored=${captain.socketId}, current=${socket.id}`);
167       return;
168     }
169 
170     captain.isOnline = false;
171     captain.socketId = null;
172     captain.lastActiveAt = new Date();
173     await captain.save();
174 
175     // ✅ استخدام io بدلاً من socket لإرسال الحدث
176     logger.info(`[Captain Socket] Emitting captain:disappear for captainId=${finalCaptainId}`);
177     io.to('passengers').emit('captain:disappear', { captainId: finalCaptainId });
178 
179     logger.info(`[Captain Socket] ${userId} went offline`);
180   } catch (err) {
181     logger.error('[Captain Socket] _setOffline error', err);
182   }
183 }
184 
185 
186 function _emitToNearbyPassengers(io, _, event, data) {
187   console.log(`📡 [BROADCAST] Event: ${event} | name:`, data.name);
188   if (!io) return;
189   io.to('passengers').emit(event, data);
190 }
191 
192 function _formatAppear(captain) {
193   return {
194     captainId: captain._id.toString(),
195     name: captain.userId?.name,
196     avatar: captain.userId?.avatar,
197     vehicleType: captain.vehicleType,
198     vehicleColor: captain.vehicleColor,
199     lat: captain.location?.coordinates?.[1] ?? 0,
200     lng: captain.location?.coordinates?.[0] ?? 0,
201     heading: captain.heading ?? 0,
202     rating: captain.rating ?? 0,
203   };
204 }
205 
206 module.exports = { register };
```

## File: `src\modules\fare\fare.controller.js`

```javascript
1 // src/modules/fare/fare.controller.js
2 
3 const Fare = require('./fare.model');
4 const { sendSuccess, sendError } = require('../../utils/response.util');
5 
6 // Get all active fares
7 const getFares = async (req, res, next) => {
8   try {
9     const { includeInactive = false, showInAppOnly = true } = req.query;
10     
11     let filter = {};
12     
13     // Filter by isActive
14     if (includeInactive !== 'true') {
15       filter.isActive = true;
16     }
17     
18     // Filter by showInApp (for frontend display)
19     if (showInAppOnly === 'true') {
20       filter.showInApp = true;
21     }
22     
23     const fares = await Fare.find(filter)
24       .sort({ displayOrder: 1, vehicleType: 1 });
25     
26     // Transform to object format expected by frontend
27     const faresMap = {};
28     fares.forEach(fare => {
29       faresMap[fare.vehicleType] = {
30         baseFare: fare.baseFare,
31         perKmFare: fare.perKmFare,
32         firstKmFare: fare.firstKmFare,
33         extraKmFare: fare.extraKmFare,
34         currency: fare.currency,
35         description: fare.description,
36         commissionPercentage: fare.commissionPercentage,
37         minFare: fare.minFare,
38         waitingChargePerMinute: fare.waitingChargePerMinute,
39         isActive: fare.isActive,
40         showInApp: fare.showInApp,
41         displayOrder: fare.displayOrder,
42       };
43     });
44     
45     sendSuccess(res, faresMap, 'Fares retrieved successfully');
46   } catch (error) {
47     next(error);
48   }
49 };
50 
51 // Get single fare by vehicle type
52 const getFareByType = async (req, res, next) => {
53   try {
54     const { vehicleType } = req.params;
55     const fare = await Fare.findOne({ vehicleType });
56     
57     if (!fare) {
58       return sendError(res, 'Fare configuration not found', 404);
59     }
60     
61     sendSuccess(res, fare, 'Fare retrieved successfully');
62   } catch (error) {
63     next(error);
64   }
65 };
66 
67 // Create or update fare (Admin only)
68 const upsertFare = async (req, res, next) => {
69   try {
70     const { vehicleType } = req.params;
71     const updateData = req.body;
72     
73     const fare = await Fare.findOneAndUpdate(
74       { vehicleType },
75       { 
76         ...updateData, 
77         vehicleType,
78         // Ensure isActive is handled properly
79         isActive: updateData.isActive !== undefined ? updateData.isActive : true,
80       },
81       { new: true, upsert: true, runValidators: true }
82     );
83     
84     sendSuccess(res, fare, 'Fare saved successfully');
85   } catch (error) {
86     next(error);
87   }
88 };
89 
90 // Toggle fare active status (Admin only)
91 const toggleFareStatus = async (req, res, next) => {
92   try {
93     const { vehicleType } = req.params;
94     const { isActive } = req.body;
95     
96     if (isActive === undefined) {
97       return sendError(res, 'isActive field is required', 400);
98     }
99     
100     const fare = await Fare.findOneAndUpdate(
101       { vehicleType },
102       { isActive },
103       { new: true }
104     );
105     
106     if (!fare) {
107       return sendError(res, 'Fare configuration not found', 404);
108     }
109     
110     sendSuccess(res, fare, `Fare ${isActive ? 'activated' : 'deactivated'} successfully`);
111   } catch (error) {
112     next(error);
113   }
114 };
115 
116 // Toggle showInApp status (Admin only)
117 const toggleShowInApp = async (req, res, next) => {
118   try {
119     const { vehicleType } = req.params;
120     const { showInApp } = req.body;
121     
122     if (showInApp === undefined) {
123       return sendError(res, 'showInApp field is required', 400);
124     }
125     
126     const fare = await Fare.findOneAndUpdate(
127       { vehicleType },
128       { showInApp },
129       { new: true }
130     );
131     
132     if (!fare) {
133       return sendError(res, 'Fare configuration not found', 404);
134     }
135     
136     sendSuccess(res, fare, `Fare ${showInApp ? 'shown' : 'hidden'} in app successfully`);
137   } catch (error) {
138     next(error);
139   }
140 };
141 
142 // Update display order (Admin only)
143 const updateDisplayOrder = async (req, res, next) => {
144   try {
145     const { orders } = req.body; // Array of { vehicleType, displayOrder }
146     
147     if (!Array.isArray(orders)) {
148       return sendError(res, 'orders array is required', 400);
149     }
150     
151     const bulkOps = orders.map(order => ({
152       updateOne: {
153         filter: { vehicleType: order.vehicleType },
154         update: { displayOrder: order.displayOrder },
155       },
156     }));
157     
158     await Fare.bulkWrite(bulkOps);
159     
160     sendSuccess(res, null, 'Display order updated successfully');
161   } catch (error) {
162     next(error);
163   }
164 };
165 
166 // Delete fare (Admin only)
167 const deleteFare = async (req, res, next) => {
168   try {
169     const { vehicleType } = req.params;
170     const fare = await Fare.findOneAndDelete({ vehicleType });
171     
172     if (!fare) {
173       return sendError(res, 'Fare configuration not found', 404);
174     }
175     
176     sendSuccess(res, null, 'Fare deleted successfully');
177   } catch (error) {
178     next(error);
179   }
180 };
181 
182 // Calculate fare dynamically
183 const calculateFare = async (req, res, next) => {
184   try {
185     const { distanceKm, vehicleType, waitingMinutes = 0 } = req.body;
186     
187     if (!distanceKm || distanceKm <= 0) {
188       return sendError(res, 'Distance is required', 400);
189     }
190     
191     const fareConfig = await Fare.findOne({ vehicleType, isActive: true });
192     
193     if (!fareConfig) {
194       return sendError(res, 'Fare configuration not found for this vehicle type', 404);
195     }
196     
197     // Calculate fare using the stored configuration
198     let totalFare = 0;
199     
200     if (distanceKm <= 1) {
201       totalFare = fareConfig.firstKmFare;
202     } else {
203       totalFare = fareConfig.firstKmFare + ((distanceKm - 1) * fareConfig.extraKmFare);
204     }
205     
206     // Add waiting charges if any
207     if (waitingMinutes > 0 && fareConfig.waitingChargePerMinute > 0) {
208       totalFare += waitingMinutes * fareConfig.waitingChargePerMinute;
209     }
210     
211     // Apply minimum fare if applicable
212     if (fareConfig.minFare > 0 && totalFare < fareConfig.minFare) {
213       totalFare = fareConfig.minFare;
214     }
215     
216     const commission = Math.round(totalFare * (fareConfig.commissionPercentage / 100));
217     const netEarnings = totalFare - commission;
218     
219     const result = {
220       distanceKm: Math.round(distanceKm * 100) / 100,
221       vehicleType,
222       fareBreakdown: {
223         firstKm: Math.min(distanceKm, 1),
224         firstFare: fareConfig.firstKmFare,
225         extraKm: Math.max(0, distanceKm - 1),
226         extraFare: distanceKm > 1 ? (distanceKm - 1) * fareConfig.extraKmFare : 0,
227         waitingMinutes,
228         waitingCharge: waitingMinutes * fareConfig.waitingChargePerMinute,
229         total: Math.round(totalFare),
230         commission,
231         netEarnings,
232         commissionPercentage: fareConfig.commissionPercentage,
233       },
234       currency: fareConfig.currency,
235     };
236     
237     sendSuccess(res, result, 'Fare calculated successfully');
238   } catch (error) {
239     next(error);
240   }
241 };
242 
243 // Bulk create/update fares from admin panel
244 const bulkUpdateFares = async (req, res, next) => {
245   try {
246     const { fares } = req.body;
247     
248     if (!Array.isArray(fares)) {
249       return sendError(res, 'fares array is required', 400);
250     }
251     
252     const results = [];
253     for (const fareData of fares) {
254       const fare = await Fare.findOneAndUpdate(
255         { vehicleType: fareData.vehicleType },
256         fareData,
257         { new: true, upsert: true, runValidators: true }
258       );
259       results.push(fare);
260     }
261     
262     sendSuccess(res, results, `${results.length} fares updated successfully`);
263   } catch (error) {
264     next(error);
265   }
266 };
267 
268 module.exports = {
269   getFares,
270   getFareByType,
271   upsertFare,
272   toggleFareStatus,
273   toggleShowInApp,
274   updateDisplayOrder,
275   deleteFare,
276   calculateFare,
277   bulkUpdateFares,
278 };
```

## File: `src\modules\fare\fare.model.js`

```javascript
1 // src/modules/fare/fare.model.js
2 
3 const mongoose = require('mongoose');
4 
5 const fareSchema = new mongoose.Schema(
6   {
7     vehicleType: {
8       type: String,
9       enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk', 'comfort', 'van'],
10       required: true,
11       unique: true,
12     },
13     baseFare: {
14       type: Number,
15       required: true,
16       min: 0,
17     },
18     perKmFare: {
19       type: Number,
20       required: true,
21       min: 0,
22     },
23     firstKmFare: {
24       type: Number,
25       required: true,
26       min: 0,
27     },
28     extraKmFare: {
29       type: Number,
30       required: true,
31       min: 0,
32     },
33     commissionPercentage: {
34       type: Number,
35       default: 20,
36       min: 0,
37       max: 100,
38     },
39     currency: {
40       type: String,
41       default: 'ج.م',
42     },
43     description: {
44       type: String,
45       default: '',
46     },
47     isActive: {
48       type: Boolean,
49       default: true,
50       index: true, 
51     },
52     minFare: {
53       type: Number,
54       default: 0,
55     },
56     waitingChargePerMinute: {
57       type: Number,
58       default: 0,
59     },
60     showInApp: {
61       type: Boolean,
62       default: true,
63     },
64     displayOrder: {
65       type: Number,
66       default: 0,
67     },
68   },
69   { timestamps: true }
70 );
71 
72 // ✅ إنشاء compound index للبحث السريع
73 fareSchema.index({ isActive: 1, displayOrder: 1 });
74 
75 module.exports = mongoose.model('Fare', fareSchema);
```

## File: `src\modules\fare\fare.routes.js`

```javascript
1 // src/modules/fare/fare.routes.js
2 
3 const express = require('express');
4 const router = express.Router();
5 const controller = require('./fare.controller');
6 const authMiddleware = require('../../middlewares/auth.middleware');
7 const { requireRole } = require('../../middlewares/role.middleware');
8 
9 // Public routes (no auth needed for getting fares)
10 router.get('/', controller.getFares);
11 router.get('/:vehicleType', controller.getFareByType);
12 router.post('/calculate', controller.calculateFare);
13 
14 // Admin only routes
15 router.post('/:vehicleType', authMiddleware, requireRole('admin'), controller.upsertFare);
16 router.delete('/:vehicleType', authMiddleware, requireRole('admin'), controller.deleteFare);
17 
18 module.exports = router;
```

## File: `src\modules\notification\notification.controller.js`

```javascript
1 const Notification = require('./notification.model');
2 const { sendSuccess } = require('../../utils/response.util');
3 
4 const getNotifications = async (req, res, next) => {
5   try {
6     const items = await Notification.find({ userId: req.user.id })
7       .sort({ createdAt: -1 })
8       .limit(100)
9       .lean();
10     sendSuccess(res, items);
11   } catch (err) { next(err); }
12 };
13 
14 const markAllRead = async (req, res, next) => {
15   try {
16     await Notification.updateMany(
17       { userId: req.user.id, isRead: false },
18       { $set: { isRead: true } }
19     );
20     sendSuccess(res, null, 'Marked all as read');
21   } catch (err) { next(err); }
22 };
23 
24 module.exports = { getNotifications, markAllRead };
```

## File: `src\modules\notification\notification.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const notificationSchema = new mongoose.Schema({
4   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
5   type:   { type: String, required: true },
6   title:  { type: String, required: true },
7   body:   { type: String, required: true },
8   isRead: { type: Boolean, default: false },
9   data:   { type: mongoose.Schema.Types.Mixed, default: {} },
10 }, { timestamps: true });
11 
12 notificationSchema.index({ userId: 1, createdAt: -1 });
13 
14 module.exports = mongoose.model('Notification', notificationSchema);
```

## File: `src\modules\notification\notification.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const Joi = require('joi');
4 const { validate } = require('../../middlewares/validate');
5 const authMiddleware = require('../../middlewares/auth.middleware');
6 const { registerToken, removeToken } = require('./notification.service');
7 const { getNotifications, markAllRead } = require('./notification.controller');
8 const { sendSuccess } = require('../../utils/response.util');
9 
10 const tokenSchema = Joi.object({
11   token: Joi.string().min(10).required(),
12 });
13 
14 // FCM token management
15 router.post('/token', authMiddleware, validate(tokenSchema), async (req, res, next) => {
16   try {
17     await registerToken(req.user.id, req.body.token);
18     sendSuccess(res, null, 'Token registered');
19   } catch (err) { next(err); }
20 });
21 
22 router.delete('/token', authMiddleware, validate(tokenSchema), async (req, res, next) => {
23   try {
24     await removeToken(req.user.id, req.body.token);
25     sendSuccess(res, null, 'Token removed');
26   } catch (err) { next(err); }
27 });
28 
29 // Notification list & read state
30 router.get('/',               authMiddleware, getNotifications);
31 router.patch('/mark-all-read', authMiddleware, markAllRead);
32 
33 module.exports = router;
```

## File: `src\modules\notification\notification.service.js`

```javascript
1 const User         = require('../user/user.model');
2 const Notification = require('./notification.model');
3 const { isUserOnline } = require('../../socket');
4 const { getMessaging } = require('../../config/firebase');
5 const logger = require('../../config/logger');
6 
7 const MAX_FCM_TOKENS = 5;
8 
9 // Register or refresh a device token for a user.
10 const registerToken = async (userId, token) => {
11   const user = await User.findById(userId);
12   if (!user) throw new Error('User not found');
13 
14   // Deduplicate
15   if (user.fcmTokens.includes(token)) return;
16 
17   user.fcmTokens.push(token);
18   // FIFO: keep latest MAX_FCM_TOKENS
19   if (user.fcmTokens.length > MAX_FCM_TOKENS) {
20     user.fcmTokens = user.fcmTokens.slice(-MAX_FCM_TOKENS);
21   }
22   await user.save();
23 };
24 
25 const removeToken = async (userId, token) => {
26   await User.findByIdAndUpdate(userId, { $pull: { fcmTokens: token } });
27 };
28 
29 // Smart notify: persist to DB, then socket if online / FCM if offline.
30 const notify = async (userId, { title, body, data = {} }) => {
31   const userIdStr = userId.toString();
32 
33   // Always persist so the notifications screen has history
34   Notification.create({
35     userId: userIdStr,
36     type:   data.type ?? 'general',
37     title,
38     body,
39     data,
40   }).catch((err) => logger.error('[Notify] DB save failed', err));
41 
42   if (isUserOnline(userIdStr)) {
43     // User has an active socket — they'll get the realtime event. Skip FCM.
44     return;
45   }
46 
47   const messaging = getMessaging();
48   if (!messaging) return;
49 
50   const user = await User.findById(userId).select('fcmTokens');
51   if (!user || user.fcmTokens.length === 0) return;
52 
53   const message = {
54     notification: { title, body },
55     data: Object.fromEntries(
56       Object.entries(data).map(([k, v]) => [k, String(v)])
57     ),
58     android: {
59       priority: 'high',
60       notification: { sound: 'default', channelId: 'meshwari_trips' },
61     },
62     apns: {
63       payload: { aps: { sound: 'default', badge: 1 } },
64     },
65     tokens: user.fcmTokens,
66   };
67 
68   try {
69     const res = await messaging.sendEachForMulticast(message);
70     // Remove stale tokens (invalid / unregistered)
71     const staleToks = res.responses
72       .map((r, i) => (!r.success && _isTokenError(r.error?.code) ? user.fcmTokens[i] : null))
73       .filter(Boolean);
74     if (staleToks.length) {
75       await User.findByIdAndUpdate(userId, { $pull: { fcmTokens: { $in: staleToks } } });
76     }
77     logger.info(`[Notify] ${userId} pushed: ${res.successCount}/${user.fcmTokens.length}`);
78   } catch (err) {
79     logger.error('[Notify] FCM error', err);
80   }
81 };
82 
83 const _isTokenError = (code) =>
84   ['messaging/invalid-registration-token',
85    'messaging/registration-token-not-registered'].includes(code);
86 
87 module.exports = { registerToken, removeToken, notify };
```

## File: `src\modules\passenger\passenger.controller.js`

```javascript
1 const captainService = require('../captain/captain.service');
2 const { sendSuccess } = require('../../utils/response.util');
3 
4 const getNearbyDrivers = async (req, res, next) => {
5   try {
6     const { lat, lng, radius = 3 } = req.query;
7     const drivers = await captainService.getNearbyDrivers(
8       parseFloat(lat),
9       parseFloat(lng),
10       parseFloat(radius)
11     );
12     sendSuccess(res, drivers);
13   } catch (error) {
14     next(error);
15   }
16 };
17 
18 module.exports = {
19   getNearbyDrivers,
20 };
```

## File: `src\modules\passenger\passenger.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./passenger.controller');
4 const authMiddleware = require('../../middlewares/auth.middleware');
5 const { requireRole } = require('../../middlewares/role.middleware');
6 
7 router.get(
8   '/drivers/nearby',
9   authMiddleware,
10   requireRole('passenger', 'captain'), 
11   controller.getNearbyDrivers
12 );
13 
14 module.exports = router;
```

## File: `src\modules\places\place.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const recentSearchSchema = new mongoose.Schema({
4   userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
5   placeId:       { type: String, required: true },
6   mainText:      { type: String, required: true },
7   secondaryText: { type: String, default: '' },
8 }, { timestamps: true });
9 
10 recentSearchSchema.index({ userId: 1, createdAt: -1 });
11 
12 const savedPlaceSchema = new mongoose.Schema({
13   userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
14   type:          { type: String, enum: ['home', 'work'], required: true },
15   mainText:      { type: String, required: true },
16   secondaryText: { type: String, default: '' },
17   lat:           { type: Number, required: true },
18   lng:           { type: Number, required: true },
19 }, { timestamps: true });
20 
21 savedPlaceSchema.index({ userId: 1, type: 1 }, { unique: true });
22 
23 const RecentSearch = mongoose.model('RecentSearch', recentSearchSchema);
24 const SavedPlace   = mongoose.model('SavedPlace',   savedPlaceSchema);
25 
26 module.exports = { RecentSearch, SavedPlace };
```

## File: `src\modules\places\places.controller.js`

```javascript
1 const svc = require('./places.service');
2 const { sendSuccess, sendError } = require('../../utils/response.util');
3 
4 const reverseGeocode = async (req, res, next) => {
5   try {
6     const { lat, lng } = req.query;
7     if (!lat || !lng) return sendError(res, 'lat and lng are required', 400);
8     sendSuccess(res, await svc.reverseGeocode(Number(lat), Number(lng)));
9   } catch (err) { next(err); }
10 };
11 
12 const autocomplete = async (req, res, next) => {
13   try {
14     const { input, lat, lng } = req.query;
15     if (!input?.trim()) return sendError(res, 'input is required', 400);
16     sendSuccess(res, await svc.autocomplete(input, lat, lng));
17   } catch (err) { next(err); }
18 };
19 
20 const getDetails = async (req, res, next) => {
21   try {
22     sendSuccess(res, await svc.getDetails(req.params.placeId));
23   } catch (err) { next(err); }
24 };
25 
26 const nearbySearch = async (req, res, next) => {
27   try {
28     const { lat, lng, radius = 1500, limit = 10 } = req.query;
29     if (!lat || !lng) return sendError(res, 'lat and lng are required', 400);
30     sendSuccess(res, await svc.nearbySearch(Number(lat), Number(lng), Number(radius), Number(limit)));
31   } catch (err) { next(err); }
32 };
33 
34 const getRecentSearches = async (req, res, next) => {
35   try {
36     sendSuccess(res, await svc.getRecentSearches(req.user.id));
37   } catch (err) { next(err); }
38 };
39 
40 const saveRecentSearch = async (req, res, next) => {
41   try {
42     const { placeId, mainText, secondaryText } = req.body;
43     if (!placeId || !mainText) return sendError(res, 'placeId and mainText are required', 400);
44     await svc.saveRecentSearch(req.user.id, { placeId, mainText, secondaryText });
45     sendSuccess(res, null, 'Saved');
46   } catch (err) { next(err); }
47 };
48 
49 const getSavedPlaces = async (req, res, next) => {
50   try {
51     sendSuccess(res, await svc.getSavedPlaces(req.user.id));
52   } catch (err) { next(err); }
53 };
54 
55 const saveSavedPlace = async (req, res, next) => {
56   try {
57     const { type, mainText, secondaryText, lat, lng } = req.body;
58     if (!type || !mainText || lat == null || lng == null)
59       return sendError(res, 'type, mainText, lat, lng are required', 400);
60     sendSuccess(res, await svc.saveSavedPlace(req.user.id, { type, mainText, secondaryText, lat, lng }));
61   } catch (err) { next(err); }
62 };
63 
64 module.exports = { reverseGeocode, autocomplete, getDetails, nearbySearch, getRecentSearches, saveRecentSearch, getSavedPlaces, saveSavedPlace };
```

## File: `src\modules\places\places.routes.js`

```javascript
1 const router = require('express').Router();
2 const auth   = require('../../middlewares/auth.middleware');
3 const c      = require('./places.controller');
4 
5 router.get('/reverse',            auth, c.reverseGeocode);
6 router.get('/autocomplete',       auth, c.autocomplete);
7 router.get('/details/:placeId',   auth, c.getDetails);
8 router.get('/nearby',             auth, c.nearbySearch);
9 router.get('/recent',             auth, c.getRecentSearches);
10 router.post('/recent',            auth, c.saveRecentSearch);
11 router.get('/saved',              auth, c.getSavedPlaces);
12 router.post('/saved',             auth, c.saveSavedPlace);
13 
14 module.exports = router;
```

## File: `src\modules\places\places.service.js`

```javascript
1 const https = require('https');
2 const { RecentSearch, SavedPlace } = require('./place.model');
3 const {
4   autocompleteCache, placeDetailsCache, nearbyCache, reverseCache,
5   autocompleteKey, placeDetailsKey, nearbyKey, reverseKey,
6 } = require('../../utils/api-cache.util');
7 
8 // ── Google API helper ─────────────────────────────────────────────────
9 
10 function httpsGet(url) {
11   return new Promise((resolve, reject) => {
12     https.get(url, (res) => {
13       let raw = '';
14       res.on('data', (chunk) => { raw += chunk; });
15       res.on('end', () => {
16         try { resolve(JSON.parse(raw)); }
17         catch (e) { reject(e); }
18       });
19     }).on('error', reject);
20   });
21 }
22 
23 function googleKey() {
24   const key = process.env.GOOGLE_MAPS_API_KEY;
25   if (!key) throw new Error('GOOGLE_MAPS_API_KEY not configured');
26   return key;
27 }
28 
29 // ── Autocomplete ──────────────────────────────────────────────────────
30 // Cache: 1 h TTL, coarse 1.1 km location grid, Arabic-normalised query key.
31 
32 const autocomplete = async (input, lat, lng) => {
33   const cacheKey = autocompleteKey(input, lat, lng);
34   const hit = autocompleteCache.get(cacheKey);
35   if (hit) return hit;
36 
37   const params = new URLSearchParams({
38     input,
39     key:      googleKey(),
40     language: 'ar',
41   });
42   if (lat && lng) {
43     params.set('location', `${lat},${lng}`);
44     params.set('radius', '50000');
45   }
46 
47   const data = await httpsGet(
48     `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`
49   );
50 
51   if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
52     throw new Error(`Google Autocomplete: ${data.status}`);
53   }
54 
55   const result = (data.predictions ?? []).map((p) => ({
56     placeId:       p.place_id,
57     mainText:      p.structured_formatting?.main_text      ?? p.description,
58     secondaryText: p.structured_formatting?.secondary_text ?? '',
59   }));
60 
61   autocompleteCache.set(cacheKey, result);
62   return result;
63 };
64 
65 // ── Place details ─────────────────────────────────────────────────────
66 // Cache: 24 h TTL, keyed by stable place_id.
67 
68 const getDetails = async (placeId) => {
69   const cacheKey = placeDetailsKey(placeId);
70   const hit = placeDetailsCache.get(cacheKey);
71   if (hit) return hit;
72 
73   const params = new URLSearchParams({
74     place_id: placeId,
75     fields:   'geometry,formatted_address,name',
76     key:      googleKey(),
77     language: 'ar',
78   });
79 
80   const data = await httpsGet(
81     `https://maps.googleapis.com/maps/api/place/details/json?${params}`
82   );
83 
84   if (data.status !== 'OK') throw new Error(`Google Place Details: ${data.status}`);
85 
86   const loc = data.result.geometry?.location;
87   const result = {
88     lat:     loc?.lat,
89     lng:     loc?.lng,
90     address: data.result.formatted_address ?? data.result.name,
91   };
92 
93   placeDetailsCache.set(cacheKey, result);
94   return result;
95 };
96 
97 // ── Nearby search ─────────────────────────────────────────────────────
98 // Cache: 10 min TTL, 1.1 km coordinate grid.
99 
100 const nearbySearch = async (lat, lng, radius = 1500, limit = 10) => {
101   const cacheKey = nearbyKey(lat, lng, radius, limit);
102   const hit = nearbyCache.get(cacheKey);
103   if (hit) return hit;
104 
105   const params = new URLSearchParams({
106     location: `${lat},${lng}`,
107     radius:   String(radius),
108     key:      googleKey(),
109     language: 'ar',
110   });
111 
112   const data = await httpsGet(
113     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`
114   );
115 
116   if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
117     throw new Error(`Google Nearby Search: ${data.status}`);
118   }
119 
120   const result = (data.results ?? []).slice(0, limit).map((p) => ({
121     placeId:       p.place_id,
122     mainText:      p.name,
123     secondaryText: p.vicinity ?? '',
124     lat:           p.geometry?.location?.lat,
125     lng:           p.geometry?.location?.lng,
126   }));
127 
128   nearbyCache.set(cacheKey, result);
129   return result;
130 };
131 
132 // ── Reverse geocode ───────────────────────────────────────────────────
133 // Cache: 24 h TTL, ~11 m coordinate grid.
134 
135 const reverseGeocode = async (lat, lng) => {
136   const cacheKey = reverseKey(lat, lng);
137   const hit = reverseCache.get(cacheKey);
138   if (hit) return hit;
139 
140   const params = new URLSearchParams({
141     latlng:      `${lat},${lng}`,
142     key:         googleKey(),
143     language:    'ar',
144     result_type: 'street_address|route|neighborhood|locality',
145   });
146 
147   const data = await httpsGet(
148     `https://maps.googleapis.com/maps/api/geocode/json?${params}`
149   );
150 
151   if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
152     throw new Error(`Google Geocode: ${data.status}`);
153   }
154 
155   const result = { address: data.results?.[0]?.formatted_address ?? '' };
156   reverseCache.set(cacheKey, result);
157   return result;
158 };
159 
160 // ── Recent searches (DB) ──────────────────────────────────────────────
161 
162 const getRecentSearches = (userId) =>
163   RecentSearch.find({ userId }).sort({ createdAt: -1 }).limit(10).lean();
164 
165 const saveRecentSearch = async (userId, { placeId, mainText, secondaryText = '' }) => {
166   await RecentSearch.findOneAndUpdate(
167     { userId, placeId },
168     { userId, placeId, mainText, secondaryText },
169     { upsert: true, new: true, timestamps: true }
170   );
171   // Trim to 10 most recent
172   const overflow = await RecentSearch.find({ userId })
173     .sort({ createdAt: -1 })
174     .skip(10)
175     .select('_id');
176   if (overflow.length) {
177     await RecentSearch.deleteMany({ _id: { $in: overflow.map((r) => r._id) } });
178   }
179 };
180 
181 // ── Saved places (DB) ─────────────────────────────────────────────────
182 
183 const getSavedPlaces = (userId) => SavedPlace.find({ userId }).lean();
184 
185 const saveSavedPlace = (userId, { type, mainText, secondaryText = '', lat, lng }) =>
186   SavedPlace.findOneAndUpdate(
187     { userId, type },
188     { userId, type, mainText, secondaryText, lat, lng },
189     { upsert: true, new: true }
190   );
191 
192 module.exports = {
193   autocomplete,
194   getDetails,
195   nearbySearch,
196   reverseGeocode,
197   getRecentSearches,
198   saveRecentSearch,
199   getSavedPlaces,
200   saveSavedPlace,
201 };
```

## File: `src\modules\review\review.controller.js`

```javascript
1 const reviewService = require('./review.service');
2 const { sendSuccess, sendError } = require('../../utils/response.util');
3 
4 const addReview = async (req, res, next) => {
5   try {
6     const { tripId, rating, comment } = req.body;
7     const reviewerId = req.user.id;
8     // Find trip to get reviewee (captain's user id)
9     const Trip = require('../trip/trip.model');
10     const trip = await Trip.findById(tripId).populate('captainId');
11     if (!trip) return sendError(res, 'Trip not found', 404);
12     const revieweeId = trip.captainId.userId;
13 
14     const review = await reviewService.createReview(tripId, reviewerId, revieweeId, rating, comment);
15     sendSuccess(res, review, 'Review submitted');
16   } catch (error) {
17     next(error);
18   }
19 };
20 
21 const getUserReviews = async (req, res, next) => {
22   try {
23     const userId = req.params.userId || req.user.id;
24     const reviews = await reviewService.getReviewsForUser(userId);
25     sendSuccess(res, reviews);
26   } catch (error) {
27     next(error);
28   }
29 };
30 
31 module.exports = { addReview, getUserReviews };
```

## File: `src\modules\review\review.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const reviewSchema = new mongoose.Schema({
4   tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
5   reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
6   revieweeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
7   rating: { type: Number, min: 1, max: 5, required: true },
8   comment: String,
9 }, { timestamps: true });
10 
11 // Ensure one review per trip per reviewer
12 reviewSchema.index({ tripId: 1, reviewerId: 1 }, { unique: true });
13 
14 module.exports = mongoose.model('Review', reviewSchema);
```

## File: `src\modules\review\review.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./review.controller');
4 const authMiddleware = require('../../middlewares/auth.middleware');
5 
6 router.post('/', authMiddleware, controller.addReview);
7 router.get('/user/:userId?', authMiddleware, controller.getUserReviews);
8 
9 module.exports = router;
```

## File: `src\modules\review\review.service.js`

```javascript
1 const Review = require('./review.model');
2 const Captain = require('../captain/captain.model');
3 const Trip = require('../trip/trip.model');
4 
5 const createReview = async (tripId, reviewerId, revieweeId, rating, comment) => {
6   const existing = await Review.findOne({ tripId, reviewerId });
7   if (existing) throw new Error('You already reviewed this trip');
8 
9   const review = await Review.create({ tripId, reviewerId, revieweeId, rating, comment });
10 
11   // Update captain's average rating
12   const captain = await Captain.findOne({ userId: revieweeId });
13   if (captain) {
14     const allReviews = await Review.find({ revieweeId });
15     const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
16     captain.rating = Math.round(avg * 10) / 10;
17     await captain.save();
18   }
19 
20   return review;
21 };
22 
23 const getReviewsForUser = async (userId) => {
24   return await Review.find({ revieweeId: userId }).populate('reviewerId', 'name avatar');
25 };
26 
27 module.exports = { createReview, getReviewsForUser };
```

## File: `src\modules\routes\routes.controller.js`

```javascript
1 const svc = require('./routes.service');
2 const { sendSuccess, sendError } = require('../../utils/response.util');
3 
4 const getPolyline = async (req, res, next) => {
5   try {
6     const { originLat, originLng, destLat, destLng } = req.query;
7     if (!originLat || !originLng || !destLat || !destLng)
8       return sendError(res, 'originLat, originLng, destLat, destLng are required', 400);
9     sendSuccess(res, await svc.getPolyline(
10       Number(originLat), Number(originLng),
11       Number(destLat),   Number(destLng)
12     ));
13   } catch (err) { next(err); }
14 };
15 
16 module.exports = { getPolyline };
```

## File: `src\modules\routes\routes.routes.js`

```javascript
1 const router = require('express').Router();
2 const auth   = require('../../middlewares/auth.middleware');
3 const c      = require('./routes.controller');
4 
5 router.get('/polyline', auth, c.getPolyline);
6 
7 module.exports = router;
```

## File: `src\modules\routes\routes.service.js`

```javascript
1 const https = require('https');
2 const { polylineCache, polylineKey } = require('../../utils/api-cache.util');
3 
4 // ── Google API helper ─────────────────────────────────────────────────
5 
6 function httpsGet(url) {
7   return new Promise((resolve, reject) => {
8     https.get(url, (res) => {
9       let raw = '';
10       res.on('data', (chunk) => { raw += chunk; });
11       res.on('end', () => {
12         try { resolve(JSON.parse(raw)); }
13         catch (e) { reject(e); }
14       });
15     }).on('error', reject);
16   });
17 }
18 
19 // ── Route polyline ────────────────────────────────────────────────────
20 // Cache: 10 min TTL, ~11 m coordinate grid on origin + destination.
21 
22 const getPolyline = async (originLat, originLng, destLat, destLng) => {
23   const key = process.env.GOOGLE_MAPS_API_KEY;
24   if (!key) throw new Error('GOOGLE_MAPS_API_KEY not configured');
25 
26   const cacheKey = polylineKey(originLat, originLng, destLat, destLng);
27   const hit = polylineCache.get(cacheKey);
28   if (hit) return hit;
29 
30   const params = new URLSearchParams({
31     origin: `${originLat},${originLng}`,
32     destination: `${destLat},${destLng}`,
33     key,
34     language: 'ar',
35     alternatives: 'false',
36     departure_time: 'now',
37     traffic_model: 'best_guess',
38   });
39 
40   const data = await httpsGet(
41     `https://maps.googleapis.com/maps/api/directions/json?${params}`
42   );
43 
44   if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
45     throw new Error(`Google Directions: ${data.status}`);
46   }
47 
48   const route = data.routes?.[0];
49   const leg = route?.legs?.[0];
50   const normalDurationMins = leg ? Math.ceil(leg.duration.value / 60) : 0;
51 
52   const trafficDurationMins = leg?.duration_in_traffic
53     ? Math.ceil(leg.duration_in_traffic.value / 60)
54     : normalDurationMins;
55 
56   const result = {
57     encodedPolyline: route?.overview_polyline?.points ?? '',
58     distanceKm: leg ? Math.round((leg.distance.value / 1000) * 100) / 100 : 0,
59     durationMins: normalDurationMins,
60     durationInTrafficMins: trafficDurationMins, // ✅ الوقت الفعلي مع الزحمة
61   };
62 
63   polylineCache.set(cacheKey, result);
64   return result;
65 };
66 
67 module.exports = { getPolyline };
```

## File: `src\modules\seed\seed.controller.js`

```javascript
1 const User = require('../user/user.model');
2 const Captain = require('../captain/captain.model');
3 const Trip = require('../trip/trip.model');
4 const { sendSuccess, sendError } = require('../../utils/response.util');
5 
6 const MOCK_CAPTAINS_COUNT = 15;
7 const MOCK_TRIPS_COUNT = 5;
8 const MOCK_DOMAIN = 'meshwari.dev'; // لتمييز البيانات التجريبية
9 
10 const runSeeder = async (req, res, next) => {
11   if (process.env.NODE_ENV !== 'development') {
12     return sendError(res, 'Seeder is only allowed in development environment', 403);
13   }
14 
15   try {
16     // 1️⃣ حذف البيانات التجريبية القديمة
17     const mockUsers = await User.find({ email: { $regex: MOCK_DOMAIN, $options: 'i' } });
18     const mockUserIds = mockUsers.map(u => u._id);
19     
20     if (mockUserIds.length > 0) {
21       // حذف الرحلات المرتبطة بهؤلاء المستخدمين (كركاب أو كباتن)
22       const mockCaptains = await Captain.find({ userId: { $in: mockUserIds } });
23       const mockCaptainIds = mockCaptains.map(c => c._id);
24       
25       await Trip.deleteMany({
26         $or: [
27           { passengerId: { $in: mockUserIds } },
28           { captainId: { $in: mockCaptainIds } }
29         ]
30       });
31       
32       // حذف الكباتن
33       await Captain.deleteMany({ userId: { $in: mockUserIds } });
34       
35       // حذف المستخدمين
36       await User.deleteMany({ _id: { $in: mockUserIds } });
37       
38       console.log(`🧹 Cleaned up ${mockUserIds.length} mock users and their data.`);
39     }
40 
41     let createdUsers = 0;
42     let createdCaptains = 0;
43     let createdTrips = 0;
44 
45     // 2️⃣ إنشاء الكباتن
46     const captainIds = [];
47     for (let i = 0; i < MOCK_CAPTAINS_COUNT; i++) {
48       const email = `mockcaptain${i}@${MOCK_DOMAIN}`;
49       
50       const user = await User.create({
51         name: `كابتن تجريبي ${i + 1}`,
52         email,
53         role: 'captain',
54         googleId: `mock-google-${i}-${Date.now()}`,
55       });
56       createdUsers++;
57 
58       const vehicleTypes = ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'];
59       const colors = ['أبيض', 'أسود', 'فضي', 'أحمر', 'أزرق'];
60       const models = ['تويوتا كورولا', 'هيونداي i10', 'كيا سبورتاج', 'شيفروليه أوبترا'];
61       const plates = ['أ ب ج', 'د هـ و', 'ز ح ط', 'ي ك ل'];
62 
63       const baseLat = 30.1385919;
64       const baseLng = 31.7839276;
65       const randomLat = baseLat + (Math.random() - 0.5) * 0.1;
66       const randomLng = baseLng + (Math.random() - 0.5) * 0.1;
67 
68       const captain = await Captain.create({
69         userId: user._id,
70         vehicleType: vehicleTypes[i % vehicleTypes.length],
71         vehicleModel: models[i % models.length],
72         plateNumber: `${plates[i % plates.length]} ${i + 100}`,
73         status: 'approved',
74         isOnline: true,
75         location: {
76           type: 'Point',
77           coordinates: [randomLng, randomLat]
78         },
79         rating: 4.0 + Math.random() * 1.0,
80         totalTrips: Math.floor(Math.random() * 500),
81         documents: {
82           nationalId: 'mock-url',
83           driverLicense: 'mock-url',
84           vehicleLicense: 'mock-url'
85         }
86       });
87       createdCaptains++;
88       captainIds.push(captain._id);
89     }
90 
91     // 3️⃣ إنشاء راكب تجريبي
92     const passengerEmail = `passenger@${MOCK_DOMAIN}`;
93     let passenger = await User.findOne({ email: passengerEmail });
94     if (!passenger) {
95       passenger = await User.create({
96         name: 'راكب تجريبي',
97         email: passengerEmail,
98         role: 'passenger',
99         googleId: `mock-passenger-${Date.now()}`,
100       });
101       createdUsers++;
102     }
103 
104     // 4️⃣ إنشاء رحلات تجريبية
105     const statuses = ['pending', 'active', 'ended', 'cancelled'];
106     for (let i = 0; i < MOCK_TRIPS_COUNT; i++) {
107       const randomCaptainId = captainIds[Math.floor(Math.random() * captainIds.length)];
108       const captain = await Captain.findById(randomCaptainId);
109       const status = statuses[i % statuses.length];
110       
111       const startLat = 30.0444 + (Math.random() - 0.5) * 0.05;
112       const startLng = 31.2357 + (Math.random() - 0.5) * 0.05;
113       const distance = status === 'ended' ? (1 + Math.random() * 10) : 0;
114       
115       const tripData = {
116         passengerId: passenger._id,
117         captainId: captain._id,
118         status: status,
119         startLocation: {
120           lat: startLat,
121           lng: startLng,
122           address: `عنوان وهمي ${i+1}`
123         },
124         distanceKm: distance,
125         totalFare: distance > 0 ? Math.round(10 + (distance - 1) * 7) : 0,
126         passengerConfirmedStart: status === 'active' || status === 'ended',
127         captainConfirmedStart: status === 'active' || status === 'ended',
128         startedAt: status === 'active' || status === 'ended' ? new Date(Date.now() - 1000 * 60 * 5) : undefined,
129         endedAt: status === 'ended' ? new Date() : undefined,
130         endRequestedBy: status === 'active' ? (Math.random() > 0.5 ? 'passenger' : 'captain') : undefined,
131       };
132       
133       await Trip.create(tripData);
134       createdTrips++;
135     }
136 
137     sendSuccess(res, {
138       message: `Seeding completed. Created ${createdUsers} users, ${createdCaptains} captains, and ${createdTrips} trips.`,
139       summary: {
140         captains: MOCK_CAPTAINS_COUNT,
141         trips: MOCK_TRIPS_COUNT
142       }
143     });
144   } catch (error) {
145     next(error);
146   }
147 };
148 
149 module.exports = { runSeeder };
```

## File: `src\modules\seed\seed.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./seed.controller');
4 
5 // يمكن الوصول بدون مصادقة للسهولة في التطوير، أو يمكن إضافة middleware إذا أردت
6 router.get('/', controller.runSeeder);
7 
8 module.exports = router;
```

## File: `src\modules\trip\trip.controller.js`

```javascript
1 const tripService = require('./trip.service');
2 const { sendSuccess, sendError } = require('../../utils/response.util');
3 
4 const wrap = (fn) => async (req, res, next) => {
5   try { await fn(req, res, next); } catch (err) { next(err); }
6 };
7 
8 const searchTrip = wrap(async (req, res) => {
9   const trip = await tripService.searchTrip(req.user.id, req.body.startLocation, req.body.endLocation, req.body.carType);
10   sendSuccess(res, {
11     tripId:                trip._id.toString(),
12     status:                trip.status,
13     distanceKm:            trip.distanceKm,
14     totalFare:             trip.totalFare,
15     firstKmFare:           trip.firstKmFare,
16     extraKmFare:           trip.extraKmFare,
17     estimatedDurationMins: trip.estimatedDurationMins,
18     polyRoute:             trip.polyRoute,
19     pickupToDestinationPolyline: trip.pickupToDestinationPolyline,
20     currentPolyline:       trip.currentPolyline,
21   }, 'Searching for captain', 202);
22 });
23 
24 const createTrip = wrap(async (req, res) => {
25   const trip = await tripService.createTrip(req.user.id, req.body.captainId, req.body.startLocation, req.body.endLocation, req.body.carType);
26   sendSuccess(res, trip, 'Trip created', 201);
27 });
28 
29 const acceptTrip = wrap(async (req, res) => {
30   const trip = await tripService.acceptTrip(req.params.id, req.user.id);
31   sendSuccess(res, trip, 'Trip accepted');
32 });
33 
34 const markOnTheWay = wrap(async (req, res) => {
35   const { captainLat, captainLng } = req.body ?? {};
36   const trip = await tripService.markOnTheWay(req.params.id, req.user.id, captainLat, captainLng);
37   sendSuccess(res, trip);
38 });
39 
40 const markArrived = wrap(async (req, res) => {
41   const trip = await tripService.markArrived(req.params.id, req.user.id);
42   sendSuccess(res, trip);
43 });
44 
45 const startTrip = wrap(async (req, res) => {
46   const trip = await tripService.startTrip(req.params.id, req.user.id);
47   sendSuccess(res, trip);
48 });
49 
50 const endTrip = wrap(async (req, res) => {
51   const trip = await tripService.endTrip(req.params.id, req.user.id, req.body.distanceKm);
52   sendSuccess(res, trip);
53 });
54 
55 const cancelTrip = wrap(async (req, res) => {
56   const trip = await tripService.cancelTrip(req.params.id, req.user.id, req.user.role, req.body.reason);
57   sendSuccess(res, trip, 'Trip cancelled');
58 });
59 
60 // Cancels the caller's current active trip without requiring a tripId in the URL.
61 // Handles the case where the client sends POST /trips/cancel (no :id segment).
62 const cancelCurrentTrip = wrap(async (req, res) => {
63   const trip = await tripService.cancelCurrentTrip(req.user.id, req.user.role, req.body.reason);
64   sendSuccess(res, trip, 'Trip cancelled');
65 });
66 
67 const getCurrentTrip = wrap(async (req, res) => {
68   const trip = await tripService.getCurrentTrip(req.user.id, req.user.role);
69   sendSuccess(res, trip);
70 });
71 
72 const getTrip = wrap(async (req, res) => {
73   const trip = await tripService.getTrip(req.params.id);
74   if (!trip) return sendError(res, 'Trip not found', 404);
75   sendSuccess(res, trip);
76 });
77 
78 const estimateFare = wrap(async (req, res) => {
79   const { startLocation, endLocation, carType } = req.body;
80   const result = await tripService.estimateFare(
81     startLocation.lat, startLocation.lng,
82     endLocation.lat,   endLocation.lng,
83     carType,
84   );
85   sendSuccess(res, result);
86 });
87 
88 const rateCaptain = wrap(async (req, res) => {
89   const trip = await tripService.rateCaptain(req.params.id, req.user.id, req.body);
90   sendSuccess(res, trip, 'Rating submitted');
91 });
92 
93 const ratePassenger = wrap(async (req, res) => {
94   const trip = await tripService.ratePassenger(req.params.id, req.user.id, req.body);
95   sendSuccess(res, trip, 'Rating submitted');
96 });
97 
98 module.exports = {
99   searchTrip,
100   createTrip,
101   acceptTrip,
102   markOnTheWay,
103   markArrived,
104   startTrip,
105   endTrip,
106   cancelTrip,
107   cancelCurrentTrip,
108   rateCaptain,
109   ratePassenger,
110   getCurrentTrip,
111   getTrip,
112   estimateFare,
113 };
```

## File: `src\modules\trip\trip.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const VALID_STATUSES = [
4   'searching',
5   'pending_captain',
6   'accepted',
7   'on_the_way',
8   'onTheWay',          // legacy alias — kept for backward compatibility
9   'arrived',
10   'started',
11   'in_progress',
12   'completed',
13   'ended',             // legacy alias — kept for backward compatibility
14   'cancelled_by_passenger',
15   'cancelled_by_captain',
16   'cancelled_by_system',
17   'cancelled',         // legacy alias — kept for backward compatibility
18   'no_captain_found',
19 ];
20 
21 const TRANSITIONS = {
22   searching:              ['accepted', 'pending_captain', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain', 'cancelled_by_system', 'no_captain_found'],
23   pending_captain:        ['accepted', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain', 'cancelled_by_system', 'no_captain_found'],
24   accepted:               ['on_the_way', 'onTheWay', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
25   on_the_way:             ['arrived', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
26   onTheWay:               ['arrived', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
27   arrived:                ['started', 'in_progress', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
28   started:                ['completed', 'ended', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
29   in_progress:            ['completed', 'ended', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
30   completed:              [],
31   ended:                  [],
32   cancelled:              [],
33   cancelled_by_passenger: [],
34   cancelled_by_captain:   [],
35   cancelled_by_system:    [],
36   no_captain_found:       [],
37 };
38 
39 const tripSchema = new mongoose.Schema(
40   {
41     passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
42     captainId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', default: null },
43     carType:     { type: String, enum: ['car', 'motorcycle', 'tukutuk', 'altTukutuk'], required: true },
44     status: {
45       type: String,
46       enum: VALID_STATUSES,
47       default: 'searching',
48     },
49 
50     // ── Locations ──────────────────────────────────────────────────────
51     startLocation: {
52       lat:     { type: Number, required: true },
53       lng:     { type: Number, required: true },
54       address: { type: String },
55     },
56     endLocation: {
57       lat:     Number,
58       lng:     Number,
59       address: String,
60     },
61     pickupLocation: {
62       lat:       { type: Number },
63       lng:       { type: Number },
64       address:   { type: String, default: '' },
65       arrivedAt: { type: Date },
66     },
67     dropoffLocation: {
68       lat:       { type: Number },
69       lng:       { type: Number },
70       address:   { type: String, default: '' },
71       arrivedAt: { type: Date },
72     },
73 
74     // ── Live location snapshots ─────────────────────────────────────────
75     captainLastLocation: {
76       lat:       { type: Number, default: null },
77       lng:       { type: Number, default: null },
78       heading:   { type: Number, default: 0 },
79       speed:     { type: Number, default: 0 },
80       updatedAt: { type: Date, default: null },
81     },
82     passengerLastLocation: {
83       lat:       { type: Number, default: null },
84       lng:       { type: Number, default: null },
85       updatedAt: { type: Date, default: null },
86     },
87 
88     // ── Polylines ───────────────────────────────────────────────────────
89     polyRoute:                    { type: String, default: '' },  // legacy field — kept for compatibility
90     pickupToDestinationPolyline:  { type: String, default: '' },  // full passenger route
91     captainToPickupPolyline:      { type: String, default: '' },  // captain→pickup route
92     currentPolyline:              { type: String, default: '' },  // active display polyline
93 
94     // ── Fare & distance ─────────────────────────────────────────────────
95     distanceKm:     { type: Number, default: 0 },
96     totalFare:      { type: Number, default: 0 },
97     firstKmFare:    { type: Number },
98     extraKmFare:    { type: Number },
99     routeDistanceKm: { type: Number, default: 0 },
100     gpsDistanceKm:   { type: Number, default: 0 },
101 
102     // ── Trip stats ──────────────────────────────────────────────────────
103     estimatedDurationMins: { type: Number, default: 0 },
104     waitingTimeSeconds:    { type: Number, default: 0 },
105     travelTimeSeconds:     { type: Number, default: 0 },
106 
107     // ── Cancellation ────────────────────────────────────────────────────
108     cancellationReason: { type: String, default: null },
109     cancelledAt:        { type: Date },
110     cancelledBy:        { type: String, enum: ['passenger', 'captain', 'system'] },
111 
112     // ── Ratings ─────────────────────────────────────────────────────────
113     passengerRating:     { type: Number, min: 1, max: 5 },
114     passengerRatingTags: [String],
115     captainRating:       { type: Number, min: 1, max: 5 },
116     captainRatingTags:   [String],
117 
118     // ── State-change timestamps ─────────────────────────────────────────
119     searchStartedAt:    { type: Date },
120     captainNotifiedAt:  { type: Date },
121     captainRespondedAt: { type: Date },
122     captainAcceptedAt:  { type: Date },
123     captainOnTheWayAt:  { type: Date },
124     captainArrivedAt:   { type: Date },
125     tripStartedAt:      { type: Date },
126     tripEndedAt:        { type: Date },
127 
128     // Legacy timestamp aliases
129     acceptedAt:  Date,
130     onTheWayAt:  Date,
131     arrivedAt:   Date,
132     startedAt:   Date,
133     endedAt:     Date,
134   },
135   { timestamps: true }
136 );
137 
138 tripSchema.methods.canTransitionTo = function (newStatus) {
139   return (TRANSITIONS[this.status] ?? []).includes(newStatus);
140 };
141 
142 module.exports = mongoose.model('Trip', tripSchema);
```

## File: `src\modules\trip\trip.repository.js`

```javascript
1 const Trip = require('./trip.model');
2 
3 const _populatedQuery = (query) =>
4   query
5     .populate('passengerId', 'name avatar phone')
6     .populate({ path: 'captainId', populate: { path: 'userId', select: 'name avatar phone' } });
7 
8 const findById = (id) => Trip.findById(id);
9 
10 const findByIdPopulated = (id) => _populatedQuery(Trip.findById(id));
11 
12 const findOne = (filter, options = {}) => {
13   let q = Trip.findOne(filter);
14   if (options.sort) q = q.sort(options.sort);
15   return q;
16 };
17 
18 const findOnePopulated = (filter) => _populatedQuery(Trip.findOne(filter));
19 
20 const create = (data) => Trip.create(data);
21 
22 const saveDoc = (doc) => doc.save();
23 
24 // Atomic claim: only succeeds if trip is still searchable (prevents race conditions)
25 const atomicAccept = (tripId, captainId) =>
26   Trip.findOneAndUpdate(
27     { _id: tripId, status: { $in: ['searching', 'pending_captain'] } },
28     { $set: { captainId, status: 'accepted', acceptedAt: new Date(), captainAcceptedAt: new Date() } },
29     { new: true },
30   );
31 
32 const findByIdAndUpdate = (id, update) => Trip.findByIdAndUpdate(id, update, { new: false });
33 
34 module.exports = { findById, findByIdPopulated, findOne, findOnePopulated, findByIdAndUpdate, create, saveDoc, atomicAccept };
```

## File: `src\modules\trip\trip.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./trip.controller');
4 const authMiddleware = require('../../middlewares/auth.middleware');
5 const { requireRole } = require('../../middlewares/role.middleware');
6 const { validate } = require('../../middlewares/validate');
7 const { searchTripSchema, createTripSchema, endTripSchema, cancelTripSchema, estimateFareSchema } = require('./trip.validation');
8 
9 // ── Any authenticated user ────────────────────────────────────────────
10 // Literal-path routes MUST come before /:id routes to prevent Express
11 // matching e.g. "cancel" or "current" as an :id parameter value.
12 router.get('/current',  authMiddleware, controller.getCurrentTrip);
13 router.post('/cancel',  authMiddleware, validate(cancelTripSchema), controller.cancelCurrentTrip);
14 
15 router.get('/:id',          authMiddleware, controller.getTrip);
16 router.post('/:id/cancel',  authMiddleware, validate(cancelTripSchema), controller.cancelTrip);
17 
18 // ── Passenger only ────────────────────────────────────────────────────
19 router.post('/estimate', authMiddleware, requireRole('passenger'), validate(estimateFareSchema), controller.estimateFare);
20 router.post('/search', authMiddleware, requireRole('passenger'), validate(searchTripSchema), controller.searchTrip);
21 router.post('/', authMiddleware, requireRole('passenger'), validate(createTripSchema), controller.createTrip);
22 
23 // ── Passenger only (rating) ───────────────────────────────────────────
24 router.post('/:id/rate-captain', authMiddleware, requireRole('passenger'), controller.rateCaptain);
25 
26 // ── Captain only ──────────────────────────────────────────────────────
27 router.post('/:id/accept',        authMiddleware, requireRole('captain'), controller.acceptTrip);
28 router.post('/:id/on-the-way',    authMiddleware, requireRole('captain'), controller.markOnTheWay);
29 router.post('/:id/arrived',       authMiddleware, requireRole('captain'), controller.markArrived);
30 router.post('/:id/start',         authMiddleware, requireRole('captain'), controller.startTrip);
31 router.post('/:id/end',           authMiddleware, requireRole('captain'), validate(endTripSchema), controller.endTrip);
32 router.post('/:id/rate-passenger',authMiddleware, requireRole('captain'), controller.ratePassenger);
33 
34 module.exports = router;
```

## File: `src\modules\trip\trip.service.js`

```javascript
1 const tripRepo = require('./trip.repository');
2 const captainRepo = require('../captain/captain.repository');
3 const userRepo = require('../user/user.repository');
4 const { calcFareBreakdown, getFareConfig } = require('../../utils/fare.util');
5 const { getPolyline } = require('../routes/routes.service');
6 const { haversineDistance } = require('../../utils/distance.util');
7 const { emitToUser, emitToTrip } = require('../../socket');
8 const notificationService = require('../notification/notification.service');
9 const logger = require('../../config/logger');
10 
11 const ACTIVE_STATUSES = [
12   'searching', 'pending_captain',
13   'accepted',
14   'on_the_way', 'onTheWay',
15   'arrived',
16   'started', 'in_progress',
17 ];
18 
19 const DISPATCH_TIMEOUT_MS = 120000; // 2 minutes per captain
20 const MAX_DISPATCH_ATTEMPTS = 5;   // max captains before giving up
21 const EXPAND_RADIUS_KM = 10;       // expanded radius after initial failure
22 
23 // In-memory registry of pending dispatch promises
24 // captainUserId → { resolve, reject, timer }
25 const _pending = new Map();
26 
27 // ── Passenger: initiate trip search (dispatch loop) ──────────────────
28 const searchTrip = async (passengerId, startLocation, endLocation, carType) => {
29   // Idempotency: never create a duplicate active trip for the same passenger.
30   // If one already exists, return it so the client can join its room.
31   const existing = await tripRepo.findOne({ passengerId, status: { $in: ACTIVE_STATUSES } });
32   if (existing) {
33     logger.warn(`[searchTrip] Passenger ${passengerId} already has active trip ${existing._id} — returning existing`);
34     return existing;
35   }
36 
37   // Retry path: reuse the most recent no_captain_found trip instead of creating a new document.
38   // This keeps a single trip document per passenger journey across retries.
39   const failedTrip = await tripRepo.findOne(
40     { passengerId, status: 'no_captain_found' },
41     { sort: { createdAt: -1 } }
42   );
43   if (failedTrip) {
44     logger.info(`[searchTrip] Retrying dispatch on existing trip ${failedTrip._id} for passenger ${passengerId}`);
45     failedTrip.status = 'searching';
46     failedTrip.searchStartedAt = new Date();
47     failedTrip.cancellationReason = undefined;
48     failedTrip.cancelledBy = undefined;
49     failedTrip.cancelledAt = undefined;
50     await tripRepo.saveDoc(failedTrip);
51 
52     const passenger = await userRepo.findById(passengerId);
53     const captains = await captainRepo.findNearby(startLocation.lng, startLocation.lat, 5, carType);
54     _dispatchLoop(failedTrip, captains, passenger).catch((err) =>
55       logger.error('[Trip Dispatch] unhandled error on retry', err)
56     );
57     return failedTrip;
58   }
59 
60   const passenger = await userRepo.findById(passengerId);
61   const { firstKmFare, extraKmFare } = getFareConfig(carType);
62 
63   let polyRoute = '';
64   let distanceKm = 0;
65   let totalFare = 0;
66   let routeDistanceKm = 0;
67   let estimatedDurationMins = 0;
68 
69   if (endLocation?.lat && endLocation?.lng) {
70     try {
71       const route = await getPolyline(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng);
72       polyRoute = route.encodedPolyline;
73       distanceKm = route.distanceKm;
74       routeDistanceKm = route.distanceKm;
75       estimatedDurationMins = route.durationMins ?? 0;
76       totalFare = calcFareBreakdown(distanceKm, carType).total;
77     } catch (err) {
78       logger.warn('[searchTrip] Route polyline failed:', err.message);
79     }
80   }
81 
82   const trip = await tripRepo.create({
83     passengerId, carType,
84     startLocation,
85     endLocation: endLocation || undefined,
86     pickupLocation: {
87       lat: startLocation.lat,
88       lng: startLocation.lng,
89       address: startLocation.address || '',
90     },
91     dropoffLocation: endLocation?.lat ? {
92       lat: endLocation.lat,
93       lng: endLocation.lng,
94       address: endLocation.address || '',
95     } : undefined,
96     status: 'searching',
97     searchStartedAt: new Date(),
98     polyRoute,
99     pickupToDestinationPolyline: polyRoute,
100     currentPolyline: polyRoute,
101     distanceKm, totalFare, firstKmFare, extraKmFare, routeDistanceKm,
102     estimatedDurationMins,
103   });
104 
105   const captains = await captainRepo.findNearby(startLocation.lng, startLocation.lat, 5, carType);
106 
107   _dispatchLoop(trip, captains, passenger).catch((err) =>
108     logger.error('[Trip Dispatch] unhandled error', err)
109   );
110 
111   return trip;
112 };
113 
114 async function _dispatchLoop(trip, captains, passenger) {
115   const toDispatch = captains.slice(0, MAX_DISPATCH_ATTEMPTS);
116 
117   console.log(`🔄 [DISPATCH] Starting dispatch loop for trip ${trip._id}`);
118   console.log(`🔄 [DISPATCH] Will try ${toDispatch.length} captains initially`);
119 
120   for (const captain of toDispatch) {
121     const freshTrip = await tripRepo.findById(trip._id);
122     if (!freshTrip || freshTrip.status !== 'searching') {
123       console.log(`🔄 [DISPATCH] Trip ${trip._id} no longer searching, stopping dispatch`);
124       return;
125     }
126 
127     const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
128     if (!captainUserId) {
129       console.log(`🔄 [DISPATCH] Captain ${captain._id} has no userId, skipping`);
130       continue;
131     }
132 
133     console.log(`🔄 [DISPATCH] Sending request to captain ${captainUserId}`);
134 
135     const routeDist = trip.routeDistanceKm || trip.distanceKm || 0;
136     emitToUser(captainUserId, 'trip:request:incoming', {
137       tripId: trip._id.toString(),
138       passenger: {
139         id: passenger._id.toString(),
140         name: passenger.name,
141         avatar: passenger.avatar,
142         phone: passenger.phone,
143       },
144       startLocation: trip.startLocation,
145       endLocation: trip.endLocation,
146       carType: trip.carType,
147       polyRoute: trip.polyRoute,
148       distanceKm: routeDist,       // pickup→destination route distance
149       routeDistanceKm: routeDist,
150       totalFare: trip.totalFare,
151       firstKmFare: trip.firstKmFare,
152       extraKmFare: trip.extraKmFare,
153     });
154 
155     notificationService.notify(captainUserId, {
156       title: 'طلب رحلة جديد 🚖',
157       body: `راكب بالقرب منك يطلب رحلة`,
158       data: { type: 'trip:request', tripId: trip._id.toString() },
159     }).catch(() => { });
160 
161     const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
162     if (!result?.accepted) {
163       console.log(`🔄 [DISPATCH] Captain ${captainUserId} ${result ? 'rejected' : 'timed out'}`);
164       continue;
165     }
166 
167     // Attempt atomic lock — prevents race conditions if two captains accept simultaneously
168     const locked = await tripRepo.atomicAccept(trip._id, captain._id);
169     if (!locked) {
170       console.log(`🔄 [DISPATCH] Atomic accept failed for ${captain._id}, another captain was faster`);
171       continue;
172     }
173 
174     // Record when captain responded (accepted)
175     tripRepo.findByIdAndUpdate(trip._id, { $set: { captainRespondedAt: new Date() } }).catch(() => {});
176 
177     await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
178 
179     const captainPayload = {
180       captainId: captain._id.toString(),
181       name: captain.userId?.name,
182       avatar: captain.userId?.avatar,
183       phone: captain.userId?.phone,
184       vehicleType: captain.vehicleType,
185       vehicleModel: captain.vehicleModel,
186       vehicleColor: captain.vehicleColor,
187       plateNumber: captain.plateNumber,
188       rating: captain.rating ?? 0,
189     };
190 
191     emitToUser(passenger._id.toString(), 'trip:accepted', {
192       tripId: trip._id.toString(),
193       captain: captainPayload,
194     });
195 
196     // Notify captain so their IncomingRequestScreen can transition to NavigationToPickupScreen
197     emitToUser(captainUserId, 'trip:accepted', { tripId: trip._id.toString(), captain: null });
198 
199     notificationService.notify(passenger._id, {
200       title: 'تم قبول رحلتك ✓',
201       body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
202       data: { type: 'trip:accepted', tripId: trip._id.toString() },
203     }).catch(() => { });
204 
205     // Compute and broadcast initial captain→pickup route asynchronously
206     _emitInitialRoute(trip._id.toString(), captain, trip.startLocation).catch((err) =>
207       logger.warn('[dispatch] Initial route failed:', err.message)
208     );
209 
210     console.log(`🔄 [DISPATCH] ✅ Trip ${trip._id} accepted by captain ${captainUserId}`);
211     return;
212   }
213 
214   // Initial radius failed — try expanded radius (once, up to 3 more captains)
215   console.log(`🔄 [DISPATCH] Initial dispatch failed, trying expanded radius (${EXPAND_RADIUS_KM}km)`);
216 
217   const expanded = await captainRepo.findNearby(
218     trip.startLocation.lng, trip.startLocation.lat, EXPAND_RADIUS_KM, trip.carType
219   );
220   const seenIds = new Set(toDispatch.map((c) => c._id.toString()));
221   const newCaptains = expanded.filter((c) => !seenIds.has(c._id.toString())).slice(0, 3);
222 
223   console.log(`🔄 [DISPATCH] Found ${newCaptains.length} new captains in expanded radius`);
224 
225   for (const captain of newCaptains) {
226     const freshTrip = await tripRepo.findById(trip._id);
227     if (!freshTrip || freshTrip.status !== 'searching') return;
228 
229     const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
230     if (!captainUserId) continue;
231 
232     console.log(`🔄 [DISPATCH] Sending request (expanded) to captain ${captainUserId}`);
233 
234     const routeDistExp = trip.routeDistanceKm || trip.distanceKm || 0;
235     emitToUser(captainUserId, 'trip:request:incoming', {
236       tripId: trip._id.toString(),
237       passenger: {
238         id: passenger._id.toString(),
239         name: passenger.name,
240         avatar: passenger.avatar,
241         phone: passenger.phone,
242       },
243       startLocation: trip.startLocation,
244       endLocation: trip.endLocation,
245       carType: trip.carType,
246       polyRoute: trip.polyRoute,
247       distanceKm: routeDistExp,       // pickup→destination route distance
248       routeDistanceKm: routeDistExp,
249       totalFare: trip.totalFare,
250       firstKmFare: trip.firstKmFare,
251       extraKmFare: trip.extraKmFare,
252     });
253 
254     notificationService.notify(captainUserId, {
255       title: 'طلب رحلة جديد 🚖',
256       body: `راكب بالقرب منك يطلب رحلة`,
257       data: { type: 'trip:request', tripId: trip._id.toString() },
258     }).catch(() => { });
259 
260     const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
261     if (!result?.accepted) continue;
262 
263     const locked = await tripRepo.atomicAccept(trip._id, captain._id);
264     if (!locked) continue;
265 
266     tripRepo.findByIdAndUpdate(trip._id, { $set: { captainRespondedAt: new Date() } }).catch(() => {});
267 
268     await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
269 
270     const captainPayloadExpanded = {
271       captainId: captain._id.toString(),
272       name: captain.userId?.name,
273       avatar: captain.userId?.avatar,
274       phone: captain.userId?.phone,
275       vehicleType: captain.vehicleType,
276       vehicleModel: captain.vehicleModel,
277       vehicleColor: captain.vehicleColor,
278       plateNumber: captain.plateNumber,
279       rating: captain.rating ?? 0,
280     };
281 
282     emitToUser(passenger._id.toString(), 'trip:accepted', {
283       tripId: trip._id.toString(),
284       captain: captainPayloadExpanded,
285     });
286 
287     // Notify captain so their IncomingRequestScreen can transition to NavigationToPickupScreen
288     emitToUser(captainUserId, 'trip:accepted', { tripId: trip._id.toString(), captain: null });
289 
290     notificationService.notify(passenger._id.toString(), {
291       title: 'تم قبول رحلتك ✓',
292       body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
293       data: { type: 'trip:accepted', tripId: trip._id.toString() },
294     }).catch(() => { });
295 
296     // Compute and broadcast initial captain→pickup route asynchronously
297     _emitInitialRoute(trip._id.toString(), captain, trip.startLocation).catch((err) =>
298       logger.warn('[dispatch] Initial route failed (expanded):', err.message)
299     );
300 
301     console.log(`🔄 [DISPATCH] ✅ Trip ${trip._id} accepted (expanded radius) by ${captainUserId}`);
302     return;
303   }
304 
305   // No captain found — cancel trip and notify passenger
306   console.log(`🔄 [DISPATCH] ❌ No captain found for trip ${trip._id}`);
307 
308   const finalTrip = await tripRepo.findById(trip._id);
309   if (finalTrip?.status === 'searching' || finalTrip?.status === 'pending_captain') {
310     finalTrip.status = 'no_captain_found';
311     finalTrip.cancellationReason = 'no_captain_found';
312     finalTrip.cancelledBy = 'system';
313     finalTrip.cancelledAt = new Date();
314     await tripRepo.saveDoc(finalTrip);
315   }
316 
317   emitToUser(passenger._id.toString(), 'trip:no_captain_found', {
318     tripId: trip._id.toString()
319   });
320 
321   logger.info(`[Trip Dispatch] ${trip._id} — no captain found`);
322 }
323 
324 
325 // Compute captain→pickup route and push it to the trip room.
326 // Called async after acceptance so it doesn't block the dispatch loop.
327 async function _emitInitialRoute(tripId, captain, startLocation) {
328   const captainCoords = captain.location?.coordinates; // GeoJSON [lng, lat]
329   if (!captainCoords || captainCoords.length < 2 || !startLocation?.lat) return;
330   const cLat = captainCoords[1];
331   const cLng = captainCoords[0];
332   const route = await getPolyline(cLat, cLng, startLocation.lat, startLocation.lng);
333   if (!route?.encodedPolyline) return;
334   const trip = await tripRepo.findById(tripId);
335   if (!trip || !['accepted', 'on_the_way', 'onTheWay'].includes(trip.status)) return;
336   trip.polyRoute = route.encodedPolyline;
337   trip.captainToPickupPolyline = route.encodedPolyline;
338   trip.currentPolyline = route.encodedPolyline;
339   trip.captainNotifiedAt = trip.captainNotifiedAt || new Date();
340   await tripRepo.saveDoc(trip);
341   emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: route.encodedPolyline });
342   logger.info(`[Trip] initial route emitted for trip ${tripId}`);
343 }
344 
345 function _awaitCaptainResponse(captainUserId) {
346   return new Promise((resolve, reject) => {
347     const timer = setTimeout(() => {
348       _pending.delete(captainUserId);
349       reject(new Error('TIMEOUT'));
350     }, DISPATCH_TIMEOUT_MS);
351     _pending.set(captainUserId, { resolve, reject, timer });
352   });
353 }
354 
355 // Called from trip.socket.js when captain emits trip:request:accept
356 const captainAccepted = (captainUserId) => {
357   const entry = _pending.get(captainUserId);
358   if (!entry) return false;
359   clearTimeout(entry.timer);
360   _pending.delete(captainUserId);
361   entry.resolve({ accepted: true });
362   return true;
363 };
364 
365 // Called from trip.socket.js when captain emits trip:request:reject
366 const captainRejected = (captainUserId) => {
367   const entry = _pending.get(captainUserId);
368   if (!entry) return false;
369   clearTimeout(entry.timer);
370   _pending.delete(captainUserId);
371   entry.resolve({ accepted: false });
372   return true;
373 };
374 
375 // ── Passenger: create trip (direct — used for map-tap flow) ──────────
376 const createTrip = async (passengerId, captainId, startLocation, endLocation, carType = 'car') => {
377   // Prevent duplicate active trips for the same passenger.
378   const existing = await tripRepo.findOne({ passengerId, status: { $in: ACTIVE_STATUSES } });
379   if (existing) throw Object.assign(new Error('You already have an active trip'), { status: 409 });
380 
381   const captain = await captainRepo.findById(captainId);
382   if (!captain || captain.status !== 'approved') throw new Error('Captain not available');
383   if (!captain.isOnline) throw new Error('Captain is offline');
384   if (captain.isOnTrip) throw new Error('Captain is already on a trip');
385 
386   const resolvedCarType = carType || captain.vehicleType;
387   const { firstKmFare, extraKmFare } = getFareConfig(resolvedCarType);
388 
389   let polyRoute = '';
390   let distanceKm = 0;
391   let totalFare = 0;
392 
393   if (endLocation?.lat && endLocation?.lng) {
394     try {
395       const route = await getPolyline(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng);
396       polyRoute = route.encodedPolyline;
397       distanceKm = route.distanceKm;
398       totalFare = calcFareBreakdown(distanceKm, resolvedCarType).total;
399     } catch (err) {
400       logger.warn('[createTrip] Route polyline failed:', err.message);
401     }
402   }
403 
404   const trip = await tripRepo.create({
405     passengerId, captainId: captain._id, carType: resolvedCarType,
406     startLocation,
407     endLocation: endLocation || undefined,
408     pickupLocation: {
409       lat: startLocation.lat,
410       lng: startLocation.lng,
411       address: startLocation.address || '',
412     },
413     dropoffLocation: endLocation?.lat ? {
414       lat: endLocation.lat,
415       lng: endLocation.lng,
416       address: endLocation.address || '',
417     } : undefined,
418     status: 'accepted',
419     searchStartedAt: new Date(),
420     polyRoute,
421     pickupToDestinationPolyline: polyRoute,
422     currentPolyline: polyRoute,
423     distanceKm, totalFare, firstKmFare, extraKmFare,
424     routeDistanceKm: distanceKm,
425   });
426 
427   // Resolve passenger name for the notification payload
428   const passenger = await userRepo.findById(passengerId);
429 
430   // Notify captain — they are identified by their User._id on the socket
431   emitToUser(captain.userId.toString(), 'trip:request:incoming', {
432     tripId: trip._id.toString(),
433     passenger: { id: passengerId.toString(), name: passenger?.name, avatar: passenger?.avatar, phone: passenger?.phone },
434     startLocation,
435     endLocation: trip.endLocation,
436     carType: trip.carType,
437     polyRoute: trip.polyRoute,
438     distanceKm: trip.distanceKm,
439     totalFare: trip.totalFare,
440     firstKmFare: trip.firstKmFare,
441     extraKmFare: trip.extraKmFare,
442   });
443 
444   notificationService.notify(captain.userId.toString(), {
445     title: 'طلب رحلة جديد 🚖',
446     body: `راكب بالقرب منك يطلب رحلة`,
447     data: { type: 'trip:request', tripId: trip._id.toString() },
448   }).catch(() => { });
449 
450   logger.info(`[Trip] created ${trip._id} | passenger=${passengerId} | captain=${captainId}`);
451   return trip;
452 };
453 
454 // ── Captain: accept ───────────────────────────────────────────────────
455 const acceptTrip = async (tripId, captainUserId) => {
456   const trip = await tripRepo.findById(tripId);
457   if (!trip) throw new Error('Trip not found');
458 
459   const captain = await captainRepo.findByUserIdPopulated(captainUserId);
460   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
461   if (!trip.canTransitionTo('accepted')) throw new Error(`Cannot accept from status: ${trip.status}`);
462 
463   const now = new Date();
464   trip.status = 'accepted';
465   trip.acceptedAt = now;
466   trip.captainAcceptedAt = now;
467   trip.captainRespondedAt = now;
468   await tripRepo.saveDoc(trip);
469 
470   await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
471 
472   emitToUser(trip.passengerId.toString(), 'trip:accepted', {
473     tripId: trip._id.toString(),
474     captain: {
475       captainId: captain._id.toString(),
476       name: captain.userId?.name,
477       avatar: captain.userId?.avatar,
478       phone: captain.userId?.phone,
479       vehicleType: captain.vehicleType,
480       vehicleModel: captain.vehicleModel,
481       vehicleColor: captain.vehicleColor,
482       plateNumber: captain.plateNumber,
483       rating: captain.rating,
484     },
485   });
486 
487   notificationService.notify(trip.passengerId, {
488     title: 'تم قبول رحلتك ✓',
489     body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
490     data: { type: 'trip:accepted', tripId: trip._id.toString() },
491   }).catch(() => { });
492 
493   logger.info(`[Trip] ${tripId} accepted by ${captainUserId}`);
494   return tripRepo.findByIdPopulated(tripId);
495 };
496 
497 // ── Captain: status transitions (onTheWay / arrived / started) ────────
498 const _captainTransition = async (tripId, captainUserId, newStatus) => {
499   const trip = await tripRepo.findById(tripId);
500   if (!trip) throw new Error('Trip not found');
501 
502   const captain = await captainRepo.findByUserId(captainUserId);
503   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
504   if (trip.status === newStatus) return trip; // already in target state — idempotent
505   if (!trip.canTransitionTo(newStatus)) throw new Error(`Cannot transition to ${newStatus} from ${trip.status}`);
506 
507   const tsField = {
508     on_the_way: 'onTheWayAt', onTheWay: 'onTheWayAt',
509     arrived: 'arrivedAt',
510     started: 'startedAt', in_progress: 'startedAt',
511   }[newStatus];
512   trip.status = newStatus;
513   if (tsField) trip[tsField] = new Date();
514 
515   // New extended timestamps
516   if (newStatus === 'arrived') {
517     trip.captainArrivedAt = new Date();
518     if (trip.pickupLocation) trip.pickupLocation.arrivedAt = new Date();
519     // Switch to pickup→destination polyline immediately when captain arrives so
520     // passenger sees the trip route rather than the now-irrelevant pickup route.
521     if (trip.pickupToDestinationPolyline) {
522       trip.currentPolyline = trip.pickupToDestinationPolyline;
523     }
524   }
525   if (newStatus === 'started' || newStatus === 'in_progress') {
526     trip.tripStartedAt = new Date();
527     if (trip.captainArrivedAt) {
528       trip.waitingTimeSeconds = Math.round((Date.now() - trip.captainArrivedAt.getTime()) / 1000);
529     }
530     // Ensure current display polyline is pickup→destination
531     if (trip.pickupToDestinationPolyline) {
532       trip.currentPolyline = trip.pickupToDestinationPolyline;
533     }
534   }
535 
536   await tripRepo.saveDoc(trip);
537 
538   emitToTrip(tripId, 'trip:status:update', { tripId, status: newStatus });
539 
540   // Push the active polyline whenever the route switches phase so both apps
541   // redraw the map without needing a full trip fetch.
542   if (
543     (newStatus === 'arrived' || newStatus === 'started' || newStatus === 'in_progress') &&
544     trip.currentPolyline
545   ) {
546     emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: trip.currentPolyline });
547   }
548 
549   if (newStatus === 'arrived') {
550     notificationService.notify(trip.passengerId, {
551       title: 'الكابتن وصل 🚗',
552       body: 'الكابتن في موقعك، توجه إليه',
553       data: { type: 'captain:arrived', tripId },
554     }).catch(() => { });
555   }
556 
557   if (newStatus === 'started' || newStatus === 'in_progress') {
558     notificationService.notify(trip.passengerId, {
559       title: 'انطلقت رحلتك 🚀',
560       body: 'الكابتن بدأ الرحلة — استمتع بالرحلة',
561       data: { type: 'trip:started', tripId },
562     }).catch(() => { });
563   }
564 
565   logger.info(`[Trip] ${tripId} → ${newStatus}`);
566   return trip;
567 };
568 
569 const markOnTheWay = async (tripId, captainUserId, captainLat, captainLng) => {
570   const trip = await _captainTransition(tripId, captainUserId, 'on_the_way');
571   trip.captainOnTheWayAt = trip.captainOnTheWayAt || new Date();
572 
573   if (captainLat && captainLng && trip.startLocation?.lat) {
574     try {
575       const route = await getPolyline(
576         captainLat, captainLng,
577         trip.startLocation.lat, trip.startLocation.lng
578       );
579       if (route?.encodedPolyline) {
580         trip.polyRoute = route.encodedPolyline;
581         trip.captainToPickupPolyline = route.encodedPolyline;
582         trip.currentPolyline = route.encodedPolyline;
583         await tripRepo.saveDoc(trip);
584         emitToTrip(tripId, 'trip:route:update', {
585           tripId: tripId.toString(),
586           polyRoute: route.encodedPolyline,
587         });
588         return trip;
589       }
590     } catch (err) {
591       logger.warn('[markOnTheWay] polyRoute calc failed:', err.message);
592     }
593   }
594 
595   await tripRepo.saveDoc(trip);
596   return trip;
597 };
598 const markArrived = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'arrived');
599 const startTrip   = async (tripId, captainUserId) => {
600   const trip = await _captainTransition(tripId, captainUserId, 'in_progress');
601   // If no pickup→destination polyline yet, compute it now
602   if (!trip.pickupToDestinationPolyline && trip.endLocation?.lat) {
603     try {
604       const route = await getPolyline(
605         trip.startLocation.lat, trip.startLocation.lng,
606         trip.endLocation.lat, trip.endLocation.lng
607       );
608       if (route?.encodedPolyline) {
609         trip.pickupToDestinationPolyline = route.encodedPolyline;
610         trip.currentPolyline = route.encodedPolyline;
611         trip.polyRoute = route.encodedPolyline;
612         if (!trip.routeDistanceKm) trip.routeDistanceKm = route.distanceKm;
613         await tripRepo.saveDoc(trip);
614         emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: route.encodedPolyline });
615       }
616     } catch (err) {
617       logger.warn('[startTrip] pickup→destination polyline failed:', err.message);
618     }
619   }
620   return trip;
621 };
622 
623 // ── Captain: end trip ─────────────────────────────────────────────────
624 const endTrip = async (tripId, captainUserId, clientDistanceKm) => {
625   const trip = await tripRepo.findById(tripId);
626   if (!trip) throw new Error('Trip not found');
627 
628   const captain = await captainRepo.findByUserId(captainUserId);
629   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
630   if (!trip.canTransitionTo('completed') && !trip.canTransitionTo('ended'))
631     throw new Error(`Cannot end from status: ${trip.status}`);
632 
633   const now = new Date();
634   const gpsDistanceKm = clientDistanceKm || 0;
635   const finalDistance = trip.routeDistanceKm > 0
636     ? trip.routeDistanceKm
637     : (trip.distanceKm > 0 ? trip.distanceKm : gpsDistanceKm);
638 
639   const fare = calcFareBreakdown(finalDistance, trip.carType);
640 
641   trip.status = 'completed';
642   trip.endedAt = now;
643   trip.tripEndedAt = now;
644   trip.distanceKm = finalDistance;
645   trip.totalFare = fare.total;
646   trip.gpsDistanceKm = gpsDistanceKm;
647   if (trip.dropoffLocation) trip.dropoffLocation.arrivedAt = now;
648 
649   if (trip.tripStartedAt) {
650     trip.travelTimeSeconds = Math.round((now.getTime() - trip.tripStartedAt.getTime()) / 1000);
651   }
652 
653   await tripRepo.saveDoc(trip);
654 
655   await captainRepo.updateByUserId(captainUserId, { isOnTrip: false, $inc: { totalTrips: 1 } });
656 
657   emitToTrip(tripId, 'trip:status:update', { tripId, status: 'completed', fare });
658 
659   notificationService.notify(trip.passengerId, {
660     title: 'وصلت! 🎉',
661     body: `المبلغ الإجمالي: ${fare.total} ريال`,
662     data: { type: 'trip:ended', tripId, fare: String(fare.total) },
663   }).catch(() => { });
664 
665   notificationService.notify(captainUserId, {
666     title: 'انتهت الرحلة ✓',
667     body: `المبلغ: ${fare.total} ريال — ${finalDistance.toFixed(1)} كم`,
668     data: { type: 'trip:ended', tripId, fare: String(fare.total) },
669   }).catch(() => { });
670 
671   logger.info(`[Trip] ${tripId} completed | km=${finalDistance} | fare=${fare.total}`);
672   return trip;
673 };
674 
675 // ── Either party: cancel active trip (no tripId needed) ──────────────
676 // Used by POST /trips/cancel — resolves the caller's current active trip
677 // then delegates to the normal cancelTrip flow.
678 // أضف هذه الوظيفة أو عدّل الموجودة
679 // داخل src/modules/trip/trip.service.js
680 
681 const cancelCurrentTrip = async (userId, role, reason) => {
682   let trip;
683   if (role === 'passenger') {
684     trip = await tripRepo.findOne({ passengerId: userId, status: { $in: ACTIVE_STATUSES } });
685   } else if (role === 'captain') {
686     const captain = await captainRepo.findByUserId(userId);
687     if (!captain) throw Object.assign(new Error('Captain profile not found'), { status: 404 });
688     trip = await tripRepo.findOne({ captainId: captain._id, status: { $in: ACTIVE_STATUSES } });
689   }
690   // ✅ عدّل هذا الجزء - لا ترمي خطأ، بل ارجع نجاحاً
691   if (!trip) {
692     return { message: 'No active trip found, assuming already cancelled', alreadyCancelled: true };
693   }
694   return cancelTrip(trip._id.toString(), userId, role, reason);
695 };
696 
697 // ── Either party: cancel ──────────────────────────────────────────────
698 const cancelTrip = async (tripId, userId, role, reason) => {
699   const trip = await tripRepo.findById(tripId);
700   if (!trip) throw new Error('Trip not found');
701 
702   const cancelledStatuses = ['cancelled', 'cancelled_by_passenger', 'cancelled_by_captain', 'cancelled_by_system'];
703   if (cancelledStatuses.includes(trip.status)) {
704     return { message: 'Trip already cancelled', alreadyCancelled: true };
705   }
706 
707   const newStatus = role === 'passenger' ? 'cancelled_by_passenger'
708     : role === 'captain' ? 'cancelled_by_captain'
709     : 'cancelled_by_system';
710 
711   if (!trip.canTransitionTo(newStatus) && !trip.canTransitionTo('cancelled'))
712     throw new Error('Cannot cancel trip in current state');
713 
714   if (role === 'passenger') {
715     if (trip.passengerId.toString() !== userId.toString()) throw new Error('Unauthorized');
716   } else if (role === 'captain') {
717     const captain = await captainRepo.findByUserId(userId);
718     if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
719   }
720 
721   trip.status = newStatus;
722   trip.cancelledAt = new Date();
723   trip.cancellationReason = reason || null;
724   trip.cancelledBy = role;
725   await tripRepo.saveDoc(trip);
726 
727   // Free the captain regardless of who cancelled — passenger cancel was leaving isOnTrip: true.
728   if (trip.captainId) {
729     captainRepo.updateById(trip.captainId, { isOnTrip: false }).catch(() => {});
730   }
731 
732   emitToTrip(tripId, 'trip:cancelled', { tripId, status: newStatus, reason: reason || null, cancelledBy: role });
733 
734   // Notify the OTHER party
735   const otherPartyId = role === 'passenger'
736     ? trip.captainId && (await captainRepo.findById(trip.captainId))?.userId
737     : trip.passengerId;
738   if (otherPartyId) {
739     notificationService.notify(otherPartyId, {
740       title: 'تم إلغاء الرحلة',
741       body: role === 'passenger' ? 'قام الراكب بإلغاء الرحلة' : 'قام الكابتن بإلغاء الرحلة',
742       data: { type: 'trip:cancelled', tripId },
743     }).catch(() => { });
744   }
745 
746   logger.info(`[Trip] ${tripId} cancelled by ${role}`);
747   return trip;
748 };
749 
750 // ── Rating ────────────────────────────────────────────────────────────
751 
752 const rateCaptain = async (tripId, passengerId, { rating, tags = [] }) => {
753   const trip = await tripRepo.findById(tripId);
754   if (!trip) throw Object.assign(new Error('Trip not found'), { status: 404 });
755   if (trip.passengerId.toString() !== passengerId.toString())
756     throw Object.assign(new Error('Unauthorized'), { status: 403 });
757   if (!['ended', 'completed'].includes(trip.status))
758     throw Object.assign(new Error('Trip not ended'), { status: 400 });
759   if (trip.passengerRating)
760     throw Object.assign(new Error('Already rated'), { status: 409 });
761 
762   trip.passengerRating = rating;
763   trip.passengerRatingTags = tags;
764   await tripRepo.saveDoc(trip);
765 
766   // Update captain's rolling average rating
767   const captain = await captainRepo.findById(trip.captainId);
768   if (captain) {
769     const newCount = captain.totalTrips || 1;
770     const oldRating = captain.rating || 0;
771     const newRating = ((oldRating * (newCount - 1)) + rating) / newCount;
772     await captainRepo.updateById(trip.captainId, { rating: Math.min(5, newRating) });
773   }
774 
775   logger.info(`[Rating] trip=${tripId} captain rated ${rating} by passenger`);
776   return trip;
777 };
778 
779 const ratePassenger = async (tripId, captainUserId, { rating, tags = [] }) => {
780   const trip = await tripRepo.findById(tripId);
781   if (!trip) throw Object.assign(new Error('Trip not found'), { status: 404 });
782 
783   const captain = await captainRepo.findByUserId(captainUserId);
784   if (!captain || trip.captainId.toString() !== captain._id.toString())
785     throw Object.assign(new Error('Unauthorized'), { status: 403 });
786   if (!['ended', 'completed'].includes(trip.status))
787     throw Object.assign(new Error('Trip not ended'), { status: 400 });
788   if (trip.captainRating)
789     throw Object.assign(new Error('Already rated'), { status: 409 });
790 
791   trip.captainRating = rating;
792   trip.captainRatingTags = tags;
793   await tripRepo.saveDoc(trip);
794 
795   logger.info(`[Rating] trip=${tripId} passenger rated ${rating} by captain`);
796   return trip;
797 };
798 
799 // ── Captain moving: recalculate captain→pickup route ─────────────────
800 // Called from captain.socket every ~300 m of movement so both sides see an updated polyline.
801 const refreshRoute = async (tripId, captainLat, captainLng) => {
802   const trip = await tripRepo.findById(tripId);
803   if (!trip || !['accepted', 'on_the_way', 'onTheWay'].includes(trip.status)) return;
804   if (!trip.startLocation?.lat) return;
805   const route = await getPolyline(captainLat, captainLng, trip.startLocation.lat, trip.startLocation.lng);
806   if (!route?.encodedPolyline) return;
807   trip.polyRoute = route.encodedPolyline;
808   trip.captainToPickupPolyline = route.encodedPolyline;
809   trip.currentPolyline = route.encodedPolyline;
810   await tripRepo.saveDoc(trip);
811   emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: route.encodedPolyline });
812 };
813 
814 // ── Persist captainLastLocation snapshot to trip doc ─────────────────
815 // Called from captain.socket on every throttled location update.
816 const updateCaptainLocation = async (tripId, lat, lng, heading = 0) => {
817   await tripRepo.findByIdAndUpdate(tripId, {
818     $set: {
819       'captainLastLocation.lat': lat,
820       'captainLastLocation.lng': lng,
821       'captainLastLocation.heading': heading,
822       'captainLastLocation.updatedAt': new Date(),
823     },
824   });
825 };
826 
827 // ── GET /trips/current ────────────────────────────────────────────────
828 const getCurrentTrip = async (userId, role) => {
829   if (role === 'passenger') {
830     return tripRepo.findOnePopulated({ passengerId: userId, status: { $in: ACTIVE_STATUSES } });
831   }
832   if (role === 'captain') {
833     const captain = await captainRepo.findByUserId(userId);
834     if (!captain) return null;
835     return tripRepo.findOnePopulated({ captainId: captain._id, status: { $in: ACTIVE_STATUSES } });
836   }
837   return null;
838 };
839 
840 const getTrip = (tripId) => tripRepo.findByIdPopulated(tripId);
841 
842 // ── POST /trips/estimate ──────────────────────────────────────────────
843 const estimateFare = async (startLat, startLng, endLat, endLng, carType = 'car') => {
844   try {
845     const route = await getPolyline(startLat, startLng, endLat, endLng);
846     const distanceKm = route.distanceKm;
847     const fare = calcFareBreakdown(distanceKm, carType);
848     return {
849       distanceKm: Math.round(distanceKm * 100) / 100,
850       durationMins: route.durationMins,
851       durationInTrafficMins: route.durationInTrafficMins,
852       encodedPolyline: route.encodedPolyline,
853       ...fare,
854     };
855   } catch (err) {
856     logger.warn('[estimateFare] Route failed, falling back to haversine:', err.message);
857     const distanceKm = haversineDistance(startLat, startLng, endLat, endLng);
858     return {
859       distanceKm: Math.round(distanceKm * 100) / 100,
860       durationMins: 0,
861       durationInTrafficMins: 0,
862       encodedPolyline: '',
863       ...calcFareBreakdown(distanceKm, carType),
864     };
865   }
866 };
867 
868 module.exports = {
869   searchTrip,
870   estimateFare,
871   captainAccepted,
872   captainRejected,
873   createTrip,
874   acceptTrip,
875   markOnTheWay,
876   markArrived,
877   startTrip,
878   endTrip,
879   cancelTrip,
880   cancelCurrentTrip,
881   rateCaptain,
882   ratePassenger,
883   getCurrentTrip,
884   getTrip,
885   refreshRoute,
886   updateCaptainLocation,
887 };
```

## File: `src\modules\trip\trip.socket.js`

```javascript
1 // Trip socket handler — manages room membership for realtime trip updates.
2 // Business logic (state transitions) stays in trip.service; this file only
3 // handles the socket plumbing.
4 const tripService = require('./trip.service');
5 const logger = require('../../config/logger');
6 
7 const register = (io, socket) => {
8   const userId = socket.data.userId;
9 
10   // Client joins trip room to receive realtime status updates + location
11   socket.on('trip:join', (tripId) => {
12     if (!tripId) return;
13     socket.join(`trip:${tripId}`);
14     socket.data.activeTripId = tripId;
15   });
16 
17   socket.on('trip:leave', (tripId) => {
18     if (!tripId) return;
19     socket.leave(`trip:${tripId}`);
20     if (socket.data.activeTripId === tripId) {
21       socket.data.activeTripId = null;
22     }
23   });
24 
25   // Captain: respond to incoming trip request (from dispatch loop)
26   socket.on('trip:request:accept', () => {
27     const resolved = tripService.captainAccepted(userId);
28     if (!resolved) {
29       socket.emit('error', { code: 'TRIP_EXPIRED', message: 'الرحلة لم تعد متاحة' });
30     }
31     logger.info(`[Trip Socket] ${userId} accepted dispatch`);
32   });
33 
34   socket.on('trip:request:reject', () => {
35     tripService.captainRejected(userId);
36     logger.info(`[Trip Socket] ${userId} rejected dispatch`);
37   });
38 
39   // In-trip chat relay — broadcast to all members of the trip room
40   socket.on('chat:message', ({ tripId, text }) => {
41     if (!tripId || !text?.trim()) return;
42     const payload = {
43       senderId: userId,
44       role: socket.data.role,
45       text: text.trim(),
46       sentAt: new Date().toISOString(),
47     };
48     io.to(`trip:${tripId}`).emit('chat:message', payload);
49     logger.info(`[Chat] trip=${tripId} from=${userId} text="${text.trim().slice(0, 40)}"`);
50   });
51 };
52 
53 module.exports = { register };
```

## File: `src\modules\trip\trip.validation.js`

```javascript
1 const Joi = require('joi');
2 
3 const CAR_TYPES = ['car', 'motorcycle', 'tukutuk', 'altTukutuk'];
4 
5 const locationSchema = Joi.object({
6   lat:     Joi.number().min(-90).max(90).required(),
7   lng:     Joi.number().min(-180).max(180).required(),
8   address: Joi.string().optional().allow(''),
9 });
10 
11 const searchTripSchema = Joi.object({
12   startLocation: locationSchema.required(),
13   endLocation:   locationSchema.optional(),
14   carType:       Joi.string().valid(...CAR_TYPES).required(),
15 });
16 
17 const createTripSchema = Joi.object({
18   captainId:     Joi.string().hex().length(24).required(),
19   carType:       Joi.string().valid(...CAR_TYPES).optional(),
20   startLocation: locationSchema.required(),
21   endLocation:   locationSchema.optional(),
22 });
23 
24 const endTripSchema = Joi.object({
25   distanceKm: Joi.number().min(0).optional(),
26 });
27 
28 const cancelTripSchema = Joi.object({
29   reason: Joi.string().max(300).optional().allow('', null),
30 });
31 
32 const estimateFareSchema = Joi.object({
33   startLocation: locationSchema.required(),
34   endLocation:   locationSchema.required(),
35   carType:       Joi.string().valid(...CAR_TYPES).required(),
36 });
37 
38 module.exports = { searchTripSchema, createTripSchema, endTripSchema, cancelTripSchema, estimateFareSchema };
```

## File: `src\modules\user\user.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const userSchema = new mongoose.Schema(
4   {
5     name: { type: String, required: true },
6     phone: { type: String, unique: true, sparse: true },
7     email: { type: String, lowercase: true, unique: true, sparse: true },
8     role: {
9       type: String,
10       enum: ['passenger', 'captain', 'admin', null],
11       default: null,
12     },
13     googleId: { type: String, unique: true, sparse: true },
14     avatar: { type: String }, // URL
15     isActive: { type: Boolean, default: true },
16     // For OTP temporary storage
17     otpCode: { type: String, select: false },
18     otpExpiresAt: { type: Date, select: false },
19     otpAttempts: { type: Number, default: 0, select: false },
20     otpLockedUntil: { type: Date, select: false },
21     // Array supports multiple devices (max 5, FIFO)
22     refreshTokens: [{ type: String }],
23     // FCM device tokens (max 5, FIFO)
24     fcmTokens: [{ type: String }],
25   },
26   { timestamps: true }
27 );
28 
29 module.exports = mongoose.model('User', userSchema);
```

## File: `src\modules\user\user.repository.js`

```javascript
1 const User = require('./user.model');
2 
3 const findById = (id, projection = '-refreshToken') =>
4   User.findById(id).select(projection);
5 
6 const findOne = (filter, projection) =>
7   User.findOne(filter, projection);
8 
9 const create = (data) => User.create(data);
10 
11 const updateById = (id, update, options = {}) =>
12   User.findByIdAndUpdate(id, update, { new: true, ...options });
13 
14 const updateOne = (filter, update) =>
15   User.findOneAndUpdate(filter, update, { new: true });
16 
17 module.exports = { findById, findOne, create, updateById, updateOne };
```

## File: `src\modules\vehicle\vehicle.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const vehicleSchema = new mongoose.Schema({
4   captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true, unique: true },
5   type: { type: String, enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'], required: true },
6   brand: String,
7   model: String,
8   year: Number,
9   color: String,
10   plateNumber: { type: String, required: true, unique: true },
11   passengerCapacity: { type: Number, default: 4 },
12 }, { timestamps: true });
13 
14 module.exports = mongoose.model('Vehicle', vehicleSchema);
```

## File: `src\socket\index.js`

```javascript
1 // src/socket/index.js
2 
3 const { Server } = require('socket.io');
4 const env = require('../config/env');
5 const { verifyAccessToken } = require('../utils/jwt.util');
6 const logger = require('../config/logger');
7 const { simpleSocketLogger } = require('../middlewares/socketLogger.middleware');
8 const captainRepo = require('../modules/captain/captain.repository');
9 
10 let io;
11 
12 // In-memory presence map: userId → Set<socketId>
13 const _presence = new Map();
14 
15 const _addPresence = (userId, socketId) => {
16   if (!_presence.has(userId)) _presence.set(userId, new Set());
17   _presence.get(userId).add(socketId);
18 };
19 
20 const _removePresence = (userId, socketId) => {
21   const sockets = _presence.get(userId);
22   if (!sockets) return;
23   sockets.delete(socketId);
24   if (sockets.size === 0) _presence.delete(userId);
25 };
26 
27 // تسجيل جميع الأحداث على مستوى الـ socket
28 const wrapSocketWithLogging = (socket) => {
29   const userId = socket.data.userId;
30   const socketId = socket.id;
31 
32   simpleSocketLogger.logConnection(socketId, userId);
33 
34   const originalEmit = socket.emit;
35   socket.emit = function (event, ...args) {
36     simpleSocketLogger.logOutgoing(socketId, userId, event, args[0]);
37     return originalEmit.apply(this, [event, ...args]);
38   };
39 
40   const originalOn = socket.on;
41   socket.on = function (event, listener) {
42     const wrappedListener = (...args) => {
43       simpleSocketLogger.logIncoming(socketId, userId, event, args[0]);
44       return listener.apply(this, args);
45     };
46     return originalOn.call(this, event, wrappedListener);
47   };
48 
49   const originalDisconnect = socket.disconnect;
50   socket.disconnect = function (...args) {
51     simpleSocketLogger.logDisconnection(socketId, userId, 'manual disconnect');
52     return originalDisconnect.apply(this, args);
53   };
54 
55   return socket;
56 };
57 
58 const initSocket = (server) => {
59   io = new Server(server, {
60     cors: {
61       origin: env.SOCKET_CORS_ORIGIN || '*',
62       methods: ['GET', 'POST'],
63       credentials: true,
64     },
65   });
66 
67   // JWT auth middleware
68   io.use((socket, next) => {
69     const authHeader = socket.handshake.headers.authorization;
70     if (!authHeader?.startsWith('Bearer ')) {
71       return next(new Error('UNAUTHORIZED'));
72     }
73     const token = authHeader.split(' ')[1];
74     const decoded = verifyAccessToken(token);
75     if (!decoded) {
76       logger.warn(`[Socket] Socket ${socket.id} - Invalid token`);
77       return next(new Error('INVALID_TOKEN'));
78     }
79     socket.data.userId = decoded.id.toString();
80     socket.data.role = decoded.role;
81 
82     next();
83   });
84 
85   io.on('connection', (rawSocket) => {
86     const socket = wrapSocketWithLogging(rawSocket);
87 
88     const { userId, role } = socket.data;
89     console.log(`✅ [Socket CONNECTED] ${socket.id} | user=${userId} | role=${role}`);
90 
91     _addPresence(userId, socket.id);
92 
93     socket.join(`user:${userId}`);
94 
95     if (role === 'passenger') {
96       socket.join('passengers');
97     }
98 
99     require('../modules/captain/captain.socket').register(io, socket);
100     require('../modules/trip/trip.socket').register(io, socket);
101 
102     socket.on('disconnect', (reason) => {
103       _removePresence(userId, socket.id);
104       simpleSocketLogger.logDisconnection(socket.id, userId, reason);
105       console.log(`❌ [Socket DISCONNECTED] ${socket.id} | user=${userId} | reason=${reason}`);
106     });
107 
108     socket.on('error', (err) => {
109       console.error(`⚠️ [Socket ERROR] ${socket.id} | user=${userId} | error:`, err.message);
110     });
111   });
112 
113   // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
114   // ✅ HEARTBEAT - التحقق من السائقين غير النشطين
115   // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
116   
117   // setInterval(() => {
118   //   const now = Date.now();
119     
120   //   for (const [userId, socketIds] of _presence.entries()) {
121   //     captainRepo.findByUserId(userId)
122   //       .then(captain => {
123   //         if (captain && captain.isOnline && captain.lastActiveAt) {
124   //           const inactiveMs = now - new Date(captain.lastActiveAt).getTime();
125   //           if (inactiveMs > 120000) { // 2 دقيقة بدون نشاط
126   //             logger.info(`[Heartbeat] Marking captain ${userId} as offline (inactive for ${inactiveMs}ms)`);
127               
128   //             if (io) {
129   //               io.to('passengers').emit('captain:disappear', { 
130   //                 captainId: captain._id.toString() 
131   //               });
132   //             }
133               
134   //             captain.isOnline = false;
135   //             captain.socketId = null;
136   //             captain.save()
137   //               .then(() => logger.info(`[Heartbeat] Captain ${userId} marked offline`))
138   //               .catch(err => logger.error('[Heartbeat] Failed to save captain status', err));
139   //           }
140   //         }
141   //       })
142   //       .catch(err => logger.error('[Heartbeat] Error checking captain', err));
143   //   }
144   // }, 60000); // كل دقيقة
145 
146   // مراقبة أحداث الـ io العامة
147   io.of('/').adapter.on('create-room', (room) => {
148     // console.log(`🏠 [Socket ROOM CREATE] room: ${room}`);
149   });
150 
151   io.of('/').adapter.on('join-room', (room, id) => {
152     // console.log(`🚪 [Socket ROOM JOIN] socket: ${id} joined room: ${room}`);
153   });
154 
155   io.of('/').adapter.on('leave-room', (room, id) => {
156     // console.log(`🚪 [Socket ROOM LEAVE] socket: ${id} left room: ${room}`);
157   });
158 
159   return io;
160 };
161 
162 const getIo = () => {
163   if (!io) throw new Error('Socket.IO not initialized');
164   return io;
165 };
166 
167 const emitToUser = (userId, event, data) => {
168   if (!io) return;
169   console.log(`📤 [EMIT TO USER] user:${userId} | event:${event}`);
170   io.to(`user:${userId}`).emit(event, data);
171 };
172 
173 const emitToTrip = (tripId, event, data) => {
174   if (!io) return;
175   console.log(`📤 [EMIT TO TRIP] trip:${tripId} | event:${event}`);
176   io.to(`trip:${tripId}`).emit(event, data);
177 };
178 
179 const emitToPassengers = (event, data) => {
180   if (!io) return;
181   console.log(`📤 [EMIT TO PASSENGERS] event:${event}`);
182   io.to('passengers').emit(event, data);
183 };
184 
185 const isUserOnline = (userId) => _presence.has(userId.toString());
186 
187 const getOnlineUserIds = () => Array.from(_presence.keys());
188 
189 module.exports = {
190   initSocket,
191   getIo,
192   emitToUser,
193   emitToTrip,
194   emitToPassengers,
195   isUserOnline,
196   getOnlineUserIds
197 };
```

## File: `src\utils\api-cache.util.js`

```javascript
1 /**
2  * Shared caching layer for all Google Maps API proxy calls.
3  *
4  * Why LRU + TTL instead of plain Map:
5  *   - TTL prevents stale data from serving outdated places / routes.
6  *   - LRU cap keeps memory bounded even under heavy traffic.
7  *
8  * Scaling note: this is process-local. If you ever run multiple server
9  * instances, replace LruCache with a Redis adapter that exposes the same
10  * get / set interface — no changes to the service files needed.
11  */
12 
13 // ── LRU cache with per-entry TTL ──────────────────────────────────────────────
14 
15 class LruCache {
16   /**
17    * @param {object} opts
18    * @param {number} opts.maxSize   Max entries before LRU eviction (default 1000)
19    * @param {number} opts.ttlMs    Time-to-live in ms for every entry
20    */
21   constructor({ maxSize = 1000, ttlMs }) {
22     this._maxSize = maxSize;
23     this._ttlMs = ttlMs;
24     this._map = new Map(); // insertion-order Map → oldest entry is first
25   }
26 
27   /** Returns the cached value, or undefined on miss / expiry. */
28   get(key) {
29     const entry = this._map.get(key);
30     if (!entry) return undefined;
31 
32     if (entry.expiresAt < Date.now()) {
33       this._map.delete(key);
34       return undefined;
35     }
36 
37     // LRU: re-insert to move to the "most-recently-used" tail
38     this._map.delete(key);
39     this._map.set(key, entry);
40     return entry.value;
41   }
42 
43   /** Stores value under key, evicting the LRU entry if at capacity. */
44   set(key, value) {
45     if (this._map.size >= this._maxSize && !this._map.has(key)) {
46       // Evict oldest (first) entry
47       this._map.delete(this._map.keys().next().value);
48     }
49     // Delete first so re-insert always goes to the tail
50     this._map.delete(key);
51     this._map.set(key, { value, expiresAt: Date.now() + this._ttlMs });
52   }
53 
54   get size() { return this._map.size; }
55 
56   clear() { this._map.clear(); }
57 }
58 
59 // ── Key normalisation helpers ─────────────────────────────────────────────────
60 
61 const _MIN = 60_000;
62 const _HOUR = 60 * _MIN;
63 const _DAY = 24 * _HOUR;
64 
65 /**
66  * Normalise a free-text search query so that minor variations map to the
67  * same cache key.
68  *
69  * Handles:
70  *   - Leading / trailing / duplicate whitespace
71  *   - ASCII case folding
72  *   - Arabic tatweel (ـ) removal
73  *   - Arabic alef-family normalisation (أإآٱ → ا)
74  *   - Arabic tashkeel (diacritics) removal
75  *   - Arabic taa-marbuta (ة → ه) and alef-maqsura (ى → ي) normalisation
76  */
77 function normalizeQuery(text) {
78   if (!text) return '';
79   return text
80     .trim()
81     .toLowerCase()
82     .replace(/\s+/g, ' ')
83     .replace(/ـ/g, '')                          // tatweel
84     .replace(/[أإآٱ]/g, 'ا')                         // alef variants
85     .replace(/[ً-ٟؐ-ؚ]/g, '')    // tashkeel / diacritics
86     .replace(/ة/g, 'ه')                              // taa marbuta
87     .replace(/ى/g, 'ي');                             // alef maqsura
88 }
89 
90 /**
91  * Snap a lat/lng pair to a coordinate grid so that nearby points share
92  * a cache key.
93  *
94  * precision = 4 → ~11 m grid  (reverse geocode, route origins/dests)
95  * precision = 2 → ~1.1 km grid (autocomplete location bias, nearby search)
96  */
97 function snapLatLng(lat, lng, precision = 4) {
98   const f = 10 ** precision;
99   return `${Math.round(lat * f) / f},${Math.round(lng * f) / f}`;
100 }
101 
102 // ── Pre-configured cache instances ────────────────────────────────────────────
103 
104 /** Autocomplete suggestions — moderate TTL, coarse location grid */
105 const autocompleteCache = new LruCache({ maxSize: 2000, ttlMs: 999 * _DAY });
106 
107 /** Place details by place_id — very stable data, long TTL */
108 const placeDetailsCache = new LruCache({ maxSize: 2000, ttlMs: 999 * _DAY });
109 
110 /** Nearby search results — location-sensitive, short TTL */
111 const nearbyCache = new LruCache({ maxSize: 300, ttlMs: 999 * _DAY });
112 
113 /** Reverse geocode — stable results, long TTL, fine grid */
114 const reverseCache = new LruCache({ maxSize: 2000, ttlMs: 999 * _DAY });
115 
116 /** Route polylines — semi-stable, medium TTL */
117 const polylineCache = new LruCache({ maxSize: 500, ttlMs: 999 * _DAY });
118 
119 // /** Autocomplete suggestions — moderate TTL, coarse location grid */
120 // const autocompleteCache = new LruCache({ maxSize: 2000,  ttlMs: 24 * _HOUR });
121 
122 // /** Place details by place_id — very stable data, long TTL */
123 // const placeDetailsCache = new LruCache({ maxSize: 2000, ttlMs: 24 * _HOUR });
124 
125 // /** Nearby search results — location-sensitive, short TTL */
126 // const nearbyCache       = new LruCache({ maxSize: 300,  ttlMs: 10 * _MIN });
127 
128 // /** Reverse geocode — stable results, long TTL, fine grid */
129 // const reverseCache      = new LruCache({ maxSize: 2000, ttlMs: 24 * _HOUR });
130 
131 // /** Route polylines — semi-stable, medium TTL */
132 // const polylineCache     = new LruCache({ maxSize: 500,  ttlMs: 10 * _MIN });
133 
134 // ── Key builders ──────────────────────────────────────────────────────────────
135 
136 /**
137  * @param {string} input   Raw user query
138  * @param {number|null} lat  Nullable location bias latitude
139  * @param {number|null} lng  Nullable location bias longitude
140  */
141 function autocompleteKey(input, lat, lng) {
142   const loc = (lat != null && lng != null) ? `@${snapLatLng(lat, lng, 2)}` : '';
143   return `ac:${normalizeQuery(input)}${loc}`;
144 }
145 
146 /** @param {string} placeId */
147 const placeDetailsKey = (placeId) => `pd:${placeId}`;
148 
149 /**
150  * @param {number} lat
151  * @param {number} lng
152  * @param {number} radius  in metres
153  * @param {number} limit
154  */
155 const nearbyKey = (lat, lng, radius, limit) =>
156   `nb:${snapLatLng(lat, lng, 2)}:r${radius}:l${limit}`;
157 
158 /**
159  * @param {number} lat
160  * @param {number} lng
161  */
162 const reverseKey = (lat, lng) => `rv:${snapLatLng(lat, lng, 4)}`;
163 
164 /**
165  * @param {number} originLat
166  * @param {number} originLng
167  * @param {number} destLat
168  * @param {number} destLng
169  */
170 const polylineKey = (originLat, originLng, destLat, destLng) =>
171   `pl:${snapLatLng(originLat, originLng, 4)}->${snapLatLng(destLat, destLng, 4)}`;
172 
173 // ── Exports ───────────────────────────────────────────────────────────────────
174 
175 module.exports = {
176   LruCache,
177   normalizeQuery,
178   snapLatLng,
179   // cache instances
180   autocompleteCache,
181   placeDetailsCache,
182   nearbyCache,
183   reverseCache,
184   polylineCache,
185   // key builders
186   autocompleteKey,
187   placeDetailsKey,
188   nearbyKey,
189   reverseKey,
190   polylineKey,
191   // TTL constants (re-exported for tests / config)
192   TTL: { MIN: _MIN, HOUR: _HOUR, DAY: _DAY },
193 };
```

## File: `src\utils\code.util.js`

```javascript
1 // src/utils/code.util.js
2 
3 const generateApplicationCode = () => {
4   const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
5   let code = 'WAS-';
6   for (let i = 0; i < 6; i++) {
7     code += characters.charAt(Math.floor(Math.random() * characters.length));
8   }
9   return code;
10 };
11 
12 module.exports = { generateApplicationCode };
```

## File: `src\utils\distance.util.js`

```javascript
1 const toRad = (value) => (value * Math.PI) / 180;
2 
3 const haversineDistance = (lat1, lng1, lat2, lng2) => {
4   const R = 6371; // km
5   const dLat = toRad(lat2 - lat1);
6   const dLng = toRad(lng2 - lng1);
7   const a =
8     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
9     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
10   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
11   return R * c;
12 };
13 
14 module.exports = { haversineDistance };
```

## File: `src\utils\fare.util.js`

```javascript
1 const FARE_CONFIG = {
2   car:        { firstKmFare: 10, extraKmFare: 7,  commissionPct: 0.20 },
3   motorcycle: { firstKmFare:  8, extraKmFare: 5,  commissionPct: 0.15 },
4   tukutuk:    { firstKmFare:  7, extraKmFare: 4,  commissionPct: 0.15 },
5   altTukutuk: { firstKmFare:  8, extraKmFare: 5,  commissionPct: 0.15 },
6 };
7 
8 const DEFAULT_CONFIG = FARE_CONFIG.car;
9 
10 const _getConfig = (carType) => FARE_CONFIG[carType] ?? DEFAULT_CONFIG;
11 
12 const calcFareBreakdown = (km, carType = 'car') => {
13   const { firstKmFare, extraKmFare, commissionPct } = _getConfig(carType);
14   const extraKm   = Math.max(0, km - 1);
15   const extraFare = Math.round(extraKm * extraKmFare);
16   const total     = km <= 0 ? 0 : km <= 1 ? firstKmFare : Math.round(firstKmFare + extraFare);
17   const commission = Math.round(total * commissionPct);
18   const netEarnings = total - commission;
19   return {
20     firstKm:    Math.min(km, 1),
21     firstFare:  firstKmFare,
22     extraKm,
23     extraFare,
24     total,
25     commission,
26     netEarnings,
27     commissionPct,
28   };
29 };
30 
31 const calcFare = (km, carType = 'car') => calcFareBreakdown(km, carType).total;
32 
33 const getFareConfig = (carType) => _getConfig(carType);
34 
35 module.exports = { calcFare, calcFareBreakdown, getFareConfig, FARE_CONFIG };
```

## File: `src\utils\jwt.util.js`

```javascript
1 const jwt = require('jsonwebtoken');
2 const env = require('../config/env');
3 
4 const generateTokens = (userId, role) => {
5   const accessToken = jwt.sign({ id: userId, role }, env.JWT_SECRET, {
6     expiresIn: env.JWT_EXPIRES_IN,
7   });
8   const refreshToken = jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, {
9     expiresIn: env.JWT_REFRESH_EXPIRES_IN,
10   });
11   return { accessToken, refreshToken };
12 };
13 
14 const verifyAccessToken = (token) => {
15   try {
16     return jwt.verify(token, env.JWT_SECRET);
17   } catch (error) {
18     return null;
19   }
20 };
21 
22 const verifyRefreshToken = (token) => {
23   try {
24     return jwt.verify(token, env.JWT_REFRESH_SECRET);
25   } catch (error) {
26     return null;
27   }
28 };
29 
30 module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };
```

## File: `src\utils\mock.util.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 // دالة لتوليد أرقام شبه عشوائية مع بذرة ثابتة
4 const seededRandom = (seed) => {
5   const x = Math.sin(seed) * 10000;
6   return x - Math.floor(x);
7 };
8 
9 const generateMockDrivers = (centerLat, centerLng) => {
10   const drivers = [];
11   const names = [
12     'أحمد محمد', 'محمود علي', 'كريم حسن', 'سامر عبدالله',
13     'يوسف إبراهيم', 'إسلام خالد', 'محمد سعيد', 'عمر أحمد'
14   ];
15   const phones = [
16     '01012345678', '01123456789', '01234567890', '01098765432',
17     '01111223344', '01099887766', '01234561234', '01056789012'
18   ];
19   const plates = [
20     'س ص ع 1234', 'ط ج ب 5678', 'أ ب ج 9876', 'م ن ح 5432',
21     'ل أ ر 1122', 'ي ب ع 3344', 'س ط ر 5566', 'ع م ن 7788'
22   ];
23   const vehicleModels = [
24     'هيونداي i10', 'تويوتا كورولا', 'كيا سبورتاج', 'شيفروليه أوبترا',
25     'نيسان صني', 'مرسيدس E200', 'بي إم دبليو X5', 'سوزوكي سويفت'
26   ];
27   const vehicleColors = ['أبيض', 'أسود', 'فضي', 'أحمر', 'أزرق', 'رمادي', 'بيج'];
28   const vehicleTypes = ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'];
29   const statuses = ['available', 'busy', 'delivering'];
30 
31   for (let i = 0; i < 15; i++) {
32     const seed = i * 42;
33     const latOffset = (seededRandom(seed) - 0.5) * 0.04;
34     const lngOffset = (seededRandom(seed + 1) - 0.5) * 0.04;
35 
36     const vehicleType = vehicleTypes[Math.floor(seededRandom(seed + 2) * vehicleTypes.length)];
37     const status = statuses[Math.floor(seededRandom(seed + 3) * statuses.length)];
38     const rating = 3.5 + seededRandom(seed + 4) * 1.5;
39     const totalTrips = Math.floor(seededRandom(seed + 5) * 300) + 10;
40 
41     drivers.push({
42       captain_id: new mongoose.Types.ObjectId().toString(), // ObjectId صالح
43       name: names[i % names.length],
44       phone: phones[i % phones.length],
45       vehicle_type: vehicleType,
46       vehicle_model: vehicleModels[i % vehicleModels.length],
47       vehicle_color: vehicleColors[i % vehicleColors.length],
48       plate_number: plates[i % plates.length],
49       lat: centerLat + latOffset,
50       lng: centerLng + lngOffset,
51       status: status,
52       rating: parseFloat(rating.toFixed(1)),
53       total_trips: totalTrips,
54     });
55   }
56   return drivers;
57 };
58 
59 module.exports = { generateMockDrivers };
```

## File: `src\utils\otp.util.js`

```javascript
1 const crypto = require('crypto');
2 
3 const generateOtp = () => {
4   // 6-digit numeric OTP
5   return Math.floor(100000 + Math.random() * 900000).toString();
6 };
7 
8 const hashOtp = (otp) => {
9   return crypto.createHash('sha256').update(otp).digest('hex');
10 };
11 
12 const verifyOtp = (plainOtp, hashedOtp) => {
13   return hashOtp(plainOtp) === hashedOtp;
14 };
15 
16 module.exports = { generateOtp, hashOtp, verifyOtp };
```

## File: `src\utils\response.util.js`

```javascript
1 const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
2   return res.status(statusCode).json({
3     success: true,
4     message,
5     data,
6   });
7 };
8 
9 const sendError = (res, message, statusCode = 400, errors = null) => {
10   return res.status(statusCode).json({
11     success: false,
12     message,
13     errors,
14   });
15 };
16 
17 module.exports = { sendSuccess, sendError };
```

