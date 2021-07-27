const express = require("express");
const cors = require('cors');
const DBconnection = require('./database/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.get("/api", async(req, res) => {
  db = DBconnection.getDb()
  let monostersData = await db.collection( 'employees' ).find({}).toArray((err, r) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(r, null, 4));
  })
})
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  db = DBconnection.connectToServer(function( err, client ) {
    if (err) {console.log(err)} else {console.log("Connected to database")};
    // WE START
  })
});