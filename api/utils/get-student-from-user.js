const db_models = require("../../orm").db;
const sqlz_exceptions = require("./sequelize-exceptions");

const find_student = function(req, res, callback) {
  return db_models.student
    .findOne({ where: { user_id: req.user.id } })
    .then(student => {
      callback(student);
    })
    .catch(err => {
      res.status(404).json(sqlz_exceptions.build_errors(err));
    });
};

module.exports = find_student;
