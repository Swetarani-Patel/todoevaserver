const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


const connection = mongoose.connect(
  `mongodb://${USERNAME}:${PASSWORD}@ac-zz8nrip-shard-00-00.z8ix4yv.mongodb.net:27017,ac-zz8nrip-shard-00-01.z8ix4yv.mongodb.net:27017,ac-zz8nrip-shard-00-02.z8ix4yv.mongodb.net:27017/?ssl=true&replicaSet=atlas-32amtb-shard-0&authSource=admin&retryWrites=true&w=majority`
);

module.exports = {connection};