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
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_teacher(req, res, next),
  (req, res) => {
    result = validators.do_attributes_exists(req.query, res, ["search_query"]);

    if (result !== undefined) {
      return result;
    }

    get_teacher(req, res, teacher => {
      //tokenize search query by space. Each individual word will be search using LIKE operator
      const terms = req.query.search_query.split(" ");
      const topic_attrs = ["id", "topic", "teacher_id"];
      let where = {};

      if (terms.length == 1) {
        where = {
          topic: { [Op.like]: "%" + terms[0] + "%" },
          teacher_id: teacher.id
        };
      }

      //build a query that is something like "WHERE LIKE (term 1) OR like (term2), etc."
      else {
        like_terms = [];
        terms.forEach(term => {
          like_terms.push({ topic: { [Op.like]: "%" + term + "%" } });
        });

        where = { [Op.or]: like_terms, teacher_id: teacher.id };
      }

      console.log(terms);
      console.log(where);

      db_models.topic
        .findAll({ where, attributes: topic_attrs })
        .then(topics => {
          return res.json(topics);
        })
        .catch(err => res.status(404).json(sqlz_exceptions.build_errors(err)));
    });
  }
);

module.exports = router;
