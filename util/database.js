const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback = () => {}) => {
  MongoClient.connect(
    "mongodb+srv://samitkapoor77:XqbU6IZ2klCEkB15@cluster0.qj4hqtz.mongodb.net/upstore?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    console.log("Got the database");
    return _db;
  }
  throw "No database found!";
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
