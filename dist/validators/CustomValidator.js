"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customValidator = void 0;
const express_validator_1 = require("express-validator");
exports.customValidator = [
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value, { req }) => {
        if (value === 'admin@admin.com') {
            throw new Error("Can't enter this email");
        }
        else {
            return true;
        }
    })
];
