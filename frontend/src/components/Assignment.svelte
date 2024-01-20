<script>
  export let assignmentInfo;
  let solution = ""
  const submitSolution = () => {
    console.log(`helloo ${solution}`)
  }
</script>

<li style="padding: 50px">
  <p style="font-size: 20px; font-weight: bold;">{assignmentInfo.title} </p><br/>
  <label for="submission-box-{assignmentInfo.id}" class="block mb-2 text-sm font-medium">{assignmentInfo.handout}</label>
  <textarea 
    id="submission-box-{assignmentInfo.id}" 
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    bind:value={solution} 
    placeholder="Enter the solution here" 
    rows="4" 
  />
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded m-4" on:click={submitSolution}>Submit solution</button>  
</li>
