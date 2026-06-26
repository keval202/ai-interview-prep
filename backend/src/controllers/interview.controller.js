const { PDFParse } = require("pdf-parse")
const { generateInterviewReport, generateResumeHtml } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {
    try {
        // The new pdf-parse API (v2+) is class-based:
        //   1. Construct with { data: Uint8Array, verbosity: 0 }
        //   2. Call .load() to parse the PDF
        //   3. Call .getText() — returns { text: string, pages: [...], total: number }
        const parser = new PDFParse({
            verbosity: 0,
            data: new Uint8Array(req.file.buffer)
        })
        await parser.load()
        const { text: resumeText } = await parser.getText()

        const { selfDescription, jobDescription } = req.body

        // Call AI service to generate the structured report
        const interviewReportByAI = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        // Save to DB — spread AI response alongside user inputs
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportByAI   // title, matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan
        })

        res.status(201).json({
            message: "Interview Report generated successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("Error generating interview report:", error)
        res.status(500).json({
            message: "Failed to generate interview report.",
            error: error.message
        })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

/**
 * @description Controller to generate resume HTML based on user self description, resume and job description.
 */
async function generateResumeHtmlController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await interviewReportModel.findById(interviewReportId)

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const html = await generateResumeHtml({ resume, jobDescription, selfDescription })

        res.status(200).json({
            message: "Resume HTML generated successfully.",
            html
        })
    } catch (error) {
        console.error("Error generating resume HTML:", error)
        res.status(500).json({
            message: "Failed to generate resume HTML.",
            error: error.message
        })
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumeHtmlController }