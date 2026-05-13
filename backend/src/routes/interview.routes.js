const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router();

const uploadResume = (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({message: "Resume must be smaller than 3 MB"});
            }

            return res.status(400).json({message: "Please upload a valid PDF resume"});
        }

        next();
    });
};

/**
 * @route Post api/interview/
 * @description generate new interview report based on the users self description, resume and job description
 * @access Private
 */
interviewRouter.post('/', authMiddleware.authUser, uploadResume, interviewController.generateInterviewReportController)

/**
 * @route Get api/interview/report/:interviewId
 * @description Get interview report by interview Id
 * @access public
 */
interviewRouter.get('/report/:interviewId',authMiddleware.authUser, interviewController.getInterviewReportById)

/**
 * @route Get api/interview/
 * @description Get all interview reports
 * @access public
 */
interviewRouter.get('/',  authMiddleware.authUser, interviewController.getAllInterviewReport)


module.exports = interviewRouter
