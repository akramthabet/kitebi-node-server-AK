let Audiobook = require("../models/audiobook");
const fs = require("fs");

exports.get = async (req, res) => {
    res.send({ audiobook: await Audiobook.findById(req.body._id) });
};

exports.getAll = async (req, res) => {
    res.send({ audiobooks: await Audiobook.find() });
};

exports.add = async (req, res) => {
    const { title, author, releaseDate } = req.body;
    let audiobook = await new Audiobook({
        title,
        author,
        releaseDate,
        coverId: req.files.cover[0].filename,
        audioId: req.files.audio[0].filename
    }).save();
    return res.send({ message: "Audiobook added successfully", audiobook });
};

exports.update = async (req, res) => {
    const { _id, title, author, releaseDate } = req.body;
    let audiobook = await Audiobook.findById(_id);
    if (audiobook) {
        await audiobook.update({
            $set: {
                title,
                author,
                releaseDate,
                coverId: req.files.cover[0].filename,
                audioId: req.files.audio[0].filename
            }
        });
        return res.send({ message: "Audiobook updated successfully" });
    } else {
        return res.status(404).send({ message: "Audiobook does not exist" });
    }
};


exports.delete = async (req, res) => {
    await Audiobook.findById(req.body._id)
        .then(function (audiobook) {

            deleteFile("./uploads/audiobooks/" + audiobook.coverId)
            deleteFile("./uploads/audiobooks/" + audiobook.pdfId)

            audiobook.remove();

            return res.status(201).send({ message: "Audiobook deleted" });
        }).catch(function (error) {
            console.log(error)
            res.status(500).send();
        });
};

exports.deleteAll = async (req, res) => {
    Audiobook.find()
        .then(function (audiobooks) {
            audiobooks.forEach(function (audiobook) {

                deleteFile("./uploads/audiobooks/" + audiobook.coverId)
                deleteFile("./uploads/audiobooks/" + audiobook.pdfId)

                audiobook.remove();
            });

            res.send({ message: "All audiobooks have been deleted" });
        })
        .catch(function (error) {
            console.log(error)
            res.status(500).send();
        });
};

function deleteFile(fullPath) {
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error("Could not delete file " + fullPath + " : " + err);
            return;
        }
    });
}