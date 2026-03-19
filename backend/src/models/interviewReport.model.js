const mongoose = require('mongoose');

/**
 * 
 * - job description : String
 * - resume text : String 
 * - self description : String
 * 
 * -matchScore : Number
 * 
 * - technical questions : [{
 *      question: "",
 *      intention: "",
 *      answer: "",
 *  }]
 * - behavioral questions : [{
 *      question: "",
 *      intention: "",
 *      answer: "",
 *  }]
 * - skill gaps : [{
 *      skill: "",
 *      severity: [{
*           type: String,
*           enum: ["low", "medium", "high"],
*       }],
 *  }]
 * - preparation plan : [{
 *      day: Number,
 *      focus: String,
 *      tasks: [String],
 *  }]
 * 
 */

const technicaQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity is required"]
    }
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "Tasks are required"]
    }]
}, {
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String, 
        required: [true, "Job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicaQuestions: [technicaQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]
}, {
    timestamps: true
})

const InterviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReportModel;