const Meeting_model = require("../Model/model");
const mongoose = require("mongoose");
const router2 = require("express").Router();

module.exports = async (req, res, next) => {
    const docs = await Meeting_model.find({});

    // console.log("this is: ", docs);
    for (var i = 0; i < docs.length; i++) {
        var string_end_time = docs[i].End_time + ":00";
        var string_date = docs[i].Date;
        var END = new Date(string_date + " " + string_end_time);
        var cur_date = new Date();

        if (END < cur_date) {
            try {
                Meeting_model.deleteOne({ _id: docs[i]._id }).then((response) => {
                    console.log("Schedule Updated!");
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
};