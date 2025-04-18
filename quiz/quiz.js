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
   const questionNames= ["q2", "q3", "q4","q5","q6","q7","q8"]; //setting us up when iterate for our for loops, matches what the names are in out html
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
       resultText= "You are a tie!"
   } else {
       resultText= results[2];
       window.location.href='elegant.html';
   }
   //adds the resultText to the results placeholder HTML, so it displays on the actual page vs the console
   resultDiv.innerHTML= resultText;
})

