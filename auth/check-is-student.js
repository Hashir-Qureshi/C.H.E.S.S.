//to be used in middleware after the passport auth middleware has been called since we
//need the req object to have the user variable added to it by passport
module.exports = (req, res, next) => {
  if (!req.user.is_student) {
    return res.status(403).json({ error: "Unathorized" });
  }
  next();
};
