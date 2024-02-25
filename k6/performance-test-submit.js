import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"]
};

export default function () {
  http.post(
    "http://localhost:7800/api/submissions",
    JSON.stringify({
      assignmentID: 1,
      user: "k6-tester",
      code: "def hello(): return 'Hello'"
    })
  );
}
