import * as programmingAssignmentService from "./services/programmingAssignmentService.js";
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

/* 
  // Pisteytyskoodi
  const programmingAssignments = await programmingAssignmentService.findAll();
  const requestData = await request.json();
  const testCode = programmingAssignments[0]["test_code"];
  const data = {
    testCode: testCode,
    code: requestData.code,
  };

  const response = await fetch("http://grader-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
*/

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/assignments" }),
    fn: handleGetAssignments
  }
]

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
