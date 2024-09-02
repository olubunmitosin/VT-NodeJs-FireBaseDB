require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    host: process.env.HOST,
    hostUrl: process.env.HOST_URL,
    firebaseConfig: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      databaseId: process.env.DATABASE_NAME,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
};