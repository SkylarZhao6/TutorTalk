const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor"
    },
    tutor: String,
    subject: String,
    content: String
})

const Tip = mongoose.model("Tip", tipSchema);

module.exports = Tip;