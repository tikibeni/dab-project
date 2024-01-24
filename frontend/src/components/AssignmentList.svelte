<script>
  import { userStep } from "../stores/stores.js"
  import Assignment from './Assignment.svelte'

  const getAssignments = async () => {
    const response = await fetch("/api/assignments")
    return await response.json()
  }

  let assignmentsPromise = getAssignments()
</script>

<h1 style="font-size: 34px">Assignments</h1>

{#await assignmentsPromise}
  <p>Loading assignments</p>
{:then assignments}
  {#if assignments.length == 0}
    <p>No assignments available</p>
  {:else}
    <ul>
    {#each assignments as assignment}
      {#if assignment.assignment_order <= $userStep}
        <Assignment assignmentInfo={assignment} />
      {/if}
    {/each}
    </ul>
  {/if}
{/await}