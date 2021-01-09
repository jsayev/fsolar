const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getAll(req, res, next) {
    db.query(`select * from conference_schedule`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.conferences = result;
        next();
      } catch (error) {
        next(error);
      }
    });
  },

  getOne(req, res, next) {
    db.query(
      `select ct.id,ct.time,ct.presentationName,s.fullname as speakername,ct.isBreak from conference_schedule_times as ct left join speakers as s on ct.speakerID=s.id where ct.conferenceScheduleID=${req.params.id}`,
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

  addNewDate(req, res, next) {
    db.query(`insert into conference_schedule set date="${req.body.date}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added conference date successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  removeDate(req, res, next) {
    db.query(`delete from conference_schedule as c where c.id=${req.params.id}`, (err, result) => {
      try {
        if (err) throw err;

        if (result.affectedRows > 0) {
          res.json("Removed conference schedule date successfully!");
        } else {
          throw "Conference schedule date doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },

  removeTime(req, res, next) {
    db.query(`delete from conference_schedule_times where id=${req.params.id}`, (err, result) => {
      try {
        if (err) throw err;

        if (result.affectedRows > 0) {
          res.json("Removed conference schedule time successfully!");
        } else {
          throw "Conference schedule time doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
