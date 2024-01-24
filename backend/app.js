import * as programmingAssignmentService from "./services/programmingAssignmentService.js";
import * as submissionService from "./services/submissionService.js"
import { serve } from "./deps.js";

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);

  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 })
  }
};

const handleGetAssignments = async (request) => {
  return Response.json(await programmingAssignmentService.findAll());
}

const handleGetAssignment = async (request) => {
  return await programmingAssignmentService.findOne(request)
}

const handleGetSubmission = async (submission) => {
  return await submissionService.getSubmission(submission)
}

const handlePostSubmissions = async (request) => {
  let submission;
  try {
    submission = await request.json()
    // Check if submission with same code and user id already exists
    // -> return already graded version for inspection.
    const exists = await handleGetSubmission(submission)
    if (exists) {
      return new Response(JSON.stringify({
        result: exists.grader_feedback,
        correct: exists.correct
      }))
    }
  } catch {
    return new Response("Bad request", { status: 400 })
  }

  if (submission.code != "") {
    let assignment;
    try {
      // For fetching the testcode of the assignment
      assignment = await handleGetAssignment(submission.assignmentID)
    } catch {
      return new Response("Bad request", { status: 400 })
    }

    // Datablock for the grader
    const gradingData = {
      testCode: assignment.test_code,
      code: submission.code
    }

    // Grading
    const response = await fetch("http://grader-api:7000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gradingData)
    })

    const resultJson = await response.json()

    const isCorrect = !resultJson.result.includes("Traceback")

    // Add the new grading info to the submission
    submission = {
      ...submission,
      status: 'processed',
      grader_feedback: resultJson.result,
      correct: isCorrect
    }

    // Give submission service the new info package
    await submissionService.addSubmission(submission)

    return new Response(JSON.stringify({ 
      result: submission.grader_feedback,
      correct: submission.correct
    }))
  }
  return new Response("Bad request", { status: 400 })
}

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignments" }),
    fn: handleGetAssignments
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/submissions" }),
    fn: handleGetAssignments
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/submissions" }),
    fn: handlePostSubmissions
  }
]

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
