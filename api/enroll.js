const express = require("express");
const router = express.Router();
const passport = require("passport");
const db_models = require("../orm").db;
const validators = require("./utils/validators");
const check_is_student = require("../auth/check-is-student");
const get_student = require("./utils/get-student-from-user");
const filter_mod_inst = require("./utils/filter-mod-instance-atts");
const sqlz_exceptions = require("./utils/sequelize-exceptions");

//insert into enroll (course_id, student_id) values (".$courseID.", ".$this->id.");
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_student(req, res, next),
  (req, res) => {
    result = validators.do_attributes_exists(req.body, res, ["course_id"]);

    if (result !== undefined) {
      return result;
    }

    get_student(req, res, student => {
      const newEnrollment = db_models.enroll
        .create(
          { course_id: req.body.course_id, student_id: student.id },
          { attributes: ["id", "course_id", "student_id"] }
        )
        .then(enroll => {
          const censored_enroll = filter_mod_inst(enroll, [
            "id",
            "course_id",
            "student_id"
          ]);

          return res.json(censored_enroll.dataValues);
        })
        .catch(err => {
          res.status(404).json(sqlz_exceptions.build_errors(err));
        });
    });
  }
);

module.exports = router;
