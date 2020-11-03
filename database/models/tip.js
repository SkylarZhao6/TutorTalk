const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor"
    },
    subject: String,
    content: String
})

const Tip = mongoose.model("Tip", tipSchema);

module.exports = Tip;