"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { body, validationResult } = require('express-validator');
class validator {
    constructor() {
        this.validBody = (req, res, next) => {
            body('name', 'Enter a valid name').isLength({ min: 3 }),
                body('email', 'Enter a valid email').isEmail(),
                body('password').isLength({ min: 5 }), (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
            };
        };
    }
}
exports.default = validator;
//# sourceMappingURL=validator.js.map