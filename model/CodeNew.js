const { model, Schema } = require("mongoose");

const CodeNewSchema = new Schema({
    code: {
        type: String,
        require: true
    }
});

const CodeNew = model("CodeNew", CodeNewSchema);

module.exports = CodeNew;