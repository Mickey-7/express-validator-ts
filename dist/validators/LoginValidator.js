"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)('email', 'Invalid email').isEmail(),
    (0, express_validator_1.body)('password', 'Minimum pw is 6 characters').isLength({ min: 6 })
];
