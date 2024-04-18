import { check } from "express-validator";

export const customValidator = [
    check('email')
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

]