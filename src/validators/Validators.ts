import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"

export const userValidationRules = () => {
    return [
        body('username').isEmail(),
        body('password').isLength({ min: 5 })
    ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    return res.status(422).json({
        errors: errors.array(),
    })
}