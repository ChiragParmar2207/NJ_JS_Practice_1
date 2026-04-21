const mongoose = require('mongoose');
const configs = require('../configs/configs');
const responseMessages = require('../constants/messages');

const connectDb = async () => {
  try {
    const dbUrl = `${configs.MONGODB_URL}${configs.MONGODB_DB_NAME}`;
    await mongoose
      .connect(dbUrl)
      .then(() => {
        console.log(responseMessages[global.lang].DB_CONNECTED);
      })
      .catch((error) => {
        console.log(responseMessages[global.lang].DB_ERROR, error.message);
      });
  } catch (error) {
    console.log(responseMessages[global.lang].DB_ERROR);
  }
};

const checkDBConnection = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch (error) {
    console.log(responseMessages[global.lang].DB_ERROR, error.message);
    return false;
  }
};

const disConnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log(responseMessages[global.lang].DB_DISCONNECTED);
  } catch (error) {
    console.log(responseMessages[global.lang].DB_ERROR, error.message);
  }
};

module.exports = { connectDb, checkDBConnection, disConnectDB };
