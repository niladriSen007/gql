const fetchGreeting = async() =>{
    const response = await fetch("http://localhost:4000/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            query:"query{ greeting }",
        })
    })
    const { data } = await response.json()
    return data.greeting;
}

fetchGreeting().then(greeting=>{
    document.querySelector("#greetingData").innerHTML = greeting;
});