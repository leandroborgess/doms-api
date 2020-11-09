const MongoClient = require("mongodb").MongoClient;
//require("dotenv").config()
const mongoUrl = "mongodb+srv://leandrobv:leandro1@cluster0.qddr7.mongodb.net/<dbname>?retryWrites=true&w=majority";
//process.env.MONGO_URL

    const uri = mongoUrl;

const connection = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
};

module.exports = connection;