const multer = require('multer');
const path = require('path');
const fs = require('fs');

// الدليل المطلق للمشروع (حتى لا تتغير النسبية)
const uploadDirectory = path.join(__dirname, '..', 'uploads', 'documents');

// إنشاء المجلد تلقائياً إن لم يكن موجوداً
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
  console.log('📁 Created uploads/documents directory');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|pdf/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('مسموح فقط بـ JPG, PNG, PDF'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// للرفع المتعدد (اختياري)
const uploadDocuments = upload.fields([
  { name: 'nationalId', maxCount: 1 },
  { name: 'driverLicense', maxCount: 1 },
  { name: 'vehicleLicense', maxCount: 1 },
]);

// ✅ رفع مستند واحد مع معالجة الأخطاء
const uploadSingleDocument = (req, res, next) => {
  const single = upload.single('file');
  single(req, res, (err) => {
    if (err) {
      console.error('❌ Multer Error:', err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم إرسال ملف بحقل "file"',
      });
    }
    // تعديل المسار إلى الرابط العام
    req.file.path = '/uploads/documents/' + req.file.filename;
    next();
  });
};

module.exports = { uploadDocuments, uploadSingleDocument };