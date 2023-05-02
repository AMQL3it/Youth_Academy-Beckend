const { check, validationResult } = require("express-validator");
const Member = require("../../models/adminModel");
const createError = require('http-errors');

const memberDataFilter = [
    check('member_name')
        .isLength({ min: 1 })
        .withMessage('Name is required!')
        .isAlpha("en-US", { ignore: ' -'})
        .withMessage('Name must contain anything other than Alphabet')
        .trim(),
    check('member_email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async(member_email) => {
            try{
                const member = await Member.findOne({where:{member_email: member_email}});
                if(member){
                    throw createError('Email is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('member_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh')
        .custom(async(member_phone) => {
            try{
                const member = await Member.findOne({where: {member_phone: member_phone}});
                if(member){
                    throw createError('Mobile number is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('member_password')
        .isStrongPassword()
        .withMessage("Password must be strong")
];


memberDataFilterHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length===0){
        next();
    }
    else{
        res.status(500).json({
            errors: mappedErrors
        });
    }
};

module.exports = {
    memberDataFilter,
    memberDataFilterHandler
};