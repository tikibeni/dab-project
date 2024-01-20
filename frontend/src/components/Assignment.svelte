<script>
  export let assignmentInfo;
  let solution = ""
  const submitSolution = () => {
    console.log(`helloo ${solution}`)
  }
</script>

<li>
  {assignmentInfo.title} <br/>
  {assignmentInfo.handout}
</li>
<input type="text" bind:value={solution} />
<button on:click={submitSolution}>Submit solution</button>
