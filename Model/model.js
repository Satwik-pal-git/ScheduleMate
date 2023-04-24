const mongoose = require("mongoose");

const meeting = new mongoose.Schema({
    Date: {
        type: String,
        required: [true, "Provide the date for the meeting"]
    },
    Start_time: {
        type: String,
        required: [true, "Enter the starting time for the meeting"]
    },
    End_time: {
        type: String,
        required: [true, "Enter the ending for the meeting"]
    },
    Room_ID: {
        type: Number,
        required: [true, "Enter the room id for the meeting"]
    },
    for_person: {
        type: String,
        required: [true, "the host should be present for a meeting"]
    },
    person: [{
        type: String
    }]
});

const user_meeting = mongoose.model("Meeting", meeting);
module.exports = user_meeting;