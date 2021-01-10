const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getAllDates(req, res, next) {
    db.query(`select * from conference_schedule_dates`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.conferences = result;
        next();
      } catch (error) {
        next(error);
      }
    });
  },

  getTimesForDate(req, res, next) {
    db.query(
      `select ct.id,ct.time,ct.presentationName,s.fullname as speakername,ct.isBreak from conference_schedule_times as ct left join speakers as s on ct.speakerID=s.id where ct.conferenceScheduleDateID=${req.params.id}`,
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
    db.query(`select * from conference_schedule_dates where date="${req.body.date}"`, (err, result) => {
      try {
        if (err) throw err;

        if (result.length > 0) throw "Schedule for this date already exists!";

        db.query(`insert into conference_schedule_dates set date="${req.body.date}"`, (err, result) => {
          try {
            if (err) throw err;

            res.json("Added conference date successfully!");
          } catch (error) {
            next(error);
          }
        });
      } catch (error) {
        next(error);
      }
    });
  },

  addBreakTime(req, res, next) {
    db.query(
      `insert into conference_schedule_times set time="${req.body.time}",isBreak=1,conferenceScheduleDateID=${req.params.dateID}`,
      (err, result) => {
        try {
          if (err) throw err;

          res.json("Added break time successfully!");
        } catch (error) {
          next(error);
        }
      }
    );
  },

  addPresentationTime(req, res, next) {
    db.query(
      `insert into conference_schedule_times set time="${req.body.time},isBreak=0,presentationName="${req.body.title}",speakerID=${
        req.body.speaker ? req.body.speaker : null
      }conferenceScheduleDateID=${req.params.dateID}"`,
      (err, result) => {
        try {
          if (err) throw err;

          res.json("Added presentation time successfully!");
        } catch (error) {
          next(error);
        }
      }
    );
  },

  removeDate(req, res, next) {
    db.query(`delete from conference_schedule_dates where id=${req.params.id}`, (err, result) => {
      try {
        if (err) {
          if (err.code === "ER_ROW_IS_REFERENCED_2") throw "Please clear times first!";
          throw err;
        }

        if (result.affectedRows > 0) {
          res.json("Removed conference schedule date successfully!");
        } else {
          throw "Conference schedule date doesn't exist!";
        }
      } catch (error) {
        console.log(error);
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
