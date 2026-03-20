const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const intervewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router();

/**
 * @route Post api/interview 
 * @description generate new interview report based on the users self description, resume and job description
 * @access Private
 */
interviewRouter.post('/', authMiddleware.authUser, upload.single("resume"), intervewController.generateInterviewReportController)

module.exports = interviewRouter