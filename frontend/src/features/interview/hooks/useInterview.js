import {useContext, useEffect} from 'react'
import { InterviewContext } from '../interview.context'
import {generateInterviewReport, getInterviewReportById, getAllInterviewReports} from '../services/interview.api'
import { useParams } from "react-router"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const interviewId = useParams().interviewId

    if(!context) {
        throw new Error("useInterview must be used within InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({resumeFile, selfDescription, jobDescription}) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({resumeFile, selfDescription, jobDescription})
            setReport(response.interviewReport)
            return response.interviewReport 
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getAllReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getAllReports()
        }
    }, [interviewId])

    return {loading, report, reports, generateReport, getReportById, getAllReports}
}