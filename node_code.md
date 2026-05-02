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
5 const errorHandler = require('./middlewares/error.middleware');
6 
7 // Routes
8 const authRoutes      = require('./modules/auth/auth.routes');
9 const captainRoutes   = require('./modules/captain/captain.routes');
10 const tripRoutes      = require('./modules/trip/trip.routes');
11 const reviewRoutes    = require('./modules/review/review.routes');
12 const adminRoutes     = require('./modules/admin/admin.routes');
13 const passengerRoutes = require('./modules/passenger/passenger.routes');
14 const fareRoutes      = require('./modules/fare/fare.routes');
15 const seedRoutes      = require('./modules/seed/seed.routes');
16 
17 const app = express();
18 
19 // ── Global middlewares ────────────────────────────────────────────────
20 app.use(helmet());
21 app.use(cors({
22   origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
23   credentials: true,
24 }));
25 app.use(express.json());
26 app.use(morgan('dev'));
27 
28 // ── Routes ────────────────────────────────────────────────────────────
29 app.use('/api/auth',      authRoutes);
30 app.use('/api/captain',   captainRoutes);
31 app.use('/api/trips',     tripRoutes);
32 app.use('/api/reviews',   reviewRoutes);
33 app.use('/api/admin',     adminRoutes);
34 app.use('/api/passenger', passengerRoutes);
35 app.use('/api/fares',     fareRoutes);
36 app.use('/api/seed',      seedRoutes);
37 
38 app.get('/health', (_req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));
39 
40 // ── Error handler (must be last) ──────────────────────────────────────
41 app.use(errorHandler);
42 
43 module.exports = app;
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
9   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
10   JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
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
8     console.log("req user " , req.user)
9     if (!allowedRoles.includes(req.user.role)) {
10 
11       return sendError(res, 'Forbidden: insufficient permissions', 403);
12     }
13     next();
14   };
15 };
16 
17 module.exports = { requireRole };
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
9 
10 // ─────────────────────────────────────────────────────────────
11 // Google OAuth
12 // ─────────────────────────────────────────────────────────────
13 const loginWithGoogle = async (idToken) => {
14   const payload = _decodeGoogleToken(idToken);
15   const { googleId, email, name, picture } = payload;
16 
17   let user = await authRepo.findByGoogleOrEmail(googleId, email);
18   if (!user) {
19     user = await authRepo.createUser({ googleId, email, name, avatar: picture, role: null });
20   } else {
21     if (!user.googleId) user.googleId = googleId;
22     if (!user.name && name) user.name = name;
23     if (!user.avatar && picture) user.avatar = picture;
24     await authRepo.saveDoc(user);
25   }
26 
27   return _issueTokens(user);
28 };
29 
30 // ─────────────────────────────────────────────────────────────
31 // OTP — Step 1: Send
32 // ─────────────────────────────────────────────────────────────
33 const sendOtp = async (phone) => {
34   let user = await userRepo.findOne({ phone });
35 
36   if (!user) {
37     user = await userRepo.create({ name: phone, phone, role: null });
38   }
39 
40   const otp = generateOtp();
41   user.otpCode = hashOtp(otp);
42   user.otpExpiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);
43   await authRepo.saveDoc(user);
44 
45   await _sendOtpViaSms(phone, otp);
46 
47   logger.info(`[Auth] OTP sent to ${phone}`);
48 
49   return {
50     message: 'OTP sent',
51     expiresIn: OTP_TTL_SECONDS,
52     ...(env.NODE_ENV !== 'production' && { devOtp: otp }),
53   };
54 };
55 
56 // ─────────────────────────────────────────────────────────────
57 // OTP — Step 2: Verify + Login
58 // ─────────────────────────────────────────────────────────────
59 const verifyOtpAndLogin = async (phone, code, name) => {
60   const user = await userRepo.findOne({ phone }, '+otpCode +otpExpiresAt');
61   if (!user || !user.otpCode) throw new Error('OTP not found — request a new one');
62 
63   if (user.otpExpiresAt < new Date()) {
64     user.otpCode = undefined;
65     user.otpExpiresAt = undefined;
66     await authRepo.saveDoc(user);
67     throw new Error('OTP expired');
68   }
69 
70   if (!verifyOtp(code, user.otpCode)) throw new Error('Invalid OTP');
71 
72   user.otpCode = undefined;
73   user.otpExpiresAt = undefined;
74 
75   if (name && (user.name === user.phone || !user.name)) {
76     user.name = name;
77   }
78 
79   await authRepo.saveDoc(user);
80 
81   logger.info(`[Auth] OTP verified for ${phone}`);
82   return _issueTokens(user);
83 };
84 
85 // ─────────────────────────────────────────────────────────────
86 // Refresh token (with rotation)
87 // ─────────────────────────────────────────────────────────────
88 const refreshAccessToken = async (token) => {
89   const decoded = verifyRefreshToken(token);
90   if (!decoded) throw new Error('Invalid refresh token');
91 
92   const user = await authRepo.findByIdAndToken(decoded.id, token);
93   if (!user) throw new Error('Refresh token not found or revoked');
94 
95   const { accessToken, refreshToken: newRefresh } = generateTokens(user._id, user.role);
96 
97   // Rotate: invalidate old token, register new one
98   await authRepo.removeRefreshToken(user._id, token);
99   await authRepo.addRefreshToken(user._id, newRefresh);
100 
101   return { accessToken, refreshToken: newRefresh };
102 };
103 
104 // ─────────────────────────────────────────────────────────────
105 // Logout — single device (specific token) or all devices
106 // ─────────────────────────────────────────────────────────────
107 const logout = async (userId, refreshToken) => {
108   if (refreshToken) {
109     await authRepo.removeRefreshToken(userId, refreshToken);
110   } else {
111     await authRepo.clearAllRefreshTokens(userId);
112   }
113 };
114 
115 // ─────────────────────────────────────────────────────────────
116 // Helpers
117 // ─────────────────────────────────────────────────────────────
118 async function _issueTokens(user) {
119   const { accessToken, refreshToken } = generateTokens(user._id, user.role);
120   await authRepo.addRefreshToken(user._id, refreshToken);
121   const safe = user.toObject();
122   delete safe.refreshTokens;
123   delete safe.otpCode;
124   delete safe.otpExpiresAt;
125   return { user: safe, accessToken, refreshToken };
126 }
127 
128 function _decodeGoogleToken(idToken) {
129   try {
130     const parts = idToken.split('.');
131     if (parts.length === 3) {
132       const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
133       if (payload?.sub) {
134         return {
135           googleId: payload.sub,
136           email: payload.email ?? null,
137           name: payload.name || payload.email?.split('@')[0] || 'مستخدم',
138           picture: payload.picture ?? null,
139         };
140       }
141     }
142   } catch (_) {}
143   return {
144     googleId: `dev_${Date.now()}`,
145     email: `dev_${Date.now()}@temp.com`,
146     name: 'مستخدم مؤقت',
147     picture: null,
148   };
149 }
150 
151 async function _sendOtpViaSms(phone, otp) {
152   if (env.NODE_ENV !== 'production') {
153     logger.info(`[Auth] DEV OTP for ${phone}: ${otp}`);
154     return;
155   }
156   try {
157     const twilio = require('twilio')(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
158     await twilio.messages.create({
159       body: `كود التحقق لوصلني: ${otp} — صالح لمدة 5 دقائق`,
160       from: env.TWILIO_PHONE,
161       to: `+2${phone}`,
162     });
163   } catch (err) {
164     logger.error('[Auth] Twilio send failed', err);
165     throw new Error('Failed to send OTP — please try again');
166   }
167 }
168 
169 module.exports = { loginWithGoogle, sendOtp, verifyOtpAndLogin, refreshAccessToken, logout };
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
25       vehicleType:  vehicleType  || undefined,
26       vehicleModel: vehicleModel || undefined,
27       plateNumber:  plateNumber  || undefined,
28       vehicleColor: vehicleColor || undefined,
29     });
30     return sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus }, 'Captain application created', 201);
31   }
32 
33   if (vehicleType)  captain.vehicleType  = vehicleType;
34   if (vehicleModel) captain.vehicleModel = vehicleModel;
35   if (plateNumber)  captain.plateNumber  = plateNumber;
36   if (vehicleColor) captain.vehicleColor = vehicleColor;
37 
38   await captainRepo.saveDoc(captain);
39   sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus, vehicleInfoUpdated: true }, 'Captain data updated');
40 });
41 
42 const checkApplicationStatus = wrap(async (req, res) => {
43   const captain = await captainRepo.findByUserId(req.user.id);
44   if (!captain) return sendError(res, 'No application found', 404);
45   sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus });
46 });
47 
48 const getStatus = wrap(async (req, res) => {
49   const status = await captainService.getCaptainStatus(req.user.id);
50   sendSuccess(res, status);
51 });
52 
53 // ── Availability ──────────────────────────────────────────────────────
54 const toggleOnline = wrap(async (req, res) => {
55   const { isOnline } = req.body;
56   const captain = await captainService.toggleOnline(req.user.id, isOnline);
57   sendSuccess(res, { isOnline: captain.isOnline });
58 });
59 
60 // ── Nearby captains (passenger-facing) ───────────────────────────────
61 const getNearbyDrivers = wrap(async (req, res) => {
62   const { lat, lng, radius } = req.query;
63   if (!lat || !lng) return sendError(res, 'lat and lng are required', 400);
64   const captains = await captainService.getNearbyDrivers(
65     parseFloat(lat),
66     parseFloat(lng),
67     radius ? parseFloat(radius) : 5
68   );
69   sendSuccess(res, captains);
70 });
71 
72 // ── Location (REST fallback) ──────────────────────────────────────────
73 const updateLocation = wrap(async (req, res) => {
74   const { lat, lng } = req.body;
75   await captainService.updateLocation(req.user.id, lat, lng);
76   sendSuccess(res, null, 'Location updated');
77 });
78 
79 // ── Documents ─────────────────────────────────────────────────────────
80 const uploadSingleDoc = wrap(async (req, res) => {
81   const { type } = req.params;
82   const allowed = ['nationalId', 'driverLicense', 'vehicleLicense'];
83   if (!allowed.includes(type)) return sendError(res, 'Invalid document type', 400);
84   if (!req.file) return sendError(res, 'No file uploaded', 400);
85 
86   await captainService.updateSingleDocument(req.user.id, type, req.file.path);
87   sendSuccess(res, { field: type, url: req.file.path }, 'Document uploaded');
88 });
89 
90 // ── Personal & vehicle info ───────────────────────────────────────────
91 const updatePersonal = wrap(async (req, res) => {
92   const captain = await captainService.updatePersonal(req.user.id, req.body);
93   sendSuccess(res, captain, 'Personal info updated');
94 });
95 
96 const updateVehicle = wrap(async (req, res) => {
97   const captain = await captainService.updateVehicle(req.user.id, req.body);
98   sendSuccess(res, captain, 'Vehicle info updated');
99 });
100 
101 // ── Admin actions ─────────────────────────────────────────────────────
102 const adminApprove = wrap(async (req, res) => {
103   const captain = await captainService.approveCaptain(req.params.id);
104   sendSuccess(res, captain, 'Captain approved');
105 });
106 
107 const adminReject = wrap(async (req, res) => {
108   const captain = await captainService.rejectCaptain(req.params.id, req.body.reason);
109   sendSuccess(res, captain, 'Captain rejected');
110 });
111 
112 module.exports = {
113   applyCaptain,
114   checkApplicationStatus,
115   getStatus,
116   toggleOnline,
117   getNearbyDrivers,
118   updateLocation,
119   uploadSingleDoc,
120   updatePersonal,
121   updateVehicle,
122   adminApprove,
123   adminReject,
124 };
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
10 const findNearby = (lng, lat, radiusKm = 5) =>
11   Captain.find({
12     status: 'approved',
13     isOnline: true,
14     isOnTrip: false,
15     location: {
16       $near: {
17         $geometry: { type: 'Point', coordinates: [lng, lat] },
18         $maxDistance: radiusKm * 1000,
19       },
20     },
21   })
22     .populate('userId', 'name avatar phone')
23     .lean();
24 
25 const updateById = (id, update) =>
26   Captain.findByIdAndUpdate(id, update, { new: true });
27 
28 const updateByUserId = (userId, update) =>
29   Captain.findOneAndUpdate({ userId }, update, { new: true });
30 
31 const saveDoc = (doc) => doc.save();
32 
33 module.exports = {
34   findById,
35   findByUserId,
36   findByUserIdPopulated,
37   findNearby,
38   updateById,
39   updateByUserId,
40   saveDoc,
41 };
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
27   if (!captain) throw new Error('Captain not found');
28   if (captain.status !== 'approved') throw new Error('Captain not approved');
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
6 const _lastDbWrite = new Map();
7 
8 const register = (io, socket) => {
9   if (socket.data.role !== 'captain') return;
10 
11   const userId = socket.data.userId;
12 
13   // ── Go online ────────────────────────────────────────────────────
14   socket.on('captain:go:online', async () => {
15     try {
16       const captain = await captainRepo.findByUserIdPopulated(userId);
17       if (!captain || captain.status !== 'approved') {
18         return socket.emit('error', { code: 'NOT_APPROVED', message: 'Captain not approved' });
19       }
20 
21       // Profile completeness gate
22       if (!captain.vehicleType || !captain.vehicleModel || !captain.plateNumber) {
23         return socket.emit('error', { code: 'PROFILE_INCOMPLETE', message: 'Complete your vehicle profile first' });
24       }
25 
26       captain.isOnline = true;
27       captain.socketId = socket.id;
28       captain.lastActiveAt = new Date();
29       await captainRepo.saveDoc(captain);
30 
31       // Cache Captain._id on socket for fast access in location updates
32       socket.data.captainId = captain._id.toString();
33 
34       emitToPassengers('captain:appear', _formatAppear(captain));
35       socket.emit('captain:online:ack', { isOnline: true });
36 
37       logger.info(`[Captain Socket] ${userId} went online`);
38     } catch (err) {
39       logger.error('[Captain Socket] captain:go:online error', err);
40     }
41   });
42 
43   // ── Go offline ───────────────────────────────────────────────────
44   socket.on('captain:go:offline', () => _setOffline(userId, socket));
45 
46   // ── Location update (high frequency) ────────────────────────────
47   socket.on('captain:location:update', async ({ lat, lng, heading = 0 }) => {
48     if (lat == null || lng == null) return;
49 
50     const captainId = socket.data.captainId;
51     if (!captainId) return; // not online yet
52 
53     // Instant broadcast to passengers (no DB wait)
54     emitToPassengers('captain:move', { captainId, lat, lng, heading });
55 
56     // If captain is in a live trip, also broadcast to the trip room
57     const tripId = socket.data.activeTripId;
58     if (tripId) {
59       io.to(`trip:${tripId}`).emit('trip:location:update', { captainId, lat, lng, heading });
60     }
61 
62     // Throttled DB write
63     const now = Date.now();
64     if (now - (_lastDbWrite.get(userId) ?? 0) < LOCATION_THROTTLE_MS) return;
65     _lastDbWrite.set(userId, now);
66 
67     captainRepo
68       .updateByUserId(userId, {
69         $set: {
70           location: { type: 'Point', coordinates: [lng, lat] },
71           heading,
72           lastLocationAt: new Date(),
73         },
74       })
75       .catch((err) => logger.error('[Captain Socket] location DB write error', err));
76   });
77 
78   // ── Auto-offline on disconnect ───────────────────────────────────
79   socket.on('disconnect', () => _setOffline(userId, socket));
80 };
81 
82 // ── Private ──────────────────────────────────────────────────────────
83 async function _setOffline(userId, socket) {
84   try {
85     const captain = await captainRepo.findByUserId(userId);
86     if (!captain || !captain.isOnline) return;
87 
88     // Guard against duplicate-socket race: a newer socket may have taken over
89     if (captain.socketId && captain.socketId !== socket.id) return;
90 
91     captain.isOnline = false;
92     captain.socketId = null;
93     captain.lastActiveAt = new Date();
94     await captainRepo.saveDoc(captain);
95 
96     // Use socket.to instead of emitToPassengers so the emitter excludes itself
97     socket.to('passengers').emit('captain:disappear', { captainId: captain._id.toString() });
98     logger.info(`[Captain Socket] ${userId} went offline`);
99   } catch (err) {
100     logger.error('[Captain Socket] _setOffline error', err);
101   }
102 }
103 
104 function _formatAppear(captain) {
105   return {
106     captainId: captain._id.toString(),
107     name: captain.userId?.name,
108     avatar: captain.userId?.avatar,
109     vehicleType: captain.vehicleType,
110     vehicleColor: captain.vehicleColor,
111     lat: captain.location?.coordinates?.[1] ?? 0,
112     lng: captain.location?.coordinates?.[0] ?? 0,
113     heading: captain.heading ?? 0,
114     rating: captain.rating ?? 0,
115   };
116 }
117 
118 module.exports = { register };
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
10   requireRole('passenger', 'captain'), 
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
4 // Thin wrapper — all business logic lives in trip.service
5 const wrap = (fn) => async (req, res, next) => {
6   try { await fn(req, res, next); } catch (err) { next(err); }
7 };
8 
9 const createTrip = wrap(async (req, res) => {
10   const trip = await tripService.createTrip(req.user.id, req.body.captainId, req.body.startLocation);
11   sendSuccess(res, trip, 'Trip created', 201);
12 });
13 
14 const acceptTrip = wrap(async (req, res) => {
15   const trip = await tripService.acceptTrip(req.params.id, req.user.id);
16   sendSuccess(res, trip, 'Trip accepted');
17 });
18 
19 const markOnTheWay = wrap(async (req, res) => {
20   const trip = await tripService.markOnTheWay(req.params.id, req.user.id);
21   sendSuccess(res, trip);
22 });
23 
24 const markArrived = wrap(async (req, res) => {
25   const trip = await tripService.markArrived(req.params.id, req.user.id);
26   sendSuccess(res, trip);
27 });
28 
29 const startTrip = wrap(async (req, res) => {
30   const trip = await tripService.startTrip(req.params.id, req.user.id);
31   sendSuccess(res, trip);
32 });
33 
34 const endTrip = wrap(async (req, res) => {
35   const trip = await tripService.endTrip(req.params.id, req.user.id, req.body.distanceKm);
36   sendSuccess(res, trip);
37 });
38 
39 const cancelTrip = wrap(async (req, res) => {
40   const trip = await tripService.cancelTrip(req.params.id, req.user.id, req.user.role, req.body.reason);
41   sendSuccess(res, trip, 'Trip cancelled');
42 });
43 
44 const getCurrentTrip = wrap(async (req, res) => {
45   const trip = await tripService.getCurrentTrip(req.user.id, req.user.role);
46   sendSuccess(res, trip);
47 });
48 
49 const getTrip = wrap(async (req, res) => {
50   const trip = await tripService.getTrip(req.params.id);
51   if (!trip) return sendError(res, 'Trip not found', 404);
52   sendSuccess(res, trip);
53 });
54 
55 module.exports = {
56   createTrip,
57   acceptTrip,
58   markOnTheWay,
59   markArrived,
60   startTrip,
61   endTrip,
62   cancelTrip,
63   getCurrentTrip,
64   getTrip,
65 };
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
19     captainId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true },
20     status: {
21       type: String,
22       enum: VALID_STATUSES,
23       default: 'searching',
24     },
25     startLocation: {
26       lat:     { type: Number, required: true },
27       lng:     { type: Number, required: true },
28       address: { type: String },
29     },
30     endLocation: {
31       lat:     Number,
32       lng:     Number,
33       address: String,
34     },
35     distanceKm:   { type: Number, default: 0 },
36     totalFare:    { type: Number, default: 0 },
37     fareBreakdown: {
38       firstKm:   Number,
39       firstFare: Number,
40       extraKm:   Number,
41       extraFare: Number,
42       total:     Number,
43     },
44     cancellationReason: String,
45     cancelledBy: { type: String, enum: ['passenger', 'captain'] },
46 
47     // State-change timestamps (one per transition)
48     acceptedAt:  Date,
49     onTheWayAt:  Date,
50     arrivedAt:   Date,
51     startedAt:   Date,
52     endedAt:     Date,
53     cancelledAt: Date,
54   },
55   { timestamps: true }
56 );
57 
58 // Guard method used in trip.service to prevent illegal transitions
59 tripSchema.methods.canTransitionTo = function (newStatus) {
60   return (TRANSITIONS[this.status] ?? []).includes(newStatus);
61 };
62 
63 module.exports = mongoose.model('Trip', tripSchema);
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
20 module.exports = { findById, findByIdPopulated, findOne, findOnePopulated, create, saveDoc };
```

## File: `src\modules\trip\trip.routes.js`

```javascript
1 const express = require('express');
2 const router = express.Router();
3 const controller = require('./trip.controller');
4 const authMiddleware = require('../../middlewares/auth.middleware');
5 const { requireRole } = require('../../middlewares/role.middleware');
6 const { validate } = require('../../middlewares/validate');
7 const { createTripSchema, endTripSchema, cancelTripSchema } = require('./trip.validation');
8 
9 // ── Any authenticated user ────────────────────────────────────────────
10 // Must be before /:id routes to avoid param capture
11 router.get('/current', authMiddleware, controller.getCurrentTrip);
12 
13 router.get('/:id',        authMiddleware, controller.getTrip);
14 router.post('/:id/cancel', authMiddleware, validate(cancelTripSchema), controller.cancelTrip);
15 
16 // ── Passenger only ────────────────────────────────────────────────────
17 router.post('/', authMiddleware, requireRole('passenger'), validate(createTripSchema), controller.createTrip);
18 
19 // ── Captain only ──────────────────────────────────────────────────────
20 router.post('/:id/accept',     authMiddleware, requireRole('captain'), controller.acceptTrip);
21 router.post('/:id/on-the-way', authMiddleware, requireRole('captain'), controller.markOnTheWay);
22 router.post('/:id/arrived',    authMiddleware, requireRole('captain'), controller.markArrived);
23 router.post('/:id/start',      authMiddleware, requireRole('captain'), controller.startTrip);
24 router.post('/:id/end',        authMiddleware, requireRole('captain'), validate(endTripSchema), controller.endTrip);
25 
26 module.exports = router;
```

## File: `src\modules\trip\trip.service.js`

```javascript
1 const tripRepo = require('./trip.repository');
2 const captainRepo = require('../captain/captain.repository');
3 const userRepo = require('../user/user.repository');
4 const { calcFareBreakdown } = require('../../utils/fare.util');
5 const { emitToUser, emitToTrip } = require('../../socket');
6 const logger = require('../../config/logger');
7 
8 const ACTIVE_STATUSES = ['searching', 'accepted', 'onTheWay', 'arrived', 'started'];
9 
10 // ── Passenger: create trip ────────────────────────────────────────────
11 const createTrip = async (passengerId, captainId, startLocation) => {
12   const captain = await captainRepo.findById(captainId);
13   if (!captain || captain.status !== 'approved') throw new Error('Captain not available');
14   if (!captain.isOnline) throw new Error('Captain is offline');
15   if (captain.isOnTrip) throw new Error('Captain is already on a trip');
16 
17   const trip = await tripRepo.create({ passengerId, captainId: captain._id, startLocation });
18 
19   // Resolve passenger name for the notification payload
20   const passenger = await userRepo.findById(passengerId);
21 
22   // Notify captain — they are identified by their User._id on the socket
23   emitToUser(captain.userId.toString(), 'trip:request:incoming', {
24     tripId:    trip._id.toString(),
25     passenger: { id: passengerId.toString(), name: passenger?.name, avatar: passenger?.avatar },
26     startLocation,
27   });
28 
29   logger.info(`[Trip] created ${trip._id} | passenger=${passengerId} | captain=${captainId}`);
30   return trip;
31 };
32 
33 // ── Captain: accept ───────────────────────────────────────────────────
34 const acceptTrip = async (tripId, captainUserId) => {
35   const trip = await tripRepo.findById(tripId);
36   if (!trip) throw new Error('Trip not found');
37 
38   const captain = await captainRepo.findByUserIdPopulated(captainUserId);
39   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
40   if (!trip.canTransitionTo('accepted')) throw new Error(`Cannot accept from status: ${trip.status}`);
41 
42   trip.status = 'accepted';
43   trip.acceptedAt = new Date();
44   await tripRepo.saveDoc(trip);
45 
46   await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
47 
48   emitToUser(trip.passengerId.toString(), 'trip:accepted', {
49     tripId: trip._id.toString(),
50     captain: {
51       captainId:    captain._id.toString(),
52       name:         captain.userId?.name,
53       avatar:       captain.userId?.avatar,
54       vehicleType:  captain.vehicleType,
55       vehicleModel: captain.vehicleModel,
56       vehicleColor: captain.vehicleColor,
57       plateNumber:  captain.plateNumber,
58       rating:       captain.rating,
59     },
60   });
61 
62   logger.info(`[Trip] ${tripId} accepted by ${captainUserId}`);
63   return tripRepo.findByIdPopulated(tripId);
64 };
65 
66 // ── Captain: status transitions (onTheWay / arrived / started) ────────
67 const _captainTransition = async (tripId, captainUserId, newStatus) => {
68   const trip = await tripRepo.findById(tripId);
69   if (!trip) throw new Error('Trip not found');
70 
71   const captain = await captainRepo.findByUserId(captainUserId);
72   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
73   if (!trip.canTransitionTo(newStatus)) throw new Error(`Cannot transition to ${newStatus} from ${trip.status}`);
74 
75   const tsField = { onTheWay: 'onTheWayAt', arrived: 'arrivedAt', started: 'startedAt' }[newStatus];
76   trip.status = newStatus;
77   if (tsField) trip[tsField] = new Date();
78   await tripRepo.saveDoc(trip);
79 
80   emitToTrip(tripId, 'trip:status:update', { tripId, status: newStatus });
81   logger.info(`[Trip] ${tripId} → ${newStatus}`);
82   return trip;
83 };
84 
85 const markOnTheWay = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'onTheWay');
86 const markArrived  = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'arrived');
87 const startTrip    = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'started');
88 
89 // ── Captain: end trip ─────────────────────────────────────────────────
90 const endTrip = async (tripId, captainUserId, distanceKm) => {
91   const trip = await tripRepo.findById(tripId);
92   if (!trip) throw new Error('Trip not found');
93 
94   const captain = await captainRepo.findByUserId(captainUserId);
95   if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
96   if (!trip.canTransitionTo('ended')) throw new Error(`Cannot end from status: ${trip.status}`);
97 
98   const fare = calcFareBreakdown(distanceKm);
99   trip.status = 'ended';
100   trip.endedAt = new Date();
101   trip.distanceKm = distanceKm;
102   trip.totalFare = fare.total;
103   trip.fareBreakdown = fare;
104   await tripRepo.saveDoc(trip);
105 
106   await captainRepo.updateByUserId(captainUserId, { isOnTrip: false, $inc: { totalTrips: 1 } });
107 
108   emitToTrip(tripId, 'trip:status:update', { tripId, status: 'ended', fare });
109   logger.info(`[Trip] ${tripId} ended | km=${distanceKm} | fare=${fare.total}`);
110   return trip;
111 };
112 
113 // ── Either party: cancel ──────────────────────────────────────────────
114 const cancelTrip = async (tripId, userId, role, reason) => {
115   const trip = await tripRepo.findById(tripId);
116   if (!trip) throw new Error('Trip not found');
117   if (!trip.canTransitionTo('cancelled')) throw new Error('Cannot cancel trip in current state');
118 
119   if (role === 'passenger') {
120     if (trip.passengerId.toString() !== userId.toString()) throw new Error('Unauthorized');
121   } else if (role === 'captain') {
122     const captain = await captainRepo.findByUserId(userId);
123     if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
124     await captainRepo.updateByUserId(userId, { isOnTrip: false });
125   }
126 
127   trip.status = 'cancelled';
128   trip.cancelledAt = new Date();
129   trip.cancellationReason = reason || null;
130   trip.cancelledBy = role;
131   await tripRepo.saveDoc(trip);
132 
133   emitToTrip(tripId, 'trip:cancelled', { tripId, reason: reason || null, cancelledBy: role });
134   logger.info(`[Trip] ${tripId} cancelled by ${role}`);
135   return trip;
136 };
137 
138 // ── GET /trips/current ────────────────────────────────────────────────
139 const getCurrentTrip = async (userId, role) => {
140   if (role === 'passenger') {
141     return tripRepo.findOnePopulated({ passengerId: userId, status: { $in: ACTIVE_STATUSES } });
142   }
143   if (role === 'captain') {
144     const captain = await captainRepo.findByUserId(userId);
145     if (!captain) return null;
146     return tripRepo.findOnePopulated({ captainId: captain._id, status: { $in: ACTIVE_STATUSES } });
147   }
148   return null;
149 };
150 
151 const getTrip = (tripId) => tripRepo.findByIdPopulated(tripId);
152 
153 module.exports = {
154   createTrip,
155   acceptTrip,
156   markOnTheWay,
157   markArrived,
158   startTrip,
159   endTrip,
160   cancelTrip,
161   getCurrentTrip,
162   getTrip,
163 };
```

## File: `src\modules\trip\trip.socket.js`

```javascript
1 // Trip socket handler — manages room membership for realtime trip updates.
2 // Business logic (state transitions) stays in trip.service; this file only
3 // handles the socket plumbing.
4 const register = (io, socket) => {
5   // Client joins trip room to receive realtime status updates + location
6   socket.on('trip:join', (tripId) => {
7     if (!tripId) return;
8     socket.join(`trip:${tripId}`);
9     socket.data.activeTripId = tripId;
10   });
11 
12   socket.on('trip:leave', (tripId) => {
13     if (!tripId) return;
14     socket.leave(`trip:${tripId}`);
15     if (socket.data.activeTripId === tripId) {
16       socket.data.activeTripId = null;
17     }
18   });
19 };
20 
21 module.exports = { register };
```

## File: `src\modules\trip\trip.validation.js`

```javascript
1 const Joi = require('joi');
2 
3 const createTripSchema = Joi.object({
4   captainId: Joi.string().hex().length(24).required(),
5   startLocation: Joi.object({
6     lat:     Joi.number().min(-90).max(90).required(),
7     lng:     Joi.number().min(-180).max(180).required(),
8     address: Joi.string().optional(),
9   }).required(),
10 });
11 
12 const endTripSchema = Joi.object({
13   distanceKm: Joi.number().min(0).required(),
14 });
15 
16 const cancelTripSchema = Joi.object({
17   reason: Joi.string().max(300).optional().allow('', null),
18 });
19 
20 module.exports = { createTripSchema, endTripSchema, cancelTripSchema };
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
19     // Array supports multiple devices (max 5, FIFO)
20     refreshTokens: [{ type: String }],
21   },
22   { timestamps: true }
23 );
24 
25 module.exports = mongoose.model('User', userSchema);
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
8 const initSocket = (server) => {
9   io = new Server(server, {
10     cors: {
11       origin: env.SOCKET_CORS_ORIGIN || '*',
12       methods: ['GET', 'POST'],
13       credentials: true,
14     },
15   });
16 
17   // JWT auth middleware — runs before every connection
18   io.use((socket, next) => {
19     const authHeader = socket.handshake.headers.authorization;
20     if (!authHeader?.startsWith('Bearer ')) {
21       return next(new Error('UNAUTHORIZED'));
22     }
23     const token = authHeader.split(' ')[1];
24     const decoded = verifyAccessToken(token);
25     if (!decoded) {
26       return next(new Error('INVALID_TOKEN'));
27     }
28     socket.data.userId = decoded.id.toString();
29     socket.data.role = decoded.role;
30     next();
31   });
32 
33   io.on('connection', (socket) => {
34     const { userId, role } = socket.data;
35     logger.info(`[Socket] connected ${socket.id} | user=${userId} | role=${role}`);
36 
37     // Personal room — enables targeted messages to any user
38     socket.join(`user:${userId}`);
39 
40     // Role rooms
41     if (role === 'passenger') socket.join('passengers');
42 
43     // Register per-module handlers (lazy require avoids circular deps at load time)
44     require('../modules/captain/captain.socket').register(io, socket);
45     require('../modules/trip/trip.socket').register(io, socket);
46 
47     socket.on('disconnect', (reason) => {
48       logger.info(`[Socket] disconnected ${socket.id} | user=${userId} | reason=${reason}`);
49     });
50   });
51 
52   return io;
53 };
54 
55 const getIo = () => {
56   if (!io) throw new Error('Socket.IO not initialized');
57   return io;
58 };
59 
60 // Emit to a specific user's personal room
61 const emitToUser = (userId, event, data) => {
62   if (!io) return;
63   io.to(`user:${userId}`).emit(event, data);
64 };
65 
66 // Emit to all sockets inside a trip room
67 const emitToTrip = (tripId, event, data) => {
68   if (!io) return;
69   io.to(`trip:${tripId}`).emit(event, data);
70 };
71 
72 // Emit to all online passengers
73 const emitToPassengers = (event, data) => {
74   if (!io) return;
75   io.to('passengers').emit(event, data);
76 };
77 
78 module.exports = { initSocket, getIo, emitToUser, emitToTrip, emitToPassengers };
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

