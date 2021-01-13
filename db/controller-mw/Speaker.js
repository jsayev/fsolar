const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(`select * from speakers limit 10 offset ${(req.params.page - 1) * 10}`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.speakers = result;
        db.query(`select count(*) as count from speakers`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.speakerCount = result[0].count;
            next();
          } catch (error) {
            next(error);
          }
        });
      } catch (error) {
        next(error);
      }
    });
  },

  getInitial(req, res, next) {
    db.query(`select * from speakers limit 10`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.speakers = result;
        db.query(`select count(*) as count from speakers`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.speakerCount = result[0].count;
            next();
          } catch (error) {
            next(error);
          }
        });
      } catch (error) {
        next(error);
      }
    });
  },

  getForConf(req, res, next) {
    db.query(`select id,fullname from speakers`, (err, result) => {
      try {
        if (err) throw err;

        res.json(result);
      } catch (error) {
        next(error);
      }
    });
  },

  addNew(req, res, next) {
    db.query(
      `insert into speakers set fullname="${req.body.fullname}",photo="${req.files["speakerPhoto"][0].filename}",position="${req.body.position}",company="${req.body.company}",companyLogo="${req.files["companyLogo"][0].filename}",about="${req.body.about}"`,
      (err, result) => {
        try {
          if (err) throw err;

          res.json("Added speaker successfully!");
        } catch (error) {
          next(error);
        }
      }
    );
  },

  remove(req, res, next) {
    db.query(`select photo,companyLogo from speakers where id="${req.params.id}"`, (err, speakers) => {
      try {
        if (err) throw err;

        if (speakers.length > 0) {
          const { photo, companyLogo } = speakers[0];

          db.query(`delete from speakers where id=${req.params.id}`, (err, result) => {
            try {
              if (err) {
                if (err.code === "ER_ROW_IS_REFERENCED_2") throw "Please clear speaker related fields first!";
                throw err;
              }

              fs.unlink(`./public/uploads/speakers/${photo}`, (err) => {
                if (err) return console.log("Error during speaker photo removal!");
                console.log("Speaker photo was removed successfully!");
              });

              fs.unlink(`./public/uploads/companies/${companyLogo}`, (err) => {
                if (err) return console.log("Error during company logo removal for speaker!");
                console.log("Company logo was removed successfully!");
              });

              res.json(`Deleted speaker successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Speaker doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
