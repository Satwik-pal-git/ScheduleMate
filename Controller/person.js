const Meeting_model = require("../Model/model");
const mongoose = require("mongoose");

exports.host = async (req, res, next) => {
    const host_meetings = await Meeting_model.find({ for_person: req.body.host });
    if (host_meetings.length) {
        res.send("OOPS! the host is in meeting");
        return;
    }
    else {
        next();
    }
};

exports.available_room = async (req, res, next) => {
    const meeting_for_room = await Meeting_model.find({ Room_ID: req.body.Room_ID });
    if (meeting_for_room.length) {
        res.send("oops... Rooms are not available");
    }
    else {
        next();
    }
};

