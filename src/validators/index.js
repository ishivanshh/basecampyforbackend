import {body} from "express-validator";
import { AvailableUserRole } from "../utils/constants.js";


const userRegisterValidator = () =>{
    return [
        body("email").trim().notEmpty().withMessage("Email is required!").isEmail().withMessage("Email is invalid"),
        body("username").trim().notEmpty().withMessage("username is required!").isLowercase().withMessage("username must be in lowercase").isLength({min:3}).withMessage("username must be atleast 3 character long."),
        body("password").trim().notEmpty().withMessage("Password is required!"),
        body("fullName").optional().trim().notEmpty()
    ]
}
const userLoginValidator = () => {
    return [
        body("email").optional().isEmail().withMessage("Email is invalid"),
        body("password").notEmpty().withMessage("Password is required!")
    ];
};
const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword").notEmpty().withMessage("old password is required"),
        body("newPassword").notEmpty().withMessage("New password is required")
    ]
};
const userForgotPasswordValidator = () => {
    return [
        body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
    ];
};
const userResetForgotPasswordValidator = () => {
    return [
        body("newPassword").notEmpty().withMessage("Password is required")
    ];
};

const createProjectValidator = () => {
    return [
        body("name")
        .notEmpty()
        .withMessage("Name is required"),
        body("description").optional(),
    ]
};


const addMembertoProjectValidator = () => {
    return [
        body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email is invalid"),
        body("role")
        .notEmpty()
        .withMessage("role is required")
        .isIn(AvailableUserRole)
        .withMessage("role is invalid")
    ]
};

export {
    userRegisterValidator ,
     userLoginValidator,
     userResetForgotPasswordValidator , 
     userForgotPasswordValidator,
     userChangeCurrentPasswordValidator,
     createProjectValidator,
     addMembertoProjectValidator
};