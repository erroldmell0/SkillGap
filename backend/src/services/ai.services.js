const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod')

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

// Helper: convert Zod schema to Gemini-compatible JSON schema
// Strips $schema and additionalProperties which Gemini doesn't support
function zodToGeminiSchema(zodSchema) {
    const jsonSchema = z.toJSONSchema(zodSchema);
    return stripUnsupportedKeys(jsonSchema);
}
function stripUnsupportedKeys(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(stripUnsupportedKeys);

    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
        if (key === '$schema' || key === 'additionalProperties') continue;
        cleaned[key] = stripUnsupportedKeys(value);
    }
    return cleaned;
}

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

// Backup provider: Groq (OpenAI-compatible chat completions).
// Used only when the primary Gemini call fails — quota, outage, bad key, etc.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

function buildPrompt({ resume, selfDescription, jobDescription }) {
    return `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
    `
}

async function generateWithGemini(prompt) {
    const geminiSchema = zodToGeminiSchema(interviewReportSchema);

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: geminiSchema,
        }
    })

    return JSON.parse(response.text)
}

async function generateWithGroq(prompt) {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not set, no backup provider available");
    }

    // Groq is not schema-constrained the way Gemini is, so the schema goes in the
    // prompt and the result is validated against Zod before it is returned.
    const jsonSchema = z.toJSONSchema(interviewReportSchema);

    const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            temperature: 0.3,
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `You are an interview preparation assistant. Reply with a single JSON object and nothing else. It must conform exactly to this JSON schema:\n${JSON.stringify(jsonSchema)}`
                },
                { role: "user", content: prompt }
            ]
        })
    })

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Groq request failed (${response.status}): ${body}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error("Groq returned an empty completion");
    }

    const parsed = interviewReportSchema.safeParse(JSON.parse(content));

    if (!parsed.success) {
        throw new Error(`Groq returned a report that does not match the schema: ${parsed.error.message}`);
    }

    return parsed.data;
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = buildPrompt({ resume, selfDescription, jobDescription });

    try {
        return await generateWithGemini(prompt);
    } catch (geminiError) {
        console.error("Gemini failed, falling back to Groq:", geminiError.message);

        try {
            return await generateWithGroq(prompt);
        } catch (groqError) {
            console.error("Groq backup also failed:", groqError.message);
            throw geminiError;
        }
    }
}


module.exports = {generateInterviewReport};