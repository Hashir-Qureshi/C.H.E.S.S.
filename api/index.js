const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const db_models = require("../orm").db;
const course_router = require("./course");
const enroll_router = require("./enroll");
const used_assignments_router = require("./used_assignments");
const assignments_taken_router = require("./assignments_taken");

const api_router = express.Router();

const user_router = require("./user");

api_router.use("/user", user_router);
api_router.use("/course", course_router);
api_router.use("/enroll", enroll_router);
api_router.use("/used_assignments", used_assignments_router);
api_router.use("/assignments_taken", assignments_taken_router);

module.exports = api_router;
