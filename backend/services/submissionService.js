import { sql } from "../database/database.js";

const getSubmission = async (submission) => {
    console.log('hello from sql')
    console.log(submission)
    return await sql`SELECT * FROM programming_assignment_submissions WHERE code = ${submission.code} AND user_uuid = ${submission.user}`
}

const addSubmission = async (submission) => {
    await sql`INSERT INTO programming_assignment_submissions (programming_assignment_id, code, user_uuid) VALUES (${submission.assignmentID}, ${submission.code}, ${submission.user})`
}

export { getSubmission, addSubmission };
