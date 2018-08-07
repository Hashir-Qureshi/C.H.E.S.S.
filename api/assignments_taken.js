const express = require("express");
const router = express.Router();
const passport = require("passport");
const db_models = require("../orm").db;
const validators = require("./utils/validators");
const check_is_student = require("../auth/check-is-student");
const sqlz_exceptions = require("./utils/sequelize-exceptions");
const get_student = require("./utils/get-student-from-user");

router.get(
  "/get_grade",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_student(req, res, next),
  (req, res) => {
    validators.do_attributes_exists(req.query, res, ["assignment_id"]);

    get_student(req, res, student => {
      where = {
        assignment_id: req.query.assignment_id,
        student_id: student.id
      };

      ass_tkn_atts = ["assignment_id", "student_id", "grade", "id"];

      db_models.assignments_taken
        .findAll({ where, attributes: ass_tkn_atts })
        .then(assignments_taken => {
          return res.json(assignments_taken);
        })
        .catch(err => {
          res.status(404).json(sqlz_exceptions.build_errors(err));
        });
    });
  }
);
module.exports = router;
