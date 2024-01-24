import { readable, writable } from "svelte/store";

let user = localStorage.getItem("userUuid");
let step = localStorage.getItem("assignmentStep")

if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
}

if (!step) {
  createStepStorage()
}

function createStepStorage() {
  const currentSteps = localStorage.getItem("assignmentStep")
  const storedSteps = writable(currentSteps ? JSON.parse(currentSteps) : 1)

  storedSteps.subscribe((steps) => {
    localStorage.setItem("assignmentStep", JSON.stringify(steps))
  })

  return storedSteps
}

export const userUuid = readable(user);
export const userStep = createStepStorage()