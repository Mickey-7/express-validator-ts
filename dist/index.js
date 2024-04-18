"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const LoginValidator_1 = require("./validators/LoginValidator");
const CustomValidator_1 = require("./validators/CustomValidator");
const Validators_1 = require("./validators/Validators");
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Your route that requires input validation
app.post('/user', 
// Express Validator middleware
(0, express_validator_1.body)('username').isLength({ min: 5 }), (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 8 }), 
// Route handler
(req, res) => {
    // Handle the request only if there are no validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        return res.status(200).json({ message: 'User created successfully' });
    }
});
app.post('/login', LoginValidator_1.loginValidator, (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        return res.status(200).json({ message: 'login success' });
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
});
app.post('/signup', CustomValidator_1.customValidator, (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        return res.status(200).json({ message: 'login success' });
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
});
app.post('/employee', (0, Validators_1.userValidationRules)(), Validators_1.validate, (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
    };
    res.json(newUser);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(new Date());
    console.log(`server is running on port ${PORT}`);
});
