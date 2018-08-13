const express = require("express");
const router = express.Router();
const passport = require("passport");
const db_models = require("../orm").db;
const sequelize = require("../orm").sequelize;
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

    let where = "";

    //conditionally add params to where clause if they exist in the query.
    //at least one will exist given that we've performed a validation above
    if (req.query.hasOwnProperty("assignment_id"))
      where += "assignment_id=" + req.query.assignment_id;
    if (req.query.hasOwnProperty("course_id")) {
      if (where.length > 0) {
        where += " AND ";
      }
      where += "course_id=" + req.query.course_id;
    }
    //note the active parameter is optional. But if present it must be of boolean type
    if (req.query.hasOwnProperty("is_active")) {
      if (
        String(req.query.is_active) == "false" ||
        String(req.query.is_active) == "true"
      ) {
        where += " AND is_active=" + req.query.is_active;
      } else {
        return res
          .status(404)
          .json({ error: "active must be 'true' or 'false'" });
      }
    }

    raw_query =
      "SELECT * FROM used_assignments_with_topics WHERE " + where + ";";

    //view that calculates active used_assignments and does joins.
    //type sanitizes query for us to protect us from SQL Injection
    sequelize
      .query(raw_query, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(results => {
        assignment_ids = joins.get_field_values(results, "assignment_id");
        //dedupe
        assignment_ids = Array.from(new Set(assignment_ids));

        topic_fields = ["topic", "topic_id"];
        used_assignments_with_subtopics = [];

        for (let i = 0; i < assignment_ids.length; i++) {
          let ass_id = assignment_ids[i];
          let used_assignments_with_topic_attrs = results.filter(item => {
            return item.assignment_id == ass_id;
          });
          used_assignment_with_subtopics = {};
          used_assignment_with_subtopics["topics"] = [];

          //can access by any element since all non topic fields will be the same.
          //accessing by 0 since we know there is at least one used_assignment in the array
          //given that it's the result of a filter function filtering on ass_id
          Object.keys(used_assignments_with_topic_attrs[0]).forEach(key => {
            if (!topic_fields.includes(key)) {
              used_assignment_with_subtopics[key] =
                used_assignments_with_topic_attrs[0][key];
            }
          });
          console.log(used_assignment_with_subtopics);
          used_assignments_with_topic_attrs.forEach(used_assign => {
            topic = {};
            topic_fields.forEach(top_field => {
              topic[top_field] = used_assign[top_field];
            });

            used_assignment_with_subtopics["topics"].push(topic);
          });

          used_assignments_with_subtopics.push(used_assignment_with_subtopics);
        }
        return res.json(used_assignments_with_subtopics);
      })
      .catch(err => res.status(404).json(sqlz_exceptions.build_errors(err)));
  }
);

module.exports = router;
