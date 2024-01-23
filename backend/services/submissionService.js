import { sql } from "../database/database.js";

const getSubmission = async (submission) => {
    const found = await sql`SELECT * FROM programming_assignment_submissions WHERE code = ${submission.code} AND user_uuid = ${submission.user}`
    if (!found[0]) return null
    return found[0]
}

const addSubmission = async (submission) => {
    await sql`INSERT INTO programming_assignment_submissions 
    (programming_assignment_id, code, user_uuid, status, grader_feedback, correct) 
    VALUES (${submission.assignmentID}, ${submission.code}, ${submission.user}, 
        ${submission.status}, ${submission.grader_feedback}, ${submission.correct})`
}

export { getSubmission, addSubmission };
