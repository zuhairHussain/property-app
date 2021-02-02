var dotenv = require("dotenv");
dotenv.load();

module.exports = {
  base_url: process.env.BASE_URL,
  secret: process.env.APP_SECRET_KEY,
  dev_mongo_uri: process.env.DEV_MONGODB_URI,
  email_from: process.env.EMAIL_FROM,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS
};
