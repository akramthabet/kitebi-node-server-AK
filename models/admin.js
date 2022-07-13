const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
        numlib: { type: Number },
        name: { type: String },
        adresse: { type: String },
        codepostal: { type: Number },
        releaseDate: { type: Date },
        
       
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
module.exports = mongoose.model("Admin", AdminSchema);
