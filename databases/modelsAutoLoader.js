const Member = require("../models/adminModel");
const sequelize = require("./config");

exports.connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Youth Academy DB connection successfully.');
      return sequelize; 
    } catch (error) {
      console.error('Unable to connect to the database:',error);
      throw error; 
    }
};

const Models = {
  'members': Member
};

exports.modelsAutoLoader = async () => {
    try {
      for (const modelName in Models) {
        await Models[modelName].sync();
        console.log(`${modelName} table created successfully.`);
      }
    } catch (error) {
      console.error('Unable to create tables:', error);
      throw error; 
    }
}
