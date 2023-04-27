const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
    return [
        body('name').isLength({ min: 3 }).withMessage('Minimun 3 Characters'),
        body('email').isEmail().withMessage('Not a valid Email address'),
        body('password').isLength({ min: 5 }).withMessage('Password should be Minimun 5 Characters'),
    ];
};
const employeeRules = () => {
    return [
        body('name').isLength({ min: 3 }).withMessage('Minimun 3 Characters'),
        body('address').isLength({ min: 4 }).withMessage('Address should be have Minimun 4 Characters'),
        body('position').isLength({ min: 3 }).withMessage('Position should be Minimun 3 Characters'),
        body('salary').isNumeric().withMessage('Salary should be in numbers'),
    ];
};
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(422).json({ errors: errors.array() });
};
const validateEmployee = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(422).json({ errors: errors.array() });
};
module.exports = {
    userValidationRules,
    employeeRules,
    validate,
    validateEmployee
};
//# sourceMappingURL=validation.js.map