const express = require("express");
const router = express.Router();
const passport = require("passport");
const db_models = require("../orm").db;
const Op = require("../orm").Sequelize.Op;
const check_is_student = require("../auth/check-is-student");
const joins = require("./utils/joins");
const get_student = require("./utils/get-student-from-user");
const sqlz_exceptions = require("./utils/sequelize-exceptions");

router.get(
  "/enrolled",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_student(req, res, next),
  (req, res) => {
    get_student(req, res, student => {
      enroll_atts = [
        "id",
        "course_id",
        "student_id",
        "enrollment_date",
        "createdAt",
        "updatedAt"
      ];

      course_atts = [
        "id",
        "course_name",
        "section_num",
        "semester",
        "year",
        "teacher_id",
        "createdAt",
        "updatedAt"
      ];

      db_models.enroll
        .findAll({
          where: { student_id: student.id },
          attributes: enroll_atts
        })
        .then(enrollments => {
          course_ids = joins.get_field_values(enrollments, "course_id");

          db_models.course
            .findAll({
              attributes: course_atts,
              where: { id: { [Op.in]: course_ids } }
            })
            .then(courses => {
              enrollments = joins.join_rows(
                enrollments,
                courses,
                "course",
                "course_id",
                "id"
              );
              return res.json(enrollments);
            })
            .catch(err =>
              res.status(404).json(sqlz_exceptions.build_errors(err))
            );
        })
        .catch(err => res.status(404).json(sqlz_exceptions.build_errors(err)));
    });
  }
);

module.exports = router;
