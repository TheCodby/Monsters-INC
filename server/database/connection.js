const url = process.env.MONGO_URL;
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to ${url}`)
});

module.exports = {

  connectToServer: async function( callback ) {
    await mongoose.connect( url,  { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});
    mongoose.Promise = global.Promise;
  },
};

