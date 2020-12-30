const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(`select * from support_organizations limit 10 offset ${(req.params.page - 1) * 10}`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.supportOrganizations = result;
        db.query(`select count(*) as count from support_organizations`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.supportOrganizationCount = result[0].count;
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
    db.query(`select * from support_organizations limit 10`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.supportOrganizations = result;
        db.query(`select count(*) as count from support_organizations`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.supportOrganizationCount = result[0].count;
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
    db.query(`insert into support_organizations set title="${req.body.title}",logoFilename="${req.file.filename}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added support organization successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`select logoFilename from support_organizations where id="${req.params.id}"`, (err, partners) => {
      try {
        if (err) throw err;

        if (partners.length > 0) {
          const { logoFilename } = partners[0];

          db.query(`delete from support_organizations where id=${req.params.id}`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./public/uploads/supportOrganizations/${logoFilename}`, (err) => {
                if (err) return console.log("Error during support organization logo removal!");
                console.log("Removed support organization logo successfully!");
              });

              res.json(`Deleted support organization successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Support organization doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
