const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(
      `select s.fullname,s.position,s.company,t.impression,t.id from testimonials as t inner join speakers as s on t.speakerID=s.id limit 10 offset ${
        (req.params.page - 1) * 10
      }`,
      (err, result) => {
        try {
          if (err) throw err;

          res.locals.testimonials = result;
          db.query(`select count(*) as count from testimonials`, (err, result) => {
            try {
              if (err) throw err;

              res.locals.testimonialCount = result[0].count;
              db.query(`select s.id,s.fullname from speakers as s`, (err, result) => {
                try {
                  if (err) throw err;

                  res.locals.speakers = result;
                  next();
                } catch (error) {
                  next(error);
                }
              });
            } catch (error) {
              next(error);
            }
          });
        } catch (error) {
          next(error);
        }
      }
    );
  },

  getInitial(req, res, next) {
    db.query(
      `select s.fullname,s.position,s.company,t.impression,t.id from testimonials as t inner join speakers as s on t.speakerID=s.id limit 10`,
      (err, result) => {
        try {
          if (err) throw err;

          res.locals.testimonials = result;
          db.query(`select count(*) as count from testimonials`, (err, result) => {
            try {
              if (err) throw err;

              res.locals.testimonialCount = result[0].count;
              db.query(`select s.id,s.fullname from speakers as s`, (err, result) => {
                try {
                  if (err) throw err;

                  res.locals.speakers = result;
                  next();
                } catch (error) {
                  next(error);
                }
              });
            } catch (error) {
              next(error);
            }
          });
        } catch (error) {
          next(error);
        }
      }
    );
  },

  addNew(req, res, next) {
    db.query(`insert into testimonials set speakerID=${req.body.speaker},impression="${req.body.impression}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added testimonial successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`delete from testimonials where id="${req.params.id}"`, (err, testimonials) => {
      try {
        if (err) throw err;
        console.log(testimonials);

        res.json("Removed testimonial successfully!");
      } catch (error) {
        next(error);
      }
    });
  },
};
