const express = require("express");
const router = express.Router();
const passport = require("passport");
const db_models = require("../orm").db;
const Op = require("../orm").Sequelize.Op;
const validators = require("./utils/validators");
const joins = require("./utils/joins");
const check_is_student = require("../auth/check-is-student");
const sqlz_exceptions = require("./utils/sequelize-exceptions");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_student(req, res, next),
  (req, res) => {
    validators.does_one_attribute_exist(req.query, res, [
      "assignment_id",
      "course_id"
    ]);

    let where = {};

    //conditionally add params to where clause if they exist in the query.
    //at least one will exist given that we've performed a validation above
    if (req.query.hasOwnProperty("assignment_id"))
      where["assignment_id"] = req.query.assignment_id;
    if (req.query.hasOwnProperty("course_id"))
      where["course_id"] = req.query.course_id;

    //note the active parameter is optional. But if present it must be of boolean type
    if (req.query.hasOwnProperty("active")) {
      if (typeof req.query.active !== "boolean") {
        return res
          .status(404)
          .json({ error: "active must be 'true' or 'false' (without quotes)" });
      } else {
        where[active] = req.query.active;
      }
    }

    used_assignments_atts = [
      "assignment_id",
      "course_id",
      "created_by",
      "start_date",
      "end_date",
      "id"
    ];

    db_models.used_assignments
      .findAll({ where, attributes: used_assignments_atts })
      .then(used_assignments => {
        course_atts = ["id", "assignment_name", "total_points"];

        assignment_ids = joins.get_field_values(
          used_assignments,
          "assignment_id"
        );

        db_models.assignment
          .findAll({
            attributes: course_atts,
            where: { id: { [Op.in]: assignment_ids } }
          })
          .then(assignments => {
            joined_assignments = joins.join_rows(
              used_assignments,
              assignments,
              "assignments",
              "assignment_id",
              "id"
            );

            return res.json(joined_assignments);
          })
          .catch(err =>
            res.status(404).json(sqlz_exceptions.build_errors(err))
          );
      })
      .catch(err => res.status(404).json(sqlz_exceptions.build_errors(err)));
  }
);

module.exports = router;
