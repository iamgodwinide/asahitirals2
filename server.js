const express = require("express");
const path = require("path");
const cors = require("cors")
const app = express();

require("dotenv").config();


app.use(cors())
app.use(express.static("./client/build"));

require("./config");

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

const PORT = 9955;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));