let btn= document.querySelector('button'); //queryselector is finding an element that matchees the button

btn.addEventListener("click", ()=> { //it is listening, the parameter click is the actual event we are listening to/waiting to happen, the second part is giving it a function for it to excute when it hears it
    //generating a random number between 0 and 255
    let r = Math.floor(Math.random()*255); 
    let g = Math.floor(Math.random()*255); 
    let b = Math.floor(Math.random()*255); 

    let rText = Math.floor(Math.random() * 255);
    let gText = Math.floor(Math.random() * 255);
    let bText = Math.floor(Math.random() * 255);

    let bgColor="rgb(" + r + "," + g + "," + b + ")" //constructing an rgb value that the DOM can use
    let textColor="rgb(" + rText + "," + gText + "," + bText + ")" //constructing an rgb value that the DOM can use

    console.log(bgColor);

    btn.style.background= bgColor; //this is changing the actuall button's background color based on bgColor

    document.body.style.background = bgColor; //changes the background color of the webpage's body to the value stored in the bgColor variable.

    let form1= document.getElementById("form1");
    console.log(form1);

    let h2s= document.getElementsByTagName("H2"); //looking for elements with tag h2
    console.log(h2s);

    // let i;
    // for(i=0; i<h2s.length; i++){ //so it is getting the first h2, the word from the first box and then the same thing for the 2nd box
    //     h2s[i].innerHTML= form1[i].value;

    //     h2s[i].style.color= textColor;
    // }

    let elements;
    let i;

    for(i=0; h2s.length; i++){ //so it is getting the first h2, the word from the first box and then the same thing for the 2nd box
        elements.push(document.createElement("h3"));

        elements[i].innerHTML= form1.elements[i].value;

        document.body.appendChild(elements[i]);
    }
})