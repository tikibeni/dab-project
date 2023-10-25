<script>
  import { userUuid } from "../stores/stores.js";
  
  const doSimpleGradingDemo = async () => {
    const data = {
      user: $userUuid,
      code: `def hello():
  return "helo world!"
`,
    };
    
    const response = await fetch("/api/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    console.log(jsonData);
    alert(JSON.stringify(jsonData));
  };
</script>

<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded m-4"
  on:click={doSimpleGradingDemo}
>
  Do grading demo!
</button>
