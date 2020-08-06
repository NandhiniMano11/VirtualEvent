require("./src/config/db.js");
const config = require("./src/config/config.js");
const express = require("express") // our express server
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const router = require("./src/routes")

app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload
app.listen(config.port, () => {
  console.info(`server started on port ${config.port}(${config.env})`)// print this when the server starts
  console.info("start at",new Date());
  
})
app.use('/', router)