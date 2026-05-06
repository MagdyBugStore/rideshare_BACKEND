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
5 // في حال أردت إضافة المصادقة لاحقاً، استخدم التالي:
6 // const authMiddleware = require('../../middlewares/auth.middleware');
7 // const { requireRole } = require('../../middlewares/role.middleware');
8 
9 // ==================== المستخدمون ====================
10 // GET /api/admin/users - الحصول على جميع المستخدمين
11 router.get('/users', controller.getUsers);
12 
13 // PATCH /api/admin/users/:userId - تعديل مستخدم
14 router.patch('/users/:userId', controller.updateUser);
15 
16 // DELETE /api/admin/users/:userId - حذف مستخدم
17 router.delete('/users/:userId', controller.deleteUser);
18 
19 // ==================== الكباتن ====================
20 // GET /api/admin/captains - الحصول على جميع الكباتن
21 router.get('/captains', controller.getAllCaptains);
22 
23 // POST /api/admin/captains - إضافة كابتن جديد
24 router.post('/captains', controller.createCaptain);
25 
26 // PATCH /api/admin/captains/:captainId - تعديل كابتن
27 router.patch('/captains/:captainId', controller.updateCaptain);
28 
29 // DELETE /api/admin/captains/:captainId - حذف كابتن
30 router.delete('/captains/:captainId', controller.deleteCaptain);
31 
32 // GET /api/admin/captains/pending - الحصول على الكباتن المعلقين
33 router.get('/captains/pending', controller.getPendingCaptains);
34 
35 // PATCH /api/admin/captains/:captainId/approve - الموافقة على كابتن
36 router.patch('/captains/:captainId/approve', controller.approveCaptain);
37 
38 // PATCH /api/admin/captains/:captainId/reject - رفض كابتن
39 router.patch('/captains/:captainId/reject', controller.rejectCaptain);
40 
41 // ==================== الرحلات ====================
42 // GET /api/admin/trips/live - الحصول على الرحلات النشطة
43 router.get('/trips/live', controller.getLiveTrips);
44 
45 // POST /api/admin/trips - إنشاء رحلة
46 router.post('/trips', controller.createTrip);
47 
48 // DELETE /api/admin/trips/:tripId - حذف رحلة
49 router.delete('/trips/:tripId', controller.deleteTrip);
50 
51 // ==================== دوال قديمة للتوافق ====================
52 // POST /api/admin/captain/approve-by-code - موافقة أو رفض بكود التقديم
53 router.post('/captain/approve-by-code', controller.approveCaptainByCode);
54 
55 module.exports = router;
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
17   sendSuccess(res, result, 'Google login successful');
18 });
19 
20 const refreshToken = wrap(async (req, res) => {
21   const { refreshToken } = req.body;
22   if (!refreshToken) return sendError(res, 'Refresh token required', 400);
23   const result = await authService.refreshAccessToken(refreshToken);
24   sendSuccess(res, result, 'Token refreshed');
25 });
26 
27 const logout = wrap(async (req, res) => {
28   await authService.logout(req.user.id, req.body?.refreshToken);
29   sendSuccess(res, null, 'Logged out successfully');
30 });
31 
32 const getCurrentUser = wrap(async (req, res) => {
33   const user = await userRepo.findById(req.user.id);
34   if (!user) return sendError(res, 'User not found', 404);
35 
36   let captain = null;
37   if (user.role === 'captain') {
38     captain = await Captain.findOne({ userId: user._id }).select(
39       'status isOnline applicationStatus rejectionReason vehicleType vehicleModel plateNumber vehicleColor'
40     );
41   }
42 
43   sendSuccess(res, { user, captain });
44 });
45 
46 const updateUserRole = wrap(async (req, res) => {
47   const { role } = req.body;
48   if (!['passenger', 'captain'].includes(role)) {
49     return sendError(res, 'Invalid role', 400);
50   }
51 
52   const user = await userRepo.updateById(
53     req.user.id,
54     { role },
55     { runValidators: true, select: '-refreshToken -otpCode -otpExpiresAt' }
56   );
57   if (!user) return sendError(res, 'User not found', 404);
58 
59   let applicationCode = null;
60   if (role === 'captain') {
61     const existing = await Captain.findOne({ userId: user._id });
62     if (!existing) {
63       const code = generateApplicationCode();
64       await Captain.create({
65         userId: user._id,
66         applicationCode: code,
67         applicationStatus: 'pending_approval',
68         status: 'pending_review',
69       });
70       applicationCode = code;
71     }
72   }
73 
74   const tokens = generateTokens(user._id, user.role);
75   user.refreshToken = tokens.refreshToken;
76   await user.save();
77 
78   sendSuccess(res, {
79     user,
80     accessToken: tokens.accessToken,
81     refreshToken: tokens.refreshToken,
82     applicationCode,
83   }, 'Role updated');
84 });
85 
86 const updateProfile = wrap(async (req, res) => {
87   const { name, phone } = req.body;
88   const user = await userRepo.updateById(
89     req.user.id,
90     { $set: { name, phone } },
91     { select: '-refreshToken' }
92   );
93   sendSuccess(res, user, 'Profile updated');
94 });
95 
96 const uploadAvatar = (req, res, next) => {
97   uploadSingleDocument(req, res, async (err) => {
98     if (err) return sendError(res, err.message, 400);
99     if (!req.file) return sendError(res, 'No file uploaded', 400);
100     try {
101       const user = await userRepo.updateById(req.user.id, { avatar: req.file.path });
102       sendSuccess(res, { avatar: req.file.path }, 'Avatar updated');
103     } catch (e) {
104       next(e);
105     }
106   });
107 };
108 
109 const sendOtp = wrap(async (req, res) => {
110   const result = await authService.sendOtp(req.body.phone);
111   sendSuccess(res, result, 'OTP sent');
112 });
113 
114 const verifyOtp = wrap(async (req, res) => {
115   const result = await authService.verifyOtpAndLogin(req.body.phone, req.body.code, req.body.name);
116   sendSuccess(res, result, 'Login successful');
117 });
118 
119 module.exports = { googleLogin, sendOtp, verifyOtp, refreshToken, logout, getCurrentUser, updateUserRole, updateProfile, uploadAvatar };
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
7 
8 const OTP_TTL_SECONDS = 300; // 5 minutes
9 const OTP_MAX_ATTEMPTS = 5;
10 const OTP_LOCKOUT_MINUTES = 30;
11 
12 // ─────────────────────────────────────────────────────────────
13 // Google OAuth
14 // ─────────────────────────────────────────────────────────────
15 const loginWithGoogle = async (idToken) => {
16   const payload = _decodeGoogleToken(idToken);
17   const { googleId, email, name, picture } = payload;
18 
19   let user = await authRepo.findByGoogleOrEmail(googleId, email);
20   if (!user) {
21     user = await authRepo.createUser({ googleId, email, name, avatar: picture, role: null });
22   } else {
23     if (!user.googleId) user.googleId = googleId;
24     if (!user.name && name) user.name = name;
25     if (!user.avatar && picture) user.avatar = picture;
26     await authRepo.saveDoc(user);
27   }
28 
29   return _issueTokens(user);
30 };
31 
32 // ─────────────────────────────────────────────────────────────
33 // OTP — Step 1: Send
34 // ─────────────────────────────────────────────────────────────
35 const sendOtp = async (phone) => {
36   let user = await userRepo.findOne({ phone });
37 
38   if (!user) {
39     user = await userRepo.create({ name: phone, phone, role: null });
40   }
41 
42   const otp = generateOtp();
43   user.otpCode = hashOtp(otp);
44   user.otpExpiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);
45   await authRepo.saveDoc(user);
46 
47   await _sendOtpViaSms(phone, otp);
48 
49   logger.info(`[Auth] OTP sent to ${phone}`);
50 
51   return {
52     message: 'OTP sent',
53     expiresIn: OTP_TTL_SECONDS,
54     ...(env.NODE_ENV !== 'production' && { devOtp: otp }),
55   };
56 };
57 
58 // ─────────────────────────────────────────────────────────────
59 // OTP — Step 2: Verify + Login
60 // ─────────────────────────────────────────────────────────────
61 const verifyOtpAndLogin = async (phone, code, name) => {
62   const user = await userRepo.findOne(
63     { phone },
64     '+otpCode +otpExpiresAt +otpAttempts +otpLockedUntil',
65   );
66   if (!user || !user.otpCode) throw new Error('OTP not found — request a new one');
67 
68   // Enforce lockout before anything else
69   if (user.otpLockedUntil && user.otpLockedUntil > new Date()) {
70     const remainingMin = Math.ceil((user.otpLockedUntil.getTime() - Date.now()) / 60000);
71     throw new Error(`LOCKED:${remainingMin}`);
72   }
73 
74   if (user.otpExpiresAt < new Date()) {
75     user.otpCode = undefined;
76     user.otpExpiresAt = undefined;
77     await authRepo.saveDoc(user);
78     throw new Error('OTP expired');
79   }
80 
81   if (!verifyOtp(code, user.otpCode)) {
82     user.otpAttempts = (user.otpAttempts || 0) + 1;
83     if (user.otpAttempts >= OTP_MAX_ATTEMPTS) {
84       user.otpLockedUntil = new Date(Date.now() + OTP_LOCKOUT_MINUTES * 60 * 1000);
85       user.otpAttempts = 0;
86       await authRepo.saveDoc(user);
87       throw new Error(`LOCKED:${OTP_LOCKOUT_MINUTES}`);
88     }
89     const remaining = OTP_MAX_ATTEMPTS - user.otpAttempts;
90     await authRepo.saveDoc(user);
91     throw new Error(`Invalid OTP — ${remaining} ${remaining === 1 ? 'محاولة' : 'محاولات'} متبقية`);
92   }
93 
94   // Success — clear OTP data and reset lockout state
95   user.otpCode = undefined;
96   user.otpExpiresAt = undefined;
97   user.otpAttempts = 0;
98   user.otpLockedUntil = undefined;
99 
100   if (name && (user.name === user.phone || !user.name)) {
101     user.name = name;
102   }
103 
104   await authRepo.saveDoc(user);
105 
106   logger.info(`[Auth] OTP verified for ${phone}`);
107   return _issueTokens(user);
108 };
109 
110 // ─────────────────────────────────────────────────────────────
111 // Refresh token (with rotation)
112 // ─────────────────────────────────────────────────────────────
113 const refreshAccessToken = async (token) => {
114   const decoded = verifyRefreshToken(token);
115   if (!decoded) throw new Error('Invalid refresh token');
116 
117   const user = await authRepo.findByIdAndToken(decoded.id, token);
118   if (!user) throw new Error('Refresh token not found or revoked');
119 
120   const { accessToken, refreshToken: newRefresh } = generateTokens(user._id, user.role);
121 
122   // Rotate: invalidate old token, register new one
123   await authRepo.removeRefreshToken(user._id, token);
124   await authRepo.addRefreshToken(user._id, newRefresh);
125 
126   return { accessToken, refreshToken: newRefresh };
127 };
128 
129 // ─────────────────────────────────────────────────────────────
130 // Logout — single device (specific token) or all devices
131 // ─────────────────────────────────────────────────────────────
132 const logout = async (userId, refreshToken) => {
133   if (refreshToken) {
134     await authRepo.removeRefreshToken(userId, refreshToken);
135   } else {
136     await authRepo.clearAllRefreshTokens(userId);
137   }
138 };
139 
140 // ─────────────────────────────────────────────────────────────
141 // Helpers
142 // ─────────────────────────────────────────────────────────────
143 async function _issueTokens(user) {
144   const { accessToken, refreshToken } = generateTokens(user._id, user.role);
145   await authRepo.addRefreshToken(user._id, refreshToken);
146   const safe = user.toObject();
147   delete safe.refreshTokens;
148   delete safe.otpCode;
149   delete safe.otpExpiresAt;
150   return { user: safe, accessToken, refreshToken };
151 }
152 
153 function _decodeGoogleToken(idToken) {
154   try {
155     const parts = idToken.split('.');
156     if (parts.length === 3) {
157       const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
158       if (payload?.sub) {
159         return {
160           googleId: payload.sub,
161           email: payload.email ?? null,
162           name: payload.name || payload.email?.split('@')[0] || 'مستخدم',
163           picture: payload.picture ?? null,
164         };
165       }
166     }
167   } catch (_) {}
168   return {
169     googleId: `dev_${Date.now()}`,
170     email: `dev_${Date.now()}@temp.com`,
171     name: 'مستخدم مؤقت',
172     picture: null,
173   };
174 }
175 
176 async function _sendOtpViaSms(phone, otp) {
177   if (env.NODE_ENV !== 'production') {
178     logger.info(`[Auth] DEV OTP for ${phone}: ${otp}`);
179     return;
180   }
181   try {
182     const twilio = require('twilio')(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
183     await twilio.messages.create({
184       body: `كود التحقق لتاسك بدر: ${otp} — صالح لمدة 5 دقائق`,
185       from: env.TWILIO_PHONE,
186       to: `+2${phone}`,
187     });
188   } catch (err) {
189     logger.error('[Auth] Twilio send failed', err);
190     throw new Error('Failed to send OTP — please try again');
191   }
192 }
193 
194 module.exports = { loginWithGoogle, sendOtp, verifyOtpAndLogin, refreshAccessToken, logout };
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
23   return Captain.find(filter).populate('userId', 'name avatar phone').lean();
24 };
25 
26 const updateById = (id, update) =>
27   Captain.findByIdAndUpdate(id, update, { new: true });
28 
29 const updateByUserId = (userId, update) =>
30   Captain.findOneAndUpdate({ userId }, update, { new: true });
31 
32 const saveDoc = (doc) => doc.save();
33 
34 module.exports = {
35   findById,
36   findByUserId,
37   findByUserIdPopulated,
38   findNearby,
39   updateById,
40   updateByUserId,
41   saveDoc,
42 };
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
1 const captainRepo = require('./captain.repository');
2 const logger = require('../../config/logger');
3 const { emitToPassengers } = require('../../socket');
4 
5 const LOCATION_THROTTLE_MS = 3000;
6 const DISCONNECT_GRACE_MS = 10000; // 10s grace period before marking offline
7 const _lastDbWrite = new Map();
8 const _disconnectTimers = new Map(); // userId → timeout handle
9 
10 const register = (io, socket) => {
11   if (socket.data.role !== 'captain') return;
12 
13   const userId = socket.data.userId;
14 
15   // ── Go online ────────────────────────────────────────────────────
16   socket.on('captain:go:online', async () => {
17     try {
18       const captain = await captainRepo.findByUserIdPopulated(userId);
19       if (!captain || captain.status !== 'approved') {
20         return socket.emit('error', { code: 'NOT_APPROVED', message: 'Captain not approved' });
21       }
22 
23       // Profile completeness gate
24       if (!captain.vehicleType || !captain.vehicleModel || !captain.plateNumber) {
25         return socket.emit('error', { code: 'PROFILE_INCOMPLETE', message: 'Complete your vehicle profile first' });
26       }
27 
28       captain.isOnline = true;
29       captain.socketId = socket.id;
30       captain.lastActiveAt = new Date();
31       await captainRepo.saveDoc(captain);
32 
33       // Cache Captain._id on socket for fast access in location updates
34       socket.data.captainId = captain._id.toString();
35 
36       emitToPassengers('captain:appear', _formatAppear(captain));
37       socket.emit('captain:online:ack', { isOnline: true });
38 
39       logger.info(`[Captain Socket] ${userId} went online`);
40     } catch (err) {
41       logger.error('[Captain Socket] captain:go:online error', err);
42     }
43   });
44 
45   // ── Go offline ───────────────────────────────────────────────────
46   socket.on('captain:go:offline', () => _setOffline(userId, socket));
47 
48   // ── Location update (high frequency) ────────────────────────────
49   socket.on('captain:location:update', async ({ lat, lng, heading = 0 }) => {
50     if (lat == null || lng == null) return;
51 
52     const captainId = socket.data.captainId;
53     if (!captainId) return; // not online yet
54 
55     // Instant broadcast to passengers (no DB wait)
56     emitToPassengers('captain:move', { captainId, lat, lng, heading });
57 
58     // If captain is in a live trip, also broadcast to the trip room
59     const tripId = socket.data.activeTripId;
60     if (tripId) {
61       io.to(`trip:${tripId}`).emit('trip:location:update', { captainId, lat, lng, heading });
62     }
63 
64     // Throttled DB write
65     const now = Date.now();
66     if (now - (_lastDbWrite.get(userId) ?? 0) < LOCATION_THROTTLE_MS) return;
67     _lastDbWrite.set(userId, now);
68 
69     captainRepo
70       .updateByUserId(userId, {
71         $set: {
72           location: { type: 'Point', coordinates: [lng, lat] },
73           heading,
74           lastLocationAt: new Date(),
75         },
76       })
77       .catch((err) => logger.error('[Captain Socket] location DB write error', err));
78   });
79 
80   // ── Auto-offline on disconnect (with 10s grace period for reconnects) ──
81   socket.on('disconnect', () => {
82     const timer = setTimeout(() => {
83       _disconnectTimers.delete(userId);
84       _setOffline(userId, socket);
85     }, DISCONNECT_GRACE_MS);
86     _disconnectTimers.set(userId, timer);
87   });
88 
89   // Cancel pending offline timer if captain reconnects
90   if (_disconnectTimers.has(userId)) {
91     clearTimeout(_disconnectTimers.get(userId));
92     _disconnectTimers.delete(userId);
93     logger.info(`[Captain Socket] ${userId} reconnected — cancelled offline timer`);
94   }
95 };
96 
97 // ── Private ──────────────────────────────────────────────────────────
98 async function _setOffline(userId, socket) {
99   try {
100     const captain = await captainRepo.findByUserId(userId);
101     if (!captain || !captain.isOnline) return;
102 
103     // Guard against duplicate-socket race: a newer socket may have taken over
104     if (captain.socketId && captain.socketId !== socket.id) return;
105 
106     captain.isOnline = false;
107     captain.socketId = null;
108     captain.lastActiveAt = new Date();
109     await captainRepo.saveDoc(captain);
110 
111     // Use socket.to instead of emitToPassengers so the emitter excludes itself
112     socket.to('passengers').emit('captain:disappear', { captainId: captain._id.toString() });
113     logger.info(`[Captain Socket] ${userId} went offline`);
114   } catch (err) {
115     logger.error('[Captain Socket] _setOffline error', err);
116   }
117 }
118 
119 function _formatAppear(captain) {
120   return {
121     captainId: captain._id.toString(),
122     name: captain.userId?.name,
123     avatar: captain.userId?.avatar,
124     vehicleType: captain.vehicleType,
125     vehicleColor: captain.vehicleColor,
126     lat: captain.location?.coordinates?.[1] ?? 0,
127     lng: captain.location?.coordinates?.[0] ?? 0,
128     heading: captain.heading ?? 0,
129     rating: captain.rating ?? 0,
130   };
131 }
132 
133 module.exports = { register };
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
4 // Thin wrapper — all business logic lives in trip.service
5 const wrap = (fn) => async (req, res, next) => {
6   try { await fn(req, res, next); } catch (err) { next(err); }
7 };
8 
9 // Dispatch-based trip creation — finds nearest captains automatically
10 const searchTrip = wrap(async (req, res) => {
11   const trip = await tripService.searchTrip(req.user.id, req.body.startLocation, req.body.carType);
12   sendSuccess(res, { tripId: trip._id, status: trip.status }, 'Searching for captain', 202);
13 });
14 
15 // Direct trip creation — passenger manually selects captain from map
16 const createTrip = wrap(async (req, res) => {
17   const trip = await tripService.createTrip(req.user.id, req.body.captainId, req.body.startLocation, req.body.carType);
18   sendSuccess(res, trip, 'Trip created', 201);
19 });
20 
21 const acceptTrip = wrap(async (req, res) => {
22   const trip = await tripService.acceptTrip(req.params.id, req.user.id);
23   sendSuccess(res, trip, 'Trip accepted');
24 });
25 
26 const markOnTheWay = wrap(async (req, res) => {
27   const trip = await tripService.markOnTheWay(req.params.id, req.user.id);
28   sendSuccess(res, trip);
29 });
30 
31 const markArrived = wrap(async (req, res) => {
32   const trip = await tripService.markArrived(req.params.id, req.user.id);
33   sendSuccess(res, trip);
34 });
35 
36 const startTrip = wrap(async (req, res) => {
37   const trip = await tripService.startTrip(req.params.id, req.user.id);
38   sendSuccess(res, trip);
39 });
40 
41 const endTrip = wrap(async (req, res) => {
42   const trip = await tripService.endTrip(req.params.id, req.user.id, req.body.distanceKm);
43   sendSuccess(res, trip);
44 });
45 
46 const cancelTrip = wrap(async (req, res) => {
47   const trip = await tripService.cancelTrip(req.params.id, req.user.id, req.user.role, req.body.reason);
48   sendSuccess(res, trip, 'Trip cancelled');
49 });
50 
51 // Cancels the caller's current active trip without requiring a tripId in the URL.
52 // Handles the case where the client sends POST /trips/cancel (no :id segment).
53 const cancelCurrentTrip = wrap(async (req, res) => {
54   const trip = await tripService.cancelCurrentTrip(req.user.id, req.user.role, req.body.reason);
55   sendSuccess(res, trip, 'Trip cancelled');
56 });
57 
58 const getCurrentTrip = wrap(async (req, res) => {
59   const trip = await tripService.getCurrentTrip(req.user.id, req.user.role);
60   sendSuccess(res, trip);
61 });
62 
63 const getTrip = wrap(async (req, res) => {
64   const trip = await tripService.getTrip(req.params.id);
65   if (!trip) return sendError(res, 'Trip not found', 404);
66   sendSuccess(res, trip);
67 });
68 
69 const estimateFare = wrap(async (req, res) => {
70   const { startLocation, endLocation, carType } = req.body;
71   const result = tripService.estimateFare(
72     startLocation.lat, startLocation.lng,
73     endLocation.lat,   endLocation.lng,
74     carType,
75   );
76   sendSuccess(res, result);
77 });
78 
79 const rateCaptain = wrap(async (req, res) => {
80   const trip = await tripService.rateCaptain(req.params.id, req.user.id, req.body);
81   sendSuccess(res, trip, 'Rating submitted');
82 });
83 
84 const ratePassenger = wrap(async (req, res) => {
85   const trip = await tripService.ratePassenger(req.params.id, req.user.id, req.body);
86   sendSuccess(res, trip, 'Rating submitted');
87 });
88 
89 module.exports = {
90   searchTrip,
91   createTrip,
92   acceptTrip,
93   markOnTheWay,
94   markArrived,
95   startTrip,
96   endTrip,
97   cancelTrip,
98   cancelCurrentTrip,
99   rateCaptain,
100   ratePassenger,
101   getCurrentTrip,
102   getTrip,
103   estimateFare,
104 };
```

## File: `src\modules\trip\trip.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const VALID_STATUSES = ['searching', 'accepted', 'onTheWay', 'arrived', 'started', 'ended', 'cancelled'];
4 
5 // Defines which transitions are legal
6 const TRANSITIONS = {
7   searching: ['accepted', 'cancelled'],
8   accepted:  ['onTheWay', 'cancelled'],
9   onTheWay:  ['arrived', 'cancelled'],
10   arrived:   ['started', 'cancelled'],
11   started:   ['ended', 'cancelled'],
12   ended:     [],
13   cancelled: [],
14 };
15 
16 const tripSchema = new mongoose.Schema(
17   {
18     passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
19     captainId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', default: null },
20     carType:     { type: String, enum: ['car', 'motorcycle', 'tukutuk', 'altTukutuk'], required: true },
21     status: {
22       type: String,
23       enum: VALID_STATUSES,
24       default: 'searching',
25     },
26     startLocation: {
27       lat:     { type: Number, required: true },
28       lng:     { type: Number, required: true },
29       address: { type: String },
30     },
31     endLocation: {
32       lat:     Number,
33       lng:     Number,
34       address: String,
35     },
36     distanceKm:   { type: Number, default: 0 },
37     totalFare:    { type: Number, default: 0 },
38     fareBreakdown: {
39       firstKm:   Number,
40       firstFare: Number,
41       extraKm:   Number,
42       extraFare: Number,
43       total:     Number,
44     },
45     cancellationReason: String,
46     cancelledBy: { type: String, enum: ['passenger', 'captain'] },
47 
48     // Ratings
49     passengerRating: { type: Number, min: 1, max: 5 },
50     passengerRatingTags: [String],
51     captainRating: { type: Number, min: 1, max: 5 },
52     captainRatingTags: [String],
53 
54     // State-change timestamps (one per transition)
55     acceptedAt:  Date,
56     onTheWayAt:  Date,
57     arrivedAt:   Date,
58     startedAt:   Date,
59     endedAt:     Date,
60     cancelledAt: Date,
61   },
62   { timestamps: true }
63 );
64 
65 // Guard method used in trip.service to prevent illegal transitions
66 tripSchema.methods.canTransitionTo = function (newStatus) {
67   return (TRANSITIONS[this.status] ?? []).includes(newStatus);
68 };
69 
70 module.exports = mongoose.model('Trip', tripSchema);
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
12 const findOne = (filter) => Trip.findOne(filter);
13 
14 const findOnePopulated = (filter) => _populatedQuery(Trip.findOne(filter));
15 
16 const create = (data) => Trip.create(data);
17 
18 const saveDoc = (doc) => doc.save();
19 
20 // Atomic claim: only succeeds if trip is still in 'searching' status (prevents race conditions)
21 const atomicAccept = (tripId, captainId) =>
22   Trip.findOneAndUpdate(
23     { _id: tripId, status: 'searching' },
24     { $set: { captainId, status: 'accepted', acceptedAt: new Date() } },
25     { new: true },
26   );
27 
28 module.exports = { findById, findByIdPopulated, findOne, findOnePopulated, create, saveDoc, atomicAccept };
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
4 const { calcFareBreakdown } = require('../../utils/fare.util');
5 const { haversineDistance } = require('../../utils/distance.util');
6 const { emitToUser, emitToTrip } = require('../../socket');
7 const notificationService = require('../notification/notification.service');
8 const logger = require('../../config/logger');
9 
10 const ACTIVE_STATUSES = ['searching', 'accepted', 'onTheWay', 'arrived', 'started'];
11 
12 const DISPATCH_TIMEOUT_MS = 15000; // 15s per captain
13 const MAX_DISPATCH_ATTEMPTS = 5;   // max captains before giving up
14 const EXPAND_RADIUS_KM = 10;       // expanded radius after initial failure
15 
16 // In-memory registry of pending dispatch promises
17 // captainUserId → { resolve, reject, timer }
18 const _pending = new Map();
19 
20 // ── Passenger: initiate trip search (dispatch loop) ──────────────────
21 const searchTrip = async (passengerId, startLocation, carType) => {
22   const passenger = await userRepo.findById(passengerId);
23   const trip = await tripRepo.create({ passengerId, carType, startLocation, status: 'searching' });
24 
25   const captains = await captainRepo.findNearby(startLocation.lng, startLocation.lat, 5, carType);
26 
27   // Fire-and-forget — dispatch handles empty list by trying expanded radius then emitting
28   // trip:no_captain_found if nothing works. Passenger always gets the 202 + searching screen.
29   _dispatchLoop(trip, captains, passenger).catch((err) =>
30     logger.error('[Trip Dispatch] unhandled error', err)
31   );
32 
33   return trip;
34 };
35 
36 async function _dispatchLoop(trip, captains, passenger) {
37   const toDispatch = captains.slice(0, MAX_DISPATCH_ATTEMPTS);
38 
39   for (const captain of toDispatch) {
40     const freshTrip = await tripRepo.findById(trip._id);
41     if (!freshTrip || freshTrip.status !== 'searching') return; // Passenger cancelled
42 
43     const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
44     if (!captainUserId) continue;
45 
46     emitToUser(captainUserId, 'trip:request:incoming', {
47       tripId: trip._id.toString(),
48       passenger: { id: passenger._id.toString(), name: passenger.name, avatar: passenger.avatar },
49       startLocation: trip.startLocation,
50       carType: trip.carType,
51     });
52 
53     notificationService.notify(captainUserId, {
54       title: 'طلب رحلة جديد 🚖',
55       body: `راكب بالقرب منك يطلب رحلة`,
56       data: { type: 'trip:request', tripId: trip._id.toString() },
57     }).catch(() => { });
58 
59     const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
60     if (!result?.accepted) continue;
61 
62     // Attempt atomic lock — prevents race conditions if two captains accept simultaneously
63     const locked = await tripRepo.atomicAccept(trip._id, captain._id);
64     if (!locked) continue; // Another captain was faster (shouldn't happen but guards against it)
65 
66     await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
67     const populated = await captainRepo.findByUserIdPopulated(captainUserId);
68 
69     emitToUser(passenger._id.toString(), 'trip:accepted', {
70       tripId: trip._id.toString(),
71       captain: {
72         captainId: captain._id.toString(),
73         name: captain.userId?.name,
74         avatar: captain.userId?.avatar,
75         phone: captain.userId?.phone,
76         vehicleType: captain.vehicleType,
77         vehicleModel: captain.vehicleModel,
78         vehicleColor: captain.vehicleColor,
79         plateNumber: captain.plateNumber,
80         rating: captain.rating ?? 0,
81       },
82     });
83 
84     notificationService.notify(passenger._id, {
85       title: 'تم قبول رحلتك ✓',
86       body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
87       data: { type: 'trip:accepted', tripId: trip._id.toString() },
88     }).catch(() => { });
89 
90     logger.info(`[Trip Dispatch] ${trip._id} accepted by captain ${captainUserId}`);
91     return;
92   }
93 
94   // Initial radius failed — try expanded radius (once, up to 3 more captains)
95   const expanded = await captainRepo.findNearby(
96     trip.startLocation.lng, trip.startLocation.lat, EXPAND_RADIUS_KM, trip.carType
97   );
98   const seenIds = new Set(toDispatch.map((c) => c._id.toString()));
99   const newCaptains = expanded.filter((c) => !seenIds.has(c._id.toString())).slice(0, 3);
100 
101   for (const captain of newCaptains) {
102     const freshTrip = await tripRepo.findById(trip._id);
103     if (!freshTrip || freshTrip.status !== 'searching') return;
104 
105     const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
106     if (!captainUserId) continue;
107 
108     emitToUser(captainUserId, 'trip:request:incoming', {
109       tripId: trip._id.toString(),
110       passenger: { id: passenger._id.toString(), name: passenger.name, avatar: passenger.avatar },
111       startLocation: trip.startLocation,
112       carType: trip.carType,
113     });
114 
115     notificationService.notify(captainUserId, {
116       title: 'طلب رحلة جديد 🚖',
117       body: `راكب بالقرب منك يطلب رحلة`,
118       data: { type: 'trip:request', tripId: trip._id.toString() },
119     }).catch(() => { });
120 
121     const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
122     if (!result?.accepted) continue;
123 
124     const locked = await tripRepo.atomicAccept(trip._id, captain._id);
125     if (!locked) continue;
126 
127     await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
128 
129     emitToUser(passenger._id.toString(), 'trip:accepted', {
130       tripId: trip._id.toString(),
131       captain: {
132         captainId: captain._id.toString(),
133         name: captain.userId?.name,
134         avatar: captain.userId?.avatar,
135         phone: captain.userId?.phone,
136         vehicleType: captain.vehicleType,
137         vehicleModel: captain.vehicleModel,
138         vehicleColor: captain.vehicleColor,
139         plateNumber: captain.plateNumber,
140         rating: captain.rating ?? 0,
141       },
142     });
143 
144     notificationService.notify(passenger._id.toString(), {
145       title: 'تم قبول رحلتك ✓',
146       body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
147       data: { type: 'trip:accepted', tripId: trip._id.toString() },
148     }).catch(() => { });
149 
150     logger.info(`[Trip Dispatch] ${trip._id} accepted (expanded radius) by ${captainUserId}`);
151     return;
152   }
153 
154   // No captain found — cancel trip and notify passenger
155   const finalTrip = await tripRepo.findById(trip._id);
156   if (finalTrip?.status === 'searching') {
157     finalTrip.status = 'cancelled';
158     finalTrip.cancellationReason = 'no_captain_found';
159     finalTrip.cancelledBy = null;
160     finalTrip.cancelledAt = new Date();
161     await tripRepo.saveDoc(finalTrip);
162   }
163   emitToUser(passenger._id.toString(), 'trip:no_captain_found', { tripId: trip._id.toString() });
164   logger.info(`[Trip Dispatch] ${trip._id} — no captain found`);
165 }
166 
167 function _awaitCaptainResponse(captainUserId) {
168   return new Promise((resolve, reject) => {
169     const timer = setTimeout(() => {
170       _pending.delete(captainUserId);
171       reject(new Error('TIMEOUT'));
172     }, DISPATCH_TIMEOUT_MS);
173     _pending.set(captainUserId, { resolve, reject, timer });
174   });
175 }
176 
177 // Called from trip.socket.js when captain emits trip:request:accept
178 const captainAccepted = (captainUserId) => {
179   const entry = _pending.get(captainUserId);
180   if (!entry) return false;
181   clearTimeout(entry.timer);
182   _pending.delete(captainUserId);
183   entry.resolve({ accepted: true });
184   return true;
185 };
186 
187 // Called from trip.socket.js when captain emits trip:request:reject
188 const captainRejected = (captainUserId) => {
189   const entry = _pending.get(captainUserId);
190   if (!entry) return false;
191   clearTimeout(entry.timer);
192   _pending.delete(captainUserId);
193   entry.resolve({ accepted: false });
194   return true;
195 };
196 
197 // ── Passenger: create trip (direct — used for map-tap flow) ──────────
198 const createTrip = async (passengerId, captainId, startLocation, carType = 'car') => {
199   const captain = await captainRepo.findById(captainId);
200   if (!captain || captain.status !== 'approved') throw new Error('Captain not available');
201   if (!captain.isOnline) throw new Error('Captain is offline');
202   if (captain.isOnTrip) throw new Error('Captain is already on a trip');
203 
204   const trip = await tripRepo.create({ passengerId, captainId: captain._id, carType: carType || captain.vehicleType, startLocation });
205 
206   // Resolve passenger name for the notification payload
207   const passenger = await userRepo.findById(passengerId);
208 
209   // Notify captain — they are identified by their User._id on the socket
210   emitToUser(captain.userId.toString(), 'trip:request:incoming', {
211     tripId: trip._id.toString(),
212     passenger: { id: passengerId.toString(), name: passenger?.name, avatar: passenger?.avatar },
213     startLocation,
214   });
215 
216   notificationService.notify(captain.userId.toString(), {
217     title: 'طلب رحلة جديد 🚖',
218     body: `راكب بالقرب منك يطلب رحلة`,
219     data: { type: 'trip:request', tripId: trip._id.toString() },
220   }).catch(() => { });
221 
222   logger.info(`[Trip] created ${trip._id} | passenger=${passengerId} | captain=${captainId}`);
223   return trip;
224 };
225 
226 // ── Captain: accept ───────────────────────────────────────────────────
227 const acceptTrip = async (tripId, captainUserId) => {
228   const trip = await tripRepo.findById(tripId);
229   if (!trip) throw new Error('Trip not found');
230 
231   const captain = await captainRepo.findByUserIdPopulated(captainUserId);
232   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
233   if (!trip.canTransitionTo('accepted')) throw new Error(`Cannot accept from status: ${trip.status}`);
234 
235   trip.status = 'accepted';
236   trip.acceptedAt = new Date();
237   await tripRepo.saveDoc(trip);
238 
239   await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
240 
241   emitToUser(trip.passengerId.toString(), 'trip:accepted', {
242     tripId: trip._id.toString(),
243     captain: {
244       captainId: captain._id.toString(),
245       name: captain.userId?.name,
246       avatar: captain.userId?.avatar,
247       phone: captain.userId?.phone,
248       vehicleType: captain.vehicleType,
249       vehicleModel: captain.vehicleModel,
250       vehicleColor: captain.vehicleColor,
251       plateNumber: captain.plateNumber,
252       rating: captain.rating,
253     },
254   });
255 
256   notificationService.notify(trip.passengerId, {
257     title: 'تم قبول رحلتك ✓',
258     body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
259     data: { type: 'trip:accepted', tripId: trip._id.toString() },
260   }).catch(() => { });
261 
262   logger.info(`[Trip] ${tripId} accepted by ${captainUserId}`);
263   return tripRepo.findByIdPopulated(tripId);
264 };
265 
266 // ── Captain: status transitions (onTheWay / arrived / started) ────────
267 const _captainTransition = async (tripId, captainUserId, newStatus) => {
268   const trip = await tripRepo.findById(tripId);
269   if (!trip) throw new Error('Trip not found');
270 
271   const captain = await captainRepo.findByUserId(captainUserId);
272   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
273   if (!trip.canTransitionTo(newStatus)) throw new Error(`Cannot transition to ${newStatus} from ${trip.status}`);
274 
275   const tsField = { onTheWay: 'onTheWayAt', arrived: 'arrivedAt', started: 'startedAt' }[newStatus];
276   trip.status = newStatus;
277   if (tsField) trip[tsField] = new Date();
278   await tripRepo.saveDoc(trip);
279 
280   emitToTrip(tripId, 'trip:status:update', { tripId, status: newStatus });
281 
282   if (newStatus === 'arrived') {
283     notificationService.notify(trip.passengerId, {
284       title: 'الكابتن وصل 🚗',
285       body: 'الكابتن في موقعك، توجه إليه',
286       data: { type: 'captain:arrived', tripId },
287     }).catch(() => { });
288   }
289 
290   if (newStatus === 'started') {
291     notificationService.notify(trip.passengerId, {
292       title: 'انطلقت رحلتك 🚀',
293       body: 'الكابتن بدأ الرحلة — استمتع بالرحلة',
294       data: { type: 'trip:started', tripId },
295     }).catch(() => { });
296   }
297 
298   logger.info(`[Trip] ${tripId} → ${newStatus}`);
299   return trip;
300 };
301 
302 const markOnTheWay = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'onTheWay');
303 const markArrived = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'arrived');
304 const startTrip = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'started');
305 
306 // ── Captain: end trip ─────────────────────────────────────────────────
307 const endTrip = async (tripId, captainUserId, distanceKm) => {
308   const trip = await tripRepo.findById(tripId);
309   if (!trip) throw new Error('Trip not found');
310 
311   const captain = await captainRepo.findByUserId(captainUserId);
312   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
313   if (!trip.canTransitionTo('ended')) throw new Error(`Cannot end from status: ${trip.status}`);
314 
315   const fare = calcFareBreakdown(distanceKm, trip.carType);
316   trip.status = 'ended';
317   trip.endedAt = new Date();
318   trip.distanceKm = distanceKm;
319   trip.totalFare = fare.total;
320   trip.fareBreakdown = fare;
321   await tripRepo.saveDoc(trip);
322 
323   await captainRepo.updateByUserId(captainUserId, { isOnTrip: false, $inc: { totalTrips: 1 } });
324 
325   emitToTrip(tripId, 'trip:status:update', { tripId, status: 'ended', fare });
326 
327   notificationService.notify(trip.passengerId, {
328     title: 'وصلت! 🎉',
329     body: `المبلغ الإجمالي: ${fare.total} ريال`,
330     data: { type: 'trip:ended', tripId, fare: String(fare.total) },
331   }).catch(() => { });
332 
333   notificationService.notify(captainUserId, {
334     title: 'انتهت الرحلة ✓',
335     body: `المبلغ: ${fare.total} ريال — ${distanceKm.toFixed(1)} كم`,
336     data: { type: 'trip:ended', tripId, fare: String(fare.total) },
337   }).catch(() => { });
338 
339   logger.info(`[Trip] ${tripId} ended | km=${distanceKm} | fare=${fare.total}`);
340   return trip;
341 };
342 
343 // ── Either party: cancel active trip (no tripId needed) ──────────────
344 // Used by POST /trips/cancel — resolves the caller's current active trip
345 // then delegates to the normal cancelTrip flow.
346 // أضف هذه الوظيفة أو عدّل الموجودة
347 // داخل src/modules/trip/trip.service.js
348 
349 const cancelCurrentTrip = async (userId, role, reason) => {
350   let trip;
351   if (role === 'passenger') {
352     trip = await tripRepo.findOne({ passengerId: userId, status: { $in: ACTIVE_STATUSES } });
353   } else if (role === 'captain') {
354     const captain = await captainRepo.findByUserId(userId);
355     if (!captain) throw Object.assign(new Error('Captain profile not found'), { status: 404 });
356     trip = await tripRepo.findOne({ captainId: captain._id, status: { $in: ACTIVE_STATUSES } });
357   }
358   // ✅ عدّل هذا الجزء - لا ترمي خطأ، بل ارجع نجاحاً
359   if (!trip) {
360     return { message: 'No active trip found, assuming already cancelled', alreadyCancelled: true };
361   }
362   return cancelTrip(trip._id.toString(), userId, role, reason);
363 };
364 
365 // ── Either party: cancel ──────────────────────────────────────────────
366 const cancelTrip = async (tripId, userId, role, reason) => {
367   const trip = await tripRepo.findById(tripId);
368   if (!trip) throw new Error('Trip not found');
369 
370   // ✅ أضف هذا الشرط أولاً - إذا كانت الرحلة ملغاة بالفعل
371   if (trip.status === 'cancelled') {
372     return { message: 'Trip already cancelled', alreadyCancelled: true };
373   }
374 
375   if (!trip.canTransitionTo('cancelled')) throw new Error('Cannot cancel trip in current state');
376 
377   if (role === 'passenger') {
378     if (trip.passengerId.toString() !== userId.toString()) throw new Error('Unauthorized');
379   } else if (role === 'captain') {
380     const captain = await captainRepo.findByUserId(userId);
381     if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
382     await captainRepo.updateByUserId(userId, { isOnTrip: false });
383   }
384 
385   trip.status = 'cancelled';
386   trip.cancelledAt = new Date();
387   trip.cancellationReason = reason || null;
388   trip.cancelledBy = role;
389   await tripRepo.saveDoc(trip);
390 
391   emitToTrip(tripId, 'trip:cancelled', { tripId, reason: reason || null, cancelledBy: role });
392 
393   // Notify the OTHER party
394   const otherPartyId = role === 'passenger'
395     ? trip.captainId && (await captainRepo.findById(trip.captainId))?.userId
396     : trip.passengerId;
397   if (otherPartyId) {
398     notificationService.notify(otherPartyId, {
399       title: 'تم إلغاء الرحلة',
400       body: role === 'passenger' ? 'قام الراكب بإلغاء الرحلة' : 'قام الكابتن بإلغاء الرحلة',
401       data: { type: 'trip:cancelled', tripId },
402     }).catch(() => { });
403   }
404 
405   logger.info(`[Trip] ${tripId} cancelled by ${role}`);
406   return trip;
407 };
408 
409 // ── Rating ────────────────────────────────────────────────────────────
410 
411 const rateCaptain = async (tripId, passengerId, { rating, tags = [] }) => {
412   const trip = await tripRepo.findById(tripId);
413   if (!trip) throw Object.assign(new Error('Trip not found'), { status: 404 });
414   if (trip.passengerId.toString() !== passengerId.toString())
415     throw Object.assign(new Error('Unauthorized'), { status: 403 });
416   if (trip.status !== 'ended')
417     throw Object.assign(new Error('Trip not ended'), { status: 400 });
418   if (trip.passengerRating)
419     throw Object.assign(new Error('Already rated'), { status: 409 });
420 
421   trip.passengerRating = rating;
422   trip.passengerRatingTags = tags;
423   await tripRepo.saveDoc(trip);
424 
425   // Update captain's rolling average rating
426   const captain = await captainRepo.findById(trip.captainId);
427   if (captain) {
428     const newCount = captain.totalTrips || 1;
429     const oldRating = captain.rating || 0;
430     const newRating = ((oldRating * (newCount - 1)) + rating) / newCount;
431     await captainRepo.updateById(trip.captainId, { rating: Math.min(5, newRating) });
432   }
433 
434   logger.info(`[Rating] trip=${tripId} captain rated ${rating} by passenger`);
435   return trip;
436 };
437 
438 const ratePassenger = async (tripId, captainUserId, { rating, tags = [] }) => {
439   const trip = await tripRepo.findById(tripId);
440   if (!trip) throw Object.assign(new Error('Trip not found'), { status: 404 });
441 
442   const captain = await captainRepo.findByUserId(captainUserId);
443   if (!captain || trip.captainId.toString() !== captain._id.toString())
444     throw Object.assign(new Error('Unauthorized'), { status: 403 });
445   if (trip.status !== 'ended')
446     throw Object.assign(new Error('Trip not ended'), { status: 400 });
447   if (trip.captainRating)
448     throw Object.assign(new Error('Already rated'), { status: 409 });
449 
450   trip.captainRating = rating;
451   trip.captainRatingTags = tags;
452   await tripRepo.saveDoc(trip);
453 
454   logger.info(`[Rating] trip=${tripId} passenger rated ${rating} by captain`);
455   return trip;
456 };
457 
458 // ── GET /trips/current ────────────────────────────────────────────────
459 const getCurrentTrip = async (userId, role) => {
460   if (role === 'passenger') {
461     return tripRepo.findOnePopulated({ passengerId: userId, status: { $in: ACTIVE_STATUSES } });
462   }
463   if (role === 'captain') {
464     const captain = await captainRepo.findByUserId(userId);
465     if (!captain) return null;
466     return tripRepo.findOnePopulated({ captainId: captain._id, status: { $in: ACTIVE_STATUSES } });
467   }
468   return null;
469 };
470 
471 const getTrip = (tripId) => tripRepo.findByIdPopulated(tripId);
472 
473 // ── POST /trips/estimate ──────────────────────────────────────────────
474 const estimateFare = (startLat, startLng, endLat, endLng, carType = 'car') => {
475   const distanceKm = haversineDistance(startLat, startLng, endLat, endLng);
476   return { distanceKm: Math.round(distanceKm * 100) / 100, ...calcFareBreakdown(distanceKm, carType) };
477 };
478 
479 module.exports = {
480   searchTrip,
481   estimateFare,
482   captainAccepted,
483   captainRejected,
484   createTrip,
485   acceptTrip,
486   markOnTheWay,
487   markArrived,
488   startTrip,
489   endTrip,
490   cancelTrip,
491   cancelCurrentTrip,
492   rateCaptain,
493   ratePassenger,
494   getCurrentTrip,
495   getTrip,
496 };
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
13   carType:       Joi.string().valid(...CAR_TYPES).required(),
14 });
15 
16 const createTripSchema = Joi.object({
17   captainId:     Joi.string().hex().length(24).required(),
18   carType:       Joi.string().valid(...CAR_TYPES).optional(),
19   startLocation: locationSchema.required(),
20 });
21 
22 const endTripSchema = Joi.object({
23   distanceKm: Joi.number().min(0).required(),
24 });
25 
26 const cancelTripSchema = Joi.object({
27   reason: Joi.string().max(300).optional().allow('', null),
28 });
29 
30 const estimateFareSchema = Joi.object({
31   startLocation: locationSchema.required(),
32   endLocation:   locationSchema.required(),
33   carType:       Joi.string().valid(...CAR_TYPES).required(),
34 });
35 
36 module.exports = { searchTripSchema, createTripSchema, endTripSchema, cancelTripSchema, estimateFareSchema };
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
1 const { Server } = require('socket.io');
2 const env = require('../config/env');
3 const { verifyAccessToken } = require('../utils/jwt.util');
4 const logger = require('../config/logger');
5 
6 let io;
7 
8 // In-memory presence map: userId → Set<socketId>
9 // Replace with Redis adapter for horizontal scaling
10 const _presence = new Map();
11 
12 const _addPresence = (userId, socketId) => {
13   if (!_presence.has(userId)) _presence.set(userId, new Set());
14   _presence.get(userId).add(socketId);
15 };
16 
17 const _removePresence = (userId, socketId) => {
18   const sockets = _presence.get(userId);
19   if (!sockets) return;
20   sockets.delete(socketId);
21   if (sockets.size === 0) _presence.delete(userId);
22 };
23 
24 const initSocket = (server) => {
25   io = new Server(server, {
26     cors: {
27       origin: env.SOCKET_CORS_ORIGIN || '*',
28       methods: ['GET', 'POST'],
29       credentials: true,
30     },
31   });
32 
33   // JWT auth middleware — runs before every connection
34   io.use((socket, next) => {
35     const authHeader = socket.handshake.headers.authorization;
36     if (!authHeader?.startsWith('Bearer ')) {
37       return next(new Error('UNAUTHORIZED'));
38     }
39     const token = authHeader.split(' ')[1];
40     const decoded = verifyAccessToken(token);
41     if (!decoded) {
42       return next(new Error('INVALID_TOKEN'));
43     }
44     socket.data.userId = decoded.id.toString();
45     socket.data.role = decoded.role;
46     next();
47   });
48 
49   io.on('connection', (socket) => {
50     const { userId, role } = socket.data;
51     logger.info(`[Socket] connected ${socket.id} | user=${userId} | role=${role}`);
52 
53     // Track presence
54     _addPresence(userId, socket.id);
55 
56     // Personal room — enables targeted messages to any user
57     socket.join(`user:${userId}`);
58 
59     // Role rooms
60     if (role === 'passenger') socket.join('passengers');
61 
62     // Register per-module handlers (lazy require avoids circular deps at load time)
63     require('../modules/captain/captain.socket').register(io, socket);
64     require('../modules/trip/trip.socket').register(io, socket);
65 
66     socket.on('disconnect', (reason) => {
67       _removePresence(userId, socket.id);
68       logger.info(`[Socket] disconnected ${socket.id} | user=${userId} | reason=${reason}`);
69     });
70   });
71 
72   return io;
73 };
74 
75 const getIo = () => {
76   if (!io) throw new Error('Socket.IO not initialized');
77   return io;
78 };
79 
80 // Emit to a specific user's personal room
81 const emitToUser = (userId, event, data) => {
82   if (!io) return;
83   io.to(`user:${userId}`).emit(event, data);
84 };
85 
86 // Emit to all sockets inside a trip room
87 const emitToTrip = (tripId, event, data) => {
88   if (!io) return;
89   io.to(`trip:${tripId}`).emit(event, data);
90 };
91 
92 // Emit to all online passengers
93 const emitToPassengers = (event, data) => {
94   if (!io) return;
95   io.to('passengers').emit(event, data);
96 };
97 
98 // Check if a user has at least one active socket connection
99 const isUserOnline = (userId) => _presence.has(userId.toString());
100 
101 // Get all currently online userIds
102 const getOnlineUserIds = () => Array.from(_presence.keys());
103 
104 module.exports = { initSocket, getIo, emitToUser, emitToTrip, emitToPassengers, isUserOnline, getOnlineUserIds };
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
23     this._ttlMs   = ttlMs;
24     this._map     = new Map(); // insertion-order Map → oldest entry is first
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
61 const _MIN  = 60_000;
62 const _HOUR = 60 * _MIN;
63 const _DAY  = 24 * _HOUR;
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
105 const autocompleteCache = new LruCache({ maxSize: 2000,  ttlMs: 24 * _HOUR });
106 
107 /** Place details by place_id — very stable data, long TTL */
108 const placeDetailsCache = new LruCache({ maxSize: 2000, ttlMs: 24 * _HOUR });
109 
110 /** Nearby search results — location-sensitive, short TTL */
111 const nearbyCache       = new LruCache({ maxSize: 300,  ttlMs: 10 * _MIN });
112 
113 /** Reverse geocode — stable results, long TTL, fine grid */
114 const reverseCache      = new LruCache({ maxSize: 2000, ttlMs: 24 * _HOUR });
115 
116 /** Route polylines — semi-stable, medium TTL */
117 const polylineCache     = new LruCache({ maxSize: 500,  ttlMs: 10 * _MIN });
118 
119 // ── Key builders ──────────────────────────────────────────────────────────────
120 
121 /**
122  * @param {string} input   Raw user query
123  * @param {number|null} lat  Nullable location bias latitude
124  * @param {number|null} lng  Nullable location bias longitude
125  */
126 function autocompleteKey(input, lat, lng) {
127   const loc = (lat != null && lng != null) ? `@${snapLatLng(lat, lng, 2)}` : '';
128   return `ac:${normalizeQuery(input)}${loc}`;
129 }
130 
131 /** @param {string} placeId */
132 const placeDetailsKey = (placeId) => `pd:${placeId}`;
133 
134 /**
135  * @param {number} lat
136  * @param {number} lng
137  * @param {number} radius  in metres
138  * @param {number} limit
139  */
140 const nearbyKey = (lat, lng, radius, limit) =>
141   `nb:${snapLatLng(lat, lng, 2)}:r${radius}:l${limit}`;
142 
143 /**
144  * @param {number} lat
145  * @param {number} lng
146  */
147 const reverseKey = (lat, lng) => `rv:${snapLatLng(lat, lng, 4)}`;
148 
149 /**
150  * @param {number} originLat
151  * @param {number} originLng
152  * @param {number} destLat
153  * @param {number} destLng
154  */
155 const polylineKey = (originLat, originLng, destLat, destLng) =>
156   `pl:${snapLatLng(originLat, originLng, 4)}->${snapLatLng(destLat, destLng, 4)}`;
157 
158 // ── Exports ───────────────────────────────────────────────────────────────────
159 
160 module.exports = {
161   LruCache,
162   normalizeQuery,
163   snapLatLng,
164   // cache instances
165   autocompleteCache,
166   placeDetailsCache,
167   nearbyCache,
168   reverseCache,
169   polylineCache,
170   // key builders
171   autocompleteKey,
172   placeDetailsKey,
173   nearbyKey,
174   reverseKey,
175   polylineKey,
176   // TTL constants (re-exported for tests / config)
177   TTL: { MIN: _MIN, HOUR: _HOUR, DAY: _DAY },
178 };
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

