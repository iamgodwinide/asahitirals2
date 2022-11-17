const { model, Schema } = require("mongoose");

const CodeSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    code: {
        type: String,
        require: true
    }
});

const Code = model("Code", CodeSchema);

module.exports = Code;