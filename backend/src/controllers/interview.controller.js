const pdfParse = require('pdf-parse');
const {generateInterviewReport} = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description Controller to generate interview report based on user self description, resume and job description
 */
async function generateInterviewReportController(req, res) {
    const {selfDescription = "", jobDescription} = req.body;

    if (!jobDescription?.trim()) {
        return res.status(400).json({message: "Job description is required"});
    }

    if (!req.file?.buffer) {
        return res.status(400).json({message: "Resume PDF is required"});
    }

    let resumeContent;

    try {
        resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    } catch (error) {
        return res.status(400).json({message: "Could not read the uploaded PDF. Please upload a valid resume PDF."});
    }

    if (!resumeContent.text?.trim()) {
        return res.status(400).json({message: "Could not find readable text in the uploaded resume PDF"});
    }

    let interviewReportByAi;

    try {
        interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text, 
            selfDescription: selfDescription.trim(), 
            jobDescription: jobDescription.trim()
        })
    } catch (error) {
        console.error("Failed to generate interview report:", error);
        return res.status(502).json({message: "Could not generate the interview report right now. Please try again."});
    }

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription: selfDescription.trim(),
        jobDescription: jobDescription.trim(),
        ...interviewReportByAi
    })
        
    res.status(201).json({message:"Interview report generated successfully", interviewReport})
    
}

/**
 * @description Controller to get interview report by interview Id
 */
async function getInterviewReportById(req, res) {
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport) {
        return res.status(404).json({message: "Interview report not found"} )
    }

    res.status(200).json({message: "Interview report fetched sucessfully", interviewReport})
}

/**
 * @description Controller to get all interview reports of a user
 */
async function getAllInterviewReport(req, res) {
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({message: "Interview reports fetched sucessfully", interviewReports})
}

module.exports = {generateInterviewReportController, getInterviewReportById, getAllInterviewReport}
