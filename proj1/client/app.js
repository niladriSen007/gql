

const fetchGraphQlData = async () => {
  try {
    const res = await fetch(`http://localhost:8000`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: `query { greeting }` }),
    });
    const data = await res.json();
    console.log(data);
    const strongText = document.querySelector("strong");
    strongText.innerText = data?.data?.greeting;
  } catch (e) {
    throw new error("Problem while fetching");
  }
};

fetchGraphQlData();
