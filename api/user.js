//libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//files
const UserModel = require("../orm").db.user;
const StudentModel = require("../orm").db.student;
const TeacherModel = require("../orm").db.teacher;
const DBAdministratorModel = require("../orm").db.db_administrator;
const keys = require("../config/keys");
const validators = require("../api/utils/validators");
const check_is_admin = require("../auth/check-is-admin");
const sqlz_exceptions = require("./utils/sequelize-exceptions");

EXPIRE_LOGIN_IN_X_HOURS = 3;

//role object is expected to be in the format of:
//{is_student : bool,is_teacher : bool, is_db_administrator: bool}
register_user = (req, res, next, role) => {
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
        is_teacher: role.is_teacher,
        is_db_administrator: role.is_db_administrator,
        is_student: role.is_student
      };

      const new_user = UserModel.create(fieldsAndValues)
        .then(user => {
          //create appropriate subrecord for the user
          if (user.is_student) {
            new_teacher = StudentModel.create({
              user_id: user.id,
              institution_name: req.body.institution_name,
              school_id: req.body.school_id
            }).catch(err =>
              res.status(400).json(sqlz_exceptions.build_errors(err))
            );
          }

          if (user.is_teacher) {
            new_teacher = TeacherModel.create({
              user_id: user.id,
              institution_name: req.body.institution_name
            }).catch(err =>
              res.status(400).json(sqlz_exceptions.build_errors(err))
            );
          }
          if (user.is_db_administrator) {
            new_db_administrator = DBAdministratorModel.create({
              user_id: user.id
            }).catch(err =>
              res.status(400).json(sqlz_exceptions.build_errors(err))
            );
          }

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
};

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

router.post(
  "/register/teacher",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_admin(req, res, next),
  (req, res, next) => {
    role = { is_student: false, is_teacher: true, is_db_administrator: false };
    register_user(req, res, next, role);
  }
);

router.post(
  "/register/db_administrator",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_admin(req, res, next),
  (req, res, next) => {
    role = { is_student: false, is_teacher: false, is_db_administrator: true };
    register_user(req, res, next, role);
  }
);

router.post("/register/student", (req, res, next) => {
  role = { is_student: true, is_teacher: false, is_db_administrator: false };
  register_user(req, res, next, role);
});

router.get(
  "/check_roles",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    roles = {
      is_db_administrator: req.user.is_db_administrator,
      is_student: req.user.is_student,
      is_teacher: req.user.is_teacher
    };
    return res.json(roles);
  }
);

module.exports = router;
