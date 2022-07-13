let Admin = require("../models/admin");
const fs = require("fs");

exports.get = async (req, res) => {
    res.send({ admin: await Admin.findById(req.body._id) });
};

exports.getAll = async (req, res) => {
    res.send({ admins: await Admin.find() });
};

exports.add = async (req, res) => {
    const {  numlib,    name, adresse ,codepostal, releaseDate, } = req.body;
    let admin = await new Admin({
        numlib,
        name,
        adresse ,
        codepostal,
        releaseDate,
        
    }).save();
    return res.send({ message: "Admin added successfully", admin });
};

exports.update = async (req, res) => {
    const { _id,  numlib, name, adresse , codepostal, releaseDate,} = req.body;
    let admin = await Admin.findById(_id);
    if (admin) {
        await admin.update({
            $set: {
                numlib,
                name,
                adresse ,
                codepostal,
                releaseDate
            }
        });
        return res.send({ message: "Admin updated successfully" });
    } else {
        return res.send({ message: "Admin does not exist" });
    }
};

exports.delete = async (req, res) => {
    await Admin.findById(req.body._id)
        .then(function (admin) {
            admin.remove();

            return res.status(201).send({ message: "Admin deleted" });
        }).catch(function (error) {
            console.log(error)
            res.status(500).send();
        });
};

exports.deleteAll = async (req, res) => {
    Admin.find({})
        .then(function (admins) {
            admins.forEach(function (admin) {
                                admin.remove();
            });

            res.send({ message: "All admins have been deleted" });
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
