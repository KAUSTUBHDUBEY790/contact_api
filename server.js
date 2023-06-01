const { parse } = require("dotenv");
const express = require("express");
const errorhandler = require("./middleware/errorhandler");
const connectdb = require("./config/dbConnection");
const env = require("dotenv").config()

connectdb();
const app = express()
const port = process.env.port || 5000;
app.use(express.json());
app.use("/api/contact", require("./routes/contactroutes"))
app.use("/api/user", require("./routes/userroutes"))
app.use(errorhandler)

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})