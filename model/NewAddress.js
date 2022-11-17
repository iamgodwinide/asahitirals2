const { model, Schema } = require("mongoose");

const NewAddress = new Schema({
    address: {
        type: String,
        required: true
    },
});

const Address = model("Address", NewAddress);

module.exports = Address;