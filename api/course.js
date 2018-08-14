const express = require("express");
const router = express.Router();
const passport = require("passport");
const db_models = require("../orm").db;
const Op = require("../orm").Sequelize.Op;
const check_is_student = require("../auth/check-is-student");
const check_is_teacher = require("../auth/check-is-teacher");
const joins = require("./utils/joins");
const get_student = require("./utils/get-student-from-user");
const get_teacher = require("./utils/get-teacher-from-user");
const validators = require("./utils/validators");
const sqlz_exceptions = require("./utils/sequelize-exceptions");

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_teacher(req, res, next),
  (req, res) => {
    get_teacher(req, res, teacher => {
      course_atts = [
        "id",
        "course_name",
        "section_num",
        "semester",
        "year",
        "teacher_id"
      ];

      db_models.course
        .findAll({
          attributes: course_atts,
          where: { teacher_id: teacher.id }
        })
        .then(courses => {
          return res.json(courses);
        })
        .catch(err => res.status(404).json(sqlz_exceptions.build_errors(err)));
    });
  }
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_teacher(req, res, next),
  (req, res) => {
    result = validators.do_attributes_exists(req.body, res, [
      "course_name",
      "section_num",
      "semester",
      "year"
    ]);

    if (result !== undefined) {
      return result;
    }

    get_teacher(req, res, teacher => {
      course_atts = [
        "id",
        "course_name",
        "section_num",
        "semester",
        "year",
        "teacher_id"
      ];

      db_models.course
        .create(
          {
            course_name: req.body.course_name,
            section_num: req.body.section_num,
            semester: req.body.semester,
            year: req.body.year,
            teacher_id: teacher.id
          },
          { attributes: course_atts }
        )
        .then(course => {
          return res.json(course);
        })
        .catch(err => {
          res.status(404).json(sqlz_exceptions.build_errors(err));
        });
    });
  }
);

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
