const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getInitial(req, res, next) {
    db.query(`select * from conference_schedule`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.conference = result;
        next();
      } catch (error) {
        next(error);
      }
    });
  },

  getOne(req, res, next) {
    db.query(
      `select ct.time,ct.presentationName,s.fullname as speakername,ct.isBreak from conference_schedule_times as ct left join speakers as s on ct.speakerID=s.id where ct.conferenceScheduleID=${req.params.id}`,
      (err, result) => {
        try {
          if (err) throw err;

          res.json(result);
        } catch (error) {
          next(error);
        }
      }
    );
  },

  addNew(req, res, next) {},

  remove(req, res, next) {
    db.query(`delete from conference_schedule_times as ct where ct.conferenceCcheduleID=${req.params.id}`, (err, result) => {
      try {
        if (err) throw err;

        if (result.affectedRows > 0) {
          res.json("Removed conference schedule successfully!");
        } else {
          throw "Conference schedule doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
