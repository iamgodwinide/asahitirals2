const mongoose = require("mongoose");


mongoose.connect(process.env.mongo_uri)
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => {
        console.log("DB Connection Error: ", err);
    })