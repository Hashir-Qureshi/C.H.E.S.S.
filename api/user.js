//libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//files
const UserModel = require("../orm").db.user;
const StudentModel = require("../orm").db.student;
const keys = require("../config/keys");
const validators = require("../api/utils/validators");
const check_is_admin = require("../auth/check-is-admin");
const sqlz_exceptions = require("./utils/sequelize-exceptions");

EXPIRE_LOGIN_IN_X_HOURS = 3;

jwt_sign = (payload, res) => {
  return jwt.sign(
    payload,
    keys.jwt_secret,
    { expiresIn: EXPIRE_LOGIN_IN_X_HOURS * 60 * 60 },
    (err, token) => {
      if (err) {
        return res.status(401).json({
          msg: "There was an issue authenticating (JWT signing error)"
        });
      }
      return res.json({
        success: true,
        token: "Bearer " + token
      });
    }
  );
};

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_admin(req, res, next),
  (req, res) => {
    UserModel.findAll()
      .then(records => res.json(records))
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

//login with email
router.post("/login", (req, res) => {
  result = validators.do_attributes_exists(req.body, res, [
    "email",
    "password"
  ]);

  if (result !== undefined) {
    return result;
  }

  UserModel.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) return res.status(404).json({ error: "user not found" });

      bcrypt
        .compare(req.body.password, user.password_hash)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              is_teacher: user.is_teacher,
              is_db_administrator: user.is_db_administrator,
              is_student: user.is_student
            };

            return jwt_sign(payload, res);
          } else {
            return res.status(400).json({ password: "Password incorrect" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(sqlz_exceptions.build_errors(err));
        });
    })
    .catch(err => {
      res.status(400).json(sqlz_exceptions.build_errors(err));
    });
});

router.post("/register", (req, res, next) => {
  result = validators.do_attributes_exists(req.body, res, [
    "password",
    "email",
    "first_name",
    "last_name",
    "institution_name",
    "school_id"
  ]);

  //will return an error response or undefined if successful
  //we must bubble up the error as a return result otherwise we will get an unhandled rejection error
  if (result !== undefined) {
    return result;
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      fieldsAndValues = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password_hash: hash,
        is_teacher: false,
        is_db_administrator: false,
        is_student: true
      };

      const newUser = UserModel.create(fieldsAndValues)
        .then(user => {
          newStudent = StudentModel.create({
            user_id: user.id,
            institution_name: req.body.institution_name,
            school_id: req.body.school_id
          }).catch(err => res.status(400).json(sqlz_exceptions.bui));

          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            is_teacher: user.is_teacher,
            is_db_administrator: user.is_db_administrator,
            is_student: user.is_student
          };

          return jwt_sign(payload, res);
        })
        .catch(err => {
          return res.status(400).json(sqlz_exceptions.build_errors(err));
        });
    });
  });
});

module.exports = router;
