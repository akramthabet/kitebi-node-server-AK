const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        title: { type: String },
        author: { type: String },
        releaseDate: { type: Date },
        coverId: { type: String },
        pdfId: { type: String }
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
module.exports = mongoose.model("Book", BookSchema);
