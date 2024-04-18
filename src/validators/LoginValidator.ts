import { body } from "express-validator";

export const loginValidator = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Minimum pw is 6 characters').isLength({ min: 6 })
]