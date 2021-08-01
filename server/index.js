require('dotenv').config()
const http = require('http');
const DBconnection = require('./database/connection');
const app = require('./app')
const server = http.createServer(app);
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  DBconnection.connectToServer();
});