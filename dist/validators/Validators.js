"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
const userValidationRules = () => {
    return [
        (0, express_validator_1.body)('username').isEmail(),
        (0, express_validator_1.body)('password').isLength({ min: 5 })
    ];
};
exports.userValidationRules = userValidationRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(422).json({
        errors: errors.array(),
    });
};
exports.validate = validate;
