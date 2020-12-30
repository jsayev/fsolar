const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(`select * from partners limit 10 offset ${(req.params.page - 1) * 10}`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.partners = result;
        db.query(`select count(*) as count from partners`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.partnerCount = result[0].count;
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
    db.query(`select * from partners limit 10`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.partners = result;
        db.query(`select count(*) as count from partners`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.partnerCount = result[0].count;
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

  addNew(req, res, next) {
    db.query(`insert into partners set title="${req.body.title}",logoFilename="${req.file.filename}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added partner successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`select logoFilename from partners where id="${req.params.id}"`, (err, partners) => {
      try {
        if (err) throw err;

        if (partners.length > 0) {
          const { logoFilename } = partners[0];

          db.query(`delete from partners where id=${req.params.id}`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./public/uploads/partners/${logoFilename}`, (err) => {
                if (err) return console.log("Error during partner logo removal!");
                console.log("Removed partner logo successfully!");
              });

              res.json(`Deleted partner successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Partner doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
