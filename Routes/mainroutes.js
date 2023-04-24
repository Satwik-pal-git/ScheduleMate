const router = require("express").Router();
const { createIndexes } = require("../Model/model");
const Meeting_model = require("../Model/model");
const mongoose = require("mongoose");
const Meeting_controller = require("../Controller/person");
const update_schedule = require("../Controller/delete_meets");

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

router.post("/", (req, res) => {
    var Mail = req.body.mail;
    var pswd = req.body.pwd;
    if (Mail === "person@gmail.com" && pswd === "personpassword") {
        res.redirect("schedule");
    }
    else {
        res.redirect("/");
    }
});

setInterval(update_schedule, 60000);  //updating the meeeting schedules after every one hour

router.get("/schedule", async (req, res) => {
    var all_meetings = await Meeting_model.find({});
    // console.log(all_meetings);
    res.render("main", { meetings: all_meetings });
});

router.post("/schedule", Meeting_controller.host, Meeting_controller.available_room, async (req, res) => {
    var persons = req.body.attendee;
    if (persons === "") {
        var array_person = [];
    }
    else {
        var array_person = persons.split(",");
    }
    var new_meetingDetails = new Meeting_model({
        Date: req.body.date,
        Start_time: req.body.startime,
        End_time: req.body.endtime,
        Room_ID: req.body.Room_ID,
        for_person: req.body.host,
        person: array_person
    });
    try {
        await new_meetingDetails.save();
        res.redirect("/schedule");
    } catch (error) {
        console.log(error);
    }
    // console.log(Date, Start_time, End_time, room_id);
});
router.post("/schedule/:room_id", async (req, res) => {

    var x = " " + (req.body.person_tojoin);

    const curmeeting = await Meeting_model.find({ Room_ID: req.params.room_id });
    if (curmeeting) {
        curmeeting[0].person.push(x);
        await curmeeting[0].save();
        res.redirect("/schedule");
    }
    else {
        res.status(404).send("No record Found");
    }
});
module.exports = router;