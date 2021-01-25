const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").isLength({ min: 6 }).withMessage("Name Must be at least 6 characters long"),
  check("email").isEmail().withMessage("Must be a valid Email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
exports.userSigninValidator = [
    check("email").isEmail().withMessage("Must be a valid Email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
