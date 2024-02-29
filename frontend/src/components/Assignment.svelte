<script>
  import { userUuid, userStep } from "../stores/stores.js"
  export let assignmentInfo

  let submission = ""
  let result = ""
  let pinging = false
  let iterations = 0

  const submissionPromise = async (data) => {
    const queryUrl = `api/submissions/${data.assignmentID}/${data.user}/${data.code}`
    const fetchedResult = await fetch(queryUrl, { method: "GET" })
    return await fetchedResult.json()
  }

  // This is disgusting, but the pub-sub-Redis-model would not freaking work when
  // frontend is run with node and backend is run with deno.
  const pingLoop = async (data) => {
    const fetchedData = await submissionPromise(data)
    if (fetchedData != null && fetchedData.status == "processed"){
      result = fetchedData.grader_feedback
      if (fetchedData.correct && assignmentInfo.assignment_order == $userStep) {
        const updatedStep = parseInt($userStep, 10) + 1
        userStep.set(updatedStep.toString())
      }
      pinging = false
      return
    }
    // Let's not wait forever.
    if (iterations == 10) {
      result = "Server didn't respond in time. Please try again."
      pinging = false
      return
    }
    iterations++
    setTimeout(async () => {
      return await pingLoop(data)
    }, 1000)
  }

  const submit = async () => {
    const data = {
      assignmentID: assignmentInfo.id,
      user: $userUuid,
      code: submission
    }

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    if (response.status == 200) {
      result = ""
      iterations = 0
      pinging = true
      await pingLoop(data)
    } else {
      result = response.status.toString() + " " + response.statusText
    }
  }

  const assignmentDisabled = () => {
    return assignmentInfo.assignment_order > $userStep
  }
</script>

<li id="assignment-{assignmentInfo.id}" style="padding: 50px">
  <p style="font-size: 20px; font-weight: bold;">{assignmentInfo.title} </p><br/>
  <label for="submission-{assignmentInfo.id}" class="block mb-2 text-sm font-medium">{assignmentInfo.handout}</label>
  <textarea
    id="submission-box-{assignmentInfo.id}"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Enter the solution here"
    disabled={assignmentDisabled()}
    rows="4"
    bind:value={submission} 
  />
  <p id="submission-{assignmentInfo.id}-result" class="block mb-2 text-sm font-medium">{result}</p>
  <button
    id="assignment-{assignmentInfo.id}-submit"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded m-4"
    disabled={assignmentDisabled() || submission.length == 0 || pinging}
    on:click={submit}
  >
    Submit solution
  </button>  
</li>
