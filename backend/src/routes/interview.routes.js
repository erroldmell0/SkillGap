const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router();

/**
 * @route Post api/interview/
 * @description generate new interview report based on the users self description, resume and job description
 * @access Private
 */
interviewRouter.post('/', authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)

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