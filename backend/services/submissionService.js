import { sql } from "../database/database.js";

const addSubmission = async (submission) => {
    console.log(submission)
    await sql`INSERT INTO programming_assignment_submissions (programming_assignment_id, code, user_uuid) VALUES (${submission.assignmentID}, ${submission.code}, ${submission.user})`
}

export { addSubmission };
