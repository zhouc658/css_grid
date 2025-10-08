//step1 - get api key and api url
//step2- setup html form(used to collect user input) and input id for response and submit
//step3- setup the variables for apiKey and api url
//step4- setup the variable btn to get the element that has the id "submit" from our HTML and put in the constant submit
//step5- adding an event listener for the click, and create the function
//step6- setup the variable todo to get the element that has the id "form" from our HTML and put in the constant todo
//step7- getting the value in the box (todo)
//step8- put in the apiurl link, u can change it to todoText to get the input value, and apiKey, which is ur own apikey to access the api
//step9- create an async function  getWeather() which will always return a promise
//step10- call getWeahter() inside the addEventListener click function
//step11- in the async function make a try and catch statement, so the try defines the code block to run/try, and the catch defines a code block to handle any error
//step12- in the try statement create a const response= await fetch(api_url), the fetch is a built-in JS function used to make network requests, so u are requestion info from ur api Url
//step13- make an if statement to check if the response from the request of api url is not responding, then it will tell you it is an error: throw new Error(response.statusText)-text message that corresponds to the HTTP status code, but depends on api, not very reliable
//step14- setup consdata= await response.json(); json is a format for storing and transporting data, which you need to get data from ur api an dsuch
//step15- in html setup id for temp
//step16- setup const temp=Math.round(data.main.temp); math.round to round to the nearest whole number, and inside the () is to get the temp value from the API
//step17- in html setup id for emoji 
//step18- in JS setup emoji variable
//step19- create if and else statment to display hot and cold emoji when the temp reach certain height


const city="London"
const apiKey="ec5589b1b5d1e6559ddf6b298b10c5cc" 
let api_url;

let btn= document.getElementById("submit")
btn.addEventListener("click", ()=>{
     // getting form element
     let todo = document.getElementById("form");

     // getting the value in the box
     let todoText = todo.elements[0].value
     console.log(todo.elements[0].value)
      api_url=`https://api.openweathermap.org/data/2.5/weather?q=${todoText}&appid=${apiKey}&units=imperial` //when there is backtick you can change it to your own variable, ${} is asking for input, so you can modify it here

     getWeather();
})
async function getWeather(){
    try{
        const response= await fetch(api_url);

        if(!response.ok){
            throw new Error(response.statusText)
        }
        const data= await response.json();

        const temp=Math.round(data.main.temp);
        console.log(data);
        let emoji;

        if(temp>=70){
            emoji= "😀";
        }  else{
            emoji="🥶";
        }
        document.getElementById('emoji').textContent=emoji;
        document.getElementById('temp').textContent=`${temp} F in ${data.name}`
        }
    catch{

    }
}

