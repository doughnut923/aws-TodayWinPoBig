const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:19006',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todaywinpobig',
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
};

module.exports = { env }; 