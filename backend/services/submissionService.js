import { sql } from "../database/database.js";

const getSubmissionByCode = async (submission) => {
    const found = await sql`SELECT status, grader_feedback, correct 
        FROM programming_assignment_submissions 
        WHERE programming_assignment_id = ${submission.assignmentID} 
        AND user_uuid = ${submission.user}
        AND code LIKE ${submission.code}::TEXT`
    if (!found[0]) return null
    return found[0]
}

const addSubmission = async (submission) => {
    await sql`INSERT INTO programming_assignment_submissions 
    (programming_assignment_id, code, user_uuid, status, grader_feedback, correct) 
    VALUES (${submission.assignmentID}, ${submission.code}, ${submission.user}, 
        ${submission.status}, ${submission.grader_feedback}, ${submission.correct})`
}

export { getSubmissionByCode, addSubmission };
