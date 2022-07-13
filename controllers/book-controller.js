let Book = require("../models/book");
const fs = require("fs");

exports.get = async (req, res) => {
    res.send({ book: await Book.findById(req.body._id) });
};

exports.getParams = async (req, res) => {
    res.send({ book: await Book.findById({ _id: req.params.bookId }) });
};

exports.getAll = async (req, res) => {
    res.send({ books: await Book.find() });
};

exports.add = async (req, res) => {
    const { title, author, releaseDate , pegi, coverId, pdfId } = req.body;
    let book = await new Book({
        title,
        author,
        releaseDate,
        pegi,
        coverId,
        pdfId,
     //   audioId: req.files.audio[0].filename
    }).save();
    return res.send({ message: "Book added successfully", book });
};

exports.update = async (req, res) => {
    const { _id, title, author, releaseDate, pegi, coverId, pdfId, audioId } = req.body;
    let book = await Book.findById(_id);
    if (book) {
        await book.update({
            $set: {
                title,
                author,
                releaseDate,
                pegi, 
                coverId,
                pdfId,
                audioId
            }
        });
        return res.send({ message: "Book updated successfully" });
    } else {
        return res.send({ message: "Book does not exist" });
    }
};

exports.delete = async (req, res) => {
    await Book.findById(req.body._id)
        .then(function (book) {
            deleteFile("./uploads/books/" + book.coverId)
            deleteFile("./uploads/books/" + book.pdfId)
            deleteFile("./uploads/books/" + book.audio)

            book.remove();

            return res.status(201).send({ message: "Book deleted" });
        }).catch(function (error) {
            console.log(error)
            res.status(500).send();
        });
};

exports.deleteAll = async (req, res) => {
    Book.find({})
        .then(function (books) {
            books.forEach(function (book) {

                deleteFile("./uploads/books/" + book.coverId)
                deleteFile("./uploads/books/" + book.pdfId)
                deleteFile("./uploads/books/" + book.audio)

                book.remove();
            });

            res.send({ message: "All books have been deleted" });
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
