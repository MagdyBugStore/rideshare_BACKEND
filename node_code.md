## File: `.env.example`

```text
1 NODE_ENV=development
2 PORT=3000
3 
4 MONGO_URI=mongodb://localhost:27017/wasalni
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
16 
17 # Optional: for later features
18 CLOUDINARY_URL=cloudinary://...
19 
20 CLOUDINARY_CLOUD_NAME=your_cloud_name
21 CLOUDINARY_API_KEY=your_api_key
22 CLOUDINARY_API_SECRET=your_api_secret
```

## File: `app.js`

```javascript
```

## File: `package.json`

```json
1 {
2   "name": "wasalni-backend",
3   "version": "1.0.0",
4   "description": "وصّلني - backend with Node.js, Express, MongoDB",
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
20     "google-auth-library": "^9.1.0",
21     "helmet": "^7.1.0",
22     "joi": "^17.11.0",
23     "jsonwebtoken": "^9.0.2",
24     "mongoose": "^8.0.0",
25     "morgan": "^1.10.0",
26     "multer": "^2.1.1",
27     "multer-storage-cloudinary": "^4.0.0",
28     "socket.io": "^4.8.3",
29     "socket.io-client": "^4.8.3",
30     "twilio": "^4.19.0",
31     "winston": "^3.19.0"
32   },
33   "devDependencies": {
34     "nodemon": "^3.0.1"
35   }
36 }
```

## File: `postman_collection.json`

```json
1 {
2     "info": {
3         "name": "Wasalni Admin APIs",
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
5 const authRoutes = require('./modules/auth/auth.routes');
6 const captainRoutes = require('./modules/captain/captain.routes');
7 const tripRoutes = require('./modules/trip/trip.routes');
8 const reviewRoutes = require('./modules/review/review.routes');
9 const adminRoutes = require('./modules/admin/admin.routes');
10 const errorHandler = require('./middlewares/error.middleware');
11 const passengerRoutes = require('./modules/passenger/passenger.routes');
12 const fareRoutes = require('./modules/fare/fare.routes');
13 const seedRoutes = require('./modules/seed/seed.routes');
14 const app = express();
15 
16 // Middlewares
17 app.use(helmet());
18 app.use(cors({
19   origin: process.env.CORS_ORIGIN?.split(',') || '*',
20   credentials: true,
21 }));
22 app.use(express.json());
23 app.use(morgan('dev'));
24 
25 // Routes
26 app.use('/api/auth', authRoutes);
27 app.use('/api/captain', captainRoutes);
28 app.use('/api/trips', tripRoutes);
29 app.use('/api/reviews', reviewRoutes);
30 app.use('/api/admin', adminRoutes);
31 app.use('/api/passenger', passengerRoutes); 
32 app.use('/api/auth', authRoutes);
33 app.use('/api/captain', captainRoutes);
34 app.use('/api/fares', fareRoutes);
35 app.use('/api/seed', seedRoutes);
36 
37 app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
38 
39 app.use(errorHandler);
40 
41 module.exports = app;
```

## File: `src\server.js`

```javascript
1 const app = require('./app');
2 const connectDB = require('./config/db');
3 const env = require('./config/env');
4 const { initSocket } = require('./socket');
5 const os = require('os'); 
6 
7 const getLocalExternalIP = () => {
8     const interfaces = os.networkInterfaces();
9     for (const name of Object.keys(interfaces)) {
10         for (const iface of interfaces[name]) {
11             // بنبحث عن IPv4 ويكون مش internal (عشان نتخطى 127.0.0.1)
12             if (iface.family === 'IPv4' && !iface.internal) {
13                 return iface.address;
14             }
15         }
16     }
17     return 'localhost';
18 };
19 
20 const startServer = async () => {
21     await connectDB();
22   const server = app.listen(env.PORT, '0.0.0.0', () => { // '0.0.0.0' بتسمح للجهاز يستقبل اتصالات من بره الـ localhost
23         const ip = getLocalExternalIP();
24         console.log(`🚀 Server running on:`);
25         console.log(`   🏠 Local:   http://localhost:${env.PORT}`);
26         console.log(`   🌐 Network: http://${ip}:${env.PORT}`);
27     });
28     initSocket(server);
29 };
30 
31 startServer();
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
9   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
10   JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '60d',
11   TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
12   TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
13   TWILIO_PHONE: process.env.TWILIO_PHONE,
14   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
15   SOCKET_CORS_ORIGIN: process.env.SOCKET_CORS_ORIGIN || '*',
16   CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
17   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
18   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
19   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
20 };
21 
22 // Validation
23 if (!env.JWT_SECRET || !env.JWT_REFRESH_SECRET) {
24   console.error('❌ Missing JWT secrets in .env');
25   process.exit(1);
26 }
27 
28 module.exports = env;
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
9     let testUser = await User.findOne({ email: 'test@wasalni.com' });
10     if (!testUser) {
11       testUser = await User.create({
12         name: 'كابتن تجريبي',
13         email: 'test@wasalni.com',
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
4   console.error('❌ Error:', err.stack);
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
9       return sendError(res, 'Forbidden: insufficient permissions', 403);
10     }
11     next();
12   };
13 };
14 
15 module.exports = { requireRole };
```

## File: `src\middlewares\upload.middleware.js`

```javascript
1 const multer = require('multer');
2 const { CloudinaryStorage } = require('multer-storage-cloudinary');
3 const cloudinary = require('../config/cloudinary');
4 
5 const storage = new CloudinaryStorage({
6   cloudinary: cloudinary,
7   params: {
8     folder: 'wasalni/documents',
9     allowed_formats: ['jpg', 'png', 'pdf'],
10     transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
11   },
12 });
13 
14 const upload = multer({ storage });
15 
16 // Middleware for multiple fields
17 const uploadDocuments = upload.fields([
18   { name: 'nationalId', maxCount: 1 },
19   { name: 'driverLicense', maxCount: 1 },
20   { name: 'vehicleLicense', maxCount: 1 },
21 ]);
22 
23 module.exports = { uploadDocuments };
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
138   captain.rejectionReason = null;
139   await captain.save();
140 
141   // تحديث دور المستخدم إلى 'captain'
142   await User.findByIdAndUpdate(captain.userId, { role: 'captain' });
143 
144   return captain;
145 };
146 
147 const rejectCaptain = async (captainId, reason) => {
148   const captain = await Captain.findById(captainId);
149   if (!captain) throw new Error('الكابتن غير موجود');
150 
151   captain.status = 'rejected';
152   captain.rejectionReason = reason || 'تم الرفض من قبل الإدارة';
153   await captain.save();
154 
155   return captain;
156 };
157 
158 // ========== إدارة الرحلات ==========
159 const createTrip = async (tripData) => {
160   const { passengerId, captainId, startLocation, distanceKm, totalFare } = tripData;
161 
162   const passenger = await User.findById(passengerId);
163   if (!passenger) throw new Error('الراكب غير موجود');
164 
165   const captain = await Captain.findById(captainId);
166   if (!captain) throw new Error('الكابتن غير موجود');
167 
168   const trip = await Trip.create({
169     passengerId,
170     captainId,
171     startLocation,
172     distanceKm: distanceKm || 0,
173     totalFare: totalFare || 0,
174     status: 'pending',
175   });
176 
177   return trip;
178 };
179 
180 const deleteTrip = async (tripId) => {
181   const trip = await Trip.findById(tripId);
182   if (!trip) throw new Error('الرحلة غير موجودة');
183   await trip.deleteOne();
184   return { message: 'تم حذف الرحلة بنجاح' };
185 };
186 
187 module.exports = {
188   getAllUsers,
189   updateUser,
190   deleteUser,
191   getAllCaptains,
192   createCaptain,
193   updateCaptain,
194   deleteCaptain,
195   getPendingCaptains,
196   approveCaptain,
197   rejectCaptain,
198   createTrip,
199   deleteTrip,
200 };
```

## File: `src\modules\auth\auth.controller.js`

```javascript
1 const authService = require('./auth.service');
2 const { sendSuccess, sendError } = require('../../utils/response.util');
3 const User = require('../user/user.model');
4 const { generateApplicationCode } = require('../../utils/code.util');
5 const Captain = require('../captain/captain.model');
6 
7 
8 
9 const googleLogin = async (req, res, next) => {
10   try {
11     const { idToken } = req.body;
12     if (!idToken) return sendError(res, 'idToken required', 400);
13     const { user, accessToken, refreshToken } = await authService.verifyGoogle(idToken);
14     sendSuccess(res, { user, accessToken, refreshToken }, 'Google login successful');
15   } catch (error) {
16     next(error);
17   }
18 };
19 
20 const refreshToken = async (req, res, next) => {
21   try {
22     const { refreshToken } = req.body;
23     if (!refreshToken) return sendError(res, 'Refresh token required', 400);
24     const { accessToken } = await authService.refreshAccessToken(refreshToken);
25     sendSuccess(res, { accessToken }, 'Token refreshed');
26   } catch (error) {
27     next(error);
28   }
29 };
30 
31 const logout = async (req, res, next) => {
32   try {
33     const userId = req.user.id; // from auth middleware
34     await authService.logout(userId);
35     sendSuccess(res, null, 'Logged out successfully');
36   } catch (error) {
37     next(error);
38   }
39 };
40 const getCurrentUser = async (req, res, next) => {
41   try {
42     const userId = req.user.id;
43     const user = await User.findById(userId).select('-refreshToken');
44     if (!user) {
45       return sendError(res, 'User not found', 404);
46     }
47 
48     let captain = null;
49     if (user.role === 'captain') {
50       captain = await Captain.findOne({ userId: user._id }).select('status isOnline applicationStatus rejectionReason vehicleType vehicleModel plateNumber vehicleColor');
51     }
52 
53     sendSuccess(res, { user, captain });
54   } catch (error) {
55     next(error);
56   }
57 };
58 
59 const updateUserRole = async (req, res, next) => {
60   try {
61     const userId = req.user.id;
62     const { role } = req.body;
63 
64     if (!['passenger', 'captain'].includes(role)) {
65       return sendError(res, 'دور غير صالح', 400);
66     }
67 
68     const user = await User.findByIdAndUpdate(
69       userId,
70       { role },
71       { new: true, runValidators: true }
72     ).select('-refreshToken -otpCode -otpExpiresAt');
73 
74     if (!user) {
75       return sendError(res, 'المستخدم غير موجود', 404);
76     }
77 
78     // إذا اختار كابتن، أنشئ له applicationCode
79     let applicationCode = null;
80     if (role === 'captain') {
81       const existingCaptain = await Captain.findOne({ userId: user._id });
82       if (!existingCaptain) {
83         const code = generateApplicationCode();
84         await Captain.create({
85           userId: user._id,
86           applicationCode: code,
87           applicationStatus: 'pending_approval',
88           status: 'pending_review',
89         });
90         applicationCode = code;
91       }
92     }
93 
94     sendSuccess(res, { user, applicationCode }, 'تم تحديث الدور بنجاح');
95   } catch (error) {
96     next(error);
97   }
98 };
99 module.exports = {
100   googleLogin,
101   refreshToken,
102   logout,
103   getCurrentUser,
104   updateUserRole,
105 };
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
9 router.post('/google', validate(validation.googleSchema), controller.googleLogin);
10 router.post('/refresh-token', validate(validation.refreshSchema), controller.refreshToken);
11 router.post('/logout', authMiddleware, controller.logout);
12 router.get('/me', authMiddleware, controller.getCurrentUser);
13 router.patch('/role', authMiddleware, validate(validation.updateRoleSchema), controller.updateUserRole);
14 module.exports = router;
```

## File: `src\modules\auth\auth.service.js`

```javascript
1 const User = require('../user/user.model');
2 const { generateTokens, verifyRefreshToken } = require('../../utils/jwt.util');
3 const { generateOtp, hashOtp, verifyOtp } = require('../../utils/otp.util');
4 const env = require('../../config/env');
5 const twilio = require('twilio')(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
6 const { OAuth2Client } = require('google-auth-library');
7 
8 const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);
9 
10 // -------------------- Google --------------------
11 const verifyGoogle = async (idToken) => {
12   // TODO: Re-enable proper ID token verification in production
13   // For development: decode token without verification
14   const decodeBase64 = (str) => {
15     try {
16       return JSON.parse(Buffer.from(str, 'base64').toString());
17     } catch (e) {
18       return null;
19     }
20   };
21 
22   const tokenParts = idToken.split('.');
23   let payload = null;
24   if (tokenParts.length === 3) {
25     payload = decodeBase64(tokenParts[1]);
26   }
27 
28   let googleId, email, name, picture;
29 
30   if (payload && payload.sub) {
31     googleId = payload.sub;
32     email = payload.email;
33     name = payload.name || email?.split('@')[0] || 'مستخدم Google';
34     picture = payload.picture;
35   } else {
36     // Fallback for testing
37     googleId = `temp_${Date.now()}`;
38     email = `user_${Date.now()}@temp.com`;
39     name = 'مستخدم مؤقت';
40     picture = null;
41   }
42 
43   // التأكد من وجود name
44   if (!name || name.trim() === '') {
45     name = 'مستخدم';
46   }
47 
48   let user = await User.findOne({ $or: [{ googleId }, { email }] });
49   if (!user) {
50     user = await User.create({
51       googleId,
52       email,
53       name,
54       avatar: picture,
55       role: null
56     });
57   } else if (!user.googleId) {
58     user.googleId = googleId;
59     if (!user.name && name) user.name = name;
60     if (!user.avatar && picture) user.avatar = picture;
61     await user.save();
62   }
63 
64   const { accessToken, refreshToken } = generateTokens(user._id, user.role);
65   user.refreshToken = refreshToken;
66   await user.save();
67 
68   return { user, accessToken, refreshToken };
69 };
70 
71 // -------------------- Refresh --------------------
72 const refreshAccessToken = async (refreshToken) => {
73   const decoded = verifyRefreshToken(refreshToken);
74   if (!decoded) throw new Error('Invalid refresh token');
75 
76   const user = await User.findOne({ _id: decoded.id, refreshToken });
77   if (!user) throw new Error('Refresh token not found');
78 
79   const { accessToken } = generateTokens(user._id, user.role);
80   return { accessToken };
81 };
82 
83 // -------------------- Logout --------------------
84 const logout = async (userId) => {
85   await User.findByIdAndUpdate(userId, { refreshToken: null });
86   return true;
87 };
88 
89 module.exports = {
90   verifyGoogle,
91   refreshAccessToken,
92   logout,
93 };
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
17 const toggleOnlineSchema = Joi.object({
18   isOnline: Joi.boolean().required(),
19 });
20 const updateRoleSchema = Joi.object({
21   role: Joi.string().valid('passenger', 'captain').required(),
22 });
23 module.exports = {
24   googleSchema,
25   refreshSchema,
26   registerCaptainSchema,
27   toggleOnlineSchema,
28   updateRoleSchema,
29 };
```

## File: `src\modules\captain\captain.controller.js`

```javascript
1 const captainService = require('./captain.service');
2 const { sendSuccess, sendError } = require('../../utils/response.util');
3 const { generateApplicationCode } = require('../../utils/code.util');
4 const Captain = require('./captain.model');
5 
6 const register = async (req, res, next) => {
7   try {
8     const userId = req.user.id;
9     const data = req.body;
10     const captain = await captainService.registerCaptain(userId, data);
11     sendSuccess(res, captain, 'Captain registered successfully', 201);
12   } catch (error) {
13     next(error);
14   }
15 };
16 
17 const uploadDocs = async (req, res, next) => {
18   try {
19     const userId = req.user.id;
20     const files = req.files;
21     const result = await captainService.uploadDocuments(userId, files);
22     sendSuccess(res, result, 'Documents uploaded');
23   } catch (error) {
24     next(error);
25   }
26 };
27 
28 const getStatus = async (req, res, next) => {
29   try {
30     const userId = req.user.id;
31     const status = await captainService.getCaptainStatus(userId);
32     sendSuccess(res, status);
33   } catch (error) {
34     next(error);
35   }
36 };
37 
38 const getNearbyDrivers = async (req, res, next) => {
39   if (process.env.NODE_ENV === 'development') {
40     const { lat, lng } = req.query;
41     const captains = await Captain.find({
42       status: 'approved',
43       isOnline: true,
44     })
45       .populate('userId', 'name phone avatar')
46       .lean();
47 
48     return captains.map(c => ({
49       captain_id: c._id.toString(),
50       name: c.userId.name,
51       phone: c.userId.phone || '',
52       avatar: c.userId.avatar,
53       vehicle_type: c.vehicleType,
54       vehicle_model: c.vehicleModel,
55       vehicle_color: c.vehicleColor || '',
56       plate_number: c.plateNumber,
57       lat: c.location?.coordinates?.[1] || lat,
58       lng: c.location?.coordinates?.[0] || lng,
59       status: c.isOnline ? 'available' : 'busy',
60       rating: c.rating || 0,
61       total_trips: c.totalTrips || 0,
62     }));
63   }
64 };
65 
66 const toggleOnline = async (req, res, next) => {
67   try {
68     const userId = req.user.id;
69     const { isOnline } = req.body;
70     const captain = await captainService.toggleOnline(userId, isOnline);
71     sendSuccess(res, { isOnline: captain.isOnline });
72   } catch (error) {
73     next(error);
74   }
75 };
76 
77 // Admin only
78 const adminApprove = async (req, res, next) => {
79   try {
80     const { id } = req.params;
81     const adminId = req.user.id;
82     const captain = await captainService.approveCaptain(id, adminId);
83     sendSuccess(res, captain, 'Captain approved');
84   } catch (error) {
85     next(error);
86   }
87 };
88 
89 const adminReject = async (req, res, next) => {
90   try {
91     const { id } = req.params;
92     const { reason } = req.body;
93     const captain = await captainService.rejectCaptain(id, reason);
94     sendSuccess(res, captain, 'Captain rejected');
95   } catch (error) {
96     next(error);
97   }
98 };
99 
100 const applyCaptain = async (req, res, next) => {
101   try {
102     const userId = req.user.id;
103     const { vehicleType, vehicleModel, plateNumber, vehicleColor } = req.body;
104 
105     // البحث عن سجل كابتن موجود للمستخدم
106     let captain = await Captain.findOne({ userId });
107 
108     if (!captain) {
109       // إنشاء سجل جديد مع كود التطبيق
110       const code = generateApplicationCode();
111       captain = await Captain.create({
112         userId,
113         applicationCode: code,
114         applicationStatus: 'pending_approval',
115         status: 'pending_review',
116         vehicleType: vehicleType || undefined,
117         vehicleModel: vehicleModel || undefined,
118         plateNumber: plateNumber || undefined,
119         vehicleColor: vehicleColor || undefined,
120       });
121       return sendSuccess(res, {
122         code: captain.applicationCode,
123         status: captain.applicationStatus,
124       }, 'تم إنشاء طلب الكابتن بنجاح', 201);
125     }
126 
127     // إذا كان السجل موجوداً، نقوم بتحديثه
128     if (vehicleType) captain.vehicleType = vehicleType;
129     if (vehicleModel) captain.vehicleModel = vehicleModel;
130     if (plateNumber) captain.plateNumber = plateNumber;
131     if (vehicleColor) captain.vehicleColor = vehicleColor;
132 
133     // تحديث حالة الطلب إلى pending_review إذا كان في مرحلة التقديم
134     if (captain.applicationStatus === 'pending_approval') {
135       captain.status = 'pending_review';
136     }
137 
138     await captain.save();
139 
140     sendSuccess(res, {
141       code: captain.applicationCode,
142       status: captain.applicationStatus,
143       vehicleInfoUpdated: true,
144     }, 'تم تحديث بيانات الكابتن بنجاح');
145 
146   } catch (error) {
147     next(error);
148   }
149 };
150 
151 const checkApplicationStatus = async (req, res, next) => {
152   try {
153     const userId = req.user.id;
154     const captain = await Captain.findOne({ userId }).select('applicationCode applicationStatus');
155     if (!captain) return sendError(res, 'No application found', 404);
156     sendSuccess(res, {
157       code: captain.applicationCode,
158       status: captain.applicationStatus,
159     });
160   } catch (error) {
161     next(error);
162   }
163 };
164 module.exports = {
165   register,
166   uploadDocs,
167   getStatus,
168   getNearbyDrivers,
169   toggleOnline,
170   adminApprove,
171   adminReject,
172   applyCaptain,
173   checkApplicationStatus,
174 };
```

## File: `src\modules\captain\captain.model.js`

```javascript
1 // src/modules/captain/captain.model.js
2 
3 const mongoose = require('mongoose');
4 
5 const captainSchema = new mongoose.Schema(
6   {
7     userId: {
8       type: mongoose.Schema.Types.ObjectId,
9       ref: 'User',
10       required: true,
11       unique: true,
12     },
13     vehicleType: {
14       type: String,
15       enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'],
16       // غير مطلوب في مرحلة التقديم الأولى
17     },
18     vehicleModel: {
19       type: String,
20       // غير مطلوب
21     },
22     plateNumber: {
23       type: String,
24       unique: true,
25       sparse: true, // ✅ يسمح بوجود مستندات بدون هذا الحقل نهائياً
26     },
27     vehicleColor: {
28       type: String,
29     },
30     lastLocationAt: {
31       type: Date,
32     },
33     documents: {
34       nationalId: String,
35       driverLicense: String,
36       vehicleLicense: String,
37     },
38     status: {
39       type: String,
40       enum: ['pending_review', 'approved', 'rejected', 'banned'],
41       default: 'pending_review',
42     },
43     rejectionReason: String,
44     isOnline: {
45       type: Boolean,
46       default: false,
47     },
48     location: {
49       type: { type: String, enum: ['Point'], default: 'Point' },
50       coordinates: { type: [Number], default: [0, 0] },
51     },
52     rating: {
53       type: Number,
54       min: 0,
55       max: 5,
56       default: 0,
57     },
58     totalTrips: {
59       type: Number,
60       default: 0,
61     },
62     applicationCode: {
63       type: String,
64       unique: true,
65       sparse: true, 
66     },
67     applicationStatus: {
68       type: String,
69       enum: ['pending_approval', 'approved', 'rejected'],
70       default: 'pending_approval',
71     },
72   },
73   { timestamps: true }
74 );
75 
76 // فهرس جغرافي
77 captainSchema.index({ location: '2dsphere' });
78 
79 const Captain = mongoose.model('Captain', captainSchema);
80 module.exports = Captain;
```

## File: `src\modules\captain\captain.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./captain.controller');
4 const authMiddleware = require('../../middlewares/auth.middleware');
5 const { requireRole } = require('../../middlewares/role.middleware');
6 const { uploadDocuments } = require('../../middlewares/upload.middleware');
7 const { validate } = require('../../middlewares/validate');
8 const { registerCaptainSchema, toggleOnlineSchema } = require('../auth/auth.validation');
9 
10 router.post('/register', authMiddleware, validate(registerCaptainSchema), controller.register);
11 router.post('/documents', authMiddleware, uploadDocuments, controller.uploadDocs);
12 router.get('/status', authMiddleware, controller.getStatus);
13 router.get('/nearby', authMiddleware, requireRole('passenger'), controller.getNearbyDrivers);
14 router.patch('/online', authMiddleware, requireRole('captain'), validate(toggleOnlineSchema), controller.toggleOnline);
15 
16 router.patch('/admin/captain/:id/approve', authMiddleware, requireRole('admin'), controller.adminApprove);
17 router.patch('/admin/captain/:id/reject', authMiddleware, requireRole('admin'), controller.adminReject);
18 router.post('/apply', authMiddleware, controller.applyCaptain);
19 router.get('/application/status', authMiddleware, controller.checkApplicationStatus);
20 router.post('/apply', authMiddleware, controller.applyCaptain);
21 router.get('/application/status', authMiddleware, controller.checkApplicationStatus);
22 module.exports = router;
```

## File: `src\modules\captain\captain.service.js`

```javascript
1 const Captain = require('./captain.model');
2 const User = require('../user/user.model');
3 // ---------- Register Captain (called from controller) ----------
4 const registerCaptain = async (userId, data) => {
5   const existing = await Captain.findOne({ userId });
6   if (existing) throw new Error('Captain already registered');
7 
8   const captain = await Captain.create({
9     userId,
10     vehicleType: data.vehicleType,
11     vehicleModel: data.vehicleModel,
12     plateNumber: data.plateNumber,
13     status: 'pending_review',
14   });
15   return captain;
16 };
17 
18 // ---------- Upload Documents ----------
19 const uploadDocuments = async (userId, files) => {
20   const captain = await Captain.findOne({ userId });
21   if (!captain) throw new Error('Captain not found');
22 
23   const updates = {};
24   if (files.nationalId) updates['documents.nationalId'] = files.nationalId[0].path;
25   if (files.driverLicense) updates['documents.driverLicense'] = files.driverLicense[0].path;
26   if (files.vehicleLicense) updates['documents.vehicleLicense'] = files.vehicleLicense[0].path;
27 
28   await Captain.updateOne({ _id: captain._id }, { $set: updates });
29   return { message: 'Documents uploaded successfully' };
30 };
31 
32 // ---------- Get Captain Status ----------
33 const getCaptainStatus = async (userId) => {
34   const captain = await Captain.findOne({ userId }).select('status rejectionReason');
35   if (!captain) return { status: 'not_registered' };
36   return { status: captain.status, rejectionReason: captain.rejectionReason };
37 };
38 
39 // ---------- Approve / Reject (Admin) ----------
40 const approveCaptain = async (captainId, adminId) => {
41   const captain = await Captain.findById(captainId);
42   if (!captain) throw new Error('Captain not found');
43   captain.status = 'approved';
44   captain.rejectionReason = null;
45   await captain.save();
46   await User.findByIdAndUpdate(captain.userId, { role: 'captain' });
47 
48   return captain;
49 };
50 
51 const rejectCaptain = async (captainId, reason) => {
52   const captain = await Captain.findById(captainId);
53   if (!captain) throw new Error('Captain not found');
54   captain.status = 'rejected';
55   captain.rejectionReason = reason;
56   await captain.save();
57   return captain;
58 };
59 
60 // ---------- Toggle Online Status ----------
61 const toggleOnline = async (userId, isOnline) => {
62   const captain = await Captain.findOne({ userId });
63   if (!captain) throw new Error('Captain not found');
64   if (captain.status !== 'approved') throw new Error('Captain not approved');
65   captain.isOnline = isOnline;
66   await captain.save();
67   return captain;
68 };
69 
70 // ---------- Nearby Drivers (Geo) ----------
71 const getNearbyDrivers = async (lat, lng, radius = 3) => {
72   const captains = await Captain.find({
73     status: 'approved',
74     isOnline: true,
75     location: {
76       $near: {
77         $geometry: { type: 'Point', coordinates: [lng, lat] },
78         $maxDistance: radius * 1000,
79       },
80     },
81   })
82     .populate('userId', 'name phone avatar')
83     .lean();
84 
85   return captains.map(c => ({
86     captain_id: c._id.toString(),
87     name: c.userId.name,
88     phone: c.userId.phone || '',
89     avatar: c.userId.avatar,
90     vehicle_type: c.vehicleType,
91     vehicle_model: c.vehicleModel,
92     vehicle_color: c.vehicleColor || '',
93     plate_number: c.plateNumber,
94     lat: c.location?.coordinates?.[1] || 0,
95     lng: c.location?.coordinates?.[0] || 0,
96     status: c.isOnline ? 'available' : 'busy',
97     rating: c.rating || 0,
98     total_trips: c.totalTrips || 0,
99   }));
100 };
101 
102 module.exports = {
103   registerCaptain,
104   uploadDocuments,
105   getCaptainStatus,
106   approveCaptain,
107   rejectCaptain,
108   getNearbyDrivers,
109   toggleOnline,
110 };
```

## File: `src\modules\fare\fare.controller.js`

```javascript
1 // src/modules/fare/fare.controller.js
2 const { sendSuccess } = require('../../utils/response.util');
3 
4 // تعريفات الأسعار الافتراضية (يمكن تخزينها في قاعدة البيانات لاحقًا)
5 const DEFAULT_FARES = {
6   car: {
7     baseFare: 10,
8     perKmFare: 7,
9     currency: 'ج.م',
10     description: 'سيارة'
11   },
12   motorcycle: {
13     baseFare: 8,
14     perKmFare: 5,
15     currency: 'ج.م',
16     description: 'دراجة نارية'
17   },
18   tukutuk: {
19     baseFare: 7,
20     perKmFare: 4,
21     currency: 'ج.م',
22     description: 'توك توك'
23   },
24   alt_tukutuk: {
25     baseFare: 6,
26     perKmFare: 4,
27     currency: 'ج.م',
28     description: 'بديل توك توك'
29   }
30 };
31 
32 const getFares = async (req, res, next) => {
33   try {
34     // في المستقبل يمكن جلب الأسعار من قاعدة البيانات
35     sendSuccess(res, DEFAULT_FARES, 'Fares retrieved successfully');
36   } catch (error) {
37     next(error);
38   }
39 };
40 
41 module.exports = {
42   getFares
43 };
```

## File: `src\modules\fare\fare.routes.js`

```javascript
1 // src/modules/fare/fare.routes.js
2 const express = require('express');
3 const router = express.Router();
4 const controller = require('./fare.controller');
5 
6 // لا يحتاج مصادقة لأنه بيانات عامة
7 router.get('/', controller.getFares);
8 
9 module.exports = router;
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
10   requireRole('passenger'),
11   controller.getNearbyDrivers
12 );
13 
14 module.exports = router;
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

## File: `src\modules\seed\seed.controller.js`

```javascript
1 const User = require('../user/user.model');
2 const Captain = require('../captain/captain.model');
3 const Trip = require('../trip/trip.model');
4 const { sendSuccess, sendError } = require('../../utils/response.util');
5 
6 const MOCK_CAPTAINS_COUNT = 15;
7 const MOCK_TRIPS_COUNT = 5;
8 const MOCK_DOMAIN = 'wasalni.dev'; // لتمييز البيانات التجريبية
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
4 const createTrip = async (req, res, next) => {
5   try {
6     const passengerId = req.user.id;
7     const { captainId, startLocation } = req.body;
8     const trip = await tripService.createTrip(passengerId, captainId, startLocation);
9     sendSuccess(res, trip, 'تم إنشاء الرحلة بنجاح', 201);
10   } catch (error) {
11     next(error);
12   }
13 };
14 
15 const confirmStart = async (req, res, next) => {
16   try {
17     const { id } = req.params;
18     const userId = req.user.id;
19     const role = req.user.role;
20     const trip = await tripService.confirmStart(id, userId, role);
21     sendSuccess(res, trip, 'تم تأكيد بدء الرحلة');
22   } catch (error) {
23     next(error);
24   }
25 };
26 
27 const requestEnd = async (req, res, next) => {
28   try {
29     const { id } = req.params;
30     const userId = req.user.id;
31     const role = req.user.role;
32     const trip = await tripService.requestEndTrip(id, userId, role);
33     sendSuccess(res, trip, 'تم إرسال طلب إنهاء الرحلة');
34   } catch (error) {
35     next(error);
36   }
37 };
38 
39 const confirmEnd = async (req, res, next) => {
40   try {
41     const { id } = req.params;
42     const { distanceKm } = req.body;
43     const userId = req.user.id;
44     const role = req.user.role;
45     const trip = await tripService.confirmEndTrip(id, userId, role, distanceKm);
46     sendSuccess(res, trip, 'تم إنهاء الرحلة بنجاح');
47   } catch (error) {
48     next(error);
49   }
50 };
51 
52 const cancelTrip = async (req, res, next) => {
53   try {
54     const { id } = req.params;
55     const { reason } = req.body;
56     const userId = req.user.id;
57     const trip = await tripService.cancelTrip(id, userId, reason);
58     sendSuccess(res, trip, 'تم إلغاء الرحلة');
59   } catch (error) {
60     next(error);
61   }
62 };
63 
64 const getTrip = async (req, res, next) => {
65   try {
66     const { id } = req.params;
67     const trip = await tripService.getTrip(id);
68     sendSuccess(res, trip);
69   } catch (error) {
70     next(error);
71   }
72 };
73 
74 module.exports = {
75   createTrip,
76   confirmStart,
77   requestEnd,
78   confirmEnd,
79   cancelTrip,
80   getTrip,
81 };
```

## File: `src\modules\trip\trip.model.js`

```javascript
1 const mongoose = require('mongoose');
2 
3 const tripSchema = new mongoose.Schema(
4   {
5     passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
6     captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true },
7     vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }, // optional
8     status: {
9       type: String,
10       enum: ['pending', 'active', 'ended', 'cancelled'],
11       default: 'pending',
12     },
13     startLocation: {
14       lat: Number,
15       lng: Number,
16       address: String,
17     },
18     endLocation: {
19       lat: Number,
20       lng: Number,
21       address: String,
22     },
23     distanceKm: { type: Number, default: 0 },
24     totalFare: { type: Number, default: 0 },
25     firstKmFare: { type: Number, default: 10 },
26     extraKmFare: { type: Number, default: 7 },
27     passengerConfirmedStart: { type: Boolean, default: false },
28     captainConfirmedStart: { type: Boolean, default: false },
29     passengerConfirmedEnd: { type: Boolean, default: false },
30     captainConfirmedEnd: { type: Boolean, default: false },
31     endRequestedBy: { type: String, enum: ['passenger', 'captain'] },
32     cancellationReason: { type: String },
33     startedAt: { type: Date },
34     endedAt: { type: Date },
35   },
36   { timestamps: true }
37 );
38 
39 module.exports = mongoose.model('Trip', tripSchema);
```

## File: `src\modules\trip\trip.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./trip.controller');
4 const authMiddleware = require('../../middlewares/auth.middleware');
5 const { requireRole } = require('../../middlewares/role.middleware');
6 
7 // إنشاء رحلة (يحتاج راكب)
8 router.post('/', authMiddleware, requireRole('passenger'), controller.createTrip);
9 
10 // تأكيد البدء (يمكن للراكب أو الكابتن)
11 router.patch('/:id/start', authMiddleware, controller.confirmStart);
12 
13 // طلب إنهاء (راكب أو كابتن)
14 router.patch('/:id/request-end', authMiddleware, controller.requestEnd);
15 
16 // تأكيد إنهاء (راكب أو كابتن)
17 router.patch('/:id/confirm-end', authMiddleware, controller.confirmEnd);
18 
19 // إلغاء (راكب أو كابتن)
20 router.patch('/:id/cancel', authMiddleware, controller.cancelTrip);
21 
22 // الحصول على تفاصيل رحلة
23 router.get('/:id', authMiddleware, controller.getTrip);
24 
25 module.exports = router;
```

## File: `src\modules\trip\trip.service.js`

```javascript
1 const Trip = require('./trip.model');
2 const Captain = require('../captain/captain.model');
3 const { calcFare } = require('../../utils/fare.util');
4 const { emitToTrip } = require('../../socket'); 
5 const mongoose = require('mongoose');
6 
7 const createTrip = async (passengerId, captainId, startLocation) => {
8   if (!mongoose.Types.ObjectId.isValid(captainId)) {
9     throw new Error('معرف الكابتن غير صالح');
10   }
11 
12   const captain = await Captain.findById(captainId);
13   if (!captain || captain.status !== 'approved') {
14     throw new Error('الكابتن غير متاح');
15   }
16   if (!captain.isOnline) {
17     throw new Error('الكابتن غير متصل حالياً');
18   }
19 
20   const trip = await Trip.create({
21     passengerId,
22     captainId: captain._id,
23     startLocation,
24     status: 'pending',
25   });
26   return trip;
27 };
28 
29 const confirmStart = async (tripId, userId, role) => {
30   const trip = await Trip.findById(tripId);
31   if (!trip) throw new Error('الرحلة غير موجودة');
32   if (trip.status !== 'pending') throw new Error('الرحلة ليست في حالة انتظار البدء');
33 
34   const isPassenger = trip.passengerId.toString() === userId;
35   const captain = await Captain.findById(trip.captainId);
36   const isCaptain = captain.userId.toString() === userId;
37 
38   if (role === 'passenger' && !isPassenger) throw new Error('غير مصرح لك كراكب');
39   if (role === 'captain' && !isCaptain) throw new Error('غير مصرح لك ككابتن');
40 
41   if (role === 'passenger') trip.passengerConfirmedStart = true;
42   else if (role === 'captain') trip.captainConfirmedStart = true;
43 
44   // ✨ في بيئة التطوير: إذا أكد الراكب، اعتبر الكابتن مؤكداً تلقائياً
45   if (process.env.NODE_ENV === 'development' && role === 'passenger') {
46     trip.captainConfirmedStart = true;
47   }
48 
49   if (trip.passengerConfirmedStart && trip.captainConfirmedStart) {
50     trip.status = 'active';
51     trip.startedAt = new Date();
52     await trip.save();
53     emitToTrip(tripId, 'trip:started', trip);
54   } else {
55     await trip.save();
56   }
57   return trip;
58 };
59 
60 const requestEndTrip = async (tripId, userId, role) => {
61   const trip = await Trip.findById(tripId);
62   if (!trip) throw new Error('الرحلة غير موجودة');
63   if (trip.status !== 'active') throw new Error('الرحلة غير نشطة');
64 
65   const isPassenger = trip.passengerId.toString() === userId;
66   const captain = await Captain.findById(trip.captainId);
67   const isCaptain = captain.userId.toString() === userId;
68 
69   if (role === 'passenger' && !isPassenger) throw new Error('غير مصرح لك كراكب');
70   if (role === 'captain' && !isCaptain) throw new Error('غير مصرح لك ككابتن');
71 
72   // ✅ لا يمكن تكرار الطلب من نفس الطرف دون رد
73   if (trip.endRequestedBy === role) throw new Error('أنت بالفعل طلبت إنهاء الرحلة');
74 
75   trip.endRequestedBy = role;
76   await trip.save();
77 
78   // ✅ إشعار الطرف الآخر بطلب إنهاء
79   emitToTrip(tripId, 'trip:end-requested', { requestedBy: role });
80 
81   return trip;
82 };
83 
84 const confirmEndTrip = async (tripId, userId, role, distanceKm) => {
85   const trip = await Trip.findById(tripId);
86   if (!trip) throw new Error('الرحلة غير موجودة');
87   if (trip.status !== 'active') throw new Error('الرحلة غير نشطة');
88 
89   const isPassenger = trip.passengerId.toString() === userId;
90   const captain = await Captain.findById(trip.captainId);
91   const isCaptain = captain.userId.toString() === userId;
92 
93   if (role === 'passenger' && !isPassenger) throw new Error('غير مصرح لك كراكب');
94   if (role === 'captain' && !isCaptain) throw new Error('غير مصرح لك ككابتن');
95 
96   // ✅ التحقق من وجود طلب إنهاء من الطرف الآخر
97   if (!trip.endRequestedBy || trip.endRequestedBy === role) {
98     throw new Error('لا يمكن تأكيد إنهاء الرحلة قبل طلب الطرف الآخر');
99   }
100 
101   if (role === 'passenger') trip.passengerConfirmedEnd = true;
102   else if (role === 'captain') trip.captainConfirmedEnd = true;
103 
104   if (trip.passengerConfirmedEnd && trip.captainConfirmedEnd) {
105     trip.status = 'ended';
106     trip.endedAt = new Date();
107     trip.distanceKm = distanceKm;
108     trip.totalFare = calcFare(distanceKm);
109     await trip.save();
110 
111     // تحديث إحصائيات الكابتن
112     await Captain.findByIdAndUpdate(trip.captainId, {
113       $inc: { totalTrips: 1 },
114     });
115 
116     // ✅ إشعار الطرفين بانتهاء الرحلة
117     emitToTrip(tripId, 'trip:ended', trip);
118   } else {
119     await trip.save();
120   }
121   return trip;
122 };
123 
124 const cancelTrip = async (tripId, userId, reason) => {
125   const trip = await Trip.findById(tripId);
126   if (!trip) throw new Error('الرحلة غير موجودة');
127   if (trip.status !== 'pending') throw new Error('لا يمكن إلغاء الرحلة في هذه الحالة');
128 
129   const isPassenger = trip.passengerId.toString() === userId;
130   const captain = await Captain.findById(trip.captainId);
131   const isCaptain = captain.userId.toString() === userId;
132 
133   if (!isPassenger && !isCaptain) throw new Error('غير مصرح لك');
134 
135   trip.status = 'cancelled';
136   trip.cancellationReason = reason;
137   await trip.save();
138   emitToTrip(tripId, 'trip:cancelled', trip);
139   return trip;
140 };
141 
142 const getTrip = async (tripId) => {
143   return await Trip.findById(tripId)
144     .populate('passengerId', 'name phone avatar')
145     .populate('captainId', 'userId vehicleType vehicleModel plateNumber rating totalTrips');
146 };
147 
148 module.exports = {
149   createTrip,
150   confirmStart,
151   requestEndTrip,
152   confirmEndTrip,
153   cancelTrip,
154   getTrip,
155 };
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
17     otpCode: { type: String },
18     otpExpiresAt: { type: Date },
19     refreshToken: { type: String },
20   },
21   { timestamps: true }
22 );
23 
24 module.exports = mongoose.model('User', userSchema);
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
2 const { Server } = require('socket.io');
3 const env = require('../config/env');
4 const tripService = require('../modules/trip/trip.service');
5 const Captain = require('../modules/captain/captain.model');
6 
7 let io;
8 const userSockets = new Map(); // userId -> socketId
9 const socketToUser = new Map(); // socketId -> userId
10 
11 /**
12  * Initialize Socket.IO server
13  * @param {http.Server} server - HTTP server instance
14  * @returns {Server} Socket.IO instance
15  */
16 const initSocket = (server) => {
17   io = new Server(server, {
18     cors: {
19       origin: env.SOCKET_CORS_ORIGIN || '*',
20       methods: ['GET', 'POST'],
21       credentials: true,
22     },
23   });
24 
25   io.on('connection', (socket) => {
26     console.log(`🔌 New client connected: ${socket.id}`);
27 
28     // Register user (called from client after authentication)
29     socket.on('register', (userId) => {
30       if (!userId) return;
31       // Remove old socket if exists
32       const oldSocketId = userSockets.get(userId);
33       if (oldSocketId) {
34         socketToUser.delete(oldSocketId);
35       }
36       userSockets.set(userId, socket.id);
37       socketToUser.set(socket.id, userId);
38       console.log(`✅ User ${userId} registered with socket ${socket.id}`);
39     });
40 
41     // Join a trip room (for real-time updates during a trip)
42     socket.on('join-trip', (tripId) => {
43       if (!tripId) return;
44       socket.join(`trip-${tripId}`);
45       console.log(`🚗 Socket ${socket.id} joined room trip-${tripId}`);
46     });
47 
48     // Leave trip room
49     socket.on('leave-trip', (tripId) => {
50       if (!tripId) return;
51       socket.leave(`trip-${tripId}`);
52     });
53 
54     // Captain updates location
55     socket.on('captain:location', async (data) => {
56       const { captainId, lat, lng } = data;
57       if (!captainId || lat == null || lng == null) return;
58 
59       try {
60         // Update captain's location in DB
61         await Captain.updateOne(
62           { userId: captainId, isOnline: true },
63           {
64             $set: {
65               location: { type: 'Point', coordinates: [lng, lat] },
66               lastLocationAt: new Date(),
67             },
68           }
69         );
70         // Optionally broadcast to nearby passengers (can be implemented later)
71         // For now, we just store the location; passengers will fetch via REST API.
72       } catch (err) {
73         console.error('Error updating captain location:', err);
74       }
75     });
76 
77     // Trip: start confirmation (both passenger & captain)
78     socket.on('trip:start', async (data) => {
79       const { tripId, userId, role } = data;
80       if (!tripId || !userId || !role) return;
81 
82       try {
83         const trip = await tripService.confirmStart(tripId, userId, role);
84         // Notify both parties that trip has started (if both confirmed)
85         if (trip.status === 'active') {
86           io.to(`trip-${tripId}`).emit('trip:started', trip);
87         } else {
88           // Just acknowledge that this side confirmed
89           socket.emit('trip:confirmed-start', { tripId, role });
90         }
91       } catch (err) {
92         socket.emit('error', { message: err.message });
93       }
94     });
95 
96     // Trip: request end (passenger or captain)
97     socket.on('trip:end-request', async (data) => {
98       const { tripId, userId, role } = data;
99       if (!tripId || !userId || !role) return;
100 
101       try {
102         const trip = await tripService.requestEndTrip(tripId, userId, role);
103         io.to(`trip-${tripId}`).emit('trip:end-requested', { requestedBy: role });
104       } catch (err) {
105         socket.emit('error', { message: err.message });
106       }
107     });
108 
109     // Trip: confirm end (passenger or captain)
110     socket.on('trip:end-confirm', async (data) => {
111       const { tripId, userId, role, distanceKm } = data;
112       if (!tripId || !userId || !role || distanceKm == null) return;
113 
114       try {
115         const trip = await tripService.confirmEndTrip(tripId, userId, role, distanceKm);
116         if (trip.status === 'ended') {
117           io.to(`trip-${tripId}`).emit('trip:ended', trip);
118         } else {
119           socket.emit('trip:confirmed-end', { tripId, role });
120         }
121       } catch (err) {
122         socket.emit('error', { message: err.message });
123       }
124     });
125 
126     // Disconnect
127     socket.on('disconnect', () => {
128       const userId = socketToUser.get(socket.id);
129       if (userId) {
130         userSockets.delete(userId);
131         socketToUser.delete(socket.id);
132         console.log(`❌ User ${userId} disconnected (socket ${socket.id})`);
133       } else {
134         console.log(`❌ Socket ${socket.id} disconnected`);
135       }
136     });
137   });
138 
139   return io;
140 };
141 
142 /**
143  * Get Socket.IO instance (must be called after initSocket)
144  * @returns {Server}
145  */
146 const getIo = () => {
147   if (!io) throw new Error('Socket.IO not initialized');
148   return io;
149 };
150 
151 /**
152  * Emit event to a specific user
153  * @param {string} userId - User ID
154  * @param {string} event - Event name
155  * @param {any} data - Event data
156  */
157 const emitToUser = (userId, event, data) => {
158   const socketId = userSockets.get(userId);
159   if (socketId) {
160     io.to(socketId).emit(event, data);
161   }
162 };
163 
164 /**
165  * Emit event to a trip room
166  * @param {string} tripId - Trip ID
167  * @param {string} event - Event name
168  * @param {any} data - Event data
169  */
170 const emitToTrip = (tripId, event, data) => {
171   io.to(`trip-${tripId}`).emit(event, data);
172 };
173 
174 module.exports = { initSocket, getIo, emitToUser, emitToTrip };
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
1 const FIRST_KM_FARE = 10;
2 const EXTRA_KM_FARE = 7;
3 
4 const calcFare = (km) => {
5   if (km <= 0) return 0;
6   if (km <= 1) return FIRST_KM_FARE;
7   return Math.round(FIRST_KM_FARE + (km - 1) * EXTRA_KM_FARE);
8 };
9 
10 const calcFareBreakdown = (km) => {
11   const extraKm = Math.max(0, km - 1);
12   const extraFare = Math.round(extraKm * EXTRA_KM_FARE);
13   return {
14     firstKm: Math.min(km, 1),
15     firstFare: FIRST_KM_FARE,
16     extraKm,
17     extraFare,
18     total: calcFare(km),
19   };
20 };
21 
22 module.exports = { calcFare, calcFareBreakdown, FIRST_KM_FARE, EXTRA_KM_FARE };
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

