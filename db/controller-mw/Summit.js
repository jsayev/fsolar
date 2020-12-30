const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  pickAll(req, res, next) {
    db.query(`select * from summits`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.summit = result[0];
        db.query(`select * from summit_files`, (err, result) => {
          if (err) console.log(err);
          
          res.locals.summitFiles = result;
          next();
        });
      } catch (error) {
        next(error);
      }
    });
  },

  create(req, res, next) {
    db.query(
      `insert into summits set title="${req.body.title}",date="${req.body.date}",edition="${req.body.edition}",location="${req.body.location}",about="${req.body.about}",videoLink="${req.body.videoLink}"`,
      (err, newSummit) => {
        try {
          if (err) throw err;

          if (req.files.length > 0) {
            req.files.forEach((file) => {
              db.query(`insert into summit_files set summitID=${newSummit.insertId},fileName="${file.filename}",originalName="${file.originalname}"`);
            });
          }

          res.json("Created summit successfully!");
        } catch (error) {
          next(error);
        }
      }
    );
  },

  delete(req, res, next) {
    db.query(`delete from summit_files`, (err, result) => {
      try {
        if (err) throw err;

        if (result.affectedRows > 0) {
          db.query(`delete from summits`, (err, result) => {
            try {
              if (err) throw err;

              if (result.affectedRows > 0) {
                fs.readdir(`./public/uploads/summit`, (err, fileNames) => {
                  if (err) return console.log(err);

                  fileNames.forEach((name) => {
                    if (name != ".gitkeep") {
                      fs.unlink(`./public/uploads/summit/${name}`, (err) => {
                        if (err) console.log(err);
                      });
                    }
                  });
                  console.log("Summit file(s) was removed successfully!");
                });

                res.json("Deleted summit successfully!");
              } else {
                throw "Summit doesn't exist!";
              }
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Error occured during removal of summit!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
