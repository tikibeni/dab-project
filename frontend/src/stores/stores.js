import { readable, writable } from "svelte/store";

let user = localStorage.getItem("userUuid");
let step = localStorage.getItem("assignmentStep")

if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
}

if (!step) {
  localStorage.setItem("assignmentStep", 1)
}

export const userUuid = readable(user);
export const userStep = writable(step)