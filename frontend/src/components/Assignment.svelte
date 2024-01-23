<script>
  import { userUuid } from "../stores/stores.js";
  
  export let assignmentInfo;
  let submission = ""
  let result = ""

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

    const jsonResponse = await response.json();
    result = jsonResponse.result
    // TODO: Split result string into pieces by matching:
    // "Traceback", "File", "NameError" and other errors
  }
</script>

<li style="padding: 50px">
  <p style="font-size: 20px; font-weight: bold;">{assignmentInfo.title} </p><br/>
  <label for="submission-box-{assignmentInfo.id}" class="block mb-2 text-sm font-medium">{assignmentInfo.handout}</label>
  <textarea 
    id="submission-box-{assignmentInfo.id}" 
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    bind:value={submission} 
    placeholder="Enter the solution here" 
    rows="4" 
  />
  <p class="block mb-2 text-sm font-medium">{result}</p>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded m-4" on:click={submit}>Submit solution</button>  
</li>
