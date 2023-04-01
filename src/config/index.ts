require('dotenv').config();

export default {
  port: parseInt(process.env.PORT) || 4000,
  enviroment: process.env.ENVIROMENT || 'prod',
  databaseURL: process.env.MONGODB_URI,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || 'ap-south-1',
  from: process.env.FROM_EMAIL,
  replyTo: process.env.REPLY_EMAIL,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
};

