import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { loginValidator } from "./validators/LoginValidator";
import { customValidator } from "./validators/CustomValidator";
import { userValidationRules, validate } from "./validators/Validators";
import { User } from "./interface/User";

const app: express.Application = express();
// Middleware to parse incoming JSON requests
app.use(express.json())

// Your route that requires input validation
app.post('/user',
    // Express Validator middleware
    body('username').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    // Route handler
    (req: Request, res: Response) => {
        // Handle the request only if there are no validation errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            return res.status(200).json({ message: 'User created successfully' })
        }
    }
)


app.post('/login', loginValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        return res.status(200).json({ message: 'login success' })
    } else {
        res.status(422).json({ errors: errors.array() })
    }

})

app.post('/signup', customValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        return res.status(200).json({ message: 'login success' })
    } else {
        res.status(422).json({ errors: errors.array() })
    }

})

app.post('/employee', userValidationRules(), validate, (req: Request, res: Response) => {
    const newUser: User = {
        username: req.body.username,
        password: req.body.password,
    };
    res.json(newUser);
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(new Date());
    console.log(`server is running on port ${PORT}`);
})