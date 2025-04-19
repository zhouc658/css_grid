//putting endpoint into a constant
const api_url= "https://random.dog/woof.json"

//write function to request from the API
async function getDog(){

    //fetch-making a request to the endpoint
    //making a request to the api and putting the response in "response"
    const response = await fetch(api_url);
    console.log(response)

    //.json to put the response into JSON format
    //putting response into JSON format
    const data= await response.json();
    console.log(data)

    const dog_url=data.url;
    document.getElementById("dog").src=data.url;
}

getDog();
