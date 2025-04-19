//get the element that has the id "submit" from our HTML and put in the constant submit
const submit= document.getElementById('submit');
//get the element that has the id "result" from our HTML and put in the contant resultDiv
const resultDiv= document.getElementById('result');


submit.addEventListener('click', ()=>{ //adding an event listener
   event.preventDefault();//stop page from refreshing


   console.log("button submitted");
  
   //setting up counters so we can count how many answers we get in each category
   let cuteCount= 0;
   let coolCount= 0;
   let elegantCount=0;


   //setting up the questions we look for in the HTML
   const questionNames= ["q1","q2", "q3", "q4","q5","q6","q7","q8"]; //setting us up when iterate for our for loops, matches what the names are in out html
   //const question1= document.querySelector(`input[name="q1"]`)


   //finding each one of the questions and checking which answer was selected
   for(let i=0; i<questionNames.length; i++){


       //getting the element with the name that matches our question
       const selected=document.querySelector(`input[name="${questionNames[i]}"]:checked`) //to go select each questions, going every single one of the answers, replaceing the questionName with like q1, q2, q3(refer to line 18)
       console.log(selected);


       if(selected){
           if(selected.value=='cute'){
               cuteCount++
           }
           if(selected.value=='cool'){
               coolCount++
           }
           if(selected.value=='elegant'){
               elegantCount++
           }
       }
   }

   // 🔹 Get the price selection from q1
   const priceSelected=document.querySelector(`input[name="q8"]:checked`)
   if (!priceSelected) {
       resultDiv.innerHTML = "Please select a price option!";
       return;
   }
   const priceValue = priceSelected.value; // 'cheap', 'mid', or 'expensive'

   //setting up result options
   let resultText = "";
   let results= ["You are cute",
                  "You are cool",
                  "You are elegant"];

   //checking which count was highest or if there was a tie
   //changong resultText based on the answer
   if(cuteCount > coolCount && cuteCount > elegantCount){
       resultText= results[0];
       window.location.href='cute.html';
   }else if (coolCount > cuteCount && coolCount > elegantCount){
       resultText= results[1];
       window.location.href='cool.html';
   }else if(cuteCount==coolCount && cuteCount==elegantCount){
        window.location.href='cool.html';
} else {
       resultText= results[2];
       window.location.href='elegant.html';
   }
   //adds the resultText to the results placeholder HTML, so it displays on the actual page vs the console
   resultDiv.innerHTML= resultText;

   if (results[0] && priceValue==='cheap'){
    window.location.href='cuteCheap.html';
   }else if(results[0]&& priceValue==='mid'){
    window.location.href='cuteMid.html';
   }else if(results[0]&& priceValue==='expensive'){
    window.location.href='cuteExp.html';
   }else if(results[1]&& priceValue==='cheap'){
    window.location.href='coolCheap.html';
   }else if(results[1]&& priceValue==='mid'){
    window.location.href='coolMid.html';
   }else if(results[1]&& priceValue==='expensive'){
    window.location.href='coolExp.html';
   }else if(results[2]&& priceValue==='cheap'){
    window.location.href='elegantCheap.html';
   }else if(results[2]&& priceValue==='mid'){
    window.location.href='elegantMid.html';
   }else if(results[2]&& priceValue==='expensive'){
    window.location.href='elegantExp.html';
   }

})