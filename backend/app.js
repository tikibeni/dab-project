import * as programmingAssignmentService from "./services/programmingAssignmentService.js";
import * as submissionService from "./services/submissionService.js"
import { cacheMethodCalls } from "./util/cacheUtil.js";
import { serve } from "./deps.js";

// Simple arrayqueue and lock
let submissionQ = []
let processing = false

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

const cachedAssignmentService = cacheMethodCalls(programmingAssignmentService)
const cachedSubmissionService = cacheMethodCalls(submissionService, ["addSubmission"])

const handleGetAssignments = async (request) => {
  return Response.json(await cachedAssignmentService.findAll());
}

const handleGetAssignment = async (request) => {
  return await cachedAssignmentService.findOne(request)
}

const handleGetSubmission = async (request, urlPatternResult) => {
  const user = urlPatternResult.pathname.groups.user
  const assignmentID = urlPatternResult.pathname.groups.assignmentID
  const code = decodeURIComponent(urlPatternResult.pathname.groups.code)
  return Response.json(await cachedSubmissionService.getSubmissionByCode({ assignmentID, user, code }))
}

// Not to be used externally
const handleGetSubmissionByCode = async (submission) => {
  return await cachedSubmissionService.getSubmissionByCode(submission)
}

// Push each submission request into an array (queue)
const handleSubmissionQueue = async (request) => {
  let submission
  try {
    submission = await request.json()
    if (submission.code == "") {
      throw new Error("Empty submission code")
    }
    const assignment = await handleGetAssignment(submission.assignmentID)
    if (!assignment) {
      throw new Error("Invalid assignment ID")
    }
  } catch (error) {
    return new Response("Bad request", { status: 400 })
  }
  const alreadySubmitted = await handleGetSubmissionByCode(submission)
  if (!alreadySubmitted) {
    submissionQ.push(submission)
    loopSubmissionQueue()
  }
  return new Response("OK", { status: 200 })
}

// Make sure that each request is handled one by one
const loopSubmissionQueue = async () => {
  if (processing) return
  // Lock
  processing = true

  while (submissionQ.length > 0) {
    // first come first serve
    const submission = submissionQ.shift()
    await handlePostSubmission(submission)
  }

  // Unlock
  processing = false
  return
}

const handlePostSubmission = async (submission) => {
  const assignment = await handleGetAssignment(submission.assignmentID)
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

  // Give submission service the new data
  await cachedSubmissionService.addSubmission(submission)
  return
}

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignments" }),
    fn: handleGetAssignments
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/submissions/:assignmentID/:user/:code" }),
    fn: handleGetSubmission
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/submissions" }),
    fn: handleSubmissionQueue
  }
]

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
