const mongoose = require("mongoose");

const AudiobookSchema = new mongoose.Schema(
    {
        title: { type: String },
        author: { type: String },
        releaseDate: { type: Date },
        coverId: { type: String },
        audioId: { type: String }
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
module.exports = mongoose.model("Audiobook", AudiobookSchema);
