import axios from 'axios'

const api = axios.create({
    baseURL:"https://backend-skill-gap.onrender.com",
    withCredentials: true
})

/**
 * @description Generate interview report
 */
export const generateInterviewReport = async ({resumeFile, selfDescription, jobDescription}) => {
    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("selfDescription", selfDescription)
    formData.append("jobDescription", jobDescription)

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data    
}  

/**
 * @description Get interview report by interview Id
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

/**
 * @description Get all interview reports
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")
    return response.data
}