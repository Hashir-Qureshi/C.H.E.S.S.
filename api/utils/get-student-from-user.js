const db_models = require("../../orm").db;

const find_student = function(req, res, callback) {
  return db_models.student
    .findOne({ where: { user_id: req.user.id } })
    .then(student => {
      callback(student);
    })
    .catch(err => {
      res.status(404).json({ error: "uncaught error" });
    });
};

module.exports = find_student;
